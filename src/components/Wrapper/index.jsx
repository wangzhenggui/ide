import React, { useRef, useState } from 'react';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { connect } from 'dva';
import classNames from 'classnames';
import { DRAG_TYPE, COMPONENT_LAYOUT_INLINE } from '@/common/constant';
import {
  findNodeById,
  isRootNode,
  getPropsBySchema,
  getPropsByStyleSchema,
  findNodeParentById,
  isContainerType,
  insertNodeIntoParentTree,
  moveNode,
  removeNodeOnParentTree,
  getInfoBySchema,
  newNodeItem,
} from '@/common/tools';
import { nanoid } from 'nanoid';
import { toLower, cloneDeep, findIndex, isEmpty, eq, get } from 'lodash';
import styles from './index.less';

const Wrapper = ({ children, id, renderTree, dispatch, currentNode, currentSelectModalView, isDrag }) => {
  const rootNode = isRootNode(id);
  const isSelected = currentNode?.id === id;
  const idToNode = findNodeById([renderTree], id);
  const currentSchema = getInfoBySchema(idToNode?.sourcePackage, idToNode?.componentName)
  const isTextNode = eq(
    get(currentSchema, '__componentLayout__'),
    COMPONENT_LAYOUT_INLINE,
  );
  const wrapRef = useRef(null);
  const [position, setPosition] = useState('');
  const [{ isDragging }, dragRef, dragPreview] = useDrag({
    type: DRAG_TYPE,
    item: {
      id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: DRAG_TYPE,
    drop: (item, monitor) => {
      // 如果 child 已经作为了 drop target，不处理
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      const resourceSchema = getInfoBySchema(item.sourcePackage, item.componentName)
      const copyRenderTree = cloneDeep(renderTree);
      // 通过判断item中是否存在id，来区分是左侧菜单添加还是移动操作
      if (item.id) {
        /**
         * 移动操作
         * 1、找到当前操作节点的父节点
         * 2、父节点中移出当前节点 [如果父节点和移入节点的父节点是同一个，那么表示同层移动]
         * 3、找到移入节点，当前移入节点是否支持有子节点
         * 4、如果支持有子节点，则移入到移入节点的下面，否则移入到移入节点的父节点下
         */
        // TODO: 需要遍历树3次，不可接受，后面给重构了
        const dragNodeParent = findNodeParentById(
          [copyRenderTree],
          item.id,
          copyRenderTree,
        );
        const moveInNode = findNodeById([copyRenderTree], id);
        if (dragNodeParent?.id === moveInNode?.id) {
          return; // 如果moveInNode的是自己的父节点，那么直接return
        }
        const dragNode = findNodeById([copyRenderTree], item.id);
        const moveInNodeParent = findNodeParentById(
          [copyRenderTree],
          id,
          copyRenderTree,
        );
        // 同层移动，要看moveInNode是否是容器组件或者是最外层组件，如果是容器组件，那么移入进去，否则只是替换顺序操作
        if (dragNodeParent.id === moveInNodeParent.id) {
          if (isContainerType(moveInNode?.__componentType__) || rootNode) {
            if (moveInNode?.child?.length > 0) {
              // 容器组件是否有子节点
              insertNodeIntoParentTree(
                moveInNode,
                moveInNode.id,
                dragNode,
                position === 'up',
              );
              const afterMovedDragNode = removeNodeOnParentTree(
                dragNodeParent,
                item.id,
              );
              dragNodeParent.child = afterMovedDragNode;
            } else {
              moveInNode?.child?.push(dragNode);
              const afterMovedDragNode = removeNodeOnParentTree(
                dragNodeParent,
                item.id,
              );
              dragNodeParent.child = afterMovedDragNode;
            }
          } else {
            // insertNodeIntoParentTree(moveInNodeParent, moveInNode.id, dragNode, position === 'up');
            const targetNodeIndex = findIndex(
              dragNodeParent.child,
              (child) => child.id === item.id,
            );
            const moveInNodeIndex = findIndex(
              dragNodeParent.child,
              (child) => child.id === id,
            );
            moveNode(
              dragNodeParent.child,
              targetNodeIndex,
              position === 'up' ? moveInNodeIndex : moveInNodeIndex + 1,
            );
            // [dragNodeParent.child[targetNodeIndex], dragNodeParent.child[moveInNodeIndex]] = [dragNodeParent.child[moveInNodeIndex], dragNodeParent.child[targetNodeIndex]]
          }
        } else {
          // 跨层级移动,找到moveInNode的父节点，将当前操作节点移入进去，并且在当前节点的父节点里面删除当前节点
          insertNodeIntoParentTree(
            moveInNodeParent,
            moveInNode.id,
            dragNode,
            position === 'up',
          );
          const afterMovedDragNode = removeNodeOnParentTree(
            dragNodeParent,
            item.id,
          );
          dragNodeParent.child = afterMovedDragNode;
        }
        dispatch({
          type: 'editModal/moveNodeInTree',
          payload: {
            renderTree: copyRenderTree,
          },
        });
      } else {
        /**
         * 添加操作
         * 1、生成唯一id
         * 2、通过schema生成默认props
         * 3、添加一个节点到renderTree里面 [添加到哪里？拖放到容器组件中呢？添加的顺序呢？]
         *
         */
        // 添加,找到当前moveIn组件的最近容器组件【即是父组件-只有父组件是容器组件，才会有子组件】
        let moveInNode = findNodeById([copyRenderTree], id);
        // 浮层组件，添加到Root节点下
        if (get(resourceSchema, '__showModal__')) {
          moveInNode = findNodeById([copyRenderTree], '#');
        }
        const moveInNodeParent = findNodeParentById(
          [copyRenderTree],
          id,
          copyRenderTree,
        );
        const newNode = newNodeItem(item)
        
        // 拥有子容器的组件逻辑 选项卡 布局组件
        if (!isEmpty(get(resourceSchema, '__subContainer__'))) {
          // TODO: 组件schema内部定义
          const { packageName, slotContainerName, lengthDependencies } = get(resourceSchema, '__subContainer__', {});
          const subContainerComp = get(window, `${packageName}.${slotContainerName}`)
          const subContainerLength = lengthDependencies(newNode.props);
          for (let i = 0; i < subContainerLength; i++) {
            const subContainerSchema = get(subContainerComp, 'schema', {})
            const { type, name, __componentType__, __source__ } = subContainerSchema;
            const subComponentId = `${toLower(type)}-${nanoid(16)}`;
            const basicProps = getPropsBySchema(subContainerSchema?.basicSchema);
            const styleProps = getPropsByStyleSchema(subContainerSchema?.styleSchema);
            const expandProps = getPropsBySchema(subContainerSchema?.expandSchema);
            newNode.child.push({
              componentName: type,
              componentZhName: name,
              __componentType__,
              sourcePackage: __source__,
              child: [],
              basicProps,
              styleProps,
              expandProps,
              id: subComponentId
            })
          }
        }
        
        // 当前节点是容器节点，或者是Root节点
        if (isContainerType(moveInNode?.__componentType__) || rootNode || get(resourceSchema, '__showModal__')) {
          moveInNode?.child.push(newNode);
        } else {
          insertNodeIntoParentTree(
            moveInNodeParent,
            moveInNode.id,
            newNode,
            position === 'up',
          );
        }
        dispatch({
          type: 'editModal/addNodeToTree',
          payload: {
            renderTree: copyRenderTree,
            currentNode: newNode,
          },
        });
        // TODO: 对于modal类型的组件，不存放在dom树中，我们将它单独放在一个地方存储
        if (resourceSchema?.__showModal__) {
          dispatch({
            type: 'modalView/addView',
            payload: {
              data: newNode
            }
          })
        }
      }
    },
    hover: (item, monitor) => {
      // 只检查被hover的最小元素
      const didHover = monitor.isOver({ shallow: true });
      if (didHover) {
        const moveInNode = findNodeById([renderTree], id);
        if (isContainerType(moveInNode?.__componentType__) || rootNode) {
          setPosition('inner');
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect =
          wrapRef.current && wrapRef.current.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        // const clientOffset = monitor.getClientOffset();
        const dragOffset = monitor.getSourceClientOffset();
        // Get pixels to the top
        const hoverClientY = dragOffset.y - hoverBoundingRect.top;

        if (hoverClientY <= hoverMiddleY) {
          setPosition('up');
        } else {
          setPosition('down');
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver && !rootNode;
  dragPreview(dropRef(wrapRef));
  const handleClick = (e) => {
    e.stopPropagation();
    // 如果是root节点或者已经被选中，直接return
    if (rootNode || isSelected) return;
    // 切换当前节点
    const currentClickNode = findNodeById([renderTree], id);
    dispatch({
      type: 'editModal/changeCurrentNode',
      payload: {
        currentNode: currentClickNode,
      },
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({
      type: 'editModal/removeNodeInTree',
      payload: {
        id
      },
    });
    dispatch({
      type: 'modalView/removeView',
      payload: {
        id
      },
    });
  };

  const handleCopy = (e) => {
    e.stopPropagation();
    // 在当前节点下面在添加一个节点，需要copy一个独立的节点插入
    const copyRenderTree = cloneDeep(renderTree);
    // 找到当前节点的父节点，并且删除它，并设置当前节点为null
    let dragNodeParent = findNodeParentById(
      [copyRenderTree],
      id,
      copyRenderTree,
    );
    const copyTargetNode = cloneDeep(currentNode); // 当前操作节点其实就是currentNode
    const newId = `${toLower(copyTargetNode.componentName)}-${nanoid(8)}`; // 替换其Id
    copyTargetNode.id = newId;
    copyTargetNode.props.id = newId;
    insertNodeIntoParentTree(dragNodeParent, id, copyTargetNode, false);
    dispatch({
      type: 'editModal/copyNodeInTree',
      payload: {
        renderTree: copyRenderTree,
        currentNode: copyTargetNode,
      },
    });
  };

  return (
    <div
      ref={wrapRef}
      className={classNames({
        [styles.rootWrapper]: rootNode,
        [styles.basic]: true,
        [styles.inline]: isTextNode,
        [styles.isSelect]: isSelected,
        [styles.unSelect]: !isSelected,
        [styles.hoverUp]: isActive && position === 'up',
        [styles.hoverDown]: isActive && position === 'down',
        [styles.hoverComponent]: get(currentSchema, '__showModal__'),
        [styles.hide]: get(currentSchema, '__showModal__') && (currentSelectModalView?.id !== id || isDrag) // 复层组件类型 + 有浮层组件被拖拉 + 当前节点 != 选中节点
      })}
      onClick={handleClick}
    >
      {children}
      {!rootNode && isSelected && (
        <>
          {
            currentSchema?.__canMove__ && (
              <div className={styles.pointerMove} ref={dragRef}>
                <DragOutlined />
              </div>
            )
          }
          <div className={styles.pointerWrapper}>
            {
              currentSchema?.__canDelete__ && (
                <div className={styles.pointer}>
                  <Popconfirm
                    title="确定删除该组件?"
                    onConfirm={handleDelete}
                    okText="确定"
                    cancelText="取消"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </div>
              )
            }
            {
              currentSchema?.__canCopy__ && (
                <div className={styles.pointer} onClick={handleCopy}>
                  <CopyOutlined />
                </div>
              )
            }
          </div>
        </>
      )}
    </div>
  );
};

export default connect((state) => ({
  renderTree: state?.editModal?.renderTree,
  currentNode: state?.editModal?.currentNode,
  currentSelectModalView: state?.modalView?.currentSelectModalView,
  isDrag: state?.modalView?.isDrag
}))(Wrapper);

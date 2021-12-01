import React, { useMemo } from 'react';
import { get, cloneDeep, findIndex, isEmpty } from 'lodash';
import { connect } from 'dva';
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  findNodeById,
  isRootNode,
  findNodeParentById,
  isContainerType,
  insertNodeIntoParentTree,
  insertNodeInParentTreePosition,
  moveNode,
  removeNodeOnParentTree,
  getInfoBySchema
} from '@/common/tools';
import styles from './index.less';

const transData = (originObject) => {
  const newObject = {};
  newObject['title'] = originObject['componentZhName'];
  newObject['key'] = originObject['id'];
  if (originObject['child']) {
    newObject['children'] = originObject['child'].map(item => transData(item))
  }
  return newObject;
}

const ComponentTree = ({ renderTree, currentNode, dispatch }) => {
  const newDataSource = useMemo(() => {
    return transData(renderTree)
  }, [renderTree])

  const onSelect = (selectedKeys) => {
    if(isEmpty(selectedKeys)) return 
    const currentClickNode = findNodeById([renderTree], get(selectedKeys, '0'));
    dispatch({
      type: 'editModal/changeCurrentNode',
      payload: {
        currentNode: currentClickNode,
      },
    });
  }

  const onDrop = ({ dropToGap, node, dragNode: currentDragNode, dropPosition }) => {
    // dropToGap true表示是当前节点的兄弟结点；false表示当前结点的子节点
    // currentDragNode 当前操作节点
    // node 移入节点
    // dropPosition 节点相对位置 [-1,0,1]
    const copyRenderTree = cloneDeep(renderTree);
    const dropPos = node.pos.split('-');
    const position = dropPosition - Number(dropPos[dropPos.length - 1]);
    
    const dragNode = findNodeById([copyRenderTree], currentDragNode.key);
    const canMove = getInfoBySchema(dragNode?.sourcePackage, dragNode?.componentName, '__canMove__')
    if (!canMove) {
      console.debug('当前节点不可以被移动')
      return
    }
    const moveInNode = findNodeById([copyRenderTree], node.key);
    const dragNodeParent = findNodeParentById(
      [copyRenderTree],
      currentDragNode.key,
      copyRenderTree,
    );
    const moveInNodeParent = findNodeParentById(
      [copyRenderTree],
      node.key,
      copyRenderTree,
    );
    console.debug('dropToGap', dropToGap, 'node', node, 'currentDragNode', currentDragNode, 'dropPosition', dropPosition, 'position', position)
    if (dropToGap) { // 兄弟节点情况
      // 兄弟节点是否是最外层节点 看下兄弟节点的父节点是不是一个容器
      if (isRootNode(node.key) || !(isContainerType(moveInNodeParent?.__componentType__))) {
        console.debug('移入节点的父节点不是一个容器节点')
        return;
      }
      // 位置并未移动
      const beforePos = dropPos.slice(0, dropPos.length - 1);
      beforePos.push(dropPosition)
      console.debug('node', node, 'currentDragNode', currentDragNode, dropToGap, position)
      if (beforePos.join('-') === currentDragNode.pos) {
        console.debug('节点并未移动')
        return
      }
      
      if (dragNodeParent.id === moveInNodeParent.id) {
        const targetNodeIndex = findIndex(
          dragNodeParent.child,
          (child) => child.id === currentDragNode.key,
        );
        const moveInNodeIndex = findIndex(
          dragNodeParent.child,
          (child) => child.id === node.key,
        );
        moveNode(
          dragNodeParent.child,
          targetNodeIndex,
          moveInNodeIndex - targetNodeIndex > 0 ? moveInNodeIndex : moveInNodeIndex + 1,
        );
      } else {
        // 跨层级移动,找到moveInNode的父节点，将当前操作节点移入进去，并且在当前节点的父节点里面删除当前节点
        insertNodeIntoParentTree(
          moveInNodeParent,
          moveInNode.id,
          dragNode,
          position < 0,
        );
        const afterMovedDragNode = removeNodeOnParentTree(
          dragNodeParent,
          currentDragNode.key,
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
      if (!(isContainerType(moveInNode?.__componentType__) || isRootNode(node.key))) return;
      // 根据key来判断是否是同一位置
      dropPos.push(position);
      if (dropPos.join('-') === currentDragNode.pos) {
        console.debug('节点并未移动')
        return
      }
      const afterMovedDragNode = removeNodeOnParentTree(
        dragNodeParent,
        currentDragNode.key,
      );
      
      dragNodeParent.child = afterMovedDragNode;
      insertNodeInParentTreePosition(
        moveInNode,
        dragNode,
        position
      );
      dispatch({
        type: 'editModal/moveNodeInTree',
        payload: {
          renderTree: copyRenderTree,
        },
      });
    }
  }
  return (
    <div className={styles.leftWrap}>
      <h3>大纲树</h3>
      <Tree
        className="draggable-tree"
        showLine
        draggable
        blockNode
        onDrop={onDrop}
        switcherIcon={<DownOutlined />}
        onSelect={onSelect}
        treeData={[newDataSource]}
        selectedKeys={[currentNode?.id]}
      />
    </div>
  );
};

export default connect((state) => ({
  renderTree: state?.editModal?.renderTree,
  currentNode: state?.editModal?.currentNode
}))(ComponentTree);

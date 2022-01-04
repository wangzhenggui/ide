import { ROOT_NODE_FLAG, COMPONENT_TYPE_CONTAINER } from '@/common/constant';
import { cloneDeep } from 'lodash';
import { findNodeParentById, removeNodeOnParentTree } from '@/common/tools';

const INIT_TREE = { // 默认添加一个根节点
  "componentName": "RootComponent",
  "componentZhName": "Root",
  "id": ROOT_NODE_FLAG,
  "__componentType__": COMPONENT_TYPE_CONTAINER,
  "props": {},
  "child": []
}

export default {
  namespace: 'editModal',
  state: {
    renderTree: INIT_TREE,
    currentNode: null,
  },
  reducers: {
    addNodeToTree(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    moveNodeInTree(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateRenderTree(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    componentsPropsChange(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeCurrentNode(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    removeNodeInTree(state, { payload }) {
      const copyRenderTree = cloneDeep(state.renderTree);
      // 找到当前节点的父节点，并且删除它，并设置当前节点为null
      let dragNodeParent = findNodeParentById(
        [copyRenderTree],
        payload.id,
        copyRenderTree,
      );
      const afterMovedDragNode = removeNodeOnParentTree(dragNodeParent, payload.id);
      dragNodeParent.child = afterMovedDragNode;
      return {
        ...state,
        renderTree: copyRenderTree,
        currentNode: null,
      }
    },
    copyNodeInTree(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    clearTree() {
      return {
        renderTree: INIT_TREE,
        currentNode: null,
      }
    },
    reSetTree(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
    subContainerChange(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
}
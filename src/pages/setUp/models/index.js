import { ROOT_NODE_FLAG, COMPONENT_TYPE_CONTAINER } from '@/common/constant';

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
      return {
        ...state,
        ...payload,
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
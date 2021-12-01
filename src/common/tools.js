import {
  COMPONENT_SOURCE_ANTD,
  COMPONENT_SOURCE_OFFICE,
  COMPONENT_SOURCE_CUSTOMIZE,
  COMPONENT_TYPE_FORM,
  COMPONENT_TYPE_CONTAINER,
  ROOT_NODE_FLAG,
  COMPONENT_TYPE_BASIC,
} from '@/common/constant';
import { findIndex, get, set } from 'lodash';

export const isAntComp = (type) => type === COMPONENT_SOURCE_ANTD;
export const isOfficeComp = (type) => type === COMPONENT_SOURCE_OFFICE;
export const isCustomizeComp = (type) => type === COMPONENT_SOURCE_CUSTOMIZE;

export const isBasicType = (type) => type === COMPONENT_TYPE_BASIC;
export const isFormType = (type) => type === COMPONENT_TYPE_FORM;
export const isContainerType = (type) => type === COMPONENT_TYPE_CONTAINER;
export const isRootNode = (node) => node === ROOT_NODE_FLAG;

export const mergeSchema = (base, expand) => {
  return {
    ...base,
    properties: { ...expand?.properties, ...base?.properties },
  };
};

// 通过nodeId找在组件树中找到组件节点
export const findNodeById = (tree = [], id = '') => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      return tree[i];
    }
    if (tree[i].child) {
      let result = findNodeById(tree[i].child, id);
      if (result) {
        return result;
      }
    }
  }
};

// 通过nodeId在组件树中找到组件的父节点
export const findNodeParentById = (tree = [], id = '', parent) => {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === id) {
      return parent;
    }
    if (tree[i].child) {
      let result = findNodeParentById(tree[i].child, id, tree[i]);
      if (result) {
        return result;
      }
    }
  }
};

// 父组件树中移除一个节点
export const removeNodeOnParentTree = (parentTree, id) =>
  parentTree.child.filter((item) => item.id !== id);

// 插入一个节点,在目标节点之前还是之后
export const insertNodeIntoParentTree = (
  parentTree,
  targetNodeId,
  node,
  isBefore,
) => {
  // 先找到目标节点在父节点中的位置
  const targetNodeIndex = findIndex(
    parentTree.child,
    (item) => item.id === targetNodeId,
  );
  parentTree.child.splice(
    isBefore ? targetNodeIndex : targetNodeIndex + 1,
    0,
    node,
  );
};

// 插入一个节点到目标节点指定位置
export const insertNodeInParentTreePosition = (parentTree, node, position) => {
  parentTree.child.splice(
    position,
    0,
    node,
  );
}

/**
 *
 * @param {数组} arr
 * @param {移动初始值} fromIndex
 * @param {移入值} toIndex
 */
export const moveNode = (arr, fromIndex, toIndex) => {
  const item = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, item);
};

export const getPropsBySchema = (schema) => {
  if (!schema) return {};
  return Object.keys(schema?.properties).reduce((last, cur) => {
    if (last[cur]) return last;
    last[cur] = schema?.properties[cur]['default'];
    return last;
  }, {});
};

// 计算样式属性 对一些对象类型的数据进行平铺
export const calcNewStylesByProps = props => {
  const { font, padding, margin, border, layout, ...otherStyle } = props
  const newStyles = { ...otherStyle, ...font, ...padding, ...margin, ...border, ...layout }
  return newStyles;
}

// 递归获取样式属性配置的叶子节点
export const getPropsByStyleSchema = (schema) => {
  const result = {};
  const getLeafNode = (tree) => {
    if (tree?.type === 'object') {
      Object.keys(tree?.properties).map(t => {
        if (tree.properties[t]['type'] === 'object') {
          getLeafNode(tree.properties[t])
        } else {
          result[t] = tree.properties[t]['default']
        }
      })
    }
  }
  getLeafNode(schema);
  return result;
}


export const getInfoBySchema = (packageName, componentName, key) => {
  if (!packageName || !componentName) return {};
  return key ? get(window, `${packageName}.${componentName}.schema.${key}`) : get(window, `${packageName}.${componentName}.schema`)
}

// export const mergeSchemaAndData = (schema, data) => {
//   const getLeafNode = (tree) => {
//     if (tree.type === 'object') {
//       Object.keys(tree.properties).map(t => {
//         if (tree.properties[t]['type'] === 'object') {
//           getLeafNode(tree.properties[t])
//         } else {
//           console.log(tree.properties[t], data[tree.properties[t]])
//           tree.properties[t]['default'] = data[tree.properties[t]];
//         }
//       })
//     }
//   }
//   getLeafNode(schema);
//   return schema;
// }

// TODO: 特殊逻辑
export const isTabs = (schemas) => schemas?.type === 'ApaasTabs' && schemas?.__source__ === '@apaas-lego/react-container-widgets'
export const isContainer = (schemas) => schemas?.type === 'ApaasLayout' && schemas?.__source__ === '@apaas-lego/react-container-widgets'


// IDE输出的Schema转成Render所能识别的schema结构 [主要数组转对象]
export const ideOutPutSchemaToRenderSchema = (chiles, node) => {
  if (Array.isArray(chiles) && chiles.length > 0) {
    const newChiles = chiles.map(item => ideOutPutSchemaToRenderSchema(item?.child, item))
    set(node, `children`, {})
    newChiles.map(i => {
      set(node, `children.${i.id}`, i)
    })
    delete node.child
  } else {
    delete node.child
  }
  return node;
}
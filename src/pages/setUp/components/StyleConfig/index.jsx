import React, { useEffect, useMemo } from 'react';
import { Result } from 'antd';
import FormRender, { useForm } from 'form-render';
import { connect } from 'dva';
import { isEmpty, cloneDeep } from 'lodash';
import { findNodeById, isRootNode, calcNewStylesByProps, getInfoBySchema } from '@/common/tools';

// 通过原始树，我们将扁平化数据转成树行数据
const fn = (tree = {}, data) => {
  return Object.keys(tree['properties']).reduce((last, pre) => {
    if (tree['properties'][pre]['type'] === 'object') {
      return {
        ...last,
        [pre]: fn(tree['properties'][pre], data)
      }
    }
    return {
      ...last,
      [pre]: data[pre]
    }
  }, {})
}

const RenderForm = ({ currentNode = {}, dispatch, renderTree }) => {
  const form = useForm();
  useEffect(() => {
    if (!isEmpty(currentNode) && !isRootNode(currentNode?.id)) {
      const schemas = getInfoBySchema(currentNode?.sourcePackage, currentNode?.componentName);
      // 每次当组件Id发生变化时，即表示切换组件了，我们更新我们右侧表单值
      const originSchemaStructure = fn(schemas?.styleSchema, currentNode?.styleProps)
      form.setValues(originSchemaStructure);
    }
  }, [currentNode?.id]);

  if (isEmpty(currentNode)) {
    return <Result status="404" title="请选中组件" />;
  }

  const { sourcePackage, componentName, id, styleProps } = currentNode;
  const schemas = getInfoBySchema(sourcePackage, componentName)
  const copyRenderTree = cloneDeep(renderTree);
  let subTree = findNodeById([copyRenderTree], id);
  const watch = {
    // # 为全局
    '#': (val) => {
      console.log('样式表单的实时数据为：', val);
      const value = cloneDeep(val); // 此处必须要将值深拷贝一份，之前表单中的值是只读的。
      const leafValues = calcNewStylesByProps(value); // 将stylesProps平铺
      const newCurrentNode = {
        ...currentNode,
        styleProps: { ...styleProps, ...leafValues },
      };
      subTree.styleProps = { ...styleProps, ...leafValues }; // 通过索引赋值
      dispatch({
        type: 'editModal/componentsPropsChange',
        payload: {
          renderTree: copyRenderTree,
          currentNode: newCurrentNode,
        },
      });
    },
  };
  const newSchema = cloneDeep(schemas);
  return (
    <FormRender
      form={form}
      schema={JSON.parse(JSON.stringify(newSchema?.styleSchema))}
      watch={watch}
    />
  );
};

export default connect((state) => ({
  currentNode: state?.editModal?.currentNode,
  renderTree: state?.editModal?.renderTree,
}))(RenderForm);

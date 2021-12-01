import React, { useEffect, useRef } from 'react';
import { Result } from 'antd';
import FormRender, { useForm } from 'form-render';
import { connect } from 'dva';
import { isEmpty, cloneDeep, cloneDeepWith, difference, get, toLower } from 'lodash';
import { nanoid } from 'nanoid';
import { findNodeById, isRootNode, getInfoBySchema, getPropsBySchema, getPropsByStyleSchema, isTabs, isContainer } from '@/common/tools';
import { CodeEditor, ColProportion, Rules } from '@apaas-lego/setting-widgets';

const RenderForm = ({ currentNode, dispatch, renderTree }) => {
  const form = useForm();
  const ref = useRef(null);
  const refContainer = useRef(null);
  useEffect(() => {
    if (!isRootNode(currentNode?.id)) {
      // 每次当组件Id发生变化时，即表示切换组件了，我们更新我们右侧表单值
      form.setValues(currentNode?.props);
    }
  }, [currentNode?.id]);
  if (isEmpty(currentNode)) {
    return <Result status="404" title="请选中组件" />;
  }
  const { sourcePackage, componentName, id } = currentNode;
  const schemas = getInfoBySchema(sourcePackage, componentName)
  const copyRenderTree = cloneDeepWith(renderTree);
  let subTree = findNodeById([copyRenderTree], id);
  const watch = {
    // # 为全局
    '#': (val) => {
      console.debug('基础配置的实时数据为：', val);
      const value = cloneDeep(val); // 此处必须要将值深拷贝一份，之前表单中的值是只读的。
      const newCurrentNode = {
        ...currentNode,
        props: { ...currentNode.props, ...value },
      };
      subTree.props = { ...currentNode.props, ...value }; // 通过索引赋值
      // FIXME: 对于Tabs有一些需要特殊处理的逻辑执行，暂时没有好的通用解决方案
      if (isTabs(schemas)) {
        if (ref.current && ref.current?.length !== val?.items?.length) {
          if (val?.items?.length > ref.current?.length) { // 新增操作
            const { packageName, slotContainerName } = get(schemas, '__subContainer__', {});
            const subContainerComp = get(window, `${packageName}.${slotContainerName}`)
            const subContainerSchema = get(subContainerComp, 'schema', {})
            const { type, name, __componentType__, __source__ } = subContainerSchema;
            const subComponentId = `${toLower(type)}-${nanoid(16)}`;
            const basicProps = getPropsBySchema(subContainerSchema?.basicSchema);
            const styleProps = getPropsByStyleSchema(subContainerSchema?.styleSchema);
            const expandProps = getPropsBySchema(subContainerSchema?.expandSchema);
            subTree.child.push({
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
          } else { // 删除操作 找到俩个数组的不同
            const diffArray = difference(ref.current, val.items)
            const index = ref.current.indexOf(diffArray[0])
            subTree.child = subTree.child.filter((tree, inx) => inx !== index)
          }
        }
        ref.current = cloneDeep(val.items)
      }
      // FIXME: 布局容器的胶水代码 为什么要区分ref和refContainer 因为他们的属性都叫items，切换的时候会出现冲突
      if (isContainer(schemas)) {
        if (refContainer.current && refContainer.current?.length !== val?.items?.length) {
          if (val?.items?.length > refContainer.current?.length) { // 新增操作
            const { packageName, slotContainerName } = get(schemas, '__subContainer__', {});
            const subContainerComp = get(window, `${packageName}.${slotContainerName}`)
            const subContainerSchema = get(subContainerComp, 'schema', {})
            const { type, name, __componentType__, __source__ } = subContainerSchema;
            const subComponentId = `${toLower(type)}-${nanoid(16)}`;
            const basicProps = getPropsBySchema(subContainerSchema?.basicSchema);
            const styleProps = getPropsByStyleSchema(subContainerSchema?.styleSchema);
            const expandProps = getPropsBySchema(subContainerSchema?.expandSchema);
            subTree.child.push({
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
          } else { // 删除操作 找到俩个数组的不同
            const diffArray = difference(refContainer.current, val.items)
            const index = refContainer.current.indexOf(diffArray[0])
            subTree.child = subTree.child.filter((tree, inx) => inx !== index)
          }
        }
        refContainer.current = cloneDeep(val.items)
      }
      dispatch({
        type: 'editModal/componentsPropsChange',
        payload: {
          renderTree: copyRenderTree,
          currentNode: newCurrentNode,
        },
      });
    },
  };

  return (
    <FormRender
      form={form}
      schema={JSON.parse(JSON.stringify(schemas?.basicSchema || {}))}
      watch={watch}
      widgets={{ CodeEditor, ColProportion, Rules }}
    />
  );
};

export default connect((state) => ({
  currentNode: state?.editModal?.currentNode,
  renderTree: state?.editModal?.renderTree,
}))(RenderForm);

import React, { useEffect } from 'react';
import { Result } from 'antd';
import FormRender, { useForm } from 'form-render';
import { connect } from 'dva';
import { isEmpty, cloneDeep } from 'lodash';
import { findNodeById, isRootNode, getInfoBySchema } from '@/common/tools';
import { BindAction } from '@apaas-lego/setting-widgets';


const RenderForm = ({ currentNode, dispatch, renderTree }) => {
  const form = useForm();
  useEffect(() => {
    if (!isEmpty(currentNode) && !isRootNode(currentNode?.id)) {
      // 每次当组件Id发生变化时，即表示切换组件了，我们更新我们右侧表单值
      form.setValues(currentNode?.expandProps);
    }
  }, [currentNode?.id]);
  if (isEmpty(currentNode)) {
    return <Result status="404" title="请选中组件" />;
  }
  
  const { id, expandProps, sourcePackage, componentName } = currentNode;
  const schemas = getInfoBySchema(sourcePackage, componentName)
  const copyRenderTree = cloneDeep(renderTree);
  let subTree = findNodeById([copyRenderTree], id);
  const watch = {
    // # 为全局
    'events': (val) => {
      console.log('高级配置的实时数据为：', val);
      const value = cloneDeep(val); // 此处必须要将值深拷贝一份，之前表单中的值是只读的。
      const newCurrentNode = {
        ...currentNode,
        expandProps: { ...expandProps, events: value },
      };
      subTree.expandProps ={ ...expandProps, events: value }; // 通过索引赋值
      dispatch({
        type: 'editModal/componentsPropsChange',
        payload: {
          renderTree: copyRenderTree,
          currentNode: newCurrentNode,
        },
      });
    },
    lifeCycle: (val) => {
      console.log('lifeCycle的实时数据为：', val);
      const value = cloneDeep(val); // 此处必须要将值深拷贝一份，之前表单中的值是只读的。
      const newCurrentNode = {
        ...currentNode,
        expandProps: { ...expandProps, lifeCycle: value },
      };
      subTree.expandProps ={ ...expandProps, lifeCycle: value }; // 通过索引赋值
      dispatch({
        type: 'editModal/componentsPropsChange',
        payload: {
          renderTree: copyRenderTree,
          currentNode: newCurrentNode,
        },
      });
    }
  };
  const newSchema = cloneDeep(schemas);
  return (
    <FormRender
      widgets={{ BindAction }}
      form={form}
      schema={JSON.parse(JSON.stringify(newSchema?.expandSchema))}
      watch={watch}
    />
  );
};

export default connect((state) => ({
  currentNode: state?.editModal?.currentNode,
  renderTree: state?.editModal?.renderTree,
}))(RenderForm);

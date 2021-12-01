import React from 'react';
import FormRender, { useForm } from 'form-render';
import pageSchema from '@/components/widgets/pageSchema';
import { CodeEditor } from '@apaas-lego/setting-widgets';
import { cloneDeep } from 'lodash';
import { connect } from 'dva';

const PageConfig = (props) => {
  const form = useForm();
  const watch = {
    // # 为全局
    '#': (val) => {
      console.log('全局配置信息为：', val);
      // const value = cloneDeep(val);   // 此处必须要将值深拷贝一份，之前表单中的值是只读的。
      // props?.dispatch({
      //   type: 'editModal/modifyPointData',
      //   payload: {
      //     schemaValues: value,
      //   },
      // })
    },
  };
  return (
    <FormRender
      form={form}
      schema={pageSchema}
      watch={watch}
      widgets={{ CodeEditor }}
    />
  );
};

export default connect()(PageConfig);

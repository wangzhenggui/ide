import { connect } from 'dva';
import { cloneDeep } from 'lodash';
import UIRender from '@apaas-lego/react-render';
import { ideOutPutSchemaToRenderSchema } from '@/common/tools';
  
const Preview = ({ context, jsCode }) => {
  const schema = cloneDeep(context)
  ideOutPutSchemaToRenderSchema(schema.child, schema)
  window.SysFunc = (new Function(`return ${jsCode}`))(); // 将代码块注入到window.SysFunc上面

  return (
    <UIRender
      uiSchema={schema}
    />
  );
};

export default connect((state) => {
  return {
    context: state?.editModal?.renderTree,
    jsCode: state?.globalSetting?.globalFunctionContext
  }
})(Preview);

import { connect } from 'dva';
import MonacoEditor from "react-monaco-editor";

const FunctionExpressionModal = ({ dispatch, globalFunctionContext }) => {
  const options = {
    selectOnLineNumbers: true
  };
  const handleChange = (newValue) => {
    dispatch({
      type: 'globalSetting/setGlobalFunctionContext',
      payload: newValue,
    });
  }

  const editorDidMount = (editor) => {
    editor.focus();
  }

  return (
    <MonacoEditor
      width="500"
      height="500"
      language="javascript"
      value={globalFunctionContext}
      options={options}
      onChange={handleChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default connect((state) => ({
  globalFunctionContext: state?.globalSetting?.globalFunctionContext,
}))(FunctionExpressionModal);

import { connect } from 'dva';
import { Modal, Button } from 'antd';
import MonacoEditor from "react-monaco-editor";

const FunctionExpressionModal = ({ functionExpressionModal, dispatch, globalFunctionContext }) => {
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

  const closeModal = () => {
    dispatch({
      type: 'globalSetting/setFunctionExpressionModal',
      payload: false,
    })
  }
  return (
    <Modal
      visible={functionExpressionModal}
      onCancel={closeModal}
      onOk={closeModal}
      title="页面JS"
      footer={[
        <Button onClick={closeModal}>
          确定
        </Button>,
      ]}
      width="840px"
    >
      <MonacoEditor
        // width="800"
        height="500"
        language="javascript"
        // theme="vs-dark"
        value={globalFunctionContext}
        options={options}
        onChange={handleChange}
        editorDidMount={editorDidMount}
      />
    </Modal>
  );
};

export default connect((state) => ({
  functionExpressionModal: state?.globalSetting?.functionExpressionModal,
  globalFunctionContext: state?.globalSetting?.globalFunctionContext,
}))(FunctionExpressionModal);

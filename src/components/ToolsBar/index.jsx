import { useRef } from 'react';
import { Link } from 'umi'
import { Button, Modal, Space } from 'antd';
import MonacoEditor from 'react-monaco-editor';
import { connect } from 'dva';

const ToolsBar = ({ dispatch, schema }) => {
  const inputRef = useRef(null);
  const clearSchema = () => {
    dispatch({
      type: 'editModal/clearTree'
    })
  }
  const handleExport = () => {
    Modal.info({
      title: '当前Schema',
      width: 800,
      content: (
        <MonacoEditor
          height="500"
          language="json"
          value={JSON.stringify(schema)}
          options={{selectOnLineNumbers: true}}
        />
      ),
      onOk() {},
    });
  }

  const handleInput = () => {
    Modal.info({
      title: '当前Schema',
      width: 800,
      content: (
        <MonacoEditor
          height="500"
          language="json"
          ref={inputRef}
          options={{ selectOnLineNumbers: true }}
        />
      ),
      onOk() {
        dispatch({
          type: 'editModal/reSetTree',
          payload: {
            renderTree: JSON.parse(inputRef.current.editor.getValue())
          }
        })
      }
    })
  }
  return (
    <Space style={{display: 'flex', justifyContent: 'center', padding: '12px'}}>
      <Button onClick={clearSchema}>
        清空
      </Button>
      <Button onClick={handleInput}>
        导入
      </Button>
      <Button type="primary" onClick={handleExport}>
        导出Schema
      </Button>
      <Link to="/preview">
        <Button type="primary">
          预览
        </Button>
      </Link>
    </Space>
  )
}

export default connect((state) => ({
  schema: state?.editModal?.renderTree,
}))(ToolsBar);

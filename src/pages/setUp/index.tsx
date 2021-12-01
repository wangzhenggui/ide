import ReactDom from 'react-dom';
import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { connect } from 'dva';
import ToolsBar from '@/components/ToolsBar';
import Left from './components/Left';
import Container from './components/Container';
import Right from './components/Right';
import FunctionExpressionModal from './components/FunctionExpressionModal';
import styles from './index.less';

window['React'] = React;
window['ReactDOM'] = ReactDom;

const SetUp = ({ loading, dispatch, resourceList } : any) => {
  const loadScript = (info: Object) => {
    return new Promise((resolve, reject) => {
      const packageSrc = `https://unpkg.com/${info.name}@${info.version}`;
      const script = document.createElement('script')
      script.onload = resolve;
      script.onerror = reject;
      script.src = packageSrc;
      document.body.appendChild(script);
      script.remove();
    })
  }
  useEffect(() => {
    dispatch({
      type: 'globalSetting/setLoading',
      payload: {
        loading: true,
      },
    })
    Promise.all(resourceList.map(resource => loadScript(resource))).finally(() => {
      dispatch({
        type: 'globalSetting/setLoading',
        payload: {
          loading: false,
        },
      })
    })
  }, [])
  return (
    <Spin spinning={loading}>
      {
        !loading && ( // 当组件库加载完毕之后继续执行渲染逻辑
          <DndProvider backend={HTML5Backend}>
            <ToolsBar />
            <div className={styles.container}>
              <FunctionExpressionModal />
              <Left />
              <Container />
              <Right />
            </div>
          </DndProvider>
        )
      }
      
    </Spin>
  );
};

export default connect((state) => ({
  loading: state?.globalSetting?.loading,
  resourceList: state?.globalSetting?.resourceList,
}))(SetUp);

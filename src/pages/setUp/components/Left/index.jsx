import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import {
  FormOutlined,
  PieChartOutlined,
  LayoutOutlined,
  ApartmentOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import FormBasic from '../FormBasic';
import ComponentTree from '../ComponentTree';
import PageConfig from '../PageConfig';
import LayoutBasic from '../LayoutBasic';
import styles from './index.less';

const tabs = [
  {
    icon: <ApartmentOutlined />,
    content: <ComponentTree />,
    key: 'componentTree'
  },
  {
    icon: <FormOutlined />,
    content: <FormBasic />,
    key: 'components'
  },
  {
    icon: <GlobalOutlined />,
    content: null,
    key: 'jsExpression'
  },
];

const { TabPane } = Tabs;
const Left = ({ dispatch }) => {
  const handleChange = (key) => {
    if (key === 'jsExpression') {
      dispatch({
        type: 'globalSetting/setFunctionExpressionModal',
        payload: true,
      })
    }
  }
  return (
    <>
      <Tabs defaultActiveKey="components" tabPosition="left" onChange={handleChange}>
        {tabs.map((item, index) => (
          <TabPane tab={item.icon} key={item.key}>
            {item.content}
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default connect()(Left);

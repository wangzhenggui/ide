import React, { useState } from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import classNames from 'classnames'
import {
  FormOutlined,
  PieChartOutlined,
  PushpinOutlined,
  ApartmentOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import FormBasic from '../FormBasic';
import ComponentTree from '../ComponentTree';
import FunctionExpressionModal from '../FunctionExpressionModal'
import styles from './index.less'

const tabs = [
  {
    icon: <ApartmentOutlined />,
    content: <ComponentTree />,
    key: 'componentTree',
    title: '大纲树'
  },
  {
    icon: <FormOutlined />,
    content: <FormBasic />,
    key: 'components',
    title: '组件库'
  },
  {
    icon: <GlobalOutlined />,
    content: <FunctionExpressionModal />,
    key: 'jsExpression',
    title: '页面JS'
  },
];

const { TabPane } = Tabs;
const Left = ({ dispatch }) => {
  const [activeKey, setActiveKey] = useState('')
  const [fixed, setFixed] = useState(false)
  const handleTabClick = (key) => setActiveKey(key === activeKey ? '' : key)
  const handleClickFixedIcon = () => setFixed((f) => !f)
  return (
    <div className={styles.tabs}>
      <Tabs defaultActiveKey="components" activeKey={activeKey} tabPosition="left" onTabClick={handleTabClick}>
        {tabs.map((item, index) => (
          <TabPane tab={item.icon} key={item.key} className={styles.tabPanel}>
            <div className={classNames({
              [styles.container]: true,
              [styles.fixed]: fixed,
            })}>
              <div className={styles.templatesLayout}>
                <h3>{item.title}</h3>
                <PushpinOutlined
                  style={{ color: fixed ? '#1890ff' : '', fontSize: '18px' }}
                  onClick={handleClickFixedIcon}
                />
              </div>
              {item.content}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default connect()(Left);

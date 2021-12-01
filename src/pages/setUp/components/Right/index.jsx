import React from 'react';
import { Tabs } from 'antd';
import BasicConfig from '../BasicConfig';
import StyleConfig from '../StyleConfig';
import AdvancedConfig from '../AdvancedConfig';
import styles from './index.less';

const { TabPane } = Tabs;
const tabs = [
  {
    title: '基础配置',
    content: <BasicConfig />,
  },
  {
    title: '样式配置',
    content: <StyleConfig />,
  },
  {
    title: '高级配置',
    content: <AdvancedConfig />,
  }
];

const Right = () => {
  return (
    <div className={styles.rightWrap}>
      <Tabs defaultActiveKey="0">
        {tabs.map((item, index) => {
          return (
            <TabPane tab={item.title} key={index}>
              {item.content}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Right;

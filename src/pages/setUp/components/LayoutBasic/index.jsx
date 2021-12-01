import React from 'react';
import { LAYOUT_WIDGET_TEMPLATE } from '@/common/constant';
import Drag from '@/components/Drag';
import styles from './index.less';

const LayoutBasic = () => {
  return (
    <>
      <h3>容器组件</h3>
      <div className={styles.templatesLayout}>
        {LAYOUT_WIDGET_TEMPLATE.map((item) => {
          return <Drag item={item} key={item.type} />;
        })}
      </div>
    </>
  )
}

export default LayoutBasic;

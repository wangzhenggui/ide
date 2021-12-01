import React from 'react';
import { FORM_WIDGET_TEMPLATE } from '@/common/constant';
import Drag from '@/components/Drag';
import styles from './index.less';

const ChartBasic = () => {
  return (
    <>
      <h3>图表组件</h3>
      <div className={styles.templatesLayout}>
        {FORM_WIDGET_TEMPLATE.map((item) => {
          return <Drag item={item} key={item.type} />;
        })}
      </div>
    </>
  )
}

export default ChartBasic;

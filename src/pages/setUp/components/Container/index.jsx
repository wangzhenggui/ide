import React from 'react';
import ComponentRender from '@/components/ViewRender/Fr';
import Overlay from '@/components/Overlay'
import styles from './index.less';

const Container = () => {
  return (
    <div className={styles.containerWrap}>
      <ComponentRender />
      <Overlay />
    </div>
  );
};

export default Container;
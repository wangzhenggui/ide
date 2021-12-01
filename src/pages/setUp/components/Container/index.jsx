import React from 'react';
import ComponentRender from '@/components/ViewRender/Fr';
import styles from './index.less';

const Container = () => {
  return (
    <div className={styles.containerWrap}>
      <ComponentRender />
    </div>
  );
};

export default Container;
import React from 'react';
import styles from './index.less';

const Template = ({ name, ...props }) => {
  return (
    <div className={styles.card} {...props}>
      <span>{name}</span>
    </div>
  );
};

export default Template;

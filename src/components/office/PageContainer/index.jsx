import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

const PageContainer = (props) => {
  return (
    <div>
      {
        <div className={classNames({
          [styles.pageContainerSize]: true,
          [styles.pageContainer]: !props.children
        })} style={{ background: props?.background }}>
          {
            props.children ? props.children : '拖拽组件或模版到这里'
          }
        </div>
      }
    </div>
  );
}

export default PageContainer;

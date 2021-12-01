import React from 'react';
import { connect } from 'dva';
import { ROOT_NODE_FLAG, NEED_SINGLE_RENDER_CHILDREN } from '@/common/constant';
import Wrapper from '@/components/Wrapper';
import RenderWidget from './RenderWidget';
import RenderChildren from './RenderChild';
import { findNodeById } from '@/common/tools';
import styles from './index.less';

const FR = (props) => {
  const { id = ROOT_NODE_FLAG, renderTree } = props;
  const currentNodeConfig = findNodeById([renderTree], id); // 在整棵树中找到当前id的那个节点
  // container组件为空的时候
  if (id === ROOT_NODE_FLAG && renderTree?.child?.length === 0) {
    return (
      <Wrapper id={id} className={styles.rootWrapper}>
        <div className={styles.emptyNode}>
          拖拽左侧栏的组件进行添加
        </div>
      </Wrapper>
    )
  }

return (
  <Wrapper id={id} className={styles.rootWrapper}>
    <RenderWidget {...currentNodeConfig}>
      {
        currentNodeConfig?.child.length > 0 ? currentNodeConfig?.child?.map(c => {
          return <RenderChildren child={c} />
        }) : null
      }
    </RenderWidget>
</Wrapper>
)
};

export default connect((state) => {
  return { renderTree: state?.editModal?.renderTree};
})(FR);
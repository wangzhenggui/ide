import React from 'react';
import { connect } from 'dva';
import Wrapper from '@/components/Wrapper';
import RenderWidget from '../RenderWidget';
import RenderChildren from './RenderChild';
import { findNodeById } from '@/common/tools';

const FR = (props) => {
  const { id, renderTree } = props;
  const currentNodeConfig = findNodeById([renderTree], id); // 在整棵树中找到当前id的那个节点
return (
  <Wrapper id={id}>
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
  return { renderTree: state?.modalView?.currentSelectModalView};
})(FR);
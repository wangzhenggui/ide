import React from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import { isFormType, isContainerType, getInfoBySchema } from '@/common/tools';
import { ROOT_NODE_FLAG, COMPONENT_MODE_EDIT } from '@/common/constant';

const RenderWidget = ({ componentName, id, props, styleProps, children, sourcePackage }) => {

  const schemas = getInfoBySchema(sourcePackage, componentName)
  // 根节点
  if (id === ROOT_NODE_FLAG) {
    return <div style={{width: '100%'}}>{children}</div>;
  }
  let Component = () => null;
  if (schemas?.__source__) {
    Component = get(
      window,
      `${sourcePackage}.${componentName}`
    );
  }
  // const styles = calcNewStylesByProps(styleProps); // 处理样式
  const styles = styleProps;
  if (isContainerType(schemas.__componentType__)) {
    return (
      <Component {...props} style={styles} mode={COMPONENT_MODE_EDIT}>
        {children}
      </Component>
    );
  }
  if (isFormType(schemas?.__componentType__)) {
    return (
      <Form.Item {...props?.formItemProps} style={styles} mode={COMPONENT_MODE_EDIT}>
        <Component {...props} />
      </Form.Item>
    );
  }
  return children ? (
    <Component {...props} style={styles} mode={COMPONENT_MODE_EDIT}>{children}</Component>
  ) : (
      <Component {...props} style={styles} mode={COMPONENT_MODE_EDIT}/>
  );
};

export default RenderWidget;

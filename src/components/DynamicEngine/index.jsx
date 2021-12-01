// import React from 'react';
// import { Form } from 'antd';
// import { get } from 'lodash';
// import { isAntComp, isOfficeComp } from '@/common/tools';

// const DynamicEngine = ({ componentType, config, schema }) => {
//   const newProps = { ...config, ...config.props }
//   let Component = () => null;
//   if (isAntComp(schema?.item?.editableEl?.properties?.__source__.default)) {
//     Component = get(require(`antd/es/index`), `${componentType}`);
//   } else if (isOfficeComp(schema?.item?.editableEl?.properties?.__source__.default)) {
//     Component = get(require(`@/components/office/index`), `${componentType}`);
//   }
//   return (
//     <Form.Item {...newProps}>
//       <Component {...newProps} />
//     </Form.Item>
//   );
// }

// export default DynamicEngine;

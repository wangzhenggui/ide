// import React from 'react';
// import { connect } from 'dva';
// import DynamicEngine from '../DynamicEngine';

// const ViewRender = ({ renderDataSource }) => {
//   return (
//     <>
//     {
//       renderDataSource.map(item =>
//         <div key={item?.id}>
//           <DynamicEngine componentType={item?.item?.type} config={item?.schemaValues} schema={item} />
//         </div>)
//     }
//     </>
//   );
// };

// export default connect((state) => {
//   return {
//     renderDataSource: state?.editModal?.renderDataSource,
//   }
// })(ViewRender);

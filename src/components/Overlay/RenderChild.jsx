import React from 'react';
import FR from './Fr';

const RenderChildren = ({ child }) => {
  return <FR key={child.id} id={child.id} />;
};

export default RenderChildren;

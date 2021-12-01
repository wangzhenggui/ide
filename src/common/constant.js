export const FORM_WIDGET_TEMPLATE = [
  {
    type: 'Input',
    name: '输入框',
    schemasType: 'inputSchema',
  },
  {
    type: 'Button',
    name: '按钮',
    schemasType: 'buttonSchema',
  },
  {
    type: 'Empty',
    name: '空状态',
    schemasType: 'emptySchema',
  },
];

export const LAYOUT_WIDGET_TEMPLATE = [
  {
    type: 'PageContainer',
    name: '页面容器',
    schemasType: 'pageSchema',
  },
  {
    type: 'FormContainer',
    name: '表单容器',
    schemasType: 'pageSchema',
  },
  {
    type: 'Row',
    name: 'Row',
    schemasType: 'rowSchema',
  },
  {
    type: 'Col',
    name: 'Col',
    schemasType: 'colSchema',
  },
];

export const DRAG_TYPE = 'DRAG_COMPONENT';

export const COLS = 24;

// 组件来源
export const COMPONENT_SOURCE_OFFICE = 'office'; // 官方
export const COMPONENT_SOURCE_ANTD = 'antd'; // antd
export const COMPONENT_SOURCE_CUSTOMIZE = 'customize'; // 自定义

// 组件类型
export const COMPONENT_TYPE_FORM = 'form'; // form类型
export const COMPONENT_TYPE_CONTAINER = 'container'; // 容器类型
export const COMPONENT_TYPE_BASIC = 'basic'; // 基础类型
export const COMPONENT_LAYOUT_INLINE = 'inline'; // 行类元素

// 跟节点标识
export const ROOT_NODE_FLAG = '#';

// 节点来源
export const NODE_FROM_ADD = 'add'; // 左侧添加
export const NODE_FROM_MOVE = 'move'; // 容器类移动


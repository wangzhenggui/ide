const formItemProperties = {
  label: {
    title: '标题',
    type: 'string',
    default: '',
  },
  colon: {
    title: '是否有冒号',
    type: 'boolean',
    default: true,
  },
  required: {
    title: '必填',
    type: 'boolean',
  },
  placeholder: {
    title: '占位符',
    type: 'string',
  },
  initialValue: {
    title: '初始值',
    type: 'string',
    default: '',
  },
  extra: {
    title: '提示信息',
    type: 'string',
    default: '',
  },
  name: {
    title: '字段名',
    type: 'string',
  },
};

export default formItemProperties;

const styleSchema = {
  width: {
    title: '宽度',
    type: 'string',
    required: false,
  },
  height: {
    title: '高度',
    type: 'string',
    required: false,
  },
  background: {
    title: '背景色',
    type: 'string',
  },
  layout: {
    type: 'object',
    title: '布局',
    properties: {
      display: {
        "title": "布局",
        "type": "string",
        "enum": [
          "flex",
          "block",
          "inline-block"
        ],
        "enumNames": [
          "flex",
          "block",
          "inline-block"
        ],
        "widget": "select",
        "default": "block"
      },
      flexDirection: {
        "title": "弹性布局方向",
        "type": "string",
        "enum": [
          "row",
          "column",
        ],
        "enumNames": [
          "横向",
          "纵向",
        ],
        "default": "row",
        "hidden": "{{formData.layout.display !== 'flex'}}",
      },
      justifyContent : {
        "title": "主轴方向",
        "type": "string",
        "enum": [
          "flex-start",
          "flex-end",
          "center",
          "space-around",
          "space-between"
        ],
        "enumNames": [
          "flex-start",
          "flex-end",
          "center",
          "space-around",
          "space-between"
        ],
        "default": "center",
        "hidden": "{{formData.layout.display !== 'flex'}}",
      },
      alignItems: {
        "title": "侧轴方向",
        "type": "string",
        "enum": [
          "flex-start",
          "flex-end",
          "center",
          "space-around",
          "space-between"
        ],
        "enumNames": [
          "flex-start",
          "flex-end",
          "center",
          "space-around",
          "space-between"
        ],
        "default": "center",
        "hidden": "{{formData.layout.display !== 'flex'}}",
      }
    }
  },
  font: {
    type: 'object',
    title: '文字',
    properties: {
      fontFamily: {
        title: '字体',
        description: 'font-family',
        type: 'string',
        required: false,
      },
      fontWidget: {
        type: 'string',
        description: 'font-widget',
        title: '字重',
        default: 'normal',
        widget: 'select',
        enum: ['lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'bold', 'bolder'],
        enumNames: ['lighter', 'normal', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'bold', 'bolder'],
      },
      fontStyle: {
        type: 'string',
        title: '样式',
        description: 'font-style',
        default: 'normal',
        widget: 'select',
        enum: ['normal', 'italic'],
        enumNames: ['正常', '斜体'],
      },
      fontSize: {
        title: '字体大小',
        description: 'font-size',
        type: 'number',
        required: false,
        default: 14,
      },
      lineHeight: {
        title: '行高',
        description: 'line-height',
        type: 'string',
        required: false,
        default: '21px',
      },
      color: {
        title: '字体颜色',
        description: 'color',
        type: 'string',
        format: 'color',
        default: '#000',
      },
      textAlign: {
        type: 'string',
        description: 'text-align',
        title: '对齐方式',
        default: 'left',
        enum: ['left', 'center', 'right', 'justify'],
        enumNames: ['left', 'center', 'right', 'justify']
      },
      textDecorationLine: {
        type: 'string',
        description: 'text-decoration-line',
        title: '装饰线',
        default: 'none',
        enum: ['none', 'underline', 'line-through'],
        enumNames: ['none', '下划线', '横划线']
      }
    }
  },
  margin: {
    type: 'object',
    title: '外边距',
    properties: {
      marginTop: {
        title: '上边距',
        type: 'string',
      },
      marginRight: {
        title: '右边距',
        type: 'string',
      },
      marginBottom: {
        title: '下边距',
        type: 'string',
      },
      marginLeft: {
        title: '左边距',
        type: 'string',
      },
    }
  },
  padding: {
    type: 'object',
    title: '内边距',
    properties: {
      paddingTop: {
        title: '上边距',
        type: 'string',
      },
      paddingRight: {
        title: '右边距',
        type: 'string',
      },
      paddingBottom: {
        title: '下边距',
        type: 'string',
      },
      paddingLeft: {
        title: '左边距',
        type: 'string',
      },
    }
  },
  border: {
    type: 'object',
    title: '边框',
    properties: {
      borderStyle: {
        type: 'string',
        title: '线形',
        default: 'none',
        widget: 'select',
        enum: ['none', 'solid', 'dashed', 'dotted'],
        enumNames: ['无', '实线', '虚线', '点线'],
      },
      borderWidth: {
        type: 'string',
        title: '线宽'
      },
      borderColor: {
        type: 'string',
        title: '颜色',
        widget: 'color'
      },
      borderRadius: {
        type: 'string',
        title: '圆角'
      }
    }
  },
  cursor: {
    title: '鼠标手势',
    type: 'string',
    enum: ['default', 'pointer'],
    enumNames: ['default', 'pointer'],
    widget: 'select',
    default: 'default',
  }
};

export default styleSchema;

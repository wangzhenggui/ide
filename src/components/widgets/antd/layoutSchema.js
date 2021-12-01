import { COMPONENT_SOURCE_ANTD, COMPONENT_TYPE_BASIC } from '@/common/constant';


const layout = {
	"type": "object",
	"displayType": "column",
  "properties": {
    "__source__": {
			"default": COMPONENT_SOURCE_ANTD,
    },
    "__componentType__": {
			"default": COMPONENT_TYPE_BASIC,
		},
		"breakpoint": {
			"title": "响应式布局",
      "type": "array",
      "items": {
        "type": "string"
      },
      "enum": [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "xxl"
      ],
      "enumNames": [
        "xs",
        "sm",
        "md",
        "lg",
        "xl",
        "xxl"
      ]
		},
	}
};
export default layout;

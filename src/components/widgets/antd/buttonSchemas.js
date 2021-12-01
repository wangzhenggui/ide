import { COMPONENT_SOURCE_ANTD, COMPONENT_TYPE_BASIC } from '@/common/constant';

const buttonSchema = {
	"type": "object",
	"displayType": "column",
	"properties": {
		"__source__": {
			"default": COMPONENT_SOURCE_ANTD,
		},
		"__componentType__": {
			"default": COMPONENT_TYPE_BASIC,
		},
		"danger": {
			"title": "设置危险按钮",
			"type": "boolean",
			"required": false
		},
		"disabled": {
			"title": "按钮失效状态",
			"type": "boolean",
			"required": false,
		},
		"type": {
			"title": "设置按钮类型",
			"type": "string",
      "required": false,
      "default": "primary"
    },
    "children": {
			"title": "文案",
			"type": "string",
      "required": false,
      "default": "提交"
    },
	}
};
export default buttonSchema;

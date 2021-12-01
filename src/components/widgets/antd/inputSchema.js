import { COMPONENT_SOURCE_ANTD, COMPONENT_TYPE_FORM } from '@/common/constant';

const AntdInputSchema = {
	"type": "object",
	"displayType": "column",
	"properties": {
		"__source__": {
			"default": COMPONENT_SOURCE_ANTD,
		},
		"__componentType__": {
			"default": COMPONENT_TYPE_FORM,
		},
		"label": {
			"title": "标题",
			"type": "string",
			"required": true,
			"default": "输入框",
		},
		"allowClear": {
			"title": "清除图标",
			"type": "boolean",
			"required": false
		},
		"bordered": {
			"title": "是否有边框",
			"type": "boolean",
			"required": false,
			"default": true,
		},
		"maxLength": {
			"title": "最大长度",
			"type": "number",
			"required": false
		}
	}
};
export default AntdInputSchema;

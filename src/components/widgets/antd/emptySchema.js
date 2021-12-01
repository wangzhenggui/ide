import { COMPONENT_SOURCE_ANTD, COMPONENT_TYPE_BASIC } from '@/common/constant';

const emptySchema = {
	"type": "object",
	"displayType": "column",
	"properties": {
		"__source__": {
			"default": COMPONENT_SOURCE_ANTD,
		},
		"__componentType__": {
			"default": COMPONENT_TYPE_BASIC,
		},
		"description": {
			"title": "自定义描述内容",
      "type": "string",
    }
	}
};
export default emptySchema;

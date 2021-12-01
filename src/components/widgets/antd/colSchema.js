import { COMPONENT_SOURCE_ANTD, COMPONENT_TYPE_BASIC } from '@/common/constant';

const colSchema = {
	"type": "object",
	"displayType": "column",
	"properties": {
		"__source__": {
			"default": COMPONENT_SOURCE_ANTD,
		},
		"__componentType__": {
			"default": COMPONENT_TYPE_BASIC,
		},
		"offset": {
			"title": "栅格左侧的间隔格数",
      "type": "number",
    },
    "pull": {
			"title": "栅格向左移动格数",
      "type": "number",
		},
		"push": {
			"title": "栅格间隔",
			"type": "number",
    },
    "span": {
      "title": "栅格占位格数",
      "type": "number",
    }
	}
};
export default colSchema;

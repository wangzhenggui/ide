import { COMPONENT_SOURCE_ANTD, COMPONENT_TYPE_BASIC } from '@/common/constant';


const rowSchema = {
	"type": "object",
	"displayType": "column",
  "properties": {
    "__source__": {
			"default": COMPONENT_SOURCE_ANTD,
    },
    "__componentType__": {
			"default": COMPONENT_TYPE_BASIC,
		},
		"align": {
			"title": "垂直对齐方式",
      "type": "array",
      "items": {
        "type": "string"
      },
      "enum": [
        "top",
        "middle",
        "bottom",
      ],
      "enumNames": [
        "top",
        "middle",
        "bottom",
      ]
		},
		"gutter": {
			"title": "栅格间隔",
			"type": "number",
			"required": false
		},
		"justify": {
			"title": "水平对齐方式",
      "type": "array",
      "items": {
        "type": "string"
      },
      "enum": [
        "start",
        "end",
        "center",
        "space-around",
        "space-between",
      ],
      "enumNames": [
        "start",
        "end",
        "center",
        "space-around",
        "space-between",
      ]
    },
    "wrap": {
			"title": "是否自动换行",
			"type": "boolean",
			"required": false
		},
	}
};
export default rowSchema;

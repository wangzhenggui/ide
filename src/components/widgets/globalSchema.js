const globalSchema = {
	"type": "object",
	"displayType": "column",
	"properties": {
		"breakpoint": {
			"title": "整体布局",
      "type": "string",
      "widget": "select",
      "default": "8",
      "enumNames": [
        "一行一列",
        "一行二列",
        "一行三列",
        "一行四列"
      ],
      "enum": [
        "24",
        "12",
        "8",
        "6"
      ]
		},
	}
};
export default globalSchema;

const commonSchema = {
	"type": "object",
	"displayType": "column",
	"properties": {
		"id": {
			"title": "组件id",
      "type": "string",
      "disabled": true,
			"required": true
    },
    "bind": {
			"title": "绑定别名",
      "type": "string",
			"required": true
		}
	}
};
export default commonSchema;

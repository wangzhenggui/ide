import {
  COMPONENT_SOURCE_OFFICE,
  COMPONENT_TYPE_CONTAINER,
} from '@/common/constant';

const page = {
  type: 'object',
  displayType: 'column',
  properties: {
    globalFunction: {
      title: '全局函数定义',
      type: 'string',
      widget: 'CodeEditor',
      required: false,
      default: `// 函数格式如下;提供俩个命名空间 \nwindow.ApaasGlobalFunc = {\n\tpageInit(_, { $root, $request }) {\n}}\nwindow.ApaasServiceFunc = {\n\tloginRequest(_, { $root, $request }) {\n}}`,
      props: {
        options: {
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: false,
        },
        language: 'javascript',
        width: '300',
        height: '800',
        theme: 'vs-dark', // vs-light
      },
    },
  },
};
export default page;

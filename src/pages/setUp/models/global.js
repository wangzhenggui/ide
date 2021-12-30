export default {
  namespace: 'globalSetting',
  state: {
    setting: {},
    globalFunctionContext: '',
    loading: true,
    resourceList: [{
      name: '@apaas-lego/react-container-widgets',
      version: '0.0.16',
      title: '布局'
    }, {
      name: '@apaas-lego/react-basic-widgets',
      version: '0.1.13',
      title: '基础'
    }, {
      name: '@apaas-lego/react-form-widgets',
      version: '0.0.2',
      title: '表单'
    }],
  },
  reducers: {
    setGlobalData(state, { payload }) {
      return {
        ...state,
        renderDataSource,
        currentRecord: payload,
      };
    },
    setGlobalFunctionContext(state, { payload }) {
      return {
        ...state,
        globalFunctionContext: payload
      }
    },
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload.loading
      }
    },
    setResourceList(state, { payload }) {
      return {
        ...state,
        resourceList: payload.resourceList
      }
    }
  },
}
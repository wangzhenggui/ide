import { defineConfig } from 'umi';
import path from 'path';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    hmr: true,
  },
  routes: [
    { path: '/', component: '@/pages/setUp' },
    { path: '/preview', component: '@/pages/preview' },
  ],
  fastRefresh: {},
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils/'),
    assets: path.resolve(__dirname, 'src/assets/'),
    common: path.resolve(__dirname, 'src/common/'),
  },
  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript']
      }
    ]);
    return config;
  }
});

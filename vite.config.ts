import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 开发服务器的主机名
    port: 9090, // 开发服务器的端口号
    open: true, // 自动打开浏览器窗口
    proxy: {
      '/api': { // 代理规则的前缀路径
        target: '127.0.0.1:9090', // 目标服务器的URL
        changeOrigin: true, // 是否改变源，设置为true时，Vite会修改请求的Host和Origin头部
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求的路径，移除前缀
      },
      // 你可以添加更多的代理规则
    },
  },
  plugins: [
    vue(),
    // vueDevTools(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

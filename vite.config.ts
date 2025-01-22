import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 设置打包路径
  server: {
    host: '0.0.0.0', // 开发服务器的主机名
    // port: 9090, // 开发服务器的端口号
    open: true, // 自动打开浏览器窗口
    proxy: {
      '/api': { // 代理规则的前缀路径
        // target: 'http://192.168.2.11:88/api', // 家智
        target: 'http://8.138.118.78:18080', // 家智
        changeOrigin: true, // 是否改变源，设置为true时，Vite会修改请求的Host和Origin头部
        rewrite: (path: string) => path.replace(/^\/api/, ''), // 重写请求的路径，移除前缀
      },
    },
    hmr: true, // 启用热模块替换
    cors: true, // 允许跨域
  },
  build: {
    outDir: 'dist', // 打包输出目录
    sourcemap: false, // 不生成 source map 文件（生产环境建议关闭）
    assetsDir: 'assets', // 静态资源存放目录
    minify: 'terser', // 使用 terser 进行代码压缩
    terserOptions: {
      compress: {
        drop_console: true, // 移除 console.log
        drop_debugger: true, // 移除 debugger
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

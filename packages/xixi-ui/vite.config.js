/*
 * @Author: liuss7 976344695@qq.com
 * @Date: 2024-11-25 16:19:39
 * @LastEditors: liuss7 976344695@qq.com
 * @LastEditTime: 2024-11-25 16:46:52
 * @FilePath: /xix-cli/packages/xixi-ui/ vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
const rollupOptions = {

  external: ["vue", "vue-router"],
  output: {
    globals: {
      vue: "Vue",
    },
  },
};
// https://vitejs.dev/config/

export default defineConfig({
  rollupOptions,
  minify: false,
  lib: {
    entry: "./src/entry.js",
    name: "XIXIUI",
    fileName: "xixi-ui",
    // 导出模块格式
    formats: ["esm", "umd", "iife"],
  },

  plugins: [
    vue(),    // 添加JSX插件
    vueJsx()],
});
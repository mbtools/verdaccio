// vitest.config.mjs
import react from "file:///C:/Github/%7Everdaccio/verdaccio/node_modules/.pnpm/@vitejs+plugin-react@5.0.4__a6cfb10fcbc5e4a1ea14737605075ded/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "node:path";
import { plugin as markdown } from "file:///C:/Github/%7Everdaccio/verdaccio/node_modules/.pnpm/vite-plugin-markdown@2.2.0__f03581ab9535041421b723e4531bee24/node_modules/vite-plugin-markdown/dist/index.js";
import { defineConfig } from "file:///C:/Github/%7Everdaccio/verdaccio/node_modules/.pnpm/vitest@3.2.4_@types+debug@4_aa22ac6714e93ccca813de7a92a2de9c/node_modules/vitest/dist/config.js";
var __vite_injected_original_dirname = "C:\\Github\\~verdaccio\\verdaccio\\packages\\plugins\\ui-theme";
var vitest_config_default = defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest/setup.ts"],
    exclude: ["node_modules", "./build/"],
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true
    },
    assetsInclude: ["**/*.md"],
    alias: {
      // https://github.com/vitest-dev/vitest/issues/5664#issuecomment-2093986338
      "@emotion/react": path.resolve("node_modules/@emotion/react/dist/emotion-react.cjs.mjs")
    }
  },
  plugins: [
    markdown(),
    react({
      babel: {
        plugins: ["@emotion"]
      }
    })
  ],
  resolve: {
    alias: {
      "verdaccio-ui/utils": path.resolve(__vite_injected_original_dirname, "./src/utils")
    }
  }
});
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy5tanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxHaXRodWJcXFxcfnZlcmRhY2Npb1xcXFx2ZXJkYWNjaW9cXFxccGFja2FnZXNcXFxccGx1Z2luc1xcXFx1aS10aGVtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcR2l0aHViXFxcXH52ZXJkYWNjaW9cXFxcdmVyZGFjY2lvXFxcXHBhY2thZ2VzXFxcXHBsdWdpbnNcXFxcdWktdGhlbWVcXFxcdml0ZXN0LmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L0dpdGh1Yi8lN0V2ZXJkYWNjaW8vdmVyZGFjY2lvL3BhY2thZ2VzL3BsdWdpbnMvdWktdGhlbWUvdml0ZXN0LmNvbmZpZy5tanNcIjtpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCB7IHBsdWdpbiBhcyBtYXJrZG93biB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1hcmtkb3duJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICB0ZXN0OiB7XG4gICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBzZXR1cEZpbGVzOiBbJy4vdml0ZXN0L3NldHVwLnRzJ10sXG4gICAgZXhjbHVkZTogWydub2RlX21vZHVsZXMnLCAnLi9idWlsZC8nXSxcbiAgICBzbmFwc2hvdEZvcm1hdDoge1xuICAgICAgZXNjYXBlU3RyaW5nOiB0cnVlLFxuICAgICAgcHJpbnRCYXNpY1Byb3RvdHlwZTogdHJ1ZSxcbiAgICB9LFxuICAgIGFzc2V0c0luY2x1ZGU6IFsnKiovKi5tZCddLFxuICAgIGFsaWFzOiB7XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdml0ZXN0LWRldi92aXRlc3QvaXNzdWVzLzU2NjQjaXNzdWVjb21tZW50LTIwOTM5ODYzMzhcbiAgICAgICdAZW1vdGlvbi9yZWFjdCc6IHBhdGgucmVzb2x2ZSgnbm9kZV9tb2R1bGVzL0BlbW90aW9uL3JlYWN0L2Rpc3QvZW1vdGlvbi1yZWFjdC5janMubWpzJyksXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIG1hcmtkb3duKCksXG4gICAgcmVhY3Qoe1xuICAgICAgYmFiZWw6IHtcbiAgICAgICAgcGx1Z2luczogWydAZW1vdGlvbiddLFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAndmVyZGFjY2lvLXVpL3V0aWxzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3V0aWxzJyksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnWCxPQUFPLFdBQVc7QUFDbFksT0FBTyxVQUFVO0FBQ2pCLFNBQVMsVUFBVSxnQkFBZ0I7QUFDbkMsU0FBUyxvQkFBb0I7QUFIN0IsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyx3QkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLElBQ0osYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsWUFBWSxDQUFDLG1CQUFtQjtBQUFBLElBQ2hDLFNBQVMsQ0FBQyxnQkFBZ0IsVUFBVTtBQUFBLElBQ3BDLGdCQUFnQjtBQUFBLE1BQ2QsY0FBYztBQUFBLE1BQ2QscUJBQXFCO0FBQUEsSUFDdkI7QUFBQSxJQUNBLGVBQWUsQ0FBQyxTQUFTO0FBQUEsSUFDekIsT0FBTztBQUFBO0FBQUEsTUFFTCxrQkFBa0IsS0FBSyxRQUFRLHdEQUF3RDtBQUFBLElBQ3pGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsTUFBTTtBQUFBLE1BQ0osT0FBTztBQUFBLFFBQ0wsU0FBUyxDQUFDLFVBQVU7QUFBQSxNQUN0QjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLHNCQUFzQixLQUFLLFFBQVEsa0NBQVcsYUFBYTtBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

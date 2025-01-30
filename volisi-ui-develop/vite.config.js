import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    envDir: "env",
    define: {
      // "process.env.NODE_ENV": JSON.stringify(mode),
      "import.meta.env.DEV": mode === "development",
      "import.meta.env.PROD": mode === "production",
      "import.meta.env.QA": mode === "qa",
    },
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "./src"),
    //   },
    // },
  };
});

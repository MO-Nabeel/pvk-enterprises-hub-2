import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Plugin to handle non-existent PWA entry point requests
const pwaEntryPointPlugin = (): Plugin => {
  return {
    name: "pwa-entry-point-handler",
    enforce: "pre", // Run before other plugins
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.includes("@vite-plugin-pwa/pwa-entry-point-loaded")) {
          res.writeHead(200, { 
            "Content-Type": "application/javascript",
            "Cache-Control": "no-cache"
          });
          res.end(`
export function registerDevSW() {
  // PWA plugin not installed - no-op function
}
export default {
  registerDevSW
};`);
          return;
        }
        next();
      });
    },
    resolveId(id) {
      if (id.includes("@vite-plugin-pwa/pwa-entry-point-loaded")) {
        return id;
      }
      return null;
    },
    load(id) {
      if (id.includes("@vite-plugin-pwa/pwa-entry-point-loaded")) {
        return `
export function registerDevSW() {
  // PWA plugin not installed - no-op function
}
export default {
  registerDevSW
};`;
      }
      return null;
    },
  };
};

export default defineConfig({
  plugins: [react(), pwaEntryPointPlugin()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  server: {
    port: 8080,
    strictPort: false
  }
});

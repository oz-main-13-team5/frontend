import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  const forceHttp = process.env.FORCE_HTTP === "true";

  const keyPath = path.resolve(__dirname, "localhost-key.pem");
  const certPath = path.resolve(__dirname, "localhost.pem");

  const hasHttpsCerts = fs.existsSync(keyPath) && fs.existsSync(certPath);

  const useHttps = !forceHttp && hasHttpsCerts;

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: isDev
      ? {
          host: "localhost",
          port: 5173,
          ...(useHttps
            ? {
                https: {
                  key: fs.readFileSync(keyPath),
                  cert: fs.readFileSync(certPath),
                },
              }
            : {}),
        }
      : undefined,
  };
});

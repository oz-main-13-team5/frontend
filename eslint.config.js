import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // ✅ ESLint가 무시해야 할 전역 디렉토리
  globalIgnores(["dist", "build", "node_modules", ".next"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    // ✅ 구성 확장
    extends: [
      js.configs.recommended, // 기본 JS 추천 규칙
      ...tseslint.configs.recommended, // TypeScript 추천 규칙
      prettier, // 🔥 Prettier와 충돌하는 ESLint 규칙 비활성화
    ],

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      tailwindcss,
    },

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.browser,
        React: "readonly",
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      react: {
        version: "detect", // React 버전 자동 감지
      },
    },

    rules: {
      // ✅ React 관련
      "react/react-in-jsx-scope": "off", // Next.js, Vite 환경에서는 필요 없음
      "react/prop-types": "off",

      // ✅ React Hooks 관련
      ...reactHooks.configs["recommended-latest"].rules,

      // ✅ React Refresh 관련
      ...reactRefresh.configs.vite.rules,

      // ✅ TailwindCSS 플러그인 권장 규칙
      ...tailwindcss.configs.recommended.rules,

      // ✅ 코드 스타일 (Prettier가 담당하므로 충돌 방지)
      "prettier/prettier": "off",
    },
  },
]);

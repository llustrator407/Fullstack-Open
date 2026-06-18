import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["dist/", "node_modules/"]
  },
  {
    languageOptions: { 
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": "off",
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
    }
  }
];
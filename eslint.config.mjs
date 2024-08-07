import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Asegúrate de importar correctamente el plugin
import tsParser from "@typescript-eslint/parser"; // Asegúrate de importar el parser de TypeScript

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser, // Configura el parser de TypeScript
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error', // Agrega la regla que prohíbe el uso de `any`

    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
];

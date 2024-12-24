import vue from "eslint-plugin-vue";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";

export default [
  {
    files: ["**/*.{js,ts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser, // Déléguez le parsing des blocs <script> à @typescript-eslint/parser
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs["recommended"].rules,
      ...vue.configs["vue3-recommended"].rules,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "vue/script-setup-uses-vars": "error",
      "vue/no-redundant-lang-attr": "off", // Permet l'usage de lang si nécessaire
    },
  },
];

**Purpose:**  
This document describes the development environment, linting, and formatting configuration used for this project.  
It is intended for internal reference only and should **not** be committed to public repositories.

---

## ⚙️ Development Stack

- **TypeScript + React (Vite)**
- **ESLint 9+ (Flat Config)**
- **Prettier** for code formatting
- **VS Code** for IDE integration and on-save enforcement

---

## 🧠 ESLint Configuration (Flat Config for ESLint 9+)

### 📄 `eslint.config.js`
Located in the `frontend/` directory:

```js
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "prettier/prettier": [
        "warn",
        {
          singleQuote: false,
          semi: true,
          tabWidth: 2,
          trailingComma: "es5",
          endOfLine: "auto",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"]],
          "newlines-between": "always",
        },
      ],
    },
  },
  prettierConfig,
];
```
## The VS Code Settings JSON config for the workspace are as follows

```js
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}

```

---

## Additional npm run tools were added as follows:
### Focus on the lint - check entries in the json

```js
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",

  "lint": "eslint src --ext .ts,.tsx",
  "lint:fix": "eslint src --ext .ts,.tsx --fix",
  "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",

  "check:lint": "eslint src --ext .ts,.tsx",
  "check:format": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
  "check": "npm run check:lint && npm run check:format",

  "fix": "npm run lint:fix && npm run format"
}

```
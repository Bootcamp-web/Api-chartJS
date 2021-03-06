module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  "rules": {
		"quotes": ["error", "double"],
		"no-console": "off",
		"indent": ["error", "tab"],
		"allowIndentationTabs": true
	}
};

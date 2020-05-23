module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    DEV: true,
    WECHAT: true,
    ALIPAY: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2], // 强制使用一致的缩进
    // 'linebreak-style': ['error', 'unix'], // 强制使用一致的换行风格
    'quotes': ['error', 'single'], // 强制使用一致的反勾号、双引号或单引号(backtick、double、single)
    'semi': [0, 'always'], // 要求或禁止使用分号而不是 ASI
    'no-console': ['off', {'allow': ['log', 'warn', 'error', 'info']}], // 'allow' 是个字符串数组，包含允许使用的console 对象的方法
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'], // 禁止空格和 tab 的混合缩进
    'space-before-function-paren': [2, 'always'], // 强制在 function的左括号之前使用一致的空格
    'block-spacing': [1, 'never'], // 禁止或强制在单行代码块中使用空格(禁用)
    'no-trailing-spaces': 2, // 禁用行尾空格
    'no-case-declarations': ['warn'], //禁止词法声明 (let、const、function 和 class) 出现在 case或default 子句中
  },
};

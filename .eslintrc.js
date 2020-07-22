
module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    // "plugin:vue/essential",
    "plugin:vue/recommended",

    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  /**
   * "off"或者0    //关闭规则关闭
   * "warn"或者1    //在打开的规则作为警告（不影响退出代码）
   * "error"或者2    //把规则作为一个错误（退出代码触发时为1）
   */
  "rules": {
    'arrow-parens': 0,
    "no-console": process.env.NODE_ENV === "production" ? "off" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "off" : "off",
    "vue/no-unused-components": "off",
    "no-unused-vars": "off",
    "vue/no-unused-vars": "off",
    "vue/no-side-effects-in-computed-properties": "off",
    "vue/require-prop-types": "off",
    "no-undef": "off",


  },

}

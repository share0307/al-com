module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    ["import", {
      "libraryName": "mand-mobile",
      "libraryDirectory": "components"
    }],
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    },'vant']
  ]
}

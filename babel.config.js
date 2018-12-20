module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    ["import", {
      "libraryName": "mand-mobile",
      "libraryDirectory": "components"
    },'mand-mobile'],
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    },'vant']
  ]
}

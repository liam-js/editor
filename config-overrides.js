// https://zhuanlan.zhihu.com/p/96103181
const { override, overrideDevServer } = require('customize-cra');

const multipleEntry = require('react-app-rewire-multiple-entry')(
  [
    // {
    //   entry: 'src/index.js',
    //   template: 'public/index.html',
    //   outPath: '/index.html',
    // },
    {
      entry: 'src/pages/preview.js',
      template: 'public/preview.html',
      outPath: '/preview.html',
    },
    {
      entry: 'src/pages/demos.js',
      template: 'public/demos.html',
      outPath: '/demos.html',
    },
  ]
);

const isEnvProduction = process.env.NODE_ENV === "production";


module.exports = {
  webpack: override(function(config){
    multipleEntry.addMultiEntry(config);

    // config.plugins.filter(function (plugin) {

    //   if(plugin.constructor.name === 'InterpolateHtmlPlugin'){
    //     console.log(plugin);
    //     plugin.userOptions.replacements. = process.env.PUBLIC_URL;
        
    //   }
    // });
    
    // 删除默认的入口
    // delete config.entry.main;

    setTimeout(function(){
      console.log(config);
    },3e3);
    return config;
  }),
  devServer: overrideDevServer(function(config){
    setTimeout(function(){
      console.log(config);
    },4e3);
    return config;
  })
}
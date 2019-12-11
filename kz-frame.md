# kz-frame 接入 create react app(CRA) 项目

kz-frame 使用了 kui, kui 采用了非dist发布, 直接发布源代码, 需要使用端配置好 webpack 才行.

## customize-cra

- [API](https://github.com/arackaf/customize-cra/blob/master/api.md)


```js
// config-overrides.js

// https://www.jianshu.com/p/c057965a1a0c
// customize-cra文档里虽然有 addWebpackModuleRule, 但是实际上却找不到
// 只能自己写一个
function addWebpackModuleRule(rule) {
  return function(config, env) {
    config.module.rules.push(rule)
    return config
  }
}

module.exports = override(
  addWebpackModuleRule({
    test: /\.js$/,
    include: [
        path.resolve("./node_modules/@kuaizhan/kui"),
        path.resolve("./node_modules/@kuaizhan/kz-frame"),
    ],
    loaders: [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/react', '@babel/preset-env'] // 采用babel7
            }
        }
    ],
  })
);
```

## ts support

kz-frame 原项目不支持 typescript

方案一: add global.d.ts
```ts
// global.d.ts
// TODO update to @kuaizhan.kz-frame
declare module '@kuaizhan/kz-frame';
declare module '@kuaizhan/kz-frame/modules/header';
declare module '@kuaizhan/kz-frame/passport/reducers';
declare module '@kuaizhan/kz-frame/modules/header/reducers';
```

方案二: 给 kz-frame 推荐类型声明 使之支持 ts

- [dts-gen](https://github.com/Microsoft/dts-gen) 这个对于kz-frame不好使

收到把 global.d.ts 里的移到 @kuaizhan/kz-frame/components/index.d.ts(入口js所在目录)
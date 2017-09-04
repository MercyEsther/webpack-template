## Webpack-template
***

## 创建package.json并安装需要的模块

  - 命令行在项目根目录 ``> npm init``，该操作将创建package.json文件
  - 安装需要的模块。
    - 命令行输入``> npm install --save-dev react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react style-loader css-loader postcss-loader babel-plugin-import webpack webpack-dev-server autoprefixer precss``
    - 命令行输入``> npm install -S antd``, 之后将devDependencies下的react和react-dom项复制到dependencies下


```json
{
  "name": "webpack-template",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "antd": "^2.13.0",
    "react": "^15.6.1",
    "react-dom": "^15.6.1"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.3",
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-import": "^1.4.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^0.28.7",
    "extract-text-webpack-plugin": "^3.0.0",
    "postcss-loader": "^2.0.6",
    "precss": "^2.0.0",
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-router": "^4.2.0",
    "react-router-dom": "^4.2.2",
    "style-loader": "^0.18.2",
    "webpack": "^3.5.5",
    "webpack-dev-server": "^2.7.1"
  }
}
```
完成后如上.

**下面来解释以下其中一些命令的含义**:
> 1. --save-dev 安装该模块后自动将其添加到package.json中的devDependencies中。devDependencies下的模块作为开发依赖，将不会被webpack打包到实际需要上线的项目中.
> 2. -S 安装该模块后自动将其添加到package.json中的dependencies中,dependencies下的模块为项目运行时需要依赖的模块.

**各模块的作用**
> 1. babel-core, babel-loader , babel-preset-es2015 , babel-preset-react 使得项目支持es6和react，用于将es6和react语法转换为浏览器能够运行的语法。
> 2. style-loader , css-loader 用于处理样式表，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
> 3. postcss-loader , autoprefixer , precss , 使项目支持postcss后处理器以及autoprefixer和precss插件。postcss的使用需要配置postcss.config.js文件
> 4. extract-text-webpack-plugin , 将项目中的css分离出来单独打包.
> 5. webpack-dev-server , 使得开发过程中能够浏览器实时预览所开发的项目
> 6. antd , 在项目中使用一些已经设计好的icon或组件 ，其中，为了使antd能够以模块的方式按需加载到项目中，需要安装babel-plugin-import模块，并配置.babelrc文件.
> 7. react-router , react-router-dom , 使项目支持react路由。

在项目根目录创建postcss.config.js
```javascript
module.exports = {
  "plugins": [
    require("autoprefixer"),
    require("precss")
  ]
}
```

在项目根目录创建.babelrc
```json
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "style": "css"
    }]
  ],
}
```

***
## 配置webpack.config.js

```javascript
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //生成source map ,为我们提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
  devtool: "eval-source-map",
  //打包的入口文件
  entry: __dirname + "/app/main.js",
  output: {
  //出口文件地址及文件名
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets:["es2015" , "react"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader"
          },{
            loader: "postcss-loader"
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ],
  //构建本地服务器配置
  devServer: {
    //提供本地服务器的文件地址
    contentBase: "./public",
    //源文件改变时自动刷新
    inline: true,
    host: '0.0.0.0',
    port: 8888
  }
}
```
***

## 开始项目开发
- 打开package.json , 更改"scripts"配置 ， 使命令行启动更加方便
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "webpack",
  "server": "webpack-dev-server --open"
}
```
- 在webpack入口处创建main.js ``./app/main.js``
- webpack出口目录创建index.html ``./public/index.html``
```html
<!Doctype>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viwport" content="width=device-width, initial-scale=1.0"/>
    <title>react-login</title>
    <!-- style -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="root"></div>

    <!-- script -->
    <script scr="bundle.js"></script>
  </body>
</html>
```

- 接下来可以在app文件下进行开发,引入模块的方式：
```javascript
import React from "react";
import ReactDOM from "react-dom";
//custom component
import App from "./component/App";
//custom style
import "./style/main.css";
```
- 使用webpack打包的方式，命令行输入 ``> npm start``
- 使用webpack-dev-server实时开发，命令行输入 ``> npm run server``

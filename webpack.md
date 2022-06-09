1. mkdir webpack-vue        <!-- 创建文件夹 --> 
2. cd webpack-vue           <!-- 进入文件 -->
3. npm init -y              <!-- 初始化package.json -->
4. npm i webpack webpack-cli -D     <!-- 将 webpack 加入到开发环境,即上线后不需要, npm i webpack webpack-cli --save-dev -->
5. mkdir webpack.config.js  <!-- 创建webpack配置文件 -->
6. 配置 mkdir webpack.config.js
```javascript
    const path = require("path");   // 引入路径库
    const pathResolve = _path => path.resolve(__dirname,_path);     // 将相对路径改为绝对路径
    module.exports = {
        mode:"development",         // 模式,可选参数 production
        entry:"./src/index.js",     // 入口
        output:{                    // 出口
            path:pathResolve("dist"),
            filename:"[name].bundle.js"
        },  
        module:{},                  // 插件 
        plugins:[],                 // 模块
    }
```
7. 创建文件
```
    -src
      -index.js
    -public
      -index.html
```
8. 添加html打包配置并初始化html
```javascript
    // 1. 安装插件
    //    npm i html-webpack-plugin -D
    // 2. 引入插件
    //    const HtmlWebpackPlugin = require("html-webpack-plugin");
    // 3. 使用插件
    //    plugins:[                   // 插件 
    //      new HtmlWebpackPlugin({
    //          template:pathResolve("./public/index.html"),
    //          title:"webpack-vue"
    //      })
    //    ],         
    // 4. 初始化html
    //    
    //    <body>
    //      <noscript>您的浏览器不支持我的脚本</noscript>
    //      <div id="app"></div>
    //    </body>  
```
9. 配置 package.json 文件打包
```javascript
    "scripts": {
        "build":"webpack build",
    },
```
10. npm run build       <!-- 进行打包 -->
11. npm install --D css-loader style-loader    <!-- 安装 css 加载器 -->
12. 使用 css 插件
```javascript
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ]
            }
        ]
    },     
```
13. npm install less less-loader --save-dev     <!-- 安装 less 加载器 -->
14. 使用 less 插件
```javascript
module:{
    rules:[
        {
            test:/\.less$/i,
            use:["style-loader","css-loader","less-loader"]
        }
    ]
}
```
15. npm i mini-css-extract-plugin -D            <!-- 安装样式压缩、优化插件 -->
    npm i -D postcss-loader                     <!-- 安装 css 兼容loader -->
    npm i -D autoprefixer                       <!-- 安装 css 兼容loader 需要的插件 -->
16. 使用 mini-css-extract-plugin 插件
```javascript
    const MiniCssExtractPlugin = require("mini-css-extract-plugin")
    module:{                    // 模块    
        rules:[
            {
                test:/\.css$/i,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader      // 使用到 style.loader 的地方换为 MiniCssExtractPlugin.loader
                    },
                    {
                        loader:"css-loader"
                    },
                    {
                        loader:'postcss-loader'
                    }
                ]
            },
            {
                test:/\.less$/i,
                use:[MiniCssExtractPlugin.loader,"css-loader","less-loader",'postcss-loader']
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "[name].[hash:8].css"
        }), 
    ]
```
17. 创建 postcss-loader 配置文件 postcss.config.js 并配置
```javascript
module.exports = {
    plugins: {
        "autoprefixer": {
            "overrideBrowserslist": [
                 "ie >= 8", // 兼容IE7以上浏览器
                 "Firefox >= 3.5", // 兼容火狐版本号大于3.5浏览器
                 "chrome  >= 35", // 兼容谷歌版本号大于35浏览器,
                 "opera >= 11.5", // 兼容欧朋版本号大于11.5浏览器
            ]
        }
    }
};
```
18. npm install clean-webpack-plugin -D         <!-- 引入插件,每次打包时清除上一次打包的插件 -->
19. 使用
```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
plugins:[
    new VueLoaderPlugin()
]

```
20. npm i webpack-dev-server -D                 <!-- 配置 dev-server -->
```javascript
    // webpack.config.js
    devServer: {
        port: 8080,     // 端口号
        hot:true,       // 热更新
        open:true       // 是否自动打开
    },
    // package.json
    "scripts": {
        "serve": "webpack server"
    }
```
21. npm install vue@next @vue/compiler-sfc -S       <!-- 安装 vue 并配置 -->
    npm i vue-loader -D
```javascript
    const { VueLoaderPlugin } = require("vue-loader");
    plugins:[
        new VueLoaderPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.vue$/i,
                use:"vue-loader"
            }
        ]
    }
```
22. npm i vue-router@next vuex@next -S             <!-- 安装 vue-router vuex -->
23. 完善目录
```javascript
    // -src
    //   -router
    //     -index.js
    //   -store
    //     -index.js
    //   -index.js
    //   -App.vue
    //   -views
    //     -home.vue

    // -src
    //   -router
    //     -index.js
    import { createRouter,createWebHistory } from "vue-router";
    const routes = [
        {
            path:"/",
            component:()=>import("@/views/home.vue")
        }
    ]
    export default createRouter({
        history:createWebHistory(),
        routes,
    })
    //   -store
    //     -index.js
    import { createStore } from "vuex";
    const store = {
        state:{},
        mutations:{},
        actions:{},
        getters:{},
        module:{}
    }
    export default createStore({
        store
    })
    //   -index.js
    import { createApp } from "vue";
    import store from "./store/index.js";
    import router from "./router/index.js"
    import App from "./App.vue";

    const app = createApp(App);
    app.use(store).use(router);

    app.mount("#app");
    //   -App.vue
    <template>
        <div id="app">
            <router-view />
        </div>
    </template>
    <script>
    export default {
        name:""
    }
    </script>
```
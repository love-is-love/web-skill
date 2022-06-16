const path = require("path");   // 引入路径库
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader");
const pathResolve = _path => path.resolve(__dirname,_path);     // 将相对路径改为绝对路径

module.exports = {
    mode:"development",         // 模式,可选参数 production
    entry:"./src/index.js",     // 入口
    output:{                    // 出口
        path:pathResolve("dist"),
        filename:"[name].bundle.js"
    },  
    resolve:{
        alias:{
            "@":pathResolve("./src")
        }
    },
    devtool:"inline-source-map",
    devServer: {
        port: 8080,
        hot:true,
        open:true,
        historyApiFallback: true,       // 保证路由history模式刷新可以找到页面
    },
    module:{                    // 模块    
        rules:[
            {
                test:/\.css$/i,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
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
            },
            {
                test:/\.vue$/i,
                use:"vue-loader"
            }
        ]
    },                  
    plugins:[                   // 插件 
        new HtmlWebpackPlugin({
            template:pathResolve("./public/index.html"),
            title:"webpack-vue"
        }),
        new MiniCssExtractPlugin({
            filename:"[name].[hash:8].css"
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],                 
}
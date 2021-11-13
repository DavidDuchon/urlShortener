const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry:'./frontendOriginal/index.js',
	output:{
		path:__dirname + '/frontend',
		filename:'index.js',
	},

	module:{
		rules:[
			{
				test:/\.js$/,
				include:path.resolve(__dirname,'frontendOriginal'),
				use:{
					loader:'babel-loader',
					options:{
						presets:['@babel/preset-env','@babel/preset-react'],
						plugins:['@babel/transform-runtime']
					}
				}
			},
			{
				test:/\.css$/,
				include:path.resolve(__dirname,'frontendOriginal'),
				use:['style-loader','css-loader'],
			}
		],
	},
	plugins:[new HtmlWebpackPlugin({
				filename:'index.html',
				template:'./frontendOriginal/index.html',
				})],
	mode:'production',

};

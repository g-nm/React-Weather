const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const webpackBundleAnalyzer =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
			{
				test: /\.s(c|a)ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{
						loader: "css-loader",
						options: { modules: true, importLoaders: 1 },
					},
					{ loader: "postcss-loader" },
					{ loader: "sass-loader" },
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
		new webpackBundleAnalyzer(),
	],
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
});

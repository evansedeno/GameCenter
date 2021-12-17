// vue.config.js
module.exports = {
	devServer: {
		disableHostCheck: true,
		proxy: "http://gamecenter.leiven.fr:3001/",
		host: 'gamecenter.leiven.fr',
		port: 80
	},
};

process.env.VUE_APP_NAME = require("./package.json").name;
process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "data/aphdf/" : "/",
    filenameHashing: false,
    // publicPath: "",
    configureWebpack: {
        devtool: process.env.NODE_ENV === "production" ? false : "source-map"
    },
    transpileDependencies: ["vuetify"]
};

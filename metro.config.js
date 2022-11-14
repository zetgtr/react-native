const { getDefaultConfig } = require("expo/metro-config");

// console.log(svg);
module.exports = (async () => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("./transformer.js"),
  };
  config.resolver = {
    ...resolver,
    sourceExts: [...resolver.sourceExts, "svg", "scss", "sass"],
  };

  return config;
})();

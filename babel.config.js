module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsImportSource: "nativewind", typescript: true }],
      "nativewind/babel",
    ],
  };
};
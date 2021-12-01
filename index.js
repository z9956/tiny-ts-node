const path = require("path");
const ts = require("typescript");
const fs = require("fs");

const filePath = process.argv[2];

require.extensions[".ts"] = (module, filename) => {
  const fileFullPath = path.resolve(__dirname, filename);
  const content = fs.readFileSync(fileFullPath, "utf8");
  const tsconfigPath = require("./tsconfig.json");

  const { outputText } = ts.transpileModule(content, {
    compilerOptions: tsconfigPath,
  });

  console.log(outputText);
  module._compile(outputText, filename);
};

require(filePath);

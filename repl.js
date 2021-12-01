const repl = require("repl");
const ts = require("typescript");
const vm = require("vm");

const r = repl.start({
  prompt: "----->",
  eval: myEval,
});

Object.defineProperty(r.context, "who", {
  configurable: false,
  enumerable: true,
  value: "9956",
});

function myEval(cmd, context, filename, callback) {
  const tsconfigPath = require("./tsconfig.json");

  const { outputText } = ts.transpileModule(cmd, {
    compilerOptions: tsconfigPath,
  });

  const res = vm.runInContext(outputText, r.context);
  callback(null, res);
}

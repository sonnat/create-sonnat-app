const cpy = require("cpy");
const path = require("path");

void (async () => {
  await cpy("**", path.join(__dirname, "lib", "templates"), {
    parents: true,
    cwd: path.join(__dirname, "templates")
  });
})();

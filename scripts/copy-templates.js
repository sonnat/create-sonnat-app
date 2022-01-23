const cpy = require("cpy");
const path = require("path");

const dest = path.join(process.cwd(), "lib");

void (async () => {
  await cpy("**", path.join(dest, "templates"), {
    parents: true,
    cwd: path.join(process.cwd(), "templates")
  });
})();

const cpy = require("cpy");
const path = require("path");

const dest = path.join(__dirname, "lib");

void (async () => {
  await cpy("**", path.join(dest, "templates"), {
    parents: true,
    cwd: path.join(__dirname, "templates")
  });

  await cpy(["LICENSE", "README.md"], dest);
})();

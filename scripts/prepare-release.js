const cpy = require("cpy");
const path = require("path");
const fs = require("fs");

const dest = path.join(process.cwd(), "lib");

void (async () => {
  await cpy(["LICENSE", "README.md"], dest);

  const packageJson = require(path.join(dest, "package.json"));

  fs.writeFileSync(
    path.join(dest, "package.json"),
    JSON.stringify(
      { ...packageJson, bin: { [packageJson.name]: "./index.js" } },
      null,
      2
    )
  );
})();

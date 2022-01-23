import fs from "fs";

const makeDirectory = (root: string, options = { recursive: true }) =>
  fs.promises.mkdir(root, options);

export default makeDirectory;

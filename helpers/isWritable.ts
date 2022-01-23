import fs from "fs";

const isWritable = async (path: string): Promise<boolean> => {
  try {
    await fs.promises.access(path, (fs.constants || fs).W_OK);
    return true;
  } catch {
    return false;
  }
};

export default isWritable;

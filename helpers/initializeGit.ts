import {
  execSync,
  type ExecSyncOptionsWithBufferEncoding
} from "child_process";
import path from "path";
import rimraf from "rimraf";

const isInGitRepository = (): boolean => {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch {
    // Ignore
  }
  return false;
};

const isInMercurialRepository = (): boolean => {
  try {
    execSync("hg --cwd . root", { stdio: "ignore" });
    return true;
  } catch {
    // Ignore
  }
  return false;
};

const initializeGit = (root: string): boolean => {
  const execOption: ExecSyncOptionsWithBufferEncoding = { stdio: "ignore" };

  let didInit = false;

  try {
    execSync("git --version", execOption);
    if (isInGitRepository() || isInMercurialRepository()) return false;

    execSync("git init", execOption);
    didInit = true;

    execSync("git checkout -b main", execOption);

    execSync("git add -A", execOption);
    execSync(
      'git commit -m "Initial commit from Create Sonnat App"',
      execOption
    );

    return true;
  } catch {
    if (didInit) {
      try {
        rimraf.sync(path.join(root, ".git"));
      } catch {
        // Ignore
      }
    }

    return false;
  }
};

export default initializeGit;

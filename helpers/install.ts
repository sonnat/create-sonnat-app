/* eslint-disable no-console */
import spawn from "cross-spawn";

interface InstallArgs {
  /**
   * Indicate whether to install packages using Yarn.
   */
  useYarn: boolean;
  /**
   * Indicate whether the given dependencies are devDependencies.
   */
  devDependencies?: boolean;
}

const install = (
  root: string,
  dependencies: string[] = [],
  { useYarn, devDependencies = false }: InstallArgs
): Promise<void> => {
  const npmFlags: string[] = [];
  const yarnFlags: string[] = [];

  const pkgCmd = useYarn ? "yarnpkg" : "npm";

  return new Promise((resolve, reject) => {
    let args: string[] = [];

    if (dependencies.length) {
      if (useYarn) {
        args = ["add", "--exact", "--cwd", root];
        devDependencies && args.push("--dev");
      } else {
        args = ["install", "--save-exact"];
        args.push(devDependencies ? "--save-dev" : "--save");
      }
      args.push(...dependencies);
    } else args = ["install"];

    if (useYarn) args.push(...yarnFlags);
    else args.push(...npmFlags);

    const childProcess = spawn(pkgCmd, args, {
      stdio: "inherit",
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" }
    });

    childProcess.on("close", code => {
      if (code !== 0) {
        reject({ command: `${pkgCmd} ${args.join(" ")}` });
        return;
      }
      resolve(void 0);
    });
  });
};

export default install;

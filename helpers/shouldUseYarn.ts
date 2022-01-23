import { execSync } from "child_process";

const shouldUseYarn = (): boolean => {
  const userAgent = process.env.npm_config_user_agent;

  if (userAgent) return Boolean(userAgent.startsWith("yarn"));

  try {
    execSync("yarnpkg --version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

export default shouldUseYarn;

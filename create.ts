import chalk from "chalk";
import cpy from "cpy";
import fs from "fs";
import os from "os";
import path from "path";
import {
  initializeGit,
  install,
  isEmptyDirectory,
  isWritable,
  logger,
  makeDirectory,
  shouldUseYarn
} from "./helpers";

export type TemplatesIds = "nextjs" | "cra";

type Templates = readonly { id: TemplatesIds; title: string }[];

interface Configuration {
  useNpm: boolean;
  typescript: boolean;
  template: TemplatesIds;
}

const { log, error, newLine } = logger;

export const validTemplates: Templates = [
  { id: "nextjs", title: "NextJS" },
  { id: "cra", title: "CRA (create-react-app)" }
] as const;

const createNextJsProject = (typescript: boolean) => {
  const scripts = {
    dev: "next dev",
    build: "next build",
    start: "next start"
  };

  const dependencies = [
    "@sonnat/ui",
    "@sonnat/icons",
    "react",
    "react-dom",
    "next"
  ];

  const devDependencies = [
    "eslint",
    "eslint-config-next",
    "eslint-config-prettier",
    "eslint-plugin-import",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks"
  ];

  if (typescript) {
    devDependencies.push(
      "typescript",
      "@types/node",
      "@types/react",
      "@types/react-dom",
      "@typescript-eslint/parser",
      "@typescript-eslint/eslint-plugin"
    );
  }

  return { devDependencies, dependencies, scripts };
};

const createCraProject = (typescript: boolean) => {
  const scripts = {
    start: "react-scripts start",
    build: "react-scripts build"
  };

  const dependencies = [
    "@sonnat/ui",
    "@sonnat/icons",
    "react",
    "react-dom",
    "react-scripts"
  ];

  const devDependencies = ["prettier", "eslint-config-prettier"];

  if (typescript) {
    devDependencies.push(
      "typescript",
      "@types/node",
      "@types/react",
      "@types/react-dom"
    );
  }

  return { devDependencies, dependencies, scripts };
};

const packageCommands = (
  template: TemplatesIds
): Record<string, string> | null => {
  switch (template) {
    case "cra": {
      return {
        start: "Starts the development server.",
        build: "Bundles the app into static files for production.",
        startWith: "start"
      };
    }
    case "nextjs": {
      return {
        dev: "Starts the development server.",
        build: "Builds the app for production.",
        start: "Runs the built app in production mode.",
        startWith: "dev"
      };
    }
    default: {
      return null;
    }
  }
};

const createApp = async (
  appPath: string,
  { useNpm, typescript, template }: Configuration
) => {
  const root = path.resolve(appPath);
  const templatePath = `templates/${template}/${
    typescript ? "typescript" : "default"
  }`;

  if (!(await isWritable(path.dirname(root)))) {
    error(
      "The application path is not writable, please check directory permissions and try again."
    );
    error("It is likely you do not have write permissions for this directory.");
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDirectory(root);
  if (!isEmptyDirectory(root, appName)) process.exit(1);

  const create = template === "nextjs" ? createNextJsProject : createCraProject;

  const useYarn = useNpm ? false : shouldUseYarn();
  const originalDirectory = process.cwd();

  const displayedCmd = useYarn ? "yarn" : "npm";
  log(`Creating a new sonnat app in ${chalk.green(root)}.`);
  newLine();

  process.chdir(root);

  log(chalk.bold(`Using ${displayedCmd}.`));

  const { dependencies, devDependencies, scripts } = create(typescript);

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts,
    browserslist: {
      production: [">0.2%", "not dead", "not op_mini all"],
      development: [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  };

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  if (dependencies.length) {
    newLine();
    log("Installing dependencies:");
    dependencies.forEach(dep => log(`- ${chalk.cyan(dep)}`));
    newLine();

    await install(root, dependencies, { useYarn });
  }

  if (devDependencies.length) {
    newLine();
    log("Installing devDependencies:");
    devDependencies.forEach(dep => log(`- ${chalk.cyan(dep)}`));
    newLine();

    await install(root, devDependencies, {
      useYarn,
      devDependencies: true
    });
  }

  await cpy("**", root, {
    parents: true,
    cwd: path.join(__dirname, templatePath),
    rename: name => {
      switch (name) {
        case "gitignore":
        case "prettierrc":
        case "eslintrc":
          return `.${name}`;
        default:
          return name;
      }
    }
  });

  if (initializeGit(root)) {
    log("Initialized a git repository.");
    newLine();
    log(
      "Created git commit with 'Initial commit from Create Sonnat App' message."
    );
    newLine();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else cdpath = appPath;

  const cmds = packageCommands(template);

  log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);

  if (!cmds) return;

  log("Inside that directory, you can run several commands:");
  newLine();

  Object.keys(cmds).forEach(cmd => {
    if (cmd === "startWith") return;

    log(chalk.cyan(`  ${displayedCmd} ${useYarn ? "" : "run "}${cmd}`));
    log(`    ${cmds[cmd]}`);
    newLine();
  });

  log("We suggest that you begin by typing:");
  newLine();

  log(chalk.cyan("  cd"), cdpath);
  log(
    `  ${chalk.cyan(
      `${displayedCmd} ${useYarn ? "" : "run "}${cmds.startWith}`
    )}`
  );
  newLine();
};

export default createApp;

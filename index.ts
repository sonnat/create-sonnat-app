#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import chalk from "chalk";
import { Command } from "commander";
import path from "path";
import prompts from "prompts";
import checkForUpdate from "update-check";
import createApp, { validTemplates, type TemplatesIds } from "./create";
import { logger, shouldUseYarn, validateName } from "./helpers";
import packageJson from "./package.json";

interface Options {
  template: TemplatesIds;
  useNpm: boolean;
  typescript: boolean;
}

const { log, error, newLine } = logger;

let projectPath: string | undefined;
let projectTemplate: string | undefined;

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory> <template>")
  .usage(
    [
      `${chalk.green("<project-directory> <template>")} [options]`,
      `(valid templates: ${chalk.green(
        validTemplates.map(vt => vt.id).join(", ")
      )})`
    ].join("\n")
  )
  .action((name?: string, template?: string) => {
    projectPath = name;
    projectTemplate = template;
  })
  .option("--ts, --typescript", "initialize as a TypeScript project.", false)
  .option(
    "--use-npm",
    "explicitly tell the CLI to bootstrap the app using npm.",
    false
  )
  .parse(process.argv);

const run = async () => {
  projectPath = projectPath?.trim();

  if (!projectPath) {
    const answer = await prompts({
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-sonnat-app",
      validate: (name: string) => {
        const validation = validateName(path.basename(path.resolve(name)));

        if (validation.valid) return true;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return "Invalid project name: " + validation.problems![0];
      }
    });

    if (typeof answer.path === "string") projectPath = answer.path.trim();
  }

  if (!projectPath) {
    newLine();
    log("Please specify the project directory:");
    log(
      `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
    );
    newLine();
    log("For example:");
    log(`  ${chalk.cyan(program.name())} ${chalk.green("my-sonnat-app")}`);
    newLine();
    log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateName(projectName);

  if (!valid) {
    error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`
      )} because of npm naming restrictions:`
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    problems!.forEach(p => error(`    ${chalk.red.bold("*")} ${p}`));
    process.exit(1);
  }

  const invalidTemplate =
    !projectTemplate ||
    !validTemplates.some(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      template => template.id === projectTemplate!.toLowerCase()
    );

  if (invalidTemplate) {
    newLine();
    log("You haven't specified a valid template.");

    const answer = await prompts({
      type: "select",
      name: "template",
      message: "Choose your template:",
      choices: validTemplates.map(template => ({ title: template.title }))
    });

    projectTemplate = validTemplates[<number>answer.template].id;
    program.setOptionValue("template", projectTemplate);
  } else {
    projectTemplate = validTemplates.find(
      t => t.id === projectTemplate!.toLowerCase()
    )!.id;
    program.setOptionValue("template", projectTemplate);
  }

  const { useNpm, typescript, template } = program.opts<Options>();

  await createApp(resolvedProjectPath, { useNpm, typescript, template });
};

const notifyUpdate = async () => {
  try {
    const update = await checkForUpdate(packageJson);

    if (update?.latest) {
      newLine();
      log(
        chalk.yellow.bold("A new version of `create-sonnat-app` is available!")
      );
      log(
        "You can update by running: " +
          chalk.cyan(
            shouldUseYarn()
              ? "yarn global add create-sonnat-app"
              : "npm i -g create-sonnat-app"
          )
      );
    }
    process.exit(0);
  } catch {
    // Ignore
  }
};

void (async () => {
  try {
    await run();
  } catch (reason) {
    newLine();
    log("Aborting installation.");

    if ((<{ command?: string }>reason).command) {
      log(`  ${chalk.cyan((<{ command: string }>reason).command)} has failed.`);
    } else {
      log(chalk.red("Unexpected error. Please report it as a bug:"));
      log(reason);
    }
  } finally {
    await notifyUpdate();
    process.exit(1);
  }
})();

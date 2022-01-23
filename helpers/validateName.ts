import validateNpmPackageName from "validate-npm-package-name";

const validateName = (name: string) => {
  const validation = validateNpmPackageName(name);

  if (validation.validForNewPackages) return { valid: true };

  return {
    valid: false,
    problems: [...(validation.errors || []), ...(validation.warnings || [])]
  };
};

export default validateName;

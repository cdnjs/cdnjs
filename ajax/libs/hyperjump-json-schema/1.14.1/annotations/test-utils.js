export const isCompatible = (compatibility, versionUnderTest) => {
  if (compatibility === undefined) {
    return true;
  }

  const constraints = compatibility.split(",");
  for (const constraint of constraints) {
    const matches = /(?<operator><=|>=|=)?(?<version>\d+)/.exec(constraint);
    if (!matches) {
      throw Error(`Invalid compatibility string: ${compatibility}`);
    }

    const operator = matches[1] ?? ">=";
    const version = parseInt(matches[2], 10);

    switch (operator) {
      case ">=":
        if (versionUnderTest < version) {
          return false;
        }
        break;
      case "<=":
        if (versionUnderTest > version) {
          return false;
        }
        break;
      case "=":
        if (versionUnderTest !== version) {
          return false;
        }
        break;
      default:
        throw Error(`Unsupported contraint operator: ${operator}`);
    }
  }

  return true;
};

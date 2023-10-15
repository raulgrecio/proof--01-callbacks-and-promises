import fs from "node:fs";

export function config({ path = ".env" } = {}) {
  let file;
  try {
    file = fs.readFileSync(path, "utf-8");
  } catch (error) {
    //console.error(error)
    return;
  }

  const lines = file.split("\n");

  lines.forEach((line) => {
    const [key, ...value] = line.split("=");
    const joinValue = value.join("=");

    const hasQuotes = joinValue.startsWith('"') && joinValue.endsWith('"');

    const valueToStore = hasQuotes ? joinValue.slice(1, -1) : joinValue;
    process.env[key] = valueToStore;
  });
}

const dotenv = {
  config,
};

export default dotenv;

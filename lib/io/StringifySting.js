import * as fs from "fs";

export async function StringifyString(FileData, FilePath) {
  fs.writeFileSync(FilePath, FileData, "utf-8");
  return;
}

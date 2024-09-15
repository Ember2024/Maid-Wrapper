import * as fs from "fs";
import { ParseString } from "./ParseString.js";

export async function CountProcess(FilePath, Name, ID, Count, IsLike) {
  let FileData = await ParseString(FilePath);
  for (let Key in FileData) {
    if (Name === FileData[Key].Name) {
      FileData[Key].Count = IsLike
        ? FileData[Key].Count + Count
        : FileData[Key].Count === 0
        ? FileData[Key].Count
        : FileData[Key].Count - Count;
      fs.writeFileSync(FilePath, JSON.stringify(FileData));
      return IsLike ? FileData[Key].Count - Count : FileData[Key].Count;
    }
  }
  if (IsLike) {
    FileData.push({ Name: Name, ID: ID, Count: Count });
    fs.writeFileSync(FilePath, JSON.stringify(FileData));
  }
  return IsLike ? 0 : Count;
}

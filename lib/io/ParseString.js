import * as fs from "fs";

export async function ParseString(FilePath) {
    const FileData = fs.readFileSync(FilePath, "utf-8");
    const JsonData = JSON.parse(FileData);
    return JsonData;
}

import * as fs from "fs";

export async function Init(PathName) {
  const FilesName = [
    "ServerLikeCount",
    "PersonalPageLikeCount",
    "HomeLikeCount",
    "PersonalPageViewCount",
    "HomeViewCount",
    "ServerListData",
    "UserData",
    "ScanServerUserData",
    "GetInfoUserData",
    "BoomServerPasswordUserData",
    "BotUserData",
    "APIUserData",
    "TestUserData",
  ];
  FilesName.forEach((FileName) => {
    const FilePath = `${PathName}\\${FileName}.json`;
    if (!fs.existsSync(FilePath)) {
      fs.writeFileSync(FilePath, "[]");
    }
  });
}

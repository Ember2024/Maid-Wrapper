//自定义状态码
//100001 : 网络异常

import * as maid from "maid-js";
import { x19, io } from "./lib/index.js";

async function Test() {
  await io.Init("./config");
  const TestAccount = await io.ParseString("./config/UserData.json");
  const client = new maid.MaidClient({
    logLevel: false,
    mpayDumpData: TestAccount[0],
  });
  await x19.Login(client);
  const LoginAccountInfo = await x19.GetLoginAccountInfo(client);
  const ServerList = await x19.GetServerList(client, 0);
  const ServerInfo = await x19.GetServerInfo(client, 96078871);
  const ServerIPResponse = await x19.GetServerIP(client, ServerInfo.ID);
  const UserInfo = await x19.GetUserInfo(client, "夜白asm");
  const PersonalPageInfo = await x19.GetPersonalPageInfo(client, UserInfo.ID);
  const HomeInfo = await x19.GetHomeInfo(client, UserInfo.ID);
  const ResourceInfo = await x19.GetResourceInfo(client, "加速火把");
  const ServerLikeResponse = await x19.ServerLike(client, ServerInfo.ID, true);
  const PersonalPageViewResponse = await x19.PersonalPageView(
    client,
    UserInfo.ID
  );
  const PersonalPageLikeResponse = await x19.PersonalPageLike(
    client,
    LoginAccountInfo.ID,
    UserInfo.ID,
    true
  );
  const HomeViewResponse = await x19.HomeView(client, UserInfo.ID);
  const HomeLikeResponse = await x19.HomeLike(client, UserInfo.ID, false);
  const CountProcessResponse = await io.CountProcess(
    "./config/ServerLikeCount.json",
    ServerInfo.Name,
    ServerInfo.ID,
    1
  );
  console.log(ResourceInfo);
  process.exit();
}
Test();

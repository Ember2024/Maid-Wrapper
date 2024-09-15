export async function GetUserInfo(client, key) {
  const UserInfo = { code: null, message: null, Name: null, ID: null };
  try {
    if (typeof key === "number") {
      const Response = await client.doRequest(
        client.x19Session.releaseInfoPE.WebServerUrl,
        "/user-detail/query/other",
        { body: { entity_id: key } }
      );
      UserInfo.code = Response.code;
      UserInfo.message = Response.message;
      UserInfo.Name = Response.entity.nickname;
      UserInfo.ID = Response.entity.id;
    } else {
      const Response = await client.doRequest(
        client.x19Session.releaseInfoPE.WebServerUrl,
        "/user-search-friend/",
        { body: { name_or_mail: key, type: 0 } }
      );
      UserInfo.code = Response.code;
      UserInfo.message = Response.message;
      UserInfo.Name = Response.entities[0].nickname;
      UserInfo.ID = Response.entities[0].uid;
    }
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (
        error.response.code === 10122 &&
        error.response.message === "您搜索的玩家不存在"
      ) {
        UserInfo.code = error.response.code;
        UserInfo.message = error.response.message;
      } else if (
        error.response.code === 16 &&
        error.response.message === "目标找不到"
      ) {
        UserInfo.code = error.response.code;
        UserInfo.message = error.response.message;
      } else if (
        error.response.code === 10120 &&
        error.response.message === "连续操作过快，请稍后重试"
      ) {
        UserInfo.code = error.response.code;
        UserInfo.message = error.response.message;
      } else if (
        error.response.code === 10 &&
        error.response.message === "请先登录"
      ) {
        UserInfo.code = error.response.code;
        UserInfo.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      UserInfo.code = 100001;
      UserInfo.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return UserInfo;
}

/*
ByID Response:

{
  code: 0,
  message: '正常返回',
  details: '',
  summary_md5: '3ade98f23f2a6e208c706df9f23c2583',
  entity: {
    id: 2711442055,
    nickname: '星大布1',
    signature: '',
    headImage: 'https://x19.fp.ps.netease.com/file/5a34e0127f9d2a7327006777930sLlCQ',
    frame_id: 'https://x19.fp.ps.netease.com/file/5b0621055e602717a0751356PB1UpiEr',
    moment_id: '64c098647f1eeb159c0bff30',
    public_flag: false,
    pe_growth: { lv: 11, exp: 12, need_exp: 23, decorate: [], is_vip: 0 },
    user_game_info: { 'game-type': false, 'game-id': false, 'game-info': false },
    friend_recommend: 1,
    friend_apply: 1,
    tag: [],
    is_developer: false,
    mark: '',
    is_friend: false
  }
}

ByName Response:

{
  code: 0,
  message: '正常返回',
  details: '',
  entities: [
    {
      uid: 2711442055,
      nickname: '星大布1',
      headImage: 'https://x19.fp.ps.netease.com/file/5a34e0127f9d2a7327006777930sLlCQ',
      frame_id: 'https://x19.fp.ps.netease.com/file/5b0621055e602717a0751356PB1UpiEr',
      moment_id: '64c098647f1eeb159c0bff30',
      public_flag: false,
      online_status: '',
      online_pcpe: 0,
      online_type: 1,
      game_info: { 'game-type': false, 'game-id': false, 'game-info': false },
      tLogout: 1692089212
    }
  ]
}

*/

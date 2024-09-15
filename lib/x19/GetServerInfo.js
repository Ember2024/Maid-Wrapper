export async function GetServerInfo(client, ServerName) {
  const ServerInfo = {
    code: null,
    message: null,
    Name: null,
    ID: null,
    Owner_ID: null,
    LikeCount: null,
    HavePassword: null,
  };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/rental-server/query/search-by-name",
      { body: { server_name: ServerName, offset: 0 } }
    );
    if (Response.entities == "") {
      ServerInfo.code = 16;
      ServerInfo.message = "您搜索的服务器不存在";
      return ServerInfo;
    }
    ServerInfo.code = Response.code;
    ServerInfo.message = Response.message;
    ServerInfo.Name = Response.entities[0].name;
    ServerInfo.ID = Response.entities[0].entity_id;
    ServerInfo.Owner_ID = Response.entities[0].owner_id;
    ServerInfo.LikeCount = Response.entities[0].like_num;
    ServerInfo.HavePassword = Boolean(Number(Response.entities[0].has_pwd))
      ? true
      : false;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        ServerInfo.code = error.response.code;
        ServerInfo.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      ServerInfo.code = 100001;
      ServerInfo.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return ServerInfo;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entities: [
    {
      entity_id: '4660805342135846298',
      name: '34699779',
      owner_id: 2775295316,
      visibility: 0,
      status: 1,
      icon_index: 4,
      capacity: 20,
      mc_version: '1.18.32-release',
      player_count: 1,
      like_num: 583,
      server_type: 'docker',
      offset: null,
      has_pwd: '0',
      image_url: '',
      world_id: 'y63pp8z1scyhrnwvnppibg',
      min_level: '0',
      pvp: true
    }
  ],
  total: 1
}

*/

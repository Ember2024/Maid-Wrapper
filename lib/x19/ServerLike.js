export async function ServerLike(client, ServerID, IsLike) {
  IsLike ? 1 : 0;
  const ServerLikeResponse = { code: null, message: null };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/rental-server-like/update",
      { body: { server_id: ServerID, is_like: IsLike } }
    );
    ServerLikeResponse.code = Response.code;
    ServerLikeResponse.message = Response.message;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        ServerLikeResponse.code = error.response.code;
        ServerLikeResponse.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      ServerLikeResponse.code = 100001;
      ServerLikeResponse.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return ServerLikeResponse;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entity: { entity_id: '4664458326299763416', is_like: 1 }
}

*/

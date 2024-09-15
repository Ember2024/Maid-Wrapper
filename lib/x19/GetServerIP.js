export async function GetServerIP(client, ServerID, Password) {
  const ServerIPResponse = {
    code: null,
    message: null,
    ID: null,
    IP: null,
    Port: null,
  };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/rental-server-world-enter/get",
      { body: { server_id: ServerID, pwd: Password } }
    );
    ServerIPResponse.code = Response.code;
    ServerIPResponse.message = Response.message;
    ServerIPResponse.ID = Response.entity.entity_id;
    ServerIPResponse.IP = Response.entity.mcserver_host;
    ServerIPResponse.Port = Response.entity.mcserver_port;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (
        error.response.code === 16 &&
        error.response.message === "目标找不到"
      ) {
        ServerIPResponse.code = error.response.code;
        ServerIPResponse.message = error.response.message;
      } else if (
        error.response.code === 65 &&
        error.response.message === "密码错误"
      ) {
        ServerIPResponse.code = error.response.code;
        ServerIPResponse.message = error.response.message;
      } else if (
        error.response.code === 10 &&
        error.response.message === "请先登录"
      ) {
        ServerIPResponse.code = error.response.code;
        ServerIPResponse.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      ServerIPResponse.code = 100001;
      ServerIPResponse.message = "网络异常";
    }
  }
  return ServerIPResponse;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entity: {
    entity_id: '4664458326299763416',
    mcserver_host: '42.186.58.99',
    mcserver_port: 10013,
    isp_enable: true,
    cmcc_mcserver_host: '117.147.207.28',
    cmcc_mcserver_port: 10013,
    ctcc_mcserver_host: '115.236.125.28',
    ctcc_mcserver_port: 10013,
    cucc_mcserver_host: '101.67.57.28',
    cucc_mcserver_port: 10013,
    state: 1
  }
}

*/

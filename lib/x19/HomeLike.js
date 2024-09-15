export async function HomeLike(client, UserID, IsLike) {
  IsLike ? 1 : 0;
  const HomeLikeResponse = { code: null, message: null };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.ApiGatewayUrl,
      "/this-home-is-good",
      {
        headers: { server: "home" },
        body: { is_good: IsLike, visit_id: UserID },
      }
    );
    HomeLikeResponse.code = Response.code;
    HomeLikeResponse.message = Response.message;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (
        error.response.code === 13 &&
        (error.response.message === "您还没点过赞" ||
          error.response.message === "您已经点过赞")
      ) {
        HomeLikeResponse.code = 0;
        HomeLikeResponse.message = "正常返回";
      } else if (
        error.response.code === 10 &&
        error.response.message === "请先登录"
      ) {
        HomeLikeResponse.code = error.response.code;
        HomeLikeResponse.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      HomeLikeResponse.code = 100001;
      HomeLikeResponse.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return HomeLikeResponse;
}

/*

{ code: 0, message: '正常返回', details: '点赞成功', entity: { count: 1 } }

*/

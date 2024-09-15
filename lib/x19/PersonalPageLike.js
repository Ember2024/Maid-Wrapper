export async function PersonalPageLike(client, LoginAccountID, UserID, IsLike) {
  const PersonalPageLikeResponse = { code: null, message: null };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/user-personal-page-like/update",
      {
        body: {
          entity_id: LoginAccountID,
          personal_page_owner_user_id: UserID,
          visitor_user_id: LoginAccountID,
          has_like: IsLike,
        },
      }
    );
    PersonalPageLikeResponse.code = Response.code;
    PersonalPageLikeResponse.message = Response.message;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        PersonalPageLikeResponse.code = error.response.code;
        PersonalPageLikeResponse.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      PersonalPageLikeResponse.code = 100001;
      PersonalPageLikeResponse.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return PersonalPageLikeResponse;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entity: {
    entity_id: '2787454913',
    visitor_user_id: '2787454913',
    personal_page_owner_user_id: '2711442055',
    has_like: true
  }
}

*/

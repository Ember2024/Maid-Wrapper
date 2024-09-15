export async function PersonalPageView(client, UserID) {
  const PersonalPageViewResponse = { code: null, message: null };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/user-personal-page-view",
      { body: { personal_page_user_id: UserID } }
    );
    PersonalPageViewResponse.code = Response.code;
    PersonalPageViewResponse.message = Response.message;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        PersonalPageViewResponse.code = error.response.code;
        PersonalPageViewResponse.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      PersonalPageViewResponse.code = 100001;
      PersonalPageViewResponse.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return PersonalPageViewResponse;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entity: {
    entity_id: '0',
    visitor_user_id: '2787454913',
    personal_page_owner_user_id: '563958407'
  }
}

*/

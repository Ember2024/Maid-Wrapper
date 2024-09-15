export async function GetPersonalPageInfo(client, UserID) {
  const PersonalPageInfo = {
    code: null,
    message: null,
    ID: null,
    PersonalPageViewCount: null,
    PersonalPageLikeCount: null,
  };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/user-stat/get-user-state",
      { body: { search_id: UserID } }
    );
    PersonalPageInfo.code = Response.code;
    PersonalPageInfo.message = Response.message;
    PersonalPageInfo.ID = Response.entity.entity_id;
    PersonalPageInfo.PersonalPageViewCount =
      Response.entity.personal_page_view_count;
    PersonalPageInfo.PersonalPageLikeCount =
      Response.entity.personal_page_like_count;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        PersonalPageInfo.code = error.response.code;
        PersonalPageInfo.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      PersonalPageInfo.code = 100001;
      PersonalPageInfo.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return PersonalPageInfo;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entity: {
    entity_id: '2711442055',
    personal_page_view_count: 7,
    personal_page_like_count: 0,
    video_view_count: 0,
    game_purchase_count: 0,
    component_purchase_count: 0,
    friend_cnt: 2,
    public_user_fans_cnt: 0,
    my_public_follow_cnt: 4,
    has_like: false
  }
}

*/

export async function GetHomeInfo(client, UserID) {
  const HomeInfo = {
    code: null,
    message: null,
    UserID: null,
    HomeViewCount: null,
    HomeLikeCount: null,
  };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.ApiGatewayUrl,
      "/home-get-whole-info",
      {
        headers: { server: "home" },
        body: {
          friend_home_id: UserID,
          from_zone: "个人主页",
          owner_type: 2,
        },
      }
    );
    HomeInfo.code = Response.code;
    HomeInfo.message = Response.message;
    HomeInfo.UserID = Response.entity.map_info.owner_id;
    HomeInfo.HomeViewCount = Response.entity.map_info.visit_num;
    HomeInfo.HomeLikeCount = Response.entity.map_info.good_amount;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        HomeInfo.code = error.response.code;
        HomeInfo.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      HomeInfo.code = 100001;
      HomeInfo.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return HomeInfo;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  entity: {
    visitor_info: [
      {
        visiter_id: 2787454913,
        visiter_avatar: 'https://x19.fp.ps.netease.com/file/5a34e0777f9d2a8a4ea3d36eza31LhW3',
        visitor_frame_id: 'https://x19.fp.ps.netease.com/file/5b0621055e602717a0751356PB1UpiEr',
        visit_desc: '',
        visitor_home_rank: 0,
        visiter_home_lv: 1
      }
    ], 
    map_users_info: {
      '2711442055': { pos: [ 0, 0 ], move: true, feeling: {} },
      '2787454913': { pos: [ 0, 0 ], move: true, feeling: {} }
    },
    second_floor_button: true,
    home_album_button: true,
    second_floor_status: false,
    min_version: '2.7.0',
    pet_info: {},
    guide_state: {},
    home_entity_info: {},
    map_info: {
      owner_id: 2711442055,
      name: '星大布1',
      owner_avatar: 'https://x19.fp.ps.netease.com/file/5a34e0127f9d2a7327006777930sLlCQ',
      frame_id: 'https://x19.fp.ps.netease.com/file/5b0621055e602717a0751356PB1UpiEr',
      skin_type: { type: 'skin' },
      skin_data: { item_id: '-1' },
      persona_data: [],
      home_gold: 0,
      home_cash: 0,
      grade: 1,
      grade_exp: 0,
      home_exp: 0,
      good_amount: 0,
      grade_exp_tota: 40,
      size_x: 8,
      size_y: 8,
      liked: 0,
      visit_num: 2,
      master_rank: 0,
      item_limit_count: 100,
      item_score: 0,
      item_score2: 0,
      pet_score: 0,
      style_score: 0,
      style_score2: 0,
      total_score: '0',
      can_expand: 0,
      max_entities: 25
    },
    workbench_info: { status: 13 },
    activity_state: 0,
    friend_rank_info: [],
    my_rank_info: {},
    effected_lottery_count: 0,
    can_rename_pet: false,
    rename_pet_free_times: 0,
    pet_name_initialized: false,
    background_id: 'bg-1',
    background_tips_type: '',
    background_tips: '',
    background_info: {
      name: '平坦绿地',
      material: 'back_default',
      icon: 'https://x19.fp.ps.netease.com/file/5f59ea5fa7f2523fc9eeeda8JGDIxKEm02',
      preview_icon: 'https://x19.fp.ps.netease.com/file/5f59ea5fa7f2523fc9eeeda7Lqq4LJQM02',
      vip_only: 0,
      auto_unlock: 1,
      buy_num: 0
    },
    activity: '',
    default_floor_item: 'diban_12',
    home_activity_button: false,
    new_item_text: '新家具上市啦！快来看看吧~'
  }
}

*/

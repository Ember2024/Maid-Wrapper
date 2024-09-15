export async function GetLoginAccountInfo(client) {
  const LoginAccountInfo = { code: null, message: null, ID: null };
  try {
    const Response = await client.doRequest(
      client.x19Session.releaseInfoPE.WebServerUrl,
      "/pe-user-detail/get"
    );
    LoginAccountInfo.code = Response.code;
    LoginAccountInfo.message = Response.message;
    LoginAccountInfo.ID = Response.entity.entity_id;
  } catch (error) {
    if (error.errorCode === "HTTP_REQUEST_FAILED") {
      if (error.response.code === 10 && error.response.message === "请先登录") {
        LoginAccountInfo.code = error.response.code;
        LoginAccountInfo.message = error.response.message;
      }
    } else if (error.errorCode === "NETWORK_ERROR") {
      LoginAccountInfo.code = 100001;
      LoginAccountInfo.message = "网络异常";
    } else {
      console.error(error);
      throw error;
    }
  }
  return LoginAccountInfo;
}

/*

{
  code: 0,
  message: '正常返回',
  details: '',
  summary_md5: '15b67eb5dabc4b0623cae3965b5f37a6',
  entity: {
    entity_id: '639971265',
    account: '',
    gender: 'm',
    name: '',
    signature: '',
    avatar_image_url: 'https://x19.fp.ps.netease.com/file/5a34e0777f9d2a8a4ea3d36eza31LhW3',
    register_time: 1675364454,
    login_time: 1692968314,
    logout_time: 0,
    realname_status: 0,
    isAntiAddiction: true,
    need_realname_auth: true,
    nickname_free: 1,
    nickname_init: 0,
    level: 1,
    score: 0,
    freezed: 0,
    skin_number: 3,
    cape_number: 0,
    instruct_info: '',
    rest_currency_time: 0,
    frame_id: 'https://x19.fp.ps.netease.com/file/5b0621055e602717a0751356PB1UpiEr',
    head_image: 'https://x19.fp.ps.netease.com/file/5a34e0777f9d2a8a4ea3d36eza31LhW3',
    msg_background_id: 0,
    chat_bubble_id: 0,
    new_chat_bubble_id: [],
    unlock_info: { u_0: 1 },
    is_vip: false,
    is_expr_vip: false,
    vip_info: {
      status: 'expired',
      begin_at: 0,
      expired_at: 0,
      expr_expired_at: 0,
      accumulative_total: 0
    },
    is_subscribe: false,
    subscribe_expiration_time: 0,
    vipxd_subscribed_benefit: 0,
    head_image_cd: 0,
    aid: '650975902',
    can_buy_vip_special: false,
    can_buy_first_charge_vip: false,
    user_guide_info: {
      init_item: [ '4652731824186110452', '4652730413455927007', '4652754866012707535' ],
      search_tag: '幸运熔岩跑酷',
      home_intro_video: 'http://x19.fp.ps.netease.com/file/61e679923fc7c92320d3cbcaxcKek7f104',
      rc_intro_video: 'http://x19.fp.ps.netease.com/file/626259000bff019c2a98d518lIbtzkBJ04',
      single_game_video: '',
      net_game_video: '',
      lobby_game_video: '',
      rental_game_video: '',
      history_view_video: '',
      shop_keeper_video: '',
      trial_item: {
        weapon: '4630148935249590718',
        mount: '4632206008989248356',
        skin: '4641888277446720629'
      },
      trigger_video: [
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c13468b774a7a966beeVyFErd7Z05',
          url: 'https://x19.fp.ps.netease.com/file/62542a172d3a54618d270a252SR3wBpu04',
          name: '单人游戏',
          intro: '什么是单人游戏和多人游戏，如何享受独自探索的快乐',
          trigger: 'ModuleGuideSeasonMod'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c13468b774a7a966bf0Bibi7Nj305',
          url: 'https://x19.fp.ps.netease.com/file/6254f175a1a6f4786eed6dbf5NF39llO04',
          name: '联机大厅',
          intro: '在联机大厅寻找自己感兴趣的玩法，一键加入在线联机房间',
          trigger: 'ModuleGuideOnlineHall'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c13342cca855904b4f297WVdxbx05',
          url: 'https://x19.fp.ps.netease.com/file/62542a192d3a5449de89eab3siQA008S04',
          name: '网络游戏',
          intro: '加入网络游戏，和更多的玩家在成熟丰富的玩法里面相遇吧',
          trigger: 'ModuleGuideNetGame'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c13468b774a7a966bf8KLHL22yv05',
          url: 'https://x19.fp.ps.netease.com/file/6254e6b6a1a6f40814ad7539w6irjNas04',
          name: '资源查看下载',
          intro: '快速学会如何浏览、查看和下载资源吧！',
          trigger: 'ModuleGuideAdvItem'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c14468b774a7a966c00RpesY7CB05',
          url: 'https://x19.fp.ps.netease.com/file/62542e28c664ed12a265b687mZz1BOlG04',
          name: '浏览历史与心愿单',
          intro: '错过了心仪的组件也不要怕，浏览历史与心愿单帮你记录下来！',
          trigger: 'ModuleGuideResHis'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c1429e8fd39579d6f6eDTcstbEm05',
          url: 'https://x19.fp.ps.netease.com/file/62542e28c664ed271d724ab37foihhUZ04',
          name: '开发者订阅',
          intro: '关注你喜欢的开发者，了解最新的组件动态吧！',
          trigger: 'ModuleGuideDeveloper'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c15468b774a7a966c02OSSma6N705',
          url: 'https://x19.fp.ps.netease.com/file/62543d68338c8e5d92077c6ao47aDQNH04',
          name: '好友聊天',
          intro: '去认识更多好友，和他们一起游戏吧',
          trigger: 'ModuleGuideFriend'
        },
        {
          cover_url: 'https://x19.fp.ps.netease.com/file/64db1c154b0b6f9adb6df5ce45cvpi2905',
          url: 'https://x19.fp.ps.netease.com/file/6261059b9d15dc47d877faceM594XNHR04',
          name: '新鲜事',
          intro: '浏览、点赞和发布新鲜事，关注我的世界时时刻刻的变化',
          trigger: 'ModuleGuideMsg'
        }
      ],
      template: 0
    },
    vip_recover_info: [],
    remain_revise_name_cnt: 0,
    used_name: '',
    access_game_flag: 1,
    anti_addition_status: 0
  }
}

*/

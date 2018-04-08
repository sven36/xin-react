const URL_PREFIX = process.env.NODE_ENV === 'development' ?
    `//${window.location.host}` :
    `//${window.location.host}/app/lottery_m/index.html`;
const URLCONFIG={
    //会员地址 
    memberUrl:"https://member.58.com/index/joinvip?isApp=false&realnameAuthTime=1502950372000&sign=e3d0e63aec32aaa8299975ab39538c15&bizz=landing_page_top",
    //机构列表接口
    sortAjaxUrl:'/vip/classifyDisplay',
    //获取用户信息 是否会员等
    vipInfoUrl:'/vipinfo',
    //直连信贷员地址
	iconDirectUrl:'https://jinrong.58.com/normal/loan/officerlist'
};
export {
    URL_PREFIX,
    URLCONFIG
}
const jsname = '综合签到'
const $ = Env(jsname)
//0为关闭日志，1为开启,默认为0
const logs = 0;
//0为关闭通知，1为所有通知,默认为0
const notifyInterval = 1;
//通知风格
let tz = '';

//////////////////////////////////////////////////////////////////
//hour&min
var hour = '';
var minute = '';
if ($.isNode()) {
  hour = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getHours();
  minute = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).getMinutes();
} else {
  hour = (new Date()).getHours();
  minute = (new Date()).getMinutes();
}
//现在毫秒格式(13位数)
let todaytimems = Math.round(Date.now())

////////////////////////////【变量】//////////////////////////////////
// $.setdata('{}',`ttcjbody`)
// $.setdata('{"Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Connection":"keep-alive","Content-Type":"application/json","Host":"ttcj.dashengtec.com","Authorization":"Bearer 66720|i8tJqB4Aov0zXHjOsaZsAzAqWlYHzITTzYh69NC5","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.7(0x18000731) NetType/WIFI Language/zh_CN","source":"minigame","channel":"","Referer":"https://servicewechat.com/wxfdec7316ebac7c08/23/page-frame.html"}',`ttcjhd`)
// $.setdata('[{"roleId":"40977931","server":"1418"}]',`mhxybodyArr`)
// $.setdata('{"Host": "god-welfare.gameyw.netease.com","GL-Uid": "2eec2c07f7d945d2a1e0099f30d1e140","Accept": "*/*","GL-Version": "3.6.0","GL-Source": "URS","Accept-Language": "zh-cn","Content-Type": "application/json;charset=utf-8","Origin": "https://ds.163.com","User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Godlike/3.6.0 UEPay/com.netease.godlike/iOS_7.6.5","GL-ClientType": 51,"GL-CurTime": 1626404089727,"GL-Channel": "","Referer": "https://ds.163.com/","GL-DeviceId": "5E431547-38EF-44B8-9D7B-04CCD48AD04D","GL-Token": "3dbd0424cd1842958f96f3bf21fd2a94"}',`mhxyhd`)

let ttcjbody = $.getdata('ttcjbody')
let ttcjhd = $.getdata('ttcjhd')
let mhxybodyArr = JSON.parse($.getdata('mhxybodyArr')) || []
let mhxyhd = $.getdata('mhxyhd')
let DD = RT(4000, 8000)

////////////////////////////【执行】//////////////////////////////////
!(async () => {
  cc = (`${jsname}任务执行通知🔔`);
  if (ttcjbody && ttcjhd) {
	  console.log(`\n开始【天天抽奖365】`)
    tz += `\n开始【天天抽奖365】`
	  await ttcjqd();
	  await $.wait(DD)
	  await ttcjfb();
	  await $.wait(DD)
	  await ttcjmh();
	  await $.wait(DD)
	  await ttcjxx();
    await $.wait(DD)
  }
  if (mhxybodyArr && mhxyhd) {
    for (let i = 0; i < mhxybodyArr.length; i++) {
      if (mhxybodyArr[i]) {
        mhxybody = mhxybodyArr[i];
        $.index = i + 1;
        console.log(`\n开始【梦幻签到${$.index}】`)
        tz += `\n开始【梦幻签到${$.index}】`
        await mhxySign();
        await $.wait(DD)
        await mhxyCJ()
        await $.wait(DD)
      }
    }
  }
  // await ceshi()
  await showmsg2();
})()
.catch((e) => $.logErr(e))
  .finally(() => $.done())

////////////////////////////【方法】//////////////////////////////////
// 天天抽奖
function ttcjqd(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url : `https://ttcj.dashengtec.com/api/v2/sign`,
      headers : JSON.parse(ttcjhd),
      body : `${ttcjbody}`
    }
    $.post(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){
        console.log('\n天天抽奖签到： '+result.message)
        tz += '\n天天抽奖签到： '+result.message
      }else{
        console.log('\n天天抽奖签到： '+result.message)
      }} catch (e){} finally {resolve()}
    },timeout)
  })
}
function ttcjfb(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url : `https://ttcj.dashengtec.com/api/v2/sign/video`,
      headers : JSON.parse(ttcjhd),
      body : `${ttcjbody}`
    }
    $.post(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){
        console.log('\n签到翻倍： '+ result.message)
        tz += '\n签到翻倍： '+result.message
      }else{
        console.log('\n签到翻倍： '+result.message)
      }} catch (e){} finally {resolve()}
    },timeout)
  })
}
function ttcjmh(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url : `https://ttcj.dashengtec.com/api/v2/lucky-wheel`,
      headers : JSON.parse(ttcjhd),
      body : `${ttcjbody}`
    }
    $.post(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){
        console.log('\n开盲盒： '+ result.message+'\n获得：'+ resule.data.prize.name +'碎片')
        tz += '\n开盲盒： '+ result.message+'\n获得：'+ resule.data.prize.name +'碎片'
      }else{
        console.log('\n开盲盒： '+ result.message)
      }} catch (e){} finally {resolve()}
    },timeout)
  })
}
function ttcjxx(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url : `https://ttcj.dashengtec.com/api/v2/index/finance`,
      headers : JSON.parse(ttcjhd)
    }
    $.get(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){
        console.log('\n金币数量： '+result.data.coin+'个'+'\n现金：'+result.data.balance+'元')
        tz += '\n金币数量： '+result.data.coin+'个'+'\n现金：'+result.data.balance+'元'
      }else{
        console.log('\n查询金币余额： '+result.message)
      }} catch (e){} finally {resolve()}
    },timeout)
  })
}
// 梦幻西游
function mhxySign(timeout = 0) {
  return new Promise((resolve) => {
    mhxyhd['GL-CurTime'] = todaytimems
    let url = {
      url : `https://god-welfare.gameyw.netease.com/v1/welfare/xyq/checkIn`,
      headers : JSON.parse(mhxyhd),
      body : JSON.stringify(mhxybody)
    }
    $.post(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){
        console.log(`\n梦幻西游签到${$.index}： `+ result.errmsg)
        tz += `\n梦幻西游签到${$.index}： `+ result.errmsg
      }else{
        console.log(`\n梦幻西游签到${$.index}： `+ result.errmsg)
      }} catch (e){} finally {resolve()}
    },timeout)
  })
}
function mhxyCJ(timeout = 0) {
  return new Promise((resolve) => {
    mhxyhd['GL-CurTime'] = todaytimems + ''
    let url = {
      url : `https://god-welfare.gameyw.netease.com/v1/welfare/xyq/luckDraw/luckDraw`,
      headers : JSON.parse(mhxyhd),
      body : JSON.stringify(mhxybody)
    }
    $.post(url, async (err, resp, data) => {
      try {
      const result = JSON.parse(data)
      if(result.code == 200){
        console.log(`\n梦幻西游抽奖${$.index}： `+ result.errmsg)
        tz += `\n梦幻西游抽奖${$.index}： `+ result.errmsg
      }else{
        console.log(`\n梦幻西游抽奖${$.index}： `+ result.errmsg)
      }} catch (e){} finally {resolve()}
    },timeout)
  })
}
// 测试
function ceshi(timeout = 0) {
  let obj = {
    "facilityInfoId":6,
    "fileName":"附件名称6111",
    "fileUrl":"附件保存位置6"
  }
  obj = JSON.stringify(obj)
  return new Promise((resolve) => {
    let url = {
      url : `http://58.210.247.251:18088/prod-api/smb/facilityInfo/add/file`,
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6Ijc0YmJiNTFkLTc5MDQtNDBhMS1iMjI0LWQ0MWJjMDg3MWI2MCJ9.oWX_-XnBgFbX-GOazrwafIgHNLsMYieMKfHpwFTAoARGHA1_1-XRr9cHFMStMEVY4jZvj6f-QHnAvIVWwbnWEQ'
      },
      body: `${obj}`
    }
    $.post(url, async (err, resp, data) => {
      const result = JSON.parse(data)
    },timeout)
  })
}

////////////////////////////【公共】//////////////////////////////////
//通知2
async function showmsg2() {
  if (notifyInterval == 1) {
    if ($.isNode()) {
      if ((hour == 8 && minute <= 30) || (hour == 12 && minute <= 30) || (hour == 23 && minute <= 30)) {
        await notify.sendNotify($.name, tz)
      }
    } else {
      if ((hour == 8 && minute <= 30) || (hour == 12 && minute <= 30) || (hour == 23 && minute <= 30)) {
        $.msg(cc, '', tz);
      }
    }
  } else if (notifyInterval == 0) {
    console.log(cc + '' + tz);
  }
}
function RT(X, Y) {
  do rt = Math.floor(Math.random() * Y);
  while (rt < X)
  return rt;
}

////////////////////////////【ENV】//////////////////////////////////
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
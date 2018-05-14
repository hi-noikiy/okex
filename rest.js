const querystring = require('querystring');
const https = require('https');
const config = require('./config.js');
const md5 = require('md5');
const sortObject = require('sort-object-keys');

// It works
function userinfo() {
    var postDataList = {
        'api_key':config.auth.api_key,
    };

    var queryString=querystring.stringify(postDataList);
    var toHarshString=queryString+'&secret_key='+config.auth.secret_key;
    console.log(toHarshString);
    var sign=md5(toHarshString).toUpperCase();
    var postDataWithSign=queryString+'&sign='+sign;
    console.log("postDataWithSign: " + postDataWithSign);

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/userinfo.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         }
    };

    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });

    req.write(postDataWithSign);
    req.end();
}
userinfo();

function trade() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'type':'0',
        'price':'0',
        'amount':'0',
    });
    var queryString=querystring.stringify(postDataList);
    var toHarshString=queryString+'&secret_key='+config.auth.secret_key;
    console.log(toHarshString);
    var sign=md5(toHarshString).toUpperCase();
    var postDataWithSign=queryString+'&sign='+sign;
    console.log("postDataWithSign: " + postDataWithSign);

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/trade.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         }
    };

    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });

    req.write(postDataWithSign);
    req.end();
}
//trade();

function cancel_order() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'order_id':'0',
    });
    var queryString=querystring.stringify(postDataList);
    var toHarshString=queryString+'&secret_key='+config.auth.secret_key;
    console.log(toHarshString);
    var sign=md5(toHarshString).toUpperCase();
    var postDataWithSign=queryString+'&sign='+sign;
    console.log("postDataWithSign: " + postDataWithSign);

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/cancel_order.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         }
    };

    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });

    req.write(postDataWithSign);
    req.end();
}

// It works
function account_records() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'type':'1',
        'current_page':'1',
        'page_length':'5',
    });
    var queryString=querystring.stringify(postDataList);
    var toHarshString=queryString+'&secret_key='+config.auth.secret_key;
    console.log(toHarshString);
    var sign=md5(toHarshString).toUpperCase();
    var postDataWithSign=queryString+'&sign='+sign;
    console.log("postDataWithSign: " + postDataWithSign);

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/account_records.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         }
    };

    var req = https.request(options, (res) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (e) => {
      console.error(e);
    });

    req.write(postDataWithSign);
    req.end();
}
//account_records();

// https://www.npmjs.com/package/md5
// https://stackoverflow.com/questions/40537749/how-do-i-make-a-https-post-in-node-js-without-any-third-party-module
// https://github.com/okcoin-okex/API-docs-OKEx.com/blob/master/API-For-Spot-EN/REST%20API%20for%20SPOT.md
// https://support.okcoin.com/hc/en-us/articles/360000697832-REST-API-Reference

/* The result will be as below:
 * {"result":true,"info":{"funds":{"borrow":{"ssc":"0","mof":"0","xuc":"0","okb":"0","eos":"0","fair":"0","kcash":"0","theta":"0","vib":"0","ugc":"0","ost":"0","trio":"0","mot":"0","brd":"0","dna":"0","gtc":"0","xmr":"0","lev":"0","zil":"0","ipc":"0","bt1":"0","ctr":"0","zip":"0","bt2":"0","xem":"0","nas":"0","iota":"0","viu":"0","stc":"0","gto":"0","mith":"0","wtc":"0","tnb":"0","dent":"0","dnt":"0","ctxc":"0","light":"0","iost":"0","dgb":"0","dgd":"0","zrx":"0","sub":"0","bcd":"0","aac":"0","bch":"0","poe":"0","omg":"0","cmt":"0","hot":"0","wbtc":"0","bkx":"0","btc":"0","cvc":"0","1st":"0","mag":"0","bcs":"0","btg":"0","bcx":"0","okdk":"0","btm":"0","ark":"0","smt":"0","rcn":"0","key":"0","knc":"0","rct":"0","salt":"0","snc":"0","storj":"0","gnt":"0","dpy":"0","gnx":"0","r":"0","abt":"0","snm":"0","mana":"0","ont":"0","ppt":"0","la":"0","chat":"0","snt":"0","sngls":"0","rdn":"0","fun":"0","bec":"0","ace":"0","auto":"0","ast":"0","pyn":"0","soc":"0","nano":"0","ubtc":"0","ukg":"0","ref":"0","act":"0","yoyo":"0","etc":"0","icn":"0","mkr":"0","dat":"0","etf":"0","vee":"0","usdt":"0","eth":"0","mco":"0","aidoc":"0","topc":"0","atl":"0","wfee":"0","zec":"0","neo":"0","itc":"0","ren":"0","tio":"0","lrc":"0","elf":"0","pra":"0","req":"0","icx":"0","mth":"0","zen":"0","tra":"0","read":"0","mtl":"0","uct":"0","spf":"0","pay":"0","bnt":"0","mda":"0","f4sbtc":"0","utk":"0","edo":"0","xrp":"0","true":"0","rnt":"0","trx":"0","dash":"0","mdt":"0","cic":"0","nuls":"0","rfr":"0","amm":"0","hsr":"0","link":"0","cag":"0","show":"0","sbtc":"0","ngc":"0","qun":"0","qtum":"0","pst":"0","can":"0","of":"0","gas":"0","yee":"0","ltc":"0","lend":"0","avt":"0","eng":"0","enj":"0","san":"0","tct":"0","evx":"0","oax":"0","wrc":"0","dadi":"0","qvt":"0","int":"0","ins":"0","insur":"0","cbt":"0","gsc":"0","xlm":"0","swftc":"0","hmc":"0"},"free":{"ssc":"0","mof":"0","xuc":"0","okb":"0","eos":"0","fair":"0","kcash":"0","theta":"0","vib":"0","ugc":"0","ost":"0","trio":"0","mot":"0","brd":"0","dna":"0","gtc":"0","xmr":"0","lev":"0","zil":"0","ipc":"0","bt1":"0","ctr":"0","zip":"0","bt2":"0","xem":"0","nas":"0","iota":"0","viu":"0","stc":"0","gto":"0","mith":"0","wtc":"0","tnb":"0","dent":"0","dnt":"0","ctxc":"0","light":"0","iost":"0","dgb":"0","dgd":"0","zrx":"0","sub":"0","bcd":"0","aac":"0","bch":"0","poe":"0","omg":"0","cmt":"0","hot":"0","wbtc":"0","bkx":"0","btc":"0","cvc":"0","1st":"0","mag":"0","bcs":"0","btg":"0","bcx":"0","okdk":"0","btm":"0","ark":"0","smt":"0","rcn":"0","key":"0","knc":"0","rct":"0","salt":"0","snc":"0","storj":"0","gnt":"0","dpy":"0","gnx":"0","r":"0","abt":"0","snm":"0","mana":"0","ont":"0","ppt":"0","la":"0","chat":"0","snt":"0","sngls":"0","rdn":"0","fun":"0","bec":"0","ace":"0","auto":"0","ast":"0","pyn":"0","soc":"0","nano":"0","ubtc":"0","ukg":"0","ref":"0","act":"0","yoyo":"0","etc":"0","icn":"0","mkr":"0","dat":"0","etf":"0","vee":"0","usdt":"300","eth":"0","mco":"0","aidoc":"0","topc":"0","atl":"0","wfee":"0","zec":"0","neo":"0","itc":"0","ren":"0","tio":"0","lrc":"0","elf":"0","pra":"0","req":"0","icx":"0","mth":"0","zen":"0","tra":"0","read":"0","mtl":"0","uct":"0","spf":"0","pay":"0","bnt":"0","mda":"0","f4sbtc":"0","utk":"0","edo":"0","xrp":"0","true":"0","rnt":"0","trx":"0","dash":"0","mdt":"0","cic":"0","nuls":"0","rfr":"0","amm":"0","hsr":"0","link":"0","cag":"0","show":"0","sbtc":"0","ngc":"0","qun":"0","qtum":"0","pst":"0","can":"0","of":"0","gas":"0","yee":"0","ltc":"0","lend":"0","avt":"0","eng":"0","enj":"0","san":"0","tct":"0","evx":"0","oax":"0","wrc":"0","dadi":"0","qvt":"0","int":"0","ins":"0","insur":"0","cbt":"0","gsc":"0","xlm":"0","swftc":"0","hmc":"0"},"freezed":{"ssc":"0","mof":"0","xuc":"0","okb":"0","eos":"0","fair":"0","kcash":"0","theta":"0","vib":"0","ugc":"0","ost":"0","trio":"0","mot":"0","brd":"0","dna":"0","gtc":"0","xmr":"0","lev":"0","zil":"0","ipc":"0","bt1":"0","ctr":"0","zip":"0","bt2":"0","xem":"0","nas":"0","iota":"0","viu":"0","stc":"0","gto":"0","mith":"0","wtc":"0","tnb":"0","dent":"0","dnt":"0","ctxc":"0","light":"0","iost":"0","dgb":"0","dgd":"0","zrx":"0","sub":"0","bcd":"0","aac":"0","bch":"0","poe":"0","omg":"0","cmt":"0","hot":"0","wbtc":"0","bkx":"0","btc":"0","cvc":"0","1st":"0","mag":"0","bcs":"0","btg":"0","bcx":"0","okdk":"0","btm":"0","ark":"0","smt":"0","rcn":"0","key":"0","knc":"0","rct":"0","salt":"0","snc":"0","storj":"0","gnt":"0","dpy":"0","gnx":"0","r":"0","abt":"0","snm":"0","mana":"0","ont":"0","ppt":"0","la":"0","chat":"0","snt":"0","sngls":"0","rdn":"0","fun":"0","bec":"0","ace":"0","auto":"0","ast":"0","pyn":"0","soc":"0","nano":"0","ubtc":"0","ukg":"0","ref":"0","act":"0","yoyo":"0","etc":"0","icn":"0","mkr":"0","dat":"0","etf":"0","vee":"0","usdt":"0","eth":"0","mco":"0","aidoc":"0","topc":"0","atl":"0","wfee":"0","zec":"0","neo":"0","itc":"0","ren":"0","tio":"0","lrc":"0","elf":"0","pra":"0","req":"0","icx":"0","mth":"0","zen":"0","tra":"0","read":"0","mtl":"0","uct":"0","spf":"0","pay":"0","bnt":"0","mda":"0","f4sbtc":"0","utk":"0","edo":"0","xrp":"0","true":"0","rnt":"0","trx":"0","dash":"0","mdt":"0","cic":"0","nuls":"0","rfr":"0","amm":"0","hsr":"0","link":"0","cag":"0","show":"0","sbtc":"0","ngc":"0","qun":"0","qtum":"0","pst":"0","can":"0","of":"0","gas":"0","yee":"0","ltc":"0","lend":"0","avt":"0","eng":"0","enj":"0","san":"0","tct":"0","evx":"0","oax":"0","wrc":"0","dadi":"0","qvt":"0","int":"0","ins":"0","insur":"0","cbt":"0","gsc":"0","xlm":"0","swftc":"0","hmc":"0"}}}}
 * */

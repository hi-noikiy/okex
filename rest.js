const querystring = require('querystring');
const https = require('https');
const config = require('../config.js');
const md5 = require('md5');
const sortObject = require('sort-object-keys');
const HttpsProxyAgent = require('https-proxy-agent');
var proxy = process.env.https_proxy || 'https://127.0.0.1:1087';
const agent = new HttpsProxyAgent(proxy);

/* =====================================
 * = Future
 * =====================================*/
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
         },
	agent: agent
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
//userinfo();

// It works
function trade() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'type':'buy',
        'price':'0.1',
        'amount':'0.1',
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
         },
	agent: agent
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

// Not tested
function batch_trade() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'type':'buy', //buy/sell
        'orders_data':[{price:0.2,amount:5,type:'sell'},{price:0.1,amount:3,type:'buy'}],
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
         },
	agent: agent
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
//batch_trade();


// It works
function cancel_order() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'order_id':'290066737',
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
         },
	agent: agent
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
//cancel_order();

// Error 10008 Unmatched sign
function order_info() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'order_id':'-1',
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
      path: '/api/v1/orders_info.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//order_info();

// Return empty orders array
function orders_info() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
	'type':'0', // 0: unfinished orders, 1: finshed orders
        'symbol':'eos_usdt',
        'order_id':'-1',
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
      path: '/api/v1/orders_info.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//orders_info();

// It works and show the deal_amount successfully
function order_history() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
	'status':'0', // 0: unfinished orders, 1: finshed orders
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
      path: '/api/v1/order_history.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//order_history();


// Not tested yet
function withdraw() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'chargefee':'0',
        'trade_pwd':'',
        'withdraw_address':'',
        'withdraw_amount':'',
        'target':'okex', //okcn,okcom,okex
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
      path: '/api/v1/withdraw.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//withdraw();

// Not tested yet
function cancel_withdraw() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'withdraw_id':'',
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
      path: '/api/v1/cancel_withdraw.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//cancel_withdraw();

// Not tested yet
function withdraw_info() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'withdraw_id':'',
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
      path: '/api/v1/withdraw_info.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//withdraw_info();

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
         },
	agent: agent
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


/* =====================================
 * = Future
 * =====================================*/
// It is a get funtion and will return the whole page in nodejs
function future_index() {
    var postDataList = sortObject({
        'symbol':'eos_usd',
    });
    var queryString=querystring.stringify(postDataList);
    var postDataWithSign=queryString;

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/future_index.do',
      method: 'GET',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_index();

function future_hold_amount() {
    var postDataList = sortObject({
        'symbol':'eos_usd',
	'contract_type':'this_week',
    });
    var queryString=querystring.stringify(postDataList);
    var postDataWithSign=queryString;

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/future_hold_amount.do',
      method: 'GET',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_hold_amount();

function future_userinfo() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
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
      path: '/api/v1/future_userinfo.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_userinfo();

function future_trade() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'contract_type':'this_week',
	'price':'0.1',
	'amount':'0.1',
        'type':'1',
	'match_price':'1',
	'lever_rate':'10', // no need for order
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
      path: '/api/v1/future_trade.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
    };

    var options = {
      hostname: 'www.okex.com',
      port: 443,
      path: '/api/v1/future_userinfo.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_userinfo();

function future_posiition() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'contract_type':'this_week',
        'symbol':'eos_usdt',
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
      path: '/api/v1/future_position.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_position();

function future_trade() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'contract_type':'this_week',
	'price':'0.1',
	'amount':'0.1',
        'type':'1',
	'match_price':'1',
	'lever_rate':'10', // no need for order
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
      path: '/api/v1/future_trade.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_trade();

function future_trades_history() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
	'date':'yyyy-MM-dd',
	'since':'1', // order id
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
      path: '/api/v1/future_trades_history.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_trades_history();

function future_batch_trade() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'contract_type':'this_week',
	'orders_data':'[{price:0.1,amount:2,type:1,match_price:1},{price:0.1,amount:2,type:1,match_price:1}]',
	'lever_rate':'10', // no need for order
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
      path: '/api/v1/future_batch_trade.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_batch_trade();

function future_cancel() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
	'order_id':'1,2,3',
        'contract_type':'this_week',
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
      path: '/api/v1/future_cancel.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_cancel();

function future_order_info() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'contract_type':'this_week',
	'status':'1',
	'order_id':'-1',
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
      path: '/api/v1/future_order_info.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_order_info();

function future_orders_info() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'contract_type':'this_week',
	'order_id':'1,2,3',
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
      path: '/api/v1/future_orders_info.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_orders_info();

function future_userinfo_4fix() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
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
      path: '/api/v1/future_userinfo_4fix.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_userinfo_4fix();

function future_explosive() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'contract_type':'this_week',
	'status':'1',
	'current_page':'1',
	'page_number':'1',
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
      path: '/api/v1/future_explosive.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_explosive();

function future_devolve() {
    var postDataList = sortObject({
        'api_key':config.auth.api_key,
        'symbol':'eos_usdt',
        'type':'',
        'amount':'0.1',
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
      path: '/api/v1/future_devolve.do',
      method: 'POST',
      headers: {
           'Content-Type': 'application/x-www-form-urlencoded',
           'Content-Length': postDataWithSign.length
         },
	agent: agent
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
//future_devolve();
// https://github.com/okcoin-okex/API-docs-OKEx.com/blob/master/API-For-Spot-EN/REST%20API%20for%20SPOT.md
// https://support.okcoin.com/hc/en-us/articles/360000697832-REST-API-Reference

/* The result will be as below:
 * {"result":true,"info":{"funds":{"borrow":{"ssc":"0","mof":"0","xuc":"0","okb":"0","eos":"0","fair":"0","kcash":"0","theta":"0","vib":"0","ugc":"0","ost":"0","trio":"0","mot":"0","brd":"0","dna":"0","gtc":"0","xmr":"0","lev":"0","zil":"0","ipc":"0","bt1":"0","ctr":"0","zip":"0","bt2":"0","xem":"0","nas":"0","iota":"0","viu":"0","stc":"0","gto":"0","mith":"0","wtc":"0","tnb":"0","dent":"0","dnt":"0","ctxc":"0","light":"0","iost":"0","dgb":"0","dgd":"0","zrx":"0","sub":"0","bcd":"0","aac":"0","bch":"0","poe":"0","omg":"0","cmt":"0","hot":"0","wbtc":"0","bkx":"0","btc":"0","cvc":"0","1st":"0","mag":"0","bcs":"0","btg":"0","bcx":"0","okdk":"0","btm":"0","ark":"0","smt":"0","rcn":"0","key":"0","knc":"0","rct":"0","salt":"0","snc":"0","storj":"0","gnt":"0","dpy":"0","gnx":"0","r":"0","abt":"0","snm":"0","mana":"0","ont":"0","ppt":"0","la":"0","chat":"0","snt":"0","sngls":"0","rdn":"0","fun":"0","bec":"0","ace":"0","auto":"0","ast":"0","pyn":"0","soc":"0","nano":"0","ubtc":"0","ukg":"0","ref":"0","act":"0","yoyo":"0","etc":"0","icn":"0","mkr":"0","dat":"0","etf":"0","vee":"0","usdt":"0","eth":"0","mco":"0","aidoc":"0","topc":"0","atl":"0","wfee":"0","zec":"0","neo":"0","itc":"0","ren":"0","tio":"0","lrc":"0","elf":"0","pra":"0","req":"0","icx":"0","mth":"0","zen":"0","tra":"0","read":"0","mtl":"0","uct":"0","spf":"0","pay":"0","bnt":"0","mda":"0","f4sbtc":"0","utk":"0","edo":"0","xrp":"0","true":"0","rnt":"0","trx":"0","dash":"0","mdt":"0","cic":"0","nuls":"0","rfr":"0","amm":"0","hsr":"0","link":"0","cag":"0","show":"0","sbtc":"0","ngc":"0","qun":"0","qtum":"0","pst":"0","can":"0","of":"0","gas":"0","yee":"0","ltc":"0","lend":"0","avt":"0","eng":"0","enj":"0","san":"0","tct":"0","evx":"0","oax":"0","wrc":"0","dadi":"0","qvt":"0","int":"0","ins":"0","insur":"0","cbt":"0","gsc":"0","xlm":"0","swftc":"0","hmc":"0"},"free":{"ssc":"0","mof":"0","xuc":"0","okb":"0","eos":"0","fair":"0","kcash":"0","theta":"0","vib":"0","ugc":"0","ost":"0","trio":"0","mot":"0","brd":"0","dna":"0","gtc":"0","xmr":"0","lev":"0","zil":"0","ipc":"0","bt1":"0","ctr":"0","zip":"0","bt2":"0","xem":"0","nas":"0","iota":"0","viu":"0","stc":"0","gto":"0","mith":"0","wtc":"0","tnb":"0","dent":"0","dnt":"0","ctxc":"0","light":"0","iost":"0","dgb":"0","dgd":"0","zrx":"0","sub":"0","bcd":"0","aac":"0","bch":"0","poe":"0","omg":"0","cmt":"0","hot":"0","wbtc":"0","bkx":"0","btc":"0","cvc":"0","1st":"0","mag":"0","bcs":"0","btg":"0","bcx":"0","okdk":"0","btm":"0","ark":"0","smt":"0","rcn":"0","key":"0","knc":"0","rct":"0","salt":"0","snc":"0","storj":"0","gnt":"0","dpy":"0","gnx":"0","r":"0","abt":"0","snm":"0","mana":"0","ont":"0","ppt":"0","la":"0","chat":"0","snt":"0","sngls":"0","rdn":"0","fun":"0","bec":"0","ace":"0","auto":"0","ast":"0","pyn":"0","soc":"0","nano":"0","ubtc":"0","ukg":"0","ref":"0","act":"0","yoyo":"0","etc":"0","icn":"0","mkr":"0","dat":"0","etf":"0","vee":"0","usdt":"300","eth":"0","mco":"0","aidoc":"0","topc":"0","atl":"0","wfee":"0","zec":"0","neo":"0","itc":"0","ren":"0","tio":"0","lrc":"0","elf":"0","pra":"0","req":"0","icx":"0","mth":"0","zen":"0","tra":"0","read":"0","mtl":"0","uct":"0","spf":"0","pay":"0","bnt":"0","mda":"0","f4sbtc":"0","utk":"0","edo":"0","xrp":"0","true":"0","rnt":"0","trx":"0","dash":"0","mdt":"0","cic":"0","nuls":"0","rfr":"0","amm":"0","hsr":"0","link":"0","cag":"0","show":"0","sbtc":"0","ngc":"0","qun":"0","qtum":"0","pst":"0","can":"0","of":"0","gas":"0","yee":"0","ltc":"0","lend":"0","avt":"0","eng":"0","enj":"0","san":"0","tct":"0","evx":"0","oax":"0","wrc":"0","dadi":"0","qvt":"0","int":"0","ins":"0","insur":"0","cbt":"0","gsc":"0","xlm":"0","swftc":"0","hmc":"0"},"freezed":{"ssc":"0","mof":"0","xuc":"0","okb":"0","eos":"0","fair":"0","kcash":"0","theta":"0","vib":"0","ugc":"0","ost":"0","trio":"0","mot":"0","brd":"0","dna":"0","gtc":"0","xmr":"0","lev":"0","zil":"0","ipc":"0","bt1":"0","ctr":"0","zip":"0","bt2":"0","xem":"0","nas":"0","iota":"0","viu":"0","stc":"0","gto":"0","mith":"0","wtc":"0","tnb":"0","dent":"0","dnt":"0","ctxc":"0","light":"0","iost":"0","dgb":"0","dgd":"0","zrx":"0","sub":"0","bcd":"0","aac":"0","bch":"0","poe":"0","omg":"0","cmt":"0","hot":"0","wbtc":"0","bkx":"0","btc":"0","cvc":"0","1st":"0","mag":"0","bcs":"0","btg":"0","bcx":"0","okdk":"0","btm":"0","ark":"0","smt":"0","rcn":"0","key":"0","knc":"0","rct":"0","salt":"0","snc":"0","storj":"0","gnt":"0","dpy":"0","gnx":"0","r":"0","abt":"0","snm":"0","mana":"0","ont":"0","ppt":"0","la":"0","chat":"0","snt":"0","sngls":"0","rdn":"0","fun":"0","bec":"0","ace":"0","auto":"0","ast":"0","pyn":"0","soc":"0","nano":"0","ubtc":"0","ukg":"0","ref":"0","act":"0","yoyo":"0","etc":"0","icn":"0","mkr":"0","dat":"0","etf":"0","vee":"0","usdt":"0","eth":"0","mco":"0","aidoc":"0","topc":"0","atl":"0","wfee":"0","zec":"0","neo":"0","itc":"0","ren":"0","tio":"0","lrc":"0","elf":"0","pra":"0","req":"0","icx":"0","mth":"0","zen":"0","tra":"0","read":"0","mtl":"0","uct":"0","spf":"0","pay":"0","bnt":"0","mda":"0","f4sbtc":"0","utk":"0","edo":"0","xrp":"0","true":"0","rnt":"0","trx":"0","dash":"0","mdt":"0","cic":"0","nuls":"0","rfr":"0","amm":"0","hsr":"0","link":"0","cag":"0","show":"0","sbtc":"0","ngc":"0","qun":"0","qtum":"0","pst":"0","can":"0","of":"0","gas":"0","yee":"0","ltc":"0","lend":"0","avt":"0","eng":"0","enj":"0","san":"0","tct":"0","evx":"0","oax":"0","wrc":"0","dadi":"0","qvt":"0","int":"0","ins":"0","insur":"0","cbt":"0","gsc":"0","xlm":"0","swftc":"0","hmc":"0"}}}}
 * */

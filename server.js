const WebSocket = require('ws');
const fs = require('fs');
const zlib = require('zlib');
const bodyParser = require('body-parser');
var express = require('express');
var ejs = require('ejs');
var app = express();

// global variable to store our processed data
var g_data = {'overtime':8000};

// Create a wss for html to receive processed data
const local_wss = new WebSocket.Server({ port: 8081 });
console.log('8081 is the websocket port');
local_wss.on('connection', function connection(local_ws) {
    local_ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    local_wss.clients.forEach(function each(client) {
        client.send(g_data);
    });
});

if (true) {
    // Create a ws to okex server
    //const ws = new WebSocket('wss://okexcomreal.bafang.com:10441/websocket/okcoinapi');
    const ws = new WebSocket('wss://real.okex.com:10440/websocket/okcoinapi');
    ws.binaryType='arraybuffer';

    ws.on('open', function open() {
        // Use binary mode will reduce network loading by 40%
        //ws.send("{'event':'ping'}");
        //ws.send("{'event':'addChannel','parameters':{'binary': '1', 'type': 'all_ticker_3s'}}");
        //ws.send("{'event':'addChannel','parameters':{'base': 'eos', 'binary': '0', 'product': 'spot', 'quote': 'usdt', 'type': 'ticker'}}");
        //ws.send("{'event':'addChannel','parameters':{'base': 'eos', 'binary': '1', 'product': 'spot', 'quote': 'usdt', 'type': 'deal'}}");
        //ws.send("{'event':'addChannel','parameters':{'base': 'eos', 'binary': '1', 'period': '15min', 'product': 'spot', 'quote': 'usdt', 'type': 'kline'}}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_futuredusd_eos_ticker_this_week'}");
        // login (tested but no return value)
        //ws.send("{'event':'login','parameters':{'api_key':'c2b9cd0b-dd07-4893-b3b6-756d75112a4e','sign': '679DDCD8B471ADB045DA215076130230'}}");
        ws.send("{'event':'ping'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_ticker'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_deals'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_balance'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_futureusd_eos_depth_this_week'}");
        //ws.send("{'event':'addChannel','parameters':{'base': 'eos', 'binary': '0', 'product': 'spot', 'quote': 'usdt', 'type': 'depth'}}");
    });

    ws.on('message', function incoming(message) {
        console.log('=================================================');
        console.log(message);
        //processData(message);
        //if (true) {
        //    var array = message;
	//    console.log(array);
        //    if (array.event !== undefined) {
	//	console.log('event');
        //    } 
	//    else if (array.channel !== undefined) {
	//	console.log('channel');
        //    }
	//    else {
	//	console.log('else');
        //    }
        //}
	//else {
	//	console.log('Error');
	//}
        //catch(e) {
        //    // Decode the websocket return binary data
        //    zlib.inflateRaw(message, function(err, result) {
        //        var strData = String.fromCharCode.apply(null, new Uint16Array(result));
        //        //var jsonObj = JSON.parse(strData);
        //        //g_data = JSON.stringify(processData(jsonObj));
        //        console.log(strData);
        //        g_data = strData;
        //        local_wss.clients.forEach(function each(client) {
        //            if (client !== ws && client.readyState === WebSocket.OPEN) {
        //                client.send(strData);
        //            }
        //        });
        //    });
        //}
    });

    //setInterval(function() {
    //    ws.send("{'event':'ping'}");
    //    if ((new Date().getTime() - g_data.lastHeartBeat) > g_data.overtime) {
    //        console.log("socket disconnected");
    //        //testWebSocket();
    //    }
    //}, 5000);
}

// set the view engine to ejs
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.set("view engine", "html"); 
app.use(function(req, res, next) {
    res.locals.userinfo = {
        userid : 123,
        username : "jasonzvz"
    };
    next();
});

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/* Extract the Useful information for processing
 * data will have format as below:
 * [ { base: 'eos',
 * binary: 1,
 * data:
 * { symbol: 'eos_usdt',
 *     last: '17.5891',
 *     productId: 59,
 *     buy: '17.5825',
 *     change: '-0.6509',
 *     sell: '17.5891',
 *     outflows: '97609261.8391',
 *     dayLow: '17.1000',
 *     volume: '12705874.2971',
 *     high: '18.3225',
 *     createdDate: 1525859095140,
 *     inflows: '103693041.0654',
 *     low: '17.1000',
 *     marketFrom: 159,
 *     changePercentage: '-3.57%',
 *     currencyId: 59,
 *     close: '17.5891',
 *     dayHigh: '18.3225',
 *     open: '18.2400' },
 *     product: 'spot',
 *     quote: 'usdt',
 *     type: 'ticker' } ]
 */
function processData(data) {
    var processed_data = {'symbol':'', 'sell':''};
    var numOfData = data.length;
    for (var i = 0; i < numOfData; i++) {
        var obj = data[i].data;
        if (obj.symbol !== undefined) {
            console.log("===> " + obj.symbol + "  last=" + obj.last + "  buy=" + obj.buy + "  sell=" + obj.sell);
            processed_data.symbol = obj.symbol;
            processed_data.sell = obj.sell;
        }
    }
    return processed_data;
}

app.get("/", function(req, res) {
    var html_path = __dirname + '/views/index.html';
    res.sendFile(html_path);
});

app.get("/startMonitor", function(req, res) {
    res.send('Success');
});

app.post("/updateArgument", function(req, res) {
    console.log("updateArgument POST");
    console.log(JSON.stringify(req.body));
    res.sendStatus(200);
});

app.listen(8080);
console.log('8080 is the magic port');

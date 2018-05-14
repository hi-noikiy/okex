const WebSocket = require('ws');
const fs = require('fs');
const zlib = require('zlib');
const bodyParser = require('body-parser');
var express = require('express');
var ejs = require('ejs');
var app = express();

// global variable to store our processed data
var g_future_data = {asks:[], bids:[], timestamp:0};
var g_spot_data = {asks:[], bids:[], timestamp:0};
var g_in_ratio_setting = 3.0; // 3%
var g_out_ratio_setting = 1.0;// 1%


/* Sample data
 * =================================================
Array
[ { binary: 0,
    channel: 'ok_sub_spot_eos_usdt_depth_5',
    data: { asks: [Array], bids: [Array], timestamp: 1526231136287 } } ]
ok_sub_spot_eos_usdt_depth_5
{ asks: 
   [ [ '14.9', '2' ],
     [ '14.899', '113.5501' ],
     [ '14.898', '13.293' ],
     [ '14.878', '80' ],
     [ '14.8779', '50' ] ],
  bids: 
   [ [ '14.8727', '176.7307' ],
     [ '14.87', '300' ],
     [ '14.8423', '28.448' ],
     [ '14.8355', '31.734' ],
     [ '14.8347', '27.858' ] ],
  timestamp: 1526231136287 }
=================================================
Array
[ { binary: 0,
    channel: 'ok_sub_futureusd_eos_depth_this_week_5',
    data: { asks: [Array], bids: [Array], timestamp: 1526231136426 } } ]
ok_sub_futureusd_eos_depth_this_week_5
{ asks: 
   [ [ 14.804, 682, 460.6863, 2038.9286, 3018 ],
     [ 14.803, 362, 244.545, 1578.2423, 2336 ],
     [ 14.802, 636, 429.6716, 1333.6973, 1974 ],
     [ 14.801, 620, 418.8906, 904.0257, 1338 ],
     [ 14.8, 718, 485.1351, 485.1351, 718 ] ],
  bids: 
   [ [ 14.788, 1039, 702.5967, 702.5967, 1039 ],
     [ 14.787, 296, 200.1758, 902.7725, 1335 ],
     [ 14.782, 739, 499.9323, 1402.7048, 2074 ],
     [ 14.78, 365, 246.9553, 1649.6601, 2439 ],
     [ 14.779, 281, 190.1346, 1839.7947, 2720 ] ],
 */

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
    const ws = new WebSocket('wss://okexcomreal.bafang.com:10441/websocket/okcoinapi');
    //const ws = new WebSocket('wss://real.okex.com:10440/websocket/okcoinapi');
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
        //ws.send("{'event':'ping'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_ticker'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_deals'}");
        //ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_balance'}");
        ws.send("{'event':'addChannel','channel':'ok_sub_futureusd_eos_depth_this_week_5'}");
        ws.send("{'event':'addChannel','channel':'ok_sub_spot_eos_usdt_depth_5'}")
    });

    ws.on('message', function incoming(message) {
        console.log('=================================================');
        //console.log(message);
        processData(JSON.parse(message));
        //if (true) {
        ////try {
        //    var array = JSON.parse(message);
	//    //console.log(array);
        //    if (array.event !== undefined) {
	//	console.log('event');
        //    } 
	//    else if (array.channel !== undefined) {
	//	console.log('channel');
        //    }
	//    else {
	//	console.log('else');
	//    	console.log(array);
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
	var dataType = Object.prototype.toString.call(data).slice(8, -1);
	switch(dataType) {
		case 'Array':
			// Data
			console.log('Array');
			console.log(data);
			/* Process Future price depth */
			var channel_type = data[0].channel;
			switch(channel_type) {
				case 'ok_sub_futureusd_eos_depth_this_week_5':
					console.log('ok_sub_futureusd_eos_depth_this_week_5');
					var obj = data[0].data;
					console.log(obj);
					g_future_data = obj;
					break;
				case 'ok_sub_spot_eos_usdt_depth_5':
					console.log('ok_sub_spot_eos_usdt_depth_5');
					var obj = data[0].data;
					console.log(obj);
					g_spot_data = obj;
					// Trigger calculation here because spot market is more active
					calculateRatio(g_future_data, g_spot_data);
					break;
				default:
					// Some addChannel return result
					console.log('default');
					break;
			}
			break;
		case 'Object':
			// ping event
			console.log('Object');
			break;
		default:
			// unknown
			console.log('default');
			break;
	}
    return 0;
}

/* The array_a is the result at first return, array_b is the incremental array to update the array_a */
function updateGlobalArray(array_a, array_b) {
	var array_merged = [];
	if (array_a.length == 0) {
		array_merged = array_b;
	}
	else {
		array_merged = array_a;
	}
	return array_merged;
}

/* 
 * future_data_array: the global future data array
 * spot_data_array  : the global spot data array 
 */
function calculateRatio(future_data_array, spot_data_array) {
	var spot_asks_price = spot_data_array.asks[4][0];
	var spot_bids_price = spot_data_array.bids[0][0];
	var future_asks_price = future_data_array.asks[4][0];
	var future_bids_price = future_data_array.bids[0][0];

	var ratio_in = (future_bids_price - spot_asks_price) *100.0 / spot_asks_price;
	var ratio_out= (spot_bids_price - future_asks_price) *100.0 / future_asks_price;
	console.log('IN:  spot_asks_price:' + spot_asks_price + ', future_bids_price:' + future_bids_price + ', ratio_in: ' + ratio_in + '%' );
	console.log('OUT: future_asks_price:' + future_asks_price + ', spot_bids_price:' + spot_bids_price + ', ratio_out: ' + ratio_out + '%');
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

const WebSocket = require('ws');
const fs = require('fs');
const zlib = require('zlib');

const ws = new WebSocket('wss://okexcomreal.bafang.com:10441/websocket/okcoinapi');
ws.binaryType='arraybuffer';

ws.on('open', function open() {
    //ws.send("{'event':'ping'}");
    // Use binary mode will reduce network loading by 40%
	ws.send("{'event':'addChannel','parameters':{'base': 'eos', 'binary': '1', 'product': 'spot', 'quote': 'usdt', 'type': 'ticker'}}");
});

ws.on('message', function incoming(message) {
    // Decode the websocket return binary data
    zlib.inflateRaw(message, function(err, result) {
        var strData = String.fromCharCode.apply(null, new Uint16Array(result));
        var jsonObj = JSON.parse(strData);
        printData(jsonObj);
    });
});

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
function printData(data) {
    var numOfData = data.length;
    for (var i = 0; i < numOfData; i++) {
        var obj = data[i].data;
        if (obj.symbol !== undefined) {
            console.log("===> " + obj.symbol + "  last=" + obj.last + "  buy=" + obj.buy + "  sell=" + obj.sell);
        }
    }
}


//replace port 8080 below if you wish to change the server port
var serverport = 8080;

var http = require('http');
var qs = require('querystring');
var url = require('url');
var fs = require('fs');
var util = require('util');
var mime = require('C:\\webfrontendInstallations\\nodejs\\node_modules\\mime');
var vidStreamer = require('C:\\webfrontendInstallations\\nodejs\\node_modules\\vid-streamer');

var mydb = require('./mydb');

//write back result
writeResult = function (res, code, result, mimetype) {
    res.writeHead(code, {'Content-Type': mimetype, 'Content-Length': result.length});
    res.write(result);
    res.end();
};


// the GET handler
handleGet = function (req, res) {
    
    if (req.url === "/") {
        writeResult(res, "200", "A Simple Server says: Hello!", "text/plain");
    }
    else if (req.url === '/postAddOrder') {
        addOrder(req, res);
    }
};

//Handles /postAddUser
addOrder = function (req, res) {
    var body = "";
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        var obj = qs.parse(body);
        //var str = "";

        //writeResult(res, "200", str, "text/html");
        mydb.insertOrder(obj.sizeOfPizza, obj.kindOfPizza, obj.cheese, obj.quantity, obj.totalPrice);
    });
};





// HTTP REQUEST HANDLERS
handlePost = function (req, res) {
    if (req.url === "/postAddOrder") {
        addOrder(req, res);
    }
};

// Connect to DB first
mydb.connectDB();

// server starts here
http.createServer(function (req, res) {
    if (req.method === 'GET') {
        handleGet(req, res);
    }
    else
    if (req.method === 'POST') {
        handlePost(req, res);
    }
}).listen(serverport);
util.log('A Simple Node Server is running...');

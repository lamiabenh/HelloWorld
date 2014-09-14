var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

console.info(require);

var handle =  {};
handle["/"] = requestHandlers.start; //the start function
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);
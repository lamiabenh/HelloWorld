var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

console.info(require);

var handle =  {};
handle["/"] = requestHandlers.start; //the start function
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);
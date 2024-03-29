var http = require("http");
var url = require("url");

function start(route, handle){
    
    function OnRequest(request,response){
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("request for " + pathname + " received");
        
        /*request.setEncoding("utf8");
        
        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("POST data chunk received" + postDataChunk);
        }); 
        
        request.addListener("end", function() { 
            route(handle, pathname, response, postData);
        });
        */
        
        //response.writeHead(200,{"Content-Type":"text/plain"});
        //response.write("Hello World!");
        //response.end();
        
        route(handle,pathname,response,request);
    }

    http.createServer(OnRequest).listen(
        process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || '8080',
        process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '172.0.0.1');
    console.log("Server has started.");
}

exports.start = start;


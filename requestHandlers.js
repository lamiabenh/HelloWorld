//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");


function start(response, request){
    /*exec("ls -lah", function (error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end()});*/
    
    console.log("Request Handler Start was called");
    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" enctype="multipart/form-data" '+
        'method="post">' +
        '<input type = "file" name = "upload">'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
    console.log("Request Handler Upload was called");
    
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function(error, fields, files){
        console.log("parsing done");
        
        fs.rename(files.upload.path, "/tmp/test.png", function(error){
            if (error){
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("received image: <br/>");
        response.write("<img src ='/show' />");
        response.end();
    });
    
    /*response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("You sent the text" + querystring.parse(postData).text);
    response.end();
    */
}

function show(response, request){
    console.log("Request Handler Show was called");
    fs.readFile("/tmp/test.png", "binary", function(error, file){
        if (error){
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
      
}

exports.start = start;
exports.upload = upload;
exports.show = show;

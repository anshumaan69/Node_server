//We have to include some libraries 
//HTTP is a  prebuilt / inbuilt library
const http = require("http")
// Some uses of the fs module:handle the files
// Read files
// Create files
// Update files
// Delete files
// Rename files
const fs = require("fs")

//path is to get the path 
const path = require("path")




const port = 3006
//hhtp module makes sure that u are listem=ning to some of the requests
//createServer always listens on the port for some incoming traffic
const server =http.createServer((req,res)=>{
    const filePath= path.join(__dirname,req.url==='/'?"index.html":req.url)

    const extname=String(path.extname(filePath)).toLowerCase()


    const mimeTypes={
        '.html':'text/html',
        '.css':'text/css',
        '.js':'text/javascript',
    }



    const contentType = mimeTypes[extname]

    fs.readFile(filePath,(err,content)=>{
        if(err){
            if(err.code="ENOENT"){
                res.writeHead(404,{"content-type":"text/html"});
                res.end(content,"utf8");
            }
            else{
                res.writeHead(500);
                res.end(`Server error ${err.code}`)
            }

        }
        else{
            res.writeHead(200,{"content-type":contentType});
            res.end(content,"utf8");

        }
    })

})

server.listen(port,()=>{
    
console.log(`Server is listening on port ${port}`)});
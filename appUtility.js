let timeStamp = require('./time.js').timeStamp;
let toS = o=>JSON.stringify(o,null,2);
let fs = require('fs');


let getContentType = (req)=>{
  let extension = req.url.slice(req.url.lastIndexOf('.'));
  let contentTypes = {
    ".jpg" : "img/jpg",
    ".txt" : "text/txt",
    ".html" : "text/html",
    ".css" : "text/css",
    ".pdf" : "application/pdf",
    ".gif" : "img/gif",
    ".js" : "text/javascript"
  };
  return contentTypes[extension];
};

let readFile = function(filePath){
  return fs.readFileSync(filePath,'utf8');
}

let isFile = function(filePath){
  return fs.statSync(filePath).isFile();
}

exports.logRequest = logRequest;
exports.getContentType = getContentType;
exports.readFile = readFile;
exports.isFile = isFile;

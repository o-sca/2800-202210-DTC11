const http = require('http');
const url = require('url'); 


http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    console.log(q.query);

    res.writeHead(200, {
        "content-type": "text-html",
        "access-control-allow-origin": "*"
    });

    res.end(`Hello ${q.query.name}`);
}).listen(3001);
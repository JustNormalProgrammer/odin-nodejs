import http from "node:http";
import fs from "fs";
import url from "url";



const server = http.createServer((req, res) => {
    const adress = url.parse(req.url, true);
    let fileName = './views' + adress.pathname +'.html';

    if (adress.pathname === '/') {
        fileName = './views/index.html';
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {  
            fs.readFile('./views/404.html', (err404, data404) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                if (err404) {
                    res.end('<h1>404 Not Found</h1>'); 
                } else {
                    res.end(data404);
                }
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    });
});

server.listen(8080);
import {createServer} from "http";

const httpServer = createServer((req, res) => {
    console.log({method:req.method})
    console.log({url:req.url})
    console.log({headers:req.headers})
    res.end("este mensaje se muestra en el navegador");
});

httpServer.listen(3000, () => {
    console.log("Server running on port 3000");
})
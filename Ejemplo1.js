import {createServer} from "http";

const httpServer = createServer((req, res) => {
    console.log("este mensaje se va a mostrar por consola")
    res.end("este mensaje se muestra en el navegador");
});

httpServer.listen(3000, () => {
    console.log("Server running on port 3000");
}) 
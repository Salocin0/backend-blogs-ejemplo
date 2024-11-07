import express from "express";


const PORT = 3000;

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello World!<h1>");
});

app.get("/cuenta/:idcuenta/:otroid", (req, res) => {
    const parametros = req.params;
    console.log({parametros})
    res.send({parametros})
});

app.post("/producto", (req, res) => {
    const body = req.body;
    console.log({body})
    res.send({body})
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
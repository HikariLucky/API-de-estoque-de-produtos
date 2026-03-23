const express = require("express");
const fs = require('fs');

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Olá, mundo!");
});

app.get("/protudo", (res, req) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.statusCode(500).json({erro: 'Erro ao ler o arquivo'});
        }

        const json = JSON.parse(data)

        res.json(json.protudo)
    });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta https://localhost:${port}`);
});
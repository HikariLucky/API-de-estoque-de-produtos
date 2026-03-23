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

router.get("/:id", async (res, req) => {
    try {
        const data = await fs.readFile('data.json', 'utf-8');
        const json = JSON.parse(data);

        const id = Number(req.params.id);

        const produto = json.produto.find(p => p.id === id);

        if (!produto){
            res.status(404).json({erro: 'Erro ao ler produtos'});
        }

    } catch {
        res.status(500).json({erro: 'Erro interno'})
    }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta https://localhost:${port}`);
});
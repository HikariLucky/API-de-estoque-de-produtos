const express = require("express");
const fs = require('fs/promises');
const router = express.Router()

const app = express();
const port = 3000;

app.get("/produto", async (res, req) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        if (err) {
            return res.statusCode(500).json({erro: 'Erro ao ler o arquivo'});
        }

        const json = JSON.parse(data)

        res.json(json.protudo)
    });
});

router.get("/produto/:id", async (res, req) => {
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

app.post('/produto', async (res, req) => {
    try{
        const data = await fs.readFile('data.json', 'utf-8');
        const json = JSON.parse(data);

        const {nome, preco} = req.body;
        
        if (!nome || !preco) {
            return res.status(400).json({erro: 'Nome e preço são obrigatórios'})
        }

        const novoId = json.produto.length > 0 ? json.produto[json.produto.length - 1].id + 1 : 1;

        const novoProduto = {
            id: novoId,
            nome,
            preco
        };

        json.produto.push(novoProduto);
        await fs.writeFile('./data.json', JSON.stringify(json, null, 2));

        res.status(201).json(novoProduto)
    } catch {
        res.status(500).json({erro: 'Erro ao criar o produto'})
    }
    
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta https://localhost:${port}`);
});
const { obterLivros, incluir, excluir } = require('../model/livro-dao');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const livros = await obterLivros();
        res.json(livros);

    } catch (error) {
        console.error('Erro ao obter livros:', error);
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const livro = req.body;
        await incluir(livro);
        res.json({ mensagem: 'Livro incluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao incluir livros:', error);
        res.status(500).send(error.message);
    }
});

router.delete('/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo;
        await excluir(codigo);
        res.json({ mensagem: 'Livro excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir livro:', error);
        res.status(500).send(error.message);
    }
})
module.exports = router;
import ControleLivro from "@/classes/controle/ControleLivros";
import { NextApiRequest, NextApiResponse } from "next";

export const controleLivro = new ControleLivro([]);

const metodo1 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const livros = controleLivro.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === "POST") {
      const livro = req.body;
      controleLivro.incluirLivro(livro);
      res.status(200).json({ mensagem: "Sucesso" });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
export default metodo1;

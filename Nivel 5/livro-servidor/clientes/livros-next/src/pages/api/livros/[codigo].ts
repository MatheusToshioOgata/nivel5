import ControleLivro from "@/classes/controle/ControleLivros";
import { NextApiRequest, NextApiResponse } from "next";

const controleLivro = new ControleLivro([]);

const x = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "DELETE") {
      const { codigo } = req.query;
      const cod = (codigo as string);
      controleLivro.excluirLivro(cod);
      res.status(200).json({ mensagem: "Sucesso" });
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
export default x;
import ControleEditora from '@/classes/controle/ControleEditora';
import { arrayEditoras } from '@/classes/controle/ControleEditora';
import { NextApiRequest, NextApiResponse } from "next";


const controleEditora =  new ControleEditora(arrayEditoras);

const y  = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { codEditora } = req.query;
      const nomeEditora = controleEditora.getNomeEditora(Number(codEditora));
      res.status(200).json({ nome: nomeEditora });
    } else {
      res.status(405).end(); 
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};
export default y;
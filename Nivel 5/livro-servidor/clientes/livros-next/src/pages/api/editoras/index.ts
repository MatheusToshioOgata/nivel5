import ControleEditora from '@/classes/controle/ControleEditora';
import { arrayEditoras } from '@/classes/controle/ControleEditora';
import { NextApiRequest, NextApiResponse } from "next";

export const controleEditora = new ControleEditora(arrayEditoras);

const metodos2 = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const editoras = controleEditora.getEditoras();
      res.status(200).json(editoras);
    } else {
      res.status(405).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(); 
  }
};
export default metodos2;
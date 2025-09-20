import { Request, Response } from "express";
import { ItemPedidoService } from "../application/Services/ItemPedidoService";

export class ItemPedidoController {
    private service = new ItemPedidoService();

    async criarItemPedido(req: Request, res: Response){
        try {
            await this.service.criarItemPedido(req.body);
            res.status(204).json("Criado com sucesso.");
        } catch (error) {
            res.status(400).json("Algo deu errado: " + error)
        }
    }

    async atualizarPedido(req: Request, res: Response){
        try {
            const { id } = req.params;
            await this.service.atualizarItemPedido(Number(id), req.body);
            res.status(200).json("Atualizado com sucesso!");
        } catch (error) {
            res.status(400).json("Algo deu errado: " + error)
        }
    }

    async deletarItemPedido(req: Request, res: Response){
        try {
            const { id } = req.params;
            await this.service.deletarItemPedido(Number(id));
            res.status(200).json("Deletado com sucesso");
        } catch (error) {
            res.status(400).json("Algo deu errado: " + error)
        }
    }
}
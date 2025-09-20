import { Request, Response } from "express";
import { PedidoService } from "../application/Services/PedidoService";

export class PedidoController{
    private service = new PedidoService();

    async criarPedido(req: Request, res: Response){
        try {
            await this.service.criarPedido(req.body);
            res.status(204).json("Criado com sucesso");
        } catch (error) {
            res.status(400).json("Não foi possivel criar o pedido: " + error);
        }
    }

    async buscarTodos(req: Request, res: Response){
        try {
            const lista = await this.service.listarTodos();
            res.status(200).json(lista);
        } catch (error) {
            res.status(400).json("Algo deu errado: " + error)
        }
    }

    async buscarPorIdPedido(req: Request, res: Response){
        try {
            const { id } = req.params;
            const encontrado = await this.service.buscarPedidoId(Number(id));
            res.status(200).json(encontrado);
        } catch (error) {
            res.status(404).json("Algo deu errado: " + error)
        }
    }

    async buscarPorIdCliente(req: Request, res: Response){
        try {
            const { id } = req.params;
            const encontrado = this.service.buscarPorIdCliente(Number(id));
            res.status(200).json(encontrado);
        } catch (error) {
            res.status(404).json("Algo deu errado: " + error)
        }
    }

    async atualizarPedido(req: Request, res: Response){
        try {
            const { id }= req.params;
            await this.service.atualizarPedido(Number(id), req.body);
            res.status(200).json("Atualizado com sucesso!");
        } catch (error) {
            res.status(400).json("Algo deu errado: " + error)
        }
    }

    async deletarPedido(req: Request, res: Response){
        try {
            const { id } = req.params;
            await this.service.deletarPedido(Number(id));
            res.status(200).json("Deletado com sucesso");
        } catch (error) {
            res.status(400).json("Algo deu errado: " + error);
        }
    }
}
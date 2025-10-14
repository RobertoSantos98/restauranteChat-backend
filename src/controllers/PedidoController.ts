import { Request, Response } from "express";
import { PedidoService } from "../application/Services/PedidoService";
import { PedidoEventPublisher } from "../application/events/PedidoEventPublisher";
import { io } from "../infrastructure/websocket/SocketIOServer";

const eventPublisher = new PedidoEventPublisher(io);

export class PedidoController{
    private service = new PedidoService(eventPublisher);

    async criarPedido(req: Request, res: Response){
        try {
            const criado = await this.service.criarPedido(req.body);
            res.status(201).json(criado);
        } catch (error) {
            res.status(400).json("Não foi possivel criar o pedido: " + error);
        }
    }

    async buscarTodos(req: Request, res: Response){
        try {
            const { page } = req.params;
            const { limit } = req.params;
            const lista = await this.service.listarTodos(Number(page), Number(limit));
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
            const atualizado = await this.service.atualizarPedido(Number(id), req.body);
            res.status(200).json(atualizado);
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

    async buscaPersonalizada(req: Request, res: Response){
        try {
            const {id, cliente, data, page, limit} = req.query;

            const filtro = {
                id: id? Number(id) : undefined,
                cliente: cliente? String(cliente): undefined,
                data: data ? String(data): undefined
            };

            const pedidos = await this.service.buscaPersonalizada(filtro, Number(page), Number(limit));
            console.log(pedidos)
            return res.status(200).json(pedidos);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
}
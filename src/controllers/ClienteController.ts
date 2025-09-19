import { Response, Request } from "express";
import { ClienteService } from "../application/Services/ClienteService";

export class ClienteController {
    private service = new ClienteService();

    async criarCliente(req: Request, res: Response) {
        try {
            await this.service.criarCliente(req.body);
            res.status(204).json("Cliente Criado com sucesso.");
        } catch (error) {
            res.status(400).json("Erro ao criar cliente: " + error);
        }
    }

    async buscarTodosClientes(req: Request, res: Response){
        try {
            const listagem = await this.service.buscarTodosClientes();
            res.status(200).json(listagem)
        } catch (error) {
            res.status(404).json("Erro ao buscar cliente: " + error)
        }
    }

    async buscarPorId(req: Request, res: Response){
        try {
            const { id } = req.params;
            const encontrado = await this.service.buscarPorId(Number(id));
            res.status(200).json(encontrado);
        } catch (error) {
            res.status(404).json("Erro ao buscar cliente: " + error)
        }
    }

    async atualizarCliente(req: Request, res: Response){
        try {
            const { id } = req.params;
            const atualizado = await this.service.atualizarCliente(Number(id), req.body);
            res.status(200).json(atualizado);
        } catch (error) {
            res.status(400).json("Erro ao atualizar cliente: " + error)
        }
    }

    async deletarCliente(req: Request, res: Response){
        try {
            const { id } = req.params;
            const deletado = await this.service.deletarCliente(Number(id));
            res.status(200).json(deletado)
        } catch (error) {
            res.status(400).json("Erro ao deletar cliente: " + error)
        }
    }

}
import { Request, Response } from "express";
import { PratoService } from "../application/Services/PratoService";

export class PratoController {
    private service = new PratoService();

    async criarPrato(req: Request, res: Response) {
        try {
            const criado = await this.service.criarPrato(req.body);
            res.status(204).json(criado);

        } catch (error) {
            res.status(400).json("Não foi possivel adicionar esse Prato: " + error);
        }
    }

    async listarTodos(req: Request, res: Response) {
        try {
            const listagem = await this.service.listarTodos();
            res.status(200).json(listagem);
        } catch (error) {
            res.status(400).json("Não foi possível listar todos os Pratos no momento: " + error);
        }
    }

    async buscarPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const encontrado = await this.service.buscarPorId(Number(id));
            res.status(200).json(encontrado);
        } catch (error) {
            res.status(404).json("Não foi encontrado o prato no banco de dados: " + error)
        }
    }

    async atualizarPrato(req: Request, res: Response){
        try {
            const { id } = req.params;
            const atualizado = await this.service.atualizarPrato(Number(id), req.body);
            res.status(200).json(atualizado);
        } catch (error) {
            res.status(404).json("Não foi possível atualizar o prato: " + error)
        }
    }

    async deletarPrato(req: Request, res: Response){
        try {
            const { id } = req.params;
            res.status(200).json(await this.service.deletarPrato(Number(id)));
        } catch (error) {
            res.status(400).json("Não foi possível deletar o prato: " + error)
        }
    }

}
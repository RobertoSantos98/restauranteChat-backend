import { CardapioService } from "../application/Services/CardapioService";
import { Request, Response } from "express";

export class CardapioController{
    private service = new CardapioService();

    async criarCardapio(req: Request, res: Response){
        await this.service.criarCardapio(req.body);
    }

    async listarTodos(req: Request, res: Response){
        await this.service.buscarTodos();
    }

    async buscarPorId(req: Request, res: Response){
        const { id } = req.params;
        try {
            const encontrado = await this.service.buscarCardapio(Number(id));
            return res.status(200).json(encontrado);
        } catch (error) {
            return res.status(404).json("Não encontrado!" + error);
        }

    }

    async buscarPorData(req: Request, res: Response){
        try {
            const encontrado = await this.service.buscarCardapioPorData(req.body);
            return res.status(200).json(encontrado);
        } catch (error) {
            return res.status(404).json("Não encontrado: " + error);
        }
    }

    async atualizarCardapio(req: Request, res: Response){
        try {
            const { id } = req.params;
            return res.status(200).json(await this.service.atualizarCardapio(Number(id), req.body))
        } catch (error) {
            return res.status(400).json("Não foi possível encontrar: " + error);
        }
    }

    async removerCardapio(req: Request, res: Response){
        try {
            await this.service.removerCardapio(Number(req.params));
            res.status(200).json("Cardapio removido com sucesso.");
        } catch (error) {
            return res.status(400).json("Algo deu errado: " + error);
        }
    }
}
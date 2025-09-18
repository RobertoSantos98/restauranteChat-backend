import { Request, Response } from 'express'
import { interacoesService } from '../application/Services/InteracoesService'

export class InteracoesController {
    private service = new interacoesService();


    async buscarTodasInteracoes(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.service.buscarTodasInteracoes());
        } catch (error) {
            return res.status(400).json("Não foi possível buscar as interações");
        }
    }

    async buscarInteracaoUsuario(req: Request, res: Response) {
        try {
            return res.status(200).json(await this.service.buscarInteracoesUsuario(Number(req.params)));
        } catch (error) {
            return res.status(400).json("Não foi possível buscar as interações");
        }
    }

}
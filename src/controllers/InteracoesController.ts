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
            const { id } = req.params;
            const lista = await this.service.buscarInteracoesUsuario(Number(id))
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(404).json("Não foi encontrada nenhuma interação: " + error);
        }
    }

}
import { Request, Response } from "express";
import { IngredientesService } from "../application/Services/IngredientesService";

export class IngredienteController {
    private service = new IngredientesService();

    async criarIngredientes(req: Request, res: Response){
        await this.service.criarIngrediente(req.body);
        res.status(204).json("Criado");
    }

    async buscarTodos(res: Response){
        const lista = await this.service.buscarTodosIgredientes();
        res.status(200).json(lista);
    }

    async buscarPorNome(req: Request, res: Response){
        const { nome } = req.params
        const lista = await this.service.buscarPorNome(nome);
        res.status(200).json(lista);
    }

    async buscarPorId(req: Request, res: Response){
        const { id } = req.params;
        const encontrado = await this.service.buscarPorId(Number(id));
        res.status(200).json(encontrado);
    }

    async deletarIngrediente(req: Request, res: Response){
        const { id } = req.params;
        await this.service.deletarIngrediente(Number(id));
        res.status(200).json("Deletado!");
    }
    
}
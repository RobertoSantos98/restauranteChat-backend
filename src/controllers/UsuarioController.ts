import { usuarioService } from "../application/Services/UsuarioService";
import { Request, Response } from "express";

export class UsuarioController {

    private service = new usuarioService();

    async listarTodos(req: Request, res: Response){
        const usuarios = await this.service.listarUsuario();
        res.status(200).json(usuarios);
    }

    async buscarPorId(req: Request, res: Response){
        const { id } = req.params;
        const usuario = this.service.buscarPorId(Number(id));
        res.status(200).json(usuario);
    }

    async criarUsuario(req: Request, res: Response){
        const usuario = await this.service.criarUsuario(req.body);
        res.status(204).json(usuario);
    }

    async deletarUsuario(req: Request, res: Response){
        const { id } = req.params;
        await this.service.removerUsuario(Number(id));
        res.status(204).send()
    }

    async atualizarUsuario(req: Request, res: Response){
        const { id } = req.params;
        const usuario = await this.service.atualizarUsuario(Number(id), req.body);
        res.status(200).json(usuario);
    }


}
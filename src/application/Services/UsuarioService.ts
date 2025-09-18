import { UsuarioRepository } from "../../infrastructure/repositories/UsuarioRepository";
import bcrypt from 'bcryptjs'

export class usuarioService{
    private repository = new UsuarioRepository();

    async listarUsuario(){
        return await this.repository.buscarTodos();
    }

    async buscarPorId(id: number){
        const encontrado = await this.repository.buscarPorId(id);
        if(!encontrado) throw new Error("Usuário não encontrado");
        return encontrado;
    }

    async criarUsuario(data: {nome: string, email: string, senha: string}){
        const existe = await this.repository.buscarPorEmail(data.email);
        
        if(existe) throw new Error("Email já cadastrado!");

        const senhaHashed = await bcrypt.hash(data.senha, 10);
        return this.repository.criarUsuario({...data, senha: senhaHashed});
    }

    async atualizarUsuario(id: number, data: Partial<{nome: string, email: string, senha: string}>){
        if(data.senha){
            data.senha = await bcrypt.hash(data.senha, 10);
        }
        return this.repository.update(id, data);
    }

    async removerUsuario(id: number){
        return await this.repository.deletarUsuario(id);
    }
}
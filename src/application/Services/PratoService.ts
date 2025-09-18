import { PratoRepository } from "../../infrastructure/repositories/PratoRepository";

export class PratoService{
    private repository = new PratoRepository();

    async criarPrato(data: {nome: string, descricao: string, valor: number, idCardapio: number}){
        return await this.repository.criarPrato(data);
    }

    async listarTodos(){
        return await this.repository.buscarTodos();
    }

    async buscarPorId(id:number){
        return await this.repository.buscarPorId(id);
    }

    async atualizarPrato(id: number, data: Partial<{nome: string, descricao: string, valor: number, idCardapio: number}>){
        return await this.repository.atualizarPrato(id, data);
    }

    async deletarPrato(id: number){
        return await this.repository.deletarPrato(id);
    }

}
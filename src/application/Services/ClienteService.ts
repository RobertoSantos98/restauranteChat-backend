import { ClienteRepository } from "../../infrastructure/repositories/Clienterepository";

export class ClienteService {
    private repository = new ClienteRepository();


    async criarCliente(data: {numeroTelefone: string, nome: string}){
        return await this.repository.criarCliente(data);
    }

    async buscarTodosClientes(){
        const lista = await this.repository.buscarTodosCliente();
        if(!lista || lista.length === 0) throw new Error("Não foi encontrado nenhum cliente");
        return lista
    }

    async buscarPorId(id: number){
        return await this.repository.buscarPorId(id);
    }

    async atualizarCliente(id: number, data: {numeroTelefone: string, nome: string}){
        return await this.repository.atualizarCliente(id, data);
    }

    async deletarCliente(id: number){
        return await this.repository.deletarCliente(id);
    }

}
import { PedidoRepository } from "../../infrastructure/repositories/PedidoRepository";

export class PedidoService{
    private repository = new PedidoRepository();

    async criarPedido(data: {clienteId: number, optional: string}){
        return await this.repository.criarPedido(data);
    }

    async listarTodos(){
        return await this.repository.listarTodosPedidos();
    }

    async buscarPedidoId(id: number){
        return await this.repository.listarPorIdPedido(id)
    }

    async buscarPorIdCliente(id: number){
        return await this.repository.listarPorUsuario(id)
    }

    async atualizarPedido(id: number, data: {clienteId: number, optional: string | null}){
        return await this.repository.atualizarPedido(id, data);
    }

    async deletarPedido(id: number){
        return await this.repository.deletarPedido(id)
    }
}
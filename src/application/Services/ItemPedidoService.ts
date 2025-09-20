import { ItemPedidoRepository } from "../../infrastructure/repositories/itemPedidoRepository";

export class ItemPedidoService{
    private repository = new ItemPedidoRepository();

    async criarItemPedido(data: {pedidoId: number, pratoId: number, quantidade: number}){
        if(!data.quantidade){
            data.quantidade = 1;
        }
        return await this.repository.criarItemPedido(data);
    }

    async atualizarItemPedido(id: number, data: {quantidade: number}){
        return await this.repository.atualizarItemPedido(id, data);
    }

    async deletarItemPedido(id: number){
        return await this.repository.deletarItemPedido(id);
    }
}
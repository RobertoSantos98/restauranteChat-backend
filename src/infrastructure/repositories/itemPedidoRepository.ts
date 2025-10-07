import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class ItemPedidoRepository {
    async criarItemPedido(data: { pedidoId: number, pratoId: number, quantidade: number }) {
        await prisma.itemPedido.create({ data })
    }

    async atualizarItemPedido(id: number, data: Partial<{ quantidade: number }>) {
        await prisma.itemPedido.update({ where: { id }, data })
    }

    async buscarItens(){
        await prisma.itemPedido.findMany({include: { pedido: true, prato: true}});
    }

    async buscarItens(id: number){
        await prisma.itemPedido.findUnique({where: { id },include: { pedido: true, prato: true}});
    }

    async deletarItemPedido(id: number) {
        await prisma.itemPedido.delete({ where: { id } })
    }
}
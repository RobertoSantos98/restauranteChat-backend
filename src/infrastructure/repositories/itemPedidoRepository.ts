import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class ItemPedidoRepository {
    async criarItemPedido(data: { pedidoId: number, pratoId: number, quantidade: number }) {
        await prisma.itemPedido.create({ data })
    }

    async atualizarItemPedido(id: number, data: Partial<{ quantidade: number }>) {
        await prisma.itemPedido.update({ where: { id }, data })
    }

    async deletarItemPedido(id: number) {
        await prisma.itemPedido.delete({ where: { id } })
    }
}
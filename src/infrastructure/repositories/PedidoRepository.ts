import { ItemPedido, PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class PedidoRepository {

    async criarPedido(data: { clienteId: number, optional: string | null }) {
        return await prisma.pedido.create({ data });
    }

    async listarTodosPedidos() {
        return await prisma.pedido.findMany({include: { itens: true}});
    }

    async listarPorIdPedido(id: number) {
        return await prisma.pedido.findUnique({ where: { id }, include: { itens: true} })
    }

    async listarPorUsuario(id: number) {
        return await prisma.pedido.findMany({ where: { id }, include: { itens: true} })
    }

    async atualizarPedido(id: number, data: Partial<{ clienteId: number, optional: string | null }>) {
        return await prisma.pedido.update({ where: { id }, data })
    }

    async deletarPedido(id: number) {
        return await prisma.pedido.delete({ where: { id } })
    }

}
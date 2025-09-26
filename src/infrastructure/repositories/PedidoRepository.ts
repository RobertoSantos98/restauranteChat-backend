import { ItemPedido, PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export enum StatusPedido {
    PENDENTE = "PENDENTE",
    EM_PREPARACAO = "EM_PREPARACAO",
    SAIU_ENTREGAR = "SAIU_ENTREGAR",
    ENTREGUE = "ENTREGUE",
    CANCELADO = "CANCELADO"
}

export class PedidoRepository {

    async criarPedido(data: {
        clienteId: number,
        optional: string | null,
        status: StatusPedido,
        itens?: { pratoId: number, quantidade: number }[]
    }) {
        return await prisma.pedido.create({
            data: {
                clienteId: data.clienteId,
                opcional: data.optional,
                status: data.status,
                itens: data.itens ? { create: data.itens } : undefined
            },
            include: {
                itens: true,
                cliente: true
            }
        });
    }

    async listarTodosPedidos() {
        return await prisma.pedido.findMany({ include: { itens: true, cliente: true } });
    }

    async listarPorIdPedido(id: number) {
        return await prisma.pedido.findUnique({ where: { id }, include: { itens: true, cliente: true } })
    }

    async listarPorUsuario(id: number) {
        return await prisma.pedido.findMany({ where: { id }, include: { itens: true, cliente: true } })
    }

    async atualizarPedido(id: number, data: Partial<{ clienteId: number, optional: string | null, status: StatusPedido }>) {
        return await prisma.pedido.update({ where: { id }, data, include: { itens: true, cliente: true } })
    }

    async deletarPedido(id: number) {
        return await prisma.pedido.delete({ where: { id } })
    }

}

export const transicoesValidas: Record<StatusPedido, StatusPedido[]> = {
    [StatusPedido.PENDENTE]: [StatusPedido.EM_PREPARACAO],
    [StatusPedido.EM_PREPARACAO]: [StatusPedido.SAIU_ENTREGAR],
    [StatusPedido.SAIU_ENTREGAR]: [StatusPedido.ENTREGUE],
    [StatusPedido.ENTREGUE]: [],
    [StatusPedido.CANCELADO]: []
}
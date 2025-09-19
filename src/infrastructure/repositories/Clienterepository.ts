import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class ClienteRepository {

    async criarCliente(data: { numeroTelefone: string, nome: string }) {
        return prisma.cliente.create({ data })
    }

    async buscarTodosCliente() {
        return prisma.cliente.findMany({ include: { pedidos: true } })
    }

    async buscarPorId(id: number) {
        return prisma.cliente.findUnique({ where: { id }, include: { pedidos: true } })
    }

    async atualizarCliente(id: number, data: Partial<{ numeroTelefone: string, nome: string }>) {
        return prisma.cliente.update({ where: { id }, data })
    }

    async deletarCliente(id: number) {
        return prisma.cliente.delete({ where: { id } })
    }
}
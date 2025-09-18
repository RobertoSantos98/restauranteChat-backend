import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class PratoRepository {

    async criarPrato(data: { nome: string, descricao: string, valor: number, idCardapio: number }) {
        return await prisma.prato.create({ data });
    }

    async buscarTodos() {
        return await prisma.prato.findMany();
    }

    async buscarPorId(id: number) {
        return await prisma.prato.findUnique({ where: { id } })
    }

    async atualizarPrato(id: number, data: Partial<{ nome: string, descricao: string, valor: number, idCardapio: number }>) {
        return await prisma.prato.update({ where: { id }, data })
    }

    async deletarPrato(id: number) {
        return await prisma.prato.delete({ where: { id } })
    }


}
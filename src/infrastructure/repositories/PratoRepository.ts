import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class PratoRepository {

    async criarPrato(data: { nome: string, descricao: string, valor: number, idCardapio: number }) {
        return await prisma.prato.create({ data });
    }

    async buscarTodos(page:number, limit: number) {
        const skip = (page - 1) * limit;

        const [pratos, total ] = await Promise.all([
            prisma.prato.findMany({
                skip,
                take: limit,
                include: { cardapio: true },
                orderBy: { id: "desc"}
            }),
            prisma.prato.count()
        ])

        return {
            data: pratos,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        }
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
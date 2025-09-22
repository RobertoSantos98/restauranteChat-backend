import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class IngredientesRepository {

    async criarIngredientes(data: { nome: string }) {
        return await prisma.ingrediente.create({ data });
    }

    async buscarTodosIngredientes() {
        return await prisma.ingrediente.findMany();
    }

    async buscarPorNome(nome: string) {
        return await prisma.ingrediente.findMany({ where: { nome } })
    }

    async buscarPorId(id: number) {
        return await prisma.ingrediente.findUnique({ where: { id } });
    }

    async deletarIngrediente(id: number) {
        return await prisma.ingrediente.delete({ where: { id } })
    }
}
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class IngredientesRepository {

    async criarIngredientes(data: { nome: string, quantidade: number }) {
        return await prisma.ingrediente.create({ data });
    }

    async buscarTodosIngredientes() {
        return await prisma.ingrediente.findMany();
    }

    async buscarTodosPaginados(page: number, limit:number) {
        const skip = (page -1 ) * limit;

        const [ingredientes, total] = await Promise.all([
            prisma.ingrediente.findMany({
                skip,
                take: limit,
                orderBy: {
                    id: "desc"
                }
            }),
            prisma.ingrediente.count()
        ]);
        return {
            data: ingredientes,
            total,
            page,
            totalPage: Math.ceil(total/limit)
        } 
    }

    async buscarPorNome(nome: string) {
        return await prisma.ingrediente.findMany({ where: { nome: {contains: nome, mode: "insensitive"} } })
    }

    async buscarPorId(id: number) {
        return await prisma.ingrediente.findUnique({ where: { id } });
    }

    async deletarIngrediente(id: number) {
        return await prisma.ingrediente.delete({ where: { id } })
    }
}
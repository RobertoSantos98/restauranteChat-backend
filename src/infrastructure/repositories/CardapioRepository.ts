import { PrismaClient, Prato } from "../../generated/prisma";

const prisma = new PrismaClient();

export class CardapioRepository {

    async criarCardapio(data: { nome: string}) {
        return await prisma.cardapio.create({ data });
    }

    async buscarTodos(){
        return await prisma.cardapio.findMany({include: {pratos: true}});
    }

    async buscarPorData(data: Date){
        return await prisma.cardapio.findMany({where: {data}});
    }

    async buscarCardapio(id: number) {
        return await prisma.cardapio.findUnique({ where: { id }, include: {pratos: true} });
    }

    async atualizarCardapio(id: number, data: Partial<{ nome: string }>) {
        return await prisma.cardapio.update({ where: { id }, data });
    }

    async deletarCardapio(id: number) {
        return await prisma.cardapio.delete({ where: { id } });
    }
}
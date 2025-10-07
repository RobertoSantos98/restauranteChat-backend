import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class InteracoesRepository {

    async adicionarInteracao(data: { descricao?: string, cardapioId: number, idUsuario: number }) {
        return await prisma.interacoes.create({ data });
    }

    async buscarInteracoesUsuario(idUsuario: number) {
        return await prisma.interacoes.findMany({ where: { idUsuario }, include: { usuario: true, cardapio: true } });
    }

    async buscarTodasInteracoes() {
        return await prisma.interacoes.findMany({ include: { usuario: true, cardapio: true } });
    }
}
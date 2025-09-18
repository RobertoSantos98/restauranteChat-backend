import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export class InteracoesRepository {

    async adicionarInteracao(data: { descricao?: string, cardapioId: number, idUsuario: number }) {
        const usuario = await prisma.usuario.findUnique({ where: {id: data.idUsuario} });
        const cardapio = await prisma.cardapio.findUnique({ where: {id: data.cardapioId} });
        if(!data.descricao){
            data.descricao = `O usuário ${usuario?.nome} fez alteração/ões em ${cardapio}`;
        }
        return await prisma.interacoes.create({ data });
    }

    async buscarInteracoesUsuario(idUsuario: number) {
        return await prisma.interacoes.findMany({ where: { idUsuario } })
    }

    async buscarTodasInteracoes() {
        return await prisma.interacoes.findMany();
    }
}
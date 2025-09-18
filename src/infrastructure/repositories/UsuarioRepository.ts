import { PrismaClient, Usuario } from "../../generated/prisma";

const prisma = new PrismaClient();

export class UsuarioRepository {


    async buscarTodos(): Promise<Usuario[]> {
        return prisma.usuario.findMany();
    }

    async buscarPorId(id: number): Promise<Usuario | null> {
        return prisma.usuario.findUnique({ where: { id } });
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        return prisma.usuario.findUnique({ where: { email } });
    }

    async criarUsuario(data: { nome: string, senha: string, email: string }): Promise<any> {
        return prisma.usuario.create({ data });
    }

    async update(id: number, data: Partial<{ nome: string; email: string; senha: string }>) {
        return prisma.usuario.update({ where: { id }, data });
    }

    async deletarUsuario(id: number){
        return prisma.usuario.delete({where: { id }});
    }
}
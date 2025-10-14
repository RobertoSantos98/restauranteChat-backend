import { ItemPedido, PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

export enum StatusPedido {
    PENDENTE = "PENDENTE",
    EM_PREPARACAO = "EM_PREPARACAO",
    SAIU_ENTREGAR = "SAIU_ENTREGAR",
    ENTREGUE = "ENTREGUE",
    CANCELADO = "CANCELADO"
}

export type FiltroPedido ={
  id?: number,
  cliente?: string,
  data?: string
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

async listarPedidosPaginados(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [pedidos, total] = await Promise.all([
    prisma.pedido.findMany({
      skip,
      take: limit,
      include: {
        cliente: true,
        itens: {
          include: {
            prato: true,
          },
        },
      },
      orderBy: {
        data: "desc",
      },
    }),
    prisma.pedido.count(),
  ]);

  return {
    data: pedidos,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

    async listarPorIdPedido(id: number) {
        return await prisma.pedido.findUnique({ where: { id }, include: { cliente: true, itens: { include: {prato: true}} } })
    }

    async listarPorUsuario(id: number) {
        return await prisma.pedido.findMany({ where: { id }, include: { cliente: true, itens: { include: {prato: true}} } })
    }

    async atualizarPedido(id: number, data: Partial<{ clienteId: number, optional: string | null, status: StatusPedido }>) {
        return await prisma.pedido.update({ where: { id }, data, include: { itens: true, cliente: true } })
    }

    async deletarPedido(id: number) {
        return await prisma.pedido.delete({ where: { id } })
    }

    async buscaPersonalizada(filtro: FiltroPedido, page: number, limit: number){
      const where: any = {};

      if (filtro.id) {
        where.id = filtro.id
      }

      if(filtro.cliente){
        where.cliente ={ nome: {
          contains: filtro.cliente, 
          mode: "insensitive"
        }};
      }

      if(filtro.data){
        const start = new Date(filtro.data);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filtro.data);
        end.setHours(23, 59, 59, 999);
        where.data = { gte: start, lte: end};
      }
      
      console.log("WHERE gerado:", where);
      
      if(Object.keys(where).length === 0){
        return []
      }

      const skip = (page -1) * limit;

      const [pedidos, total] = await Promise.all([
        await prisma.pedido.findMany({
          where,
          skip,
          take: limit,
          include: { cliente: true },
          orderBy: { id: "desc"}
        }),
        prisma.pedido.count({where})
      ])

      return {
        data: pedidos,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      }
      
    }

}

export const transicoesValidas: Record<StatusPedido, StatusPedido[]> = {
    [StatusPedido.PENDENTE]: [StatusPedido.EM_PREPARACAO],
    [StatusPedido.EM_PREPARACAO]: [StatusPedido.SAIU_ENTREGAR],
    [StatusPedido.SAIU_ENTREGAR]: [StatusPedido.ENTREGUE],
    [StatusPedido.ENTREGUE]: [],
    [StatusPedido.CANCELADO]: []
}
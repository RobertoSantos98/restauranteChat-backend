import { InteracoesRepository } from "../../infrastructure/repositories/InteracoesRepository";
import { UsuarioRepository } from "../../infrastructure/repositories/UsuarioRepository";
import { CardapioRepository } from "../../infrastructure/repositories/CardapioRepository";

export enum MotivoInteracao {
    VISUALIZACAO = "VISUALIZACAO",
    COMPRA = "COMPRA",
    CRIACAO = "CRIACAO",
    ALTERACAO = "ALTERACAO",
}

export interface InteracaoRules {
    criacao: (usuario: string, cardapio: string) => string
}

export class interacoesService {
    private repository = new InteracoesRepository();
    private repositoryUsuario = new UsuarioRepository();
    private repositoryCardapio = new CardapioRepository();

    async adicionarInteracao(data: { idUsuario: number, cardapioId: number, motivo: MotivoInteracao }) {

        const usuario = await this.repositoryUsuario.buscarPorId(data.idUsuario)
        const cardapio = await this.repositoryCardapio.buscarCardapio(data.cardapioId)

        const descricao = interacaoRulesMap[data.motivo].criacao(usuario?.nome!, cardapio?.nome!);

        await this.repository.adicionarInteracao({idUsuario: data.idUsuario, cardapioId: data.cardapioId, descricao: descricao});

        return
    }

    async buscarInteracoesUsuario(id: number) {
        return await this.repository.buscarInteracoesUsuario(id);
    }

    async buscarTodasInteracoes() {
        return await this.repository.buscarTodasInteracoes();
    }
}

export const interacaoRulesMap: Record<MotivoInteracao, InteracaoRules> = {
    [MotivoInteracao.CRIACAO]: {
        criacao: (usuario, cardapio) => `O usuário ${usuario} criou o cardápio ${cardapio}`
    },
    [MotivoInteracao.ALTERACAO]: {
        criacao: (usuario, cardapio) => `O usuário ${usuario} fez alteração/ões no cardápio ${cardapio}`
    },
    [MotivoInteracao.COMPRA]: {
        criacao: (usuario, cardapio) => `O Cliente ${usuario} fez comprou do cardápio ${cardapio}`
    },
    [MotivoInteracao.VISUALIZACAO]: {
        criacao: (usuario, cardapio) => `O usuário ${usuario} visualizaou o cardápio ${cardapio}`
    }
}
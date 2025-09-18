import { InteracoesRepository } from "../../infrastructure/repositories/InteracoesRepository";
import { UsuarioRepository } from "../../infrastructure/repositories/UsuarioRepository";
import { CardapioRepository } from "../../infrastructure/repositories/CardapioRepository";

export class interacoesService {
    private repository = new InteracoesRepository();
    private repositoryUsuario = new UsuarioRepository();
    private repositoryCardapio = new CardapioRepository();

    async adicionarInteracao(data: { idUsuario: number, cardapioId: number, descricao: string }) {
        return await this.repository.adicionarInteracao(data);
    }

    async buscarInteracoesUsuario(id: number){
        return await this.repository.buscarInteracoesUsuario(id);
    }

    async buscarTodasInteracoes(){
        return await this.repository.buscarTodasInteracoes();
    }
}
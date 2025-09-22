import { IngredientesRepository } from "../../infrastructure/repositories/IngredientesRepository";

export class IngredientesService {
    private repository = new IngredientesRepository()

    async criarIngrediente(data: {nome: string}){
        try {
            await this.repository.criarIngredientes(data);
            return
        } catch (error) {
            throw new Error("Não foi possível salvar o Ingrediente!: " + error)
        }
    }

    async buscarTodosIgredientes(){
        try {
            const lista = await this.repository.buscarTodosIngredientes();
            if (lista.length === 0) {
                throw new Error("Não foi encontrado nenhum Item.");
            }
        } catch (error) {
            throw new Error("Algo deu errado: " + error);
        }
    }

    async buscarPorNome(nome: string){
        try {
            const lista = await this.repository.buscarPorNome(nome);
            if (lista.length === 0) {
                throw new Error("Não foi encontrado nenhum Item.");
            }
        } catch (error) {
            throw new Error("Algo deu errado: " + error);
        }
    }

    async buscarPorId(id: number){
        try {
            const encontrado = await this.repository.buscarPorId(id);
            if (!encontrado) {
                throw new Error("Não foi encontrado nenhum Item.");
            }
        } catch (error) {
            throw new Error("Algo deu errado: " + error);
        }
    }

    async deletarIngrediente(id: number){
        try {
            await this.repository.deletarIngrediente(id);
            return
        } catch (error) {
            throw new Error("Algo deu errado ao deletar: " + error); 
        }
    }



}
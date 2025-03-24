import Manutencao from "@/types/Manutencao";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "manutencoes_veiculo";

export default class ManutencaoService {
    /**
     * Obtém a lista de manutenções salvas.
     */
    public async obterManutencoes(): Promise<Manutencao[]> {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            return jsonValue ? JSON.parse(jsonValue) : [];
        } catch (error) {
            console.error("Erro ao obter manutenções:", error);
            return [];
        }
    }

    /**
     * Obtém uma manutenção específica pelo ID.
     * @param id Número identificador da manutenção
     */
    public async obterManutencaoPorId(id: number): Promise<Manutencao | undefined> {
        try {
            const manutencoes = await this.obterManutencoes();

            if (manutencoes.length === 0) throw new Error("Nenhuma manutenção encontrada.");

            const manutencao = manutencoes.find((item: Manutencao) => item.id === id);
            return manutencao;
        } catch (error) {
            console.error("Erro ao obter manutenção por ID:", error);
            return undefined;
        }
    }

    /**
     * Cria uma nova manutenção.
     * @param manutencao Objeto contendo os dados da manutenção
     */
    public async criarManutencao(manutencao: Manutencao): Promise<string> {
        try {
            const manutencoes = await this.obterManutencoes();
            manutencoes.push(manutencao);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(manutencoes));
            return "Manutenção criada com sucesso";
        } catch (error) {
            console.error("Erro ao criar manutenção:", error);
            return "Erro ao criar manutenção";
        }
    }

    /**
     * Atualiza uma manutenção existente.
     * @param id ID da manutenção a ser atualizada
     * @param manutencao Objeto contendo os novos dados para atualizar
     */
    public async atualizarManutencao(id: number, manutencaoToUpdate: Partial<Manutencao>): Promise<string> {
        try {
            let manutencoes = await this.obterManutencoes();

            if (manutencoes.length === 0) throw new Error("Nenhuma manutenção encontrada.");

            const index = manutencoes.findIndex((manutencao) => manutencao.id === id);

            if (index === -1) {
                console.warn("Manutenção não encontrada:", id);
                throw new Error("Manutenção não encontrada");
            }

            // Atualiza os campos necessários sem perder os dados antigos
            manutencoes[index] = { ...manutencoes[index], ...manutencaoToUpdate };

            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(manutencoes));

            return `Manutenção ${id} atualizada com sucesso`;
        } catch (error) {
            console.error("Erro ao atualizar manutenção:", error);
            return "Erro ao atualizar manutenção";
        }
    }

    /**
     * Deleta uma manutenção.
     * @param id ID da manutenção a ser deletada
     */
    public async deletarManutencao(id: number): Promise<void> {
        try {
            const manutencoes = await this.obterManutencoes();
            const index = manutencoes.findIndex((manutencao) => manutencao.id === id);
            if (index === -1) {
                console.warn("Manutenção não encontrada:", id);
                throw new Error("Manutenção não encontrada");
            }
            const novasManutencoes = manutencoes.filter((manutencao) => manutencao.id !== id);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novasManutencoes));
        } catch (error) {
            console.error("Erro ao deletar manutenção:", error);
        }
    }
}

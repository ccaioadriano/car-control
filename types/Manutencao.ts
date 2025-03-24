
type Manutencao = {
    id: number,
    tipo: string,
    data: Date,
    km: number,
    prioridade: string,
    custo?: string, // mudar para number
    proxKm?: number, // Próxima manutenção após 5.000 km
    proxData?: Date, // Opcional, mas pode existir
}

export default Manutencao;
export interface ConviteRequestDTO {
    curso_id: number;
    dias_validade?: number; // Quantidade de dias que o convite será válido (padrão: 7 dias)
}

export class ConviteRequestDTOImpl implements ConviteRequestDTO {
    curso_id: number;
    dias_validade: number;

    constructor(data: ConviteRequestDTO) {
        this.curso_id = data.curso_id;
        this.dias_validade = data.dias_validade || 7;
    }

    dataToPrisma() {
        const expiraEm = new Date();
        expiraEm.setDate(expiraEm.getDate() + this.dias_validade);

        return {
            curso_id: this.curso_id,
            expira_em: expiraEm,
        };
    }
}


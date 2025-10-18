export interface JogadorRequestDTO {
    nome: string;
    rm: string;
    curso_id: number;
}

export class JogadorRequestDTOImpl implements JogadorRequestDTO {
    nome: string;
    rm: string;
    curso_id: number;

    constructor(data: any) {
        this.nome = data.nome?.trim();
        this.rm = data.rm?.trim();
        this.curso_id = Number(data.curso_id);
    }

    dataToPrisma() {
        return {
            nome: this.nome,
            rm: this.rm,
            curso_id: this.curso_id,
        };
    }
}


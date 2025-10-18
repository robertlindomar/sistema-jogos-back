export interface CursoRequestDTO {
    nome: string;
}

export class CursoRequestDTOImpl implements CursoRequestDTO {
    nome: string;

    constructor(data: any) {
        this.nome = data.nome?.trim();
    }

    dataToPrisma() {
        return {
            nome: this.nome,
        };
    }
}


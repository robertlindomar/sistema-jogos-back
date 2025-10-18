export interface CursoResponseDTO {
    id: number;
    nome: string;
    createdAt: Date;
    updatedAt: Date;
}

export class CursoResponseDTOImpl implements CursoResponseDTO {
    id: number;
    nome: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.nome = data.nome;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}


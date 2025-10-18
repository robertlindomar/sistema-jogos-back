import { CursoResponseDTO, CursoResponseDTOImpl } from "../dtos/CursoResponseDTO";

export class CursoModel {
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

    static prismaToModel(prismaData: any): CursoModel {
        return new CursoModel({
            id: prismaData.id,
            nome: prismaData.nome,
            createdAt: prismaData.createdAt,
            updatedAt: prismaData.updatedAt,
        });
    }

    toResponse(): CursoResponseDTO {
        return new CursoResponseDTOImpl({
            id: this.id,
            nome: this.nome,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        });
    }
}


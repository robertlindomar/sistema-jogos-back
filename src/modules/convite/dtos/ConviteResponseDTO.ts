import { ConviteModel } from "../models/ConviteModel";

export interface ConviteResponseDTO {
    id: number;
    token: string;
    curso: {
        id: number;
        nome: string;
    };
    criado_por: {
        id: number;
        nome: string;
    };
    expira_em: string;
    ativo: boolean;
    link: string;
    createdAt: string;
}

export class ConviteResponseDTOImpl implements ConviteResponseDTO {
    id: number;
    token: string;
    curso: {
        id: number;
        nome: string;
    };
    criado_por: {
        id: number;
        nome: string;
    };
    expira_em: string;
    ativo: boolean;
    link: string;
    createdAt: string;

    constructor(convite: ConviteModel, frontendUrl: string) {
        this.id = convite.id;
        this.token = convite.token;
        this.curso = {
            id: convite.curso?.id || convite.curso_id,
            nome: convite.curso?.nome || "",
        };
        this.criado_por = {
            id: convite.usuario?.id || convite.criado_por,
            nome: convite.usuario?.nome || "",
        };
        this.expira_em = convite.expira_em.toISOString();
        this.ativo = convite.ativo;
        this.link = `${frontendUrl}/convite/${convite.token}`;
        this.createdAt = convite.createdAt.toISOString();
    }
}


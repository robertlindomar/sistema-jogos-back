export class ConviteModel {
    id: number;
    token: string;
    curso_id: number;
    curso?: {
        id: number;
        nome: string;
    };
    criado_por: number;
    usuario?: {
        id: number;
        nome: string;
        email: string;
    };
    expira_em: Date;
    ativo: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.token = data.token;
        this.curso_id = data.curso_id;
        this.curso = data.curso;
        this.criado_por = data.criado_por;
        this.usuario = data.usuario;
        this.expira_em = data.expira_em;
        this.ativo = data.ativo;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    static prismaToModel(data: any): ConviteModel {
        return new ConviteModel({
            id: data.id,
            token: data.token,
            curso_id: data.curso_id,
            curso: data.curso ? {
                id: data.curso.id,
                nome: data.curso.nome,
            } : undefined,
            criado_por: data.criado_por,
            usuario: data.usuario ? {
                id: data.usuario.id,
                nome: data.usuario.nome,
                email: data.usuario.email,
            } : undefined,
            expira_em: data.expira_em,
            ativo: data.ativo,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
}


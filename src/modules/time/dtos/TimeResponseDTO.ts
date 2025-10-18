export interface TimeResponseDTO {
    id: number;
    nome: string;
    jogador1_id: number;
    jogador2_id: number;
    suporte_id: number;
    curso_id: number;
    cadastrado_por: string;
    data_cadastro: Date;
    jogador1?: {
        id: number;
        nome: string;
        rm: string;
    };
    jogador2?: {
        id: number;
        nome: string;
        rm: string;
    };
    suporte?: {
        id: number;
        nome: string;
        rm: string;
    };
    curso?: {
        id: number;
        nome: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export class TimeResponseDTOImpl implements TimeResponseDTO {
    id: number;
    nome: string;
    jogador1_id: number;
    jogador2_id: number;
    suporte_id: number;
    curso_id: number;
    cadastrado_por: string;
    data_cadastro: Date;
    jogador1?: {
        id: number;
        nome: string;
        rm: string;
    };
    jogador2?: {
        id: number;
        nome: string;
        rm: string;
    };
    suporte?: {
        id: number;
        nome: string;
        rm: string;
    };
    curso?: {
        id: number;
        nome: string;
    };
    createdAt: Date;
    updatedAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.nome = data.nome;
        this.jogador1_id = data.jogador1_id;
        this.jogador2_id = data.jogador2_id;
        this.suporte_id = data.suporte_id;
        this.curso_id = data.curso_id;
        this.cadastrado_por = data.cadastrado_por;
        this.data_cadastro = data.data_cadastro;

        if (data.jogador1) {
            this.jogador1 = {
                id: data.jogador1.id,
                nome: data.jogador1.nome,
                rm: data.jogador1.rm,
            };
        }

        if (data.jogador2) {
            this.jogador2 = {
                id: data.jogador2.id,
                nome: data.jogador2.nome,
                rm: data.jogador2.rm,
            };
        }

        if (data.suporte) {
            this.suporte = {
                id: data.suporte.id,
                nome: data.suporte.nome,
                rm: data.suporte.rm,
            };
        }

        if (data.curso) {
            this.curso = {
                id: data.curso.id,
                nome: data.curso.nome,
            };
        }

        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}


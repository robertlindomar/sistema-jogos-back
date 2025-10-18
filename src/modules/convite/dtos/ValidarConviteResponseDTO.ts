export interface ValidarConviteResponseDTO {
    valido: boolean;
    curso?: {
        id: number;
        nome: string;
    };
    mensagem?: string;
}

export class ValidarConviteResponseDTOImpl implements ValidarConviteResponseDTO {
    valido: boolean;
    curso?: {
        id: number;
        nome: string;
    };
    mensagem?: string;

    constructor(data: ValidarConviteResponseDTO) {
        this.valido = data.valido;
        this.curso = data.curso;
        this.mensagem = data.mensagem;
    }
}


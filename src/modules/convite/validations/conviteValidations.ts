import { ConviteRequestDTO } from "../dtos/ConviteRequestDTO";

export function validateConviteRequest(data: ConviteRequestDTO): string[] {
    const errors: string[] = [];

    if (!data.curso_id) {
        errors.push("curso_id é obrigatório");
    }

    if (data.curso_id && (typeof data.curso_id !== "number" || data.curso_id <= 0)) {
        errors.push("curso_id deve ser um número positivo");
    }

    if (data.dias_validade !== undefined) {
        if (typeof data.dias_validade !== "number" || data.dias_validade <= 0) {
            errors.push("dias_validade deve ser um número positivo");
        }

        if (data.dias_validade > 365) {
            errors.push("dias_validade não pode ser maior que 365 dias");
        }
    }

    return errors;
}


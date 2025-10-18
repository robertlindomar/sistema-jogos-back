export function validarCriacaoCurso(dados: any): string[] {
    const errors: string[] = [];

    if (!dados.nome || typeof dados.nome !== "string") {
        errors.push("Nome é obrigatório e deve ser um texto");
    } else if (dados.nome.trim().length < 2) {
        errors.push("Nome deve ter pelo menos 2 caracteres");
    } else if (dados.nome.trim().length > 100) {
        errors.push("Nome deve ter no máximo 100 caracteres");
    }

    return errors;
}

export function validarAtualizacaoCurso(dados: any): string[] {
    const errors: string[] = [];

    if (dados.nome !== undefined) {
        if (typeof dados.nome !== "string") {
            errors.push("Nome deve ser um texto");
        } else if (dados.nome.trim().length < 2) {
            errors.push("Nome deve ter pelo menos 2 caracteres");
        } else if (dados.nome.trim().length > 100) {
            errors.push("Nome deve ter no máximo 100 caracteres");
        }
    }

    if (Object.keys(dados).length === 0) {
        errors.push("Nenhum campo foi fornecido para atualização");
    }

    return errors;
}

export function validarCursoId(params: any): string[] {
    const errors: string[] = [];

    if (!params.id) {
        errors.push("ID é obrigatório");
    } else if (isNaN(Number(params.id))) {
        errors.push("ID deve ser um número");
    } else if (Number(params.id) <= 0) {
        errors.push("ID deve ser um número positivo");
    }

    return errors;
}

export function validarPaginacaoQuery(query: any): string[] {
    const errors: string[] = [];

    if (query.page !== undefined) {
        const pageNum = Number(query.page);
        if (isNaN(pageNum) || !Number.isInteger(pageNum) || pageNum < 1) {
            errors.push("Page deve ser um número inteiro positivo");
        }
    }

    if (query.limit !== undefined) {
        const limitNum = Number(query.limit);
        if (isNaN(limitNum) || !Number.isInteger(limitNum) || limitNum < 1) {
            errors.push("Limit deve ser um número inteiro positivo");
        }
        if (limitNum > 100) {
            errors.push("Limit não pode ser maior que 100");
        }
    }

    return errors;
}


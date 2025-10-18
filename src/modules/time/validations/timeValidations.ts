export function validarCriacaoTime(dados: any): string[] {
    const errors: string[] = [];

    if (!dados.nome || typeof dados.nome !== "string") {
        errors.push("Nome é obrigatório e deve ser um texto");
    } else if (dados.nome.trim().length < 2) {
        errors.push("Nome deve ter pelo menos 2 caracteres");
    } else if (dados.nome.trim().length > 100) {
        errors.push("Nome deve ter no máximo 100 caracteres");
    }

    if (!dados.jogador1_id) {
        errors.push("ID do jogador 1 é obrigatório");
    } else if (isNaN(Number(dados.jogador1_id))) {
        errors.push("ID do jogador 1 deve ser um número");
    } else if (Number(dados.jogador1_id) <= 0) {
        errors.push("ID do jogador 1 deve ser um número positivo");
    }

    if (!dados.jogador2_id) {
        errors.push("ID do jogador 2 é obrigatório");
    } else if (isNaN(Number(dados.jogador2_id))) {
        errors.push("ID do jogador 2 deve ser um número");
    } else if (Number(dados.jogador2_id) <= 0) {
        errors.push("ID do jogador 2 deve ser um número positivo");
    }

    if (!dados.suporte_id) {
        errors.push("ID do suporte é obrigatório");
    } else if (isNaN(Number(dados.suporte_id))) {
        errors.push("ID do suporte deve ser um número");
    } else if (Number(dados.suporte_id) <= 0) {
        errors.push("ID do suporte deve ser um número positivo");
    }

    if (!dados.curso_id) {
        errors.push("ID do curso é obrigatório");
    } else if (isNaN(Number(dados.curso_id))) {
        errors.push("ID do curso deve ser um número");
    } else if (Number(dados.curso_id) <= 0) {
        errors.push("ID do curso deve ser um número positivo");
    }

    if (!dados.cadastrado_por || typeof dados.cadastrado_por !== "string") {
        errors.push("Cadastrado por é obrigatório e deve ser um texto");
    } else if (dados.cadastrado_por.trim().length < 2) {
        errors.push("Cadastrado por deve ter pelo menos 2 caracteres");
    }

    // Validação para evitar jogadores duplicados
    if (
        dados.jogador1_id &&
        dados.jogador2_id &&
        Number(dados.jogador1_id) === Number(dados.jogador2_id)
    ) {
        errors.push("Jogador 1 e Jogador 2 não podem ser o mesmo");
    }

    if (
        dados.jogador1_id &&
        dados.suporte_id &&
        Number(dados.jogador1_id) === Number(dados.suporte_id)
    ) {
        errors.push("Jogador 1 e Suporte não podem ser o mesmo");
    }

    if (
        dados.jogador2_id &&
        dados.suporte_id &&
        Number(dados.jogador2_id) === Number(dados.suporte_id)
    ) {
        errors.push("Jogador 2 e Suporte não podem ser o mesmo");
    }

    return errors;
}

export function validarAtualizacaoTime(dados: any): string[] {
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

    if (dados.jogador1_id !== undefined) {
        if (isNaN(Number(dados.jogador1_id))) {
            errors.push("ID do jogador 1 deve ser um número");
        } else if (Number(dados.jogador1_id) <= 0) {
            errors.push("ID do jogador 1 deve ser um número positivo");
        }
    }

    if (dados.jogador2_id !== undefined) {
        if (isNaN(Number(dados.jogador2_id))) {
            errors.push("ID do jogador 2 deve ser um número");
        } else if (Number(dados.jogador2_id) <= 0) {
            errors.push("ID do jogador 2 deve ser um número positivo");
        }
    }

    if (dados.suporte_id !== undefined) {
        if (isNaN(Number(dados.suporte_id))) {
            errors.push("ID do suporte deve ser um número");
        } else if (Number(dados.suporte_id) <= 0) {
            errors.push("ID do suporte deve ser um número positivo");
        }
    }

    if (dados.curso_id !== undefined) {
        if (isNaN(Number(dados.curso_id))) {
            errors.push("ID do curso deve ser um número");
        } else if (Number(dados.curso_id) <= 0) {
            errors.push("ID do curso deve ser um número positivo");
        }
    }

    if (Object.keys(dados).length === 0) {
        errors.push("Nenhum campo foi fornecido para atualização");
    }

    // Validação para evitar jogadores duplicados na atualização
    const jogador1 = dados.jogador1_id ? Number(dados.jogador1_id) : null;
    const jogador2 = dados.jogador2_id ? Number(dados.jogador2_id) : null;
    const suporte = dados.suporte_id ? Number(dados.suporte_id) : null;

    if (jogador1 && jogador2 && jogador1 === jogador2) {
        errors.push("Jogador 1 e Jogador 2 não podem ser o mesmo");
    }

    if (jogador1 && suporte && jogador1 === suporte) {
        errors.push("Jogador 1 e Suporte não podem ser o mesmo");
    }

    if (jogador2 && suporte && jogador2 === suporte) {
        errors.push("Jogador 2 e Suporte não podem ser o mesmo");
    }

    return errors;
}

export function validarTimeId(params: any): string[] {
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

    if (query.curso_id !== undefined) {
        const cursoId = Number(query.curso_id);
        if (isNaN(cursoId) || cursoId <= 0) {
            errors.push("ID do curso deve ser um número positivo");
        }
    }

    return errors;
}


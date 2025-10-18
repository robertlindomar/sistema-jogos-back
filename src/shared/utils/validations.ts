/**
 * Funções de validação manual seguindo as regras do sistema
 * SEMPRE retornar array de strings com erros em português
 */

// Validação de Email
export function validateEmailFormat(email: string): string[] {
  const errors: string[] = [];
  if (!email) {
    return errors; // Email é opcional
  }
  
  // Regex robusta para formato de e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    errors.push("E-mail deve ter um formato válido");
  }
  
  if (email.length > 100) {
    errors.push("E-mail deve ter no máximo 100 caracteres");
  }
  
  return errors;
}

// Validação de ID
export function validateUserId(params: any): string[] {
  const errors: string[] = [];
  if (!params.id) {
    errors.push("ID é obrigatório");
    return errors;
  }
  
  const id = Number(params.id);
  if (isNaN(id)) {
    errors.push("ID deve ser um número");
  } else if (id <= 0) {
    errors.push("ID deve ser um número positivo");
  } else if (!Number.isInteger(id)) {
    errors.push("ID deve ser um número inteiro");
  }
  
  return errors;
}

// Validação de Paginação
export function validatePaginationQuery(query: any): string[] {
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
    } else if (limitNum > 100) {
      errors.push("Limit deve ser no máximo 100");
    }
  }
  
  return errors;
}

// Validação de Nome
export function validateNome(nome: string, campo: string = "Nome"): string[] {
  const errors: string[] = [];
  if (!nome) {
    errors.push(`${campo} é obrigatório`);
    return errors;
  }
  
  if (nome.length < 2) {
    errors.push(`${campo} deve ter pelo menos 2 caracteres`);
  }
  
  if (nome.length > 100) {
    errors.push(`${campo} deve ter no máximo 100 caracteres`);
  }
  
  return errors;
}

// Validação de Senha
export function validateSenha(senha: string): string[] {
  const errors: string[] = [];
  if (!senha) {
    errors.push("Senha é obrigatória");
    return errors;
  }
  
  if (senha.length < 6) {
    errors.push("Senha deve ter pelo menos 6 caracteres");
  }
  
  if (senha.length > 255) {
    errors.push("Senha deve ter no máximo 255 caracteres");
  }
  
  return errors;
}

// Validação de CPF
export function validateCPF(cpf: string): string[] {
  const errors: string[] = [];
  if (!cpf) {
    return errors; // CPF é opcional
  }
  
  // Remove caracteres não numéricos
  const cpfLimpo = cpf.replace(/\D/g, '');
  
  if (cpfLimpo.length !== 11) {
    errors.push("CPF deve ter 11 dígitos");
    return errors;
  }
  
  // Validação básica de CPF
  if (/^(\d)\1{10}$/.test(cpfLimpo)) {
    errors.push("CPF inválido");
    return errors;
  }
  
  // Algoritmo de validação do CPF
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.charAt(9))) {
    errors.push("CPF inválido");
    return errors;
  }
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.charAt(10))) {
    errors.push("CPF inválido");
  }
  
  return errors;
}

// Validação de CNPJ
export function validateCNPJ(cnpj: string): string[] {
  const errors: string[] = [];
  if (!cnpj) {
    return errors; // CNPJ é opcional
  }
  
  // Remove caracteres não numéricos
  const cnpjLimpo = cnpj.replace(/\D/g, '');
  
  if (cnpjLimpo.length !== 14) {
    errors.push("CNPJ deve ter 14 dígitos");
    return errors;
  }
  
  // Validação básica de CNPJ
  if (/^(\d)\1{13}$/.test(cnpjLimpo)) {
    errors.push("CNPJ inválido");
    return errors;
  }
  
  // Algoritmo de validação do CNPJ
  let soma = 0;
  let peso = 2;
  for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpjLimpo.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;
  
  if (digito1 !== parseInt(cnpjLimpo.charAt(12))) {
    errors.push("CNPJ inválido");
    return errors;
  }
  
  soma = 0;
  peso = 2;
  for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpjLimpo.charAt(i)) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  
  if (digito2 !== parseInt(cnpjLimpo.charAt(13))) {
    errors.push("CNPJ inválido");
  }
  
  return errors;
}

// Validação de Telefone
export function validateTelefone(telefone: string, campo: string = "Telefone"): string[] {
  const errors: string[] = [];
  if (!telefone) {
    return errors; // Telefone é opcional
  }
  
  // Remove caracteres não numéricos
  const telefoneLimpo = telefone.replace(/\D/g, '');
  
  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    errors.push(`${campo} deve ter 10 ou 11 dígitos`);
  }
  
  return errors;
}

// Validação de Data
export function validateData(data: string, campo: string = "Data"): string[] {
  const errors: string[] = [];
  if (!data) {
    return errors; // Data é opcional
  }
  
  const dataObj = new Date(data);
  if (isNaN(dataObj.getTime())) {
    errors.push(`${campo} deve ter um formato válido`);
  }
  
  return errors;
}

// Validação de UF
export function validateUF(uf: string): string[] {
  const errors: string[] = [];
  if (!uf) {
    errors.push("UF é obrigatória");
    return errors;
  }
  
  const ufsValidas = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];
  
  if (!ufsValidas.includes(uf.toUpperCase())) {
    errors.push("UF deve ser um estado válido do Brasil");
  }
  
  return errors;
}

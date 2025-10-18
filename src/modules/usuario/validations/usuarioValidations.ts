import {
  validateEmailFormat,
  validateNome,
  validateSenha
} from "../../../shared/utils/validations";

/**
 * Validações específicas do módulo Usuario
 */

// Validação para criar usuário
export function validateCreateUsuario(data: any): string[] {
  const errors: string[] = [];

  // Validações obrigatórias
  errors.push(...validateNome(data.nome, "Nome"));
  errors.push(...validateEmailFormat(data.email));
  errors.push(...validateSenha(data.senha));

  return errors;
}

// Validação para atualizar usuário
export function validateUpdateUsuario(data: any): string[] {
  const errors: string[] = [];

  // Validações condicionais - só valida se o campo estiver presente
  if (data.nome !== undefined) {
    errors.push(...validateNome(data.nome, "Nome"));
  }

  if (data.email !== undefined) {
    errors.push(...validateEmailFormat(data.email));
  }

  if (data.senha !== undefined) {
    errors.push(...validateSenha(data.senha));
  }

  return errors;
}

// Validação para login
export function validateLogin(data: any): string[] {
  const errors: string[] = [];

  // Validações obrigatórias
  errors.push(...validateEmailFormat(data.email));

  if (!data.senha) {
    errors.push("Senha é obrigatória");
  }

  return errors;
}

// Validação para trocar senha
export function validateTrocarSenha(data: any): string[] {
  const errors: string[] = [];

  if (!data.senhaAtual) {
    errors.push("Senha atual é obrigatória");
  }

  errors.push(...validateSenha(data.novaSenha));

  return errors;
}

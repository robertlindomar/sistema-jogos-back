import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

/**
 * Middleware de validação genérico
 * Executa funções de validação e retorna erros em português
 */
export function createValidationMiddleware(validators: Array<(data: any) => string[]>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const errors: string[] = [];

    // Executa todas as funções de validação
    validators.forEach(validator => {
      // Detecta automaticamente qual fonte usar baseado no nome da função
      const validatorName = validator.name || '';
      let validatorErrors: string[] = [];

      // Se o validador tem "Id" no nome, valida params (para IDs na URL)
      if (validatorName.includes('Id') || validatorName.includes('Param')) {
        validatorErrors = validator(req.params);
      }
      // Se o validador tem "Query" no nome, valida query string
      else if (validatorName.includes('Query') || validatorName.includes('Paginacao')) {
        validatorErrors = validator(req.query);
      }
      // Caso contrário, valida body
      else {
        validatorErrors = validator(req.body);
      }

      errors.push(...validatorErrors);
    });

    // Se houver erros, retorna 400 com array de erros
    if (errors.length > 0) {
      throw new AppError(errors.join("; "), 400);
    }

    next();
  };
}

/**
 * Middleware para validação de ID nos parâmetros
 */
export function validateIdParam(req: Request, res: Response, next: NextFunction): void {
  const { validateUserId } = require("../utils/validations");
  const errors = validateUserId(req.params);

  if (errors.length > 0) {
    throw new AppError(errors.join("; "), 400);
  }

  next();
}

/**
 * Middleware para validação de paginação
 */
export function validatePagination(req: Request, res: Response, next: NextFunction): void {
  const { validatePaginationQuery } = require("../utils/validations");
  const errors = validatePaginationQuery(req.query);

  if (errors.length > 0) {
    throw new AppError(errors.join("; "), 400);
  }

  next();
}

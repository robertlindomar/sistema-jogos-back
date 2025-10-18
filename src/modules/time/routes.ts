import { Router, Request, Response, NextFunction } from "express";
import { TimeController } from "./controllers/TimeController";
import { createValidationMiddleware } from "../../shared/middlewares/validationMiddleware";
import {
    validarCriacaoTime,
    validarAtualizacaoTime,
    validarTimeId,
    validarPaginacaoQuery,
} from "./validations/timeValidations";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";

export function timeRoutes() {
    const router = Router();
    const timeController = new TimeController();

    // Rota para listar times com paginação
    router.get(
        "/",
        autenticarJWT,
        createValidationMiddleware([validarPaginacaoQuery]),
        (req: Request, res: Response, next: NextFunction) =>
            timeController.listTimesPaginated(req, res, next)
    );

    // Rota para listar times por curso
    router.get(
        "/curso/:curso_id",
        autenticarJWT,
        (req: Request, res: Response, next: NextFunction) =>
            timeController.listTimesByCurso(req, res, next)
    );

    // Rota para criar time
    router.post(
        "/",
        autenticarJWT,
        createValidationMiddleware([validarCriacaoTime]),
        (req: Request, res: Response, next: NextFunction) =>
            timeController.createTime(req, res, next)
    );

    // Rota para buscar time por ID
    router.get(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarTimeId]),
        (req: Request, res: Response, next: NextFunction) =>
            timeController.getTimeById(req, res, next)
    );

    // Rota para atualizar time
    router.put(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarTimeId, validarAtualizacaoTime]),
        (req: Request, res: Response, next: NextFunction) =>
            timeController.updateTime(req, res, next)
    );

    // Rota para deletar time
    router.delete(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarTimeId]),
        (req: Request, res: Response, next: NextFunction) =>
            timeController.deleteTime(req, res, next)
    );

    return router;
}


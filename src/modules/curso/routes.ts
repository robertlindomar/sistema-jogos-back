import { Router, Request, Response, NextFunction } from "express";
import { CursoController } from "./controllers/CursoController";
import { createValidationMiddleware } from "../../shared/middlewares/validationMiddleware";
import {
    validarCriacaoCurso,
    validarAtualizacaoCurso,
    validarCursoId,
    validarPaginacaoQuery,
} from "./validations/cursoValidations";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";

export function cursoRoutes() {
    const router = Router();
    const cursoController = new CursoController();

    // Rota para listar todos os cursos (sem paginação)
    router.get(
        "/all",
        autenticarJWT,
        (req: Request, res: Response, next: NextFunction) =>
            cursoController.listAllCursos(req, res, next)
    );

    // Rota para listar cursos com paginação
    router.get(
        "/",
        autenticarJWT,
        createValidationMiddleware([validarPaginacaoQuery]),
        (req: Request, res: Response, next: NextFunction) =>
            cursoController.listCursosPaginated(req, res, next)
    );

    // Rota para criar curso
    router.post(
        "/",
        autenticarJWT,
        createValidationMiddleware([validarCriacaoCurso]),
        (req: Request, res: Response, next: NextFunction) =>
            cursoController.createCurso(req, res, next)
    );

    // Rota para buscar curso por ID
    router.get(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarCursoId]),
        (req: Request, res: Response, next: NextFunction) =>
            cursoController.getCursoById(req, res, next)
    );

    // Rota para atualizar curso
    router.put(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarCursoId, validarAtualizacaoCurso]),
        (req: Request, res: Response, next: NextFunction) =>
            cursoController.updateCurso(req, res, next)
    );

    // Rota para deletar curso
    router.delete(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarCursoId]),
        (req: Request, res: Response, next: NextFunction) =>
            cursoController.deleteCurso(req, res, next)
    );

    return router;
}


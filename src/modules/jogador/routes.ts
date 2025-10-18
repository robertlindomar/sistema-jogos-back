import { Router, Request, Response, NextFunction } from "express";
import { JogadorController } from "./controllers/JogadorController";
import { createValidationMiddleware } from "../../shared/middlewares/validationMiddleware";
import {
    validarCriacaoJogador,
    validarAtualizacaoJogador,
    validarJogadorId,
    validarPaginacaoQuery,
} from "./validations/jogadorValidations";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";

export function jogadorRoutes() {
    const router = Router();
    const jogadorController = new JogadorController();

    // Rota para listar jogadores com paginação
    router.get(
        "/",
        autenticarJWT,
        createValidationMiddleware([validarPaginacaoQuery]),
        (req: Request, res: Response, next: NextFunction) =>
            jogadorController.listJogadoresPaginated(req, res, next)
    );

    // Rota para listar jogadores por curso
    router.get(
        "/curso/:curso_id",
        autenticarJWT,
        (req: Request, res: Response, next: NextFunction) =>
            jogadorController.listJogadoresByCurso(req, res, next)
    );

    // Rota para criar jogador
    router.post(
        "/",
        autenticarJWT,
        createValidationMiddleware([validarCriacaoJogador]),
        (req: Request, res: Response, next: NextFunction) =>
            jogadorController.createJogador(req, res, next)
    );

    // Rota para buscar jogador por ID
    router.get(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarJogadorId]),
        (req: Request, res: Response, next: NextFunction) =>
            jogadorController.getJogadorById(req, res, next)
    );

    // Rota para atualizar jogador
    router.put(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarJogadorId, validarAtualizacaoJogador]),
        (req: Request, res: Response, next: NextFunction) =>
            jogadorController.updateJogador(req, res, next)
    );

    // Rota para deletar jogador
    router.delete(
        "/:id",
        autenticarJWT,
        createValidationMiddleware([validarJogadorId]),
        (req: Request, res: Response, next: NextFunction) =>
            jogadorController.deleteJogador(req, res, next)
    );

    return router;
}


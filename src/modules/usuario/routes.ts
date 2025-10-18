import { Router, Request, Response, NextFunction } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware, validateIdParam } from "../../shared/middlewares/validationMiddleware";
import {
    validateCreateUsuario,
    validateUpdateUsuario,
    validateLogin,
    validateTrocarSenha
} from "./validations/usuarioValidations";

export function usuarioRoutes() {
    const router = Router();
    const usuarioController = new UsuarioController();

    // Rotas com validação
    router.post("/",
        autenticarJWT,
        createValidationMiddleware([validateCreateUsuario]),
        (req: Request, res: Response, next: NextFunction) => usuarioController.criar(req, res, next)
    );

    router.get("/", autenticarJWT, (req: Request, res: Response, next: NextFunction) => usuarioController.listar(req, res, next));

    router.get("/:id",
        autenticarJWT,
        validateIdParam,
        (req: Request, res: Response, next: NextFunction) => usuarioController.buscarPorId(req, res, next)
    );

    router.put("/senha/:id",
        autenticarJWT,
        validateIdParam,
        createValidationMiddleware([validateTrocarSenha]),
        (req: Request, res: Response, next: NextFunction) => usuarioController.trocarSenha(req, res, next)
    );

    router.get("/email/:email", autenticarJWT, (req: Request, res: Response, next: NextFunction) => usuarioController.buscarPorEmail(req, res, next));

    router.post("/login",
        createValidationMiddleware([validateLogin]),
        (req: Request, res: Response, next: NextFunction) => usuarioController.login(req, res, next)
    );

    router.put("/:id",
        autenticarJWT,
        validateIdParam,
        createValidationMiddleware([validateUpdateUsuario]),
        (req: Request, res: Response, next: NextFunction) => usuarioController.atualizar(req, res, next)
    );

    router.delete("/:id",
        autenticarJWT,
        validateIdParam,
        (req: Request, res: Response, next: NextFunction) => usuarioController.excluir(req, res, next)
    );

    return router;
}

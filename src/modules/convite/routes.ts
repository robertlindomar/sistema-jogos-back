import { Router } from "express";
import { ConviteController } from "./controllers/ConviteController";
import { autenticarJWT } from "../../shared/middlewares/autenticarJWT";
import { createValidationMiddleware } from "../../shared/middlewares/validationMiddleware";
import { validateConviteRequest } from "./validations/conviteValidations";

const router = Router();
const conviteController = new ConviteController();

// Rotas públicas
router.get("/validar/:token", conviteController.validarConvite);

// Rotas protegidas
router.use(autenticarJWT);

router.post(
    "/",
    createValidationMiddleware([validateConviteRequest]),
    conviteController.criarConvite
);

router.get("/meus-convites", conviteController.listarMeusConvites);
router.get("/curso/:curso_id", conviteController.listarConvitesPorCurso);
router.patch("/:id/desativar", conviteController.desativarConvite);
router.delete("/:id", conviteController.excluirConvite);

export default router;


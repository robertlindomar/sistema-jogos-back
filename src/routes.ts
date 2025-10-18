// src/routes.ts
import { Router } from "express";
import { usuarioRoutes } from "./modules/usuario/routes";
import { cursoRoutes } from "./modules/curso/routes";
import { jogadorRoutes } from "./modules/jogador/routes";
import { timeRoutes } from "./modules/time/routes";
import conviteRoutes from "./modules/convite/routes";
import convitePublicRoutes from "./modules/convite/routes-publicas";

export function routes() {
    const router = Router();

    // Rota login 
    router.use("/auth", usuarioRoutes());

    // Rotas do módulo usuário
    router.use("/usuario", usuarioRoutes());

    // Rotas do módulo curso
    router.use("/curso", cursoRoutes());

    // Rotas do módulo jogador
    router.use("/jogador", jogadorRoutes());

    // Rotas do módulo time
    router.use("/time", timeRoutes());

    // Rotas públicas do convite (não requerem autenticação) - DEVE VIR PRIMEIRO
    router.use("/convite/public", convitePublicRoutes);

    // Rotas do módulo convite
    router.use("/convite", conviteRoutes);

    return router;
}

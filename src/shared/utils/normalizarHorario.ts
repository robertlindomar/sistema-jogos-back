/**
 * Utilitário para normalizar horários para formato DateTime do Prisma
 * Seguindo as regras do UNIFUNEC
 */

export const normalizarHorario = (horario: string | undefined): string | undefined => {
    if (!horario) return undefined;

    // Se já está no formato ISO completo, retorna como está
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(horario)) {
        return horario;
    }

    // Se está no formato HH:MM, converte para ISO com data padrão (2000-01-01)
    if (/^\d{2}:\d{2}$/.test(horario)) {
        return new Date(`2000-01-01T${horario}:00.000Z`).toISOString();
    }

    // Se está no formato HH:MM:SS, converte para ISO com data padrão (2000-01-01)
    if (/^\d{2}:\d{2}:\d{2}$/.test(horario)) {
        return new Date(`2000-01-01T${horario}.000Z`).toISOString();
    }

    // Tenta converter qualquer outro formato válido
    const date = new Date(horario);
    if (!isNaN(date.getTime())) {
        return date.toISOString();
    }

    return undefined;
};

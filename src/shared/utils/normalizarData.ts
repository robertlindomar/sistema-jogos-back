export const normalizarData = (data: string | undefined): string | undefined => {
    if (!data) return undefined;

    // Se já está no formato ISO completo, retorna como está
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(data)) {
        return data;
    }

    // Se está no formato YYYY-MM-DD, converte para ISO
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        return new Date(data + "T00:00:00.000Z").toISOString();
    }

    // Tenta converter qualquer outro formato válido
    const date = new Date(data);
    if (!isNaN(date.getTime())) {
        return date.toISOString();
    }

    return data;
};

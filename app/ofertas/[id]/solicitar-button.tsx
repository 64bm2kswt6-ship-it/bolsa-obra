"use client";

import { useActionState } from "react";
import { solicitarOferta, type SolicitarState } from "./actions";

const estadoInicial: SolicitarState = undefined;

export function SolicitarButton({ ofertaId }: { ofertaId: string }) {
  const solicitarConId = solicitarOferta.bind(null, ofertaId);
  const [state, formAction, pending] = useActionState(solicitarConId, estadoInicial);

  if (state && "success" in state) {
    return (
      <button
        type="button"
        disabled
        className="rounded-xl bg-gray-200 px-4 py-2.5 text-sm font-medium text-gray-500"
      >
        Ya has solicitado esta oferta
      </button>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
      >
        {pending ? "Enviando..." : "Solicitar"}
      </button>
      {state && "error" in state && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}
    </form>
  );
}

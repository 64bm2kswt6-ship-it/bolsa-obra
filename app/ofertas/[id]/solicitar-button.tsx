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
        className="btn bg-gray-200 text-gray-600"
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
        className="btn btn-yellow w-full sm:w-auto sm:min-w-56"
      >
        {pending ? "Enviando..." : "Solicitar"}
      </button>
      {state && "error" in state && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800" role="alert">{state.error}</p>
      )}
    </form>
  );
}

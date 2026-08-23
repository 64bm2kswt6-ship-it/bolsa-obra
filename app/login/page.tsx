"use client";

import Link from "next/link";
import { useActionState } from "react";
import { autenticar, type LoginState } from "./actions";

const estadoInicial: LoginState = undefined;

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(autenticar, estadoInicial);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-sm flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="underline">
          Regístrate
        </Link>
      </p>
    </div>
  );
}

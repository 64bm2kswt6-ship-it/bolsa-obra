"use client";

import Link from "next/link";
import { useActionState } from "react";
import { autenticar, type LoginState } from "./actions";

const estadoInicial: LoginState = undefined;

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(autenticar, estadoInicial);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-16">
      <div className="ficha w-full max-w-sm overflow-hidden">
      <div className="cinta" aria-hidden="true" style={{ height: 8 }} />
      <div className="flex flex-col gap-6 p-6 sm:p-8">
      <h1 className="font-display text-5xl font-black uppercase leading-none">Iniciar sesión</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-bold text-gray-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="campo"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-bold text-gray-800">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="campo"
          />
        </div>

        {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800" role="alert">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="btn btn-dark mt-1 w-full"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-bold underline decoration-2 underline-offset-4 hover:decoration-obra">
          Regístrate
        </Link>
      </p>
      </div>
      </div>
    </div>
  );
}

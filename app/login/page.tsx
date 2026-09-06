"use client";

import Link from "next/link";
import { useActionState } from "react";
import { autenticar, type LoginState } from "./actions";

const estadoInicial: LoginState = undefined;

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(autenticar, estadoInicial);

  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(255,203,5,0.14), transparent 60%), radial-gradient(50% 40% at 85% 90%, rgba(20,20,20,0.05), transparent 60%), linear-gradient(180deg, #fffdf5 0%, #ffffff 55%)",
        }}
      />
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
      <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-900">Iniciar sesión</h1>

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
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-shadow focus:border-gray-900 focus:shadow-sm"
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
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-shadow focus:border-gray-900 focus:shadow-sm"
          />
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-gray-900 underline">
          Regístrate
        </Link>
      </p>
      </div>
      </div>
    </div>
  );
}

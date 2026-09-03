"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { registrar, type RegistroState } from "./actions";

const estadoInicial: RegistroState = undefined;

function Campo({
  id,
  label,
  type = "text",
}: {
  id: string;
  label: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="rounded border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  );
}

export default function RegistroPage() {
  const [rol, setRol] = useState<"TRABAJADOR" | "EMPRESA">("TRABAJADOR");
  const [state, formAction, pending] = useActionState(registrar, estadoInicial);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-md flex-col justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Crear cuenta</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <Campo id="email" label="Email" type="email" />

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          />
          <span className="text-xs text-gray-500">Mínimo 8 caracteres.</span>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium text-gray-700">Soy...</legend>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="rol"
                value="TRABAJADOR"
                checked={rol === "TRABAJADOR"}
                onChange={() => setRol("TRABAJADOR")}
              />
              Trabajador
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="rol"
                value="EMPRESA"
                checked={rol === "EMPRESA"}
                onChange={() => setRol("EMPRESA")}
              />
              Empresa
            </label>
          </div>
        </fieldset>

        {rol === "TRABAJADOR" ? (
          <>
            <Campo id="nombre" label="Nombre" />
            <Campo id="apellidos" label="Apellidos" />
            <Campo id="telefono" label="Teléfono" />
            <Campo id="poblacion" label="Población" />
            <Campo id="provincia" label="Provincia" />
            <Campo id="oficioPrincipal" label="Oficio principal" />
            <div className="flex flex-col gap-1">
              <label
                htmlFor="aniosExperiencia"
                className="text-sm font-medium text-gray-700"
              >
                Años de experiencia
              </label>
              <input
                id="aniosExperiencia"
                name="aniosExperiencia"
                type="number"
                min={0}
                defaultValue={0}
                className="rounded border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </>
        ) : (
          <>
            <Campo id="razonSocial" label="Razón social" />
            <Campo id="cif" label="CIF" />
            <Campo id="personaContacto" label="Persona de contacto" />
            <Campo id="telefono" label="Teléfono" />
          </>
        )}

        <label className="flex items-start gap-2 text-sm text-gray-600">
          <input type="checkbox" name="acepto" required className="mt-1" />
          <span>
            He leído y acepto la{" "}
            <Link href="/privacidad" target="_blank" className="underline">
              Política de Privacidad
            </Link>{" "}
            y los{" "}
            <Link href="/terminos" target="_blank" className="underline">
              Términos de Uso
            </Link>
            .
          </span>
        </label>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

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
      <label htmlFor={id} className="text-sm font-bold text-gray-800">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="campo"
      />
    </div>
  );
}

export default function RegistroPage() {
  const [rol, setRol] = useState<"TRABAJADOR" | "EMPRESA">("TRABAJADOR");
  const [state, formAction, pending] = useActionState(registrar, estadoInicial);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-16">
      <div className="ficha w-full max-w-md overflow-hidden">
      <div className="cinta" aria-hidden="true" style={{ height: 8 }} />
      <div className="flex flex-col gap-6 p-6 sm:p-8">
      <h1 className="font-display text-5xl font-black uppercase leading-none">Crear cuenta</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <Campo id="email" label="Email" type="email" />

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-bold text-gray-800">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="campo"
          />
          <span className="text-sm text-gray-600">Mínimo 8 caracteres.</span>
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-bold text-gray-800">Soy...</legend>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border-2 text-base font-bold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 ${
                rol === "TRABAJADOR"
                  ? "border-asfalto bg-asfalto text-obra"
                  : "border-gray-300 bg-white text-gray-700 hover:border-asfalto"
              }`}
            >
              <input
                type="radio"
                name="rol"
                value="TRABAJADOR"
                checked={rol === "TRABAJADOR"}
                onChange={() => setRol("TRABAJADOR")}
                className="sr-only"
              />
              Trabajador
            </label>
            <label
              className={`flex min-h-12 cursor-pointer items-center justify-center rounded-[10px] border-2 text-base font-bold transition-[background-color,border-color,color,transform] duration-150 active:scale-[0.98] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 ${
                rol === "EMPRESA"
                  ? "border-asfalto bg-asfalto text-obra"
                  : "border-gray-300 bg-white text-gray-700 hover:border-asfalto"
              }`}
            >
              <input
                type="radio"
                name="rol"
                value="EMPRESA"
                checked={rol === "EMPRESA"}
                onChange={() => setRol("EMPRESA")}
                className="sr-only"
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
                className="text-sm font-bold text-gray-800"
              >
                Años de experiencia
              </label>
              <input
                id="aniosExperiencia"
                name="aniosExperiencia"
                type="number"
                min={0}
                defaultValue={0}
                className="campo"
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
          <input type="checkbox" name="acepto" required className="mt-1 h-5 w-5 shrink-0" />
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

        {state?.error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-800" role="alert">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="btn btn-dark mt-1 w-full"
        >
          {pending ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <p className="text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-bold underline decoration-2 underline-offset-4 hover:decoration-obra">
          Inicia sesión
        </Link>
      </p>
      </div>
      </div>
    </div>
  );
}

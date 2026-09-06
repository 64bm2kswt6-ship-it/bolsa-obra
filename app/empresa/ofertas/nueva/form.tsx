"use client";

import { useActionState } from "react";
import { crearOferta, type NuevaOfertaState } from "./actions";

const estadoInicial: NuevaOfertaState = undefined;

function Campo({
  id,
  label,
  type = "text",
  ...props
}: {
  id: string;
  label: string;
  type?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "type">) {
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
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-shadow focus:border-gray-900 focus:shadow-sm"
        {...props}
      />
    </div>
  );
}

export function NuevaOfertaForm() {
  const [state, formAction, pending] = useActionState(crearOferta, estadoInicial);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Campo id="titulo" label="Título" />
      <Campo id="oficio" label="Oficio" />
      <Campo
        id="numeroPuestos"
        label="Número de puestos"
        type="number"
        min={1}
        defaultValue={1}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          rows={4}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-shadow focus:border-gray-900 focus:shadow-sm"
        />
      </div>

      <Campo id="poblacion" label="Población" />
      <Campo id="provincia" label="Provincia" />
      <Campo id="fechaInicio" label="Fecha de inicio" type="date" />
      <Campo
        id="duracionDias"
        label="Duración (días)"
        type="number"
        min={1}
        defaultValue={1}
      />
      <Campo id="salario" label="Salario" type="number" min={0} step="0.01" />

      <div className="flex flex-col gap-1">
        <label htmlFor="tipoSalario" className="text-sm font-medium text-gray-700">
          Tipo de salario
        </label>
        <select
          id="tipoSalario"
          name="tipoSalario"
          required
          defaultValue="JORNADA"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition-shadow focus:border-gray-900 focus:shadow-sm"
        >
          <option value="HORA">Por hora</option>
          <option value="JORNADA">Por jornada</option>
          <option value="MES">Por mes</option>
        </select>
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
      >
        {pending ? "Publicando..." : "Publicar oferta"}
      </button>
    </form>
  );
}

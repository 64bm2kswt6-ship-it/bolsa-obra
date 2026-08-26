"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/app/lib/prisma";
import { requireEmpresa } from "@/app/lib/require-empresa";

export type NuevaOfertaState = { error: string } | undefined;

function campo(formData: FormData, nombre: string) {
  return String(formData.get(nombre) ?? "").trim();
}

export async function crearOferta(
  _prevState: NuevaOfertaState,
  formData: FormData,
): Promise<NuevaOfertaState> {
  const empresa = await requireEmpresa();

  const titulo = campo(formData, "titulo");
  const oficio = campo(formData, "oficio");
  const descripcion = campo(formData, "descripcion");
  const poblacion = campo(formData, "poblacion");
  const provincia = campo(formData, "provincia");
  const fechaInicio = campo(formData, "fechaInicio");
  const tipoSalario = campo(formData, "tipoSalario");
  const numeroPuestos = Number(campo(formData, "numeroPuestos"));
  const duracionDias = Number(campo(formData, "duracionDias"));
  const salario = Number(campo(formData, "salario"));

  if (!titulo || !oficio || !descripcion || !poblacion || !provincia || !fechaInicio) {
    return { error: "Completa todos los campos de la oferta." };
  }
  if (!Number.isFinite(numeroPuestos) || numeroPuestos < 1) {
    return { error: "El número de puestos debe ser al menos 1." };
  }
  if (!Number.isFinite(duracionDias) || duracionDias < 1) {
    return { error: "La duración debe ser de al menos 1 día." };
  }
  if (!Number.isFinite(salario) || salario <= 0) {
    return { error: "El salario debe ser un número mayor que 0." };
  }
  if (tipoSalario !== "HORA" && tipoSalario !== "JORNADA" && tipoSalario !== "MES") {
    return { error: "Elige un tipo de salario válido." };
  }

  const fechaInicioFecha = new Date(fechaInicio);
  if (Number.isNaN(fechaInicioFecha.getTime())) {
    return { error: "La fecha de inicio no es válida." };
  }

  await prisma.oferta.create({
    data: {
      titulo,
      oficio,
      numeroPuestos,
      descripcion,
      poblacion,
      provincia,
      fechaInicio: fechaInicioFecha,
      duracionDias,
      salario,
      tipoSalario,
      empresaId: empresa.id,
    },
  });

  revalidatePath("/empresa/ofertas");
  redirect("/empresa/ofertas");
}

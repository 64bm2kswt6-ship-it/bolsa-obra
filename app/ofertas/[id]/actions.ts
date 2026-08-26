"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export type SolicitarState = { error: string } | { success: true } | undefined;

export async function solicitarOferta(
  ofertaId: string,
  _prevState: SolicitarState,
  _formData: FormData,
): Promise<SolicitarState> {
  const session = await auth();

  if (!session?.user || session.user.role !== "TRABAJADOR") {
    return { error: "Debes iniciar sesión como trabajador para solicitar esta oferta." };
  }

  const perfil = await prisma.perfilTrabajador.findUnique({
    where: { usuarioId: session.user.id },
  });

  if (!perfil) {
    return { error: "No se ha encontrado tu perfil de trabajador." };
  }

  const oferta = await prisma.oferta.findUnique({ where: { id: ofertaId } });

  if (!oferta || oferta.estado !== "ACTIVA") {
    return { error: "Esta oferta ya no está disponible." };
  }

  try {
    await prisma.solicitud.create({
      data: { ofertaId, trabajadorId: perfil.id },
    });
  } catch (error) {
    const yaExiste =
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
    if (!yaExiste) {
      return { error: "No se pudo enviar la solicitud. Inténtalo de nuevo." };
    }
  }

  revalidatePath(`/ofertas/${ofertaId}`);
  return { success: true };
}

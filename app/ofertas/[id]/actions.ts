"use server";

import { revalidatePath } from "next/cache";
import { Resend } from "resend";
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

  const oferta = await prisma.oferta.findUnique({
    where: { id: ofertaId },
    include: { empresa: { include: { usuario: { select: { email: true } } } } },
  });

  if (!oferta || oferta.estado !== "ACTIVA") {
    return { error: "Esta oferta ya no está disponible." };
  }

  let creada = false;
  try {
    await prisma.solicitud.create({
      data: { ofertaId, trabajadorId: perfil.id },
    });
    creada = true;
  } catch (error) {
    const yaExiste =
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
    if (!yaExiste) {
      return { error: "No se pudo enviar la solicitud. Inténtalo de nuevo." };
    }
  }

  // Aviso por email a la empresa (no rompe la solicitud si falla)
  if (creada && process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Bolsa Obra <onboarding@resend.dev>",
        to: oferta.empresa.usuario.email,
        subject: `Nueva solicitud: ${oferta.titulo}`,
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #141414; line-height: 1.6;">
            <h2 style="margin:0 0 8px;">Tienes una nueva solicitud en Bolsa Obra</h2>
            <p>Un trabajador ha solicitado tu oferta <strong>${oferta.titulo}</strong>.</p>
            <p style="margin:16px 0 4px;"><strong>Datos del candidato:</strong></p>
            <ul style="margin:0 0 16px; padding-left:18px;">
              <li>Nombre: ${perfil.nombre} ${perfil.apellidos}</li>
              <li>Oficio: ${perfil.oficioPrincipal}</li>
              <li>Experiencia: ${perfil.aniosExperiencia} años</li>
              <li>Teléfono: ${perfil.telefono}</li>
              <li>Zona: ${perfil.poblacion} (${perfil.provincia})</li>
            </ul>
            <p>
              <a href="https://bolsa-obra.vercel.app/empresa/ofertas/${ofertaId}"
                 style="display:inline-block; background:#141414; color:#fff; text-decoration:none; padding:10px 18px; border-radius:6px;">
                Ver candidatos
              </a>
            </p>
            <p style="color:#6b6b6b; font-size:13px; margin-top:20px;">Bolsa Obra · La bolsa de trabajo de la construcción</p>
          </div>
        `,
      });
    } catch (error) {
      console.error("No se pudo enviar el email de aviso a la empresa:", error);
    }
  }

  revalidatePath(`/ofertas/${ofertaId}`);
  return { success: true };
}

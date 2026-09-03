"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

export type RegistroState = { error: string } | undefined;

function campo(formData: FormData, nombre: string) {
  return String(formData.get(nombre) ?? "").trim();
}

export async function registrar(
  _prevState: RegistroState,
  formData: FormData,
): Promise<RegistroState> {
  const email = campo(formData, "email").toLowerCase();
  const password = campo(formData, "password");
  const rol = campo(formData, "rol");

  if (!email || !password) {
    return { error: "El email y la contraseña son obligatorios." };
  }
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres." };
  }
  if (rol !== "TRABAJADOR" && rol !== "EMPRESA") {
    return { error: "Elige si te registras como trabajador o como empresa." };
  }

  if (!campo(formData, "acepto")) {
    return {
      error: "Debes aceptar la Política de Privacidad y los Términos de Uso.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    if (rol === "TRABAJADOR") {
      const nombre = campo(formData, "nombre");
      const apellidos = campo(formData, "apellidos");
      const telefono = campo(formData, "telefono");
      const poblacion = campo(formData, "poblacion");
      const provincia = campo(formData, "provincia");
      const oficioPrincipal = campo(formData, "oficioPrincipal");
      const aniosExperiencia = Number(campo(formData, "aniosExperiencia") || 0);

      if (
        !nombre ||
        !apellidos ||
        !telefono ||
        !poblacion ||
        !provincia ||
        !oficioPrincipal
      ) {
        return { error: "Completa todos los campos del perfil de trabajador." };
      }

      await prisma.usuario.create({
        data: {
          email,
          passwordHash,
          rol: "TRABAJADOR",
          perfilTrabajador: {
            create: {
              nombre,
              apellidos,
              telefono,
              poblacion,
              provincia,
              oficioPrincipal,
              aniosExperiencia,
            },
          },
        },
      });
    } else {
      const razonSocial = campo(formData, "razonSocial");
      const cif = campo(formData, "cif").toUpperCase();
      const personaContacto = campo(formData, "personaContacto");
      const telefono = campo(formData, "telefono");

      if (!razonSocial || !cif || !personaContacto || !telefono) {
        return { error: "Completa todos los campos de la empresa." };
      }

      await prisma.usuario.create({
        data: {
          email,
          passwordHash,
          rol: "EMPRESA",
          empresa: {
            create: { razonSocial, cif, personaContacto, telefono },
          },
        },
      });
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Ya existe una cuenta con ese email o CIF." };
    }
    return { error: "No se pudo crear la cuenta. Inténtalo de nuevo." };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Cuenta creada, pero no se pudo iniciar sesión automáticamente.",
      };
    }
    throw error;
  }
}

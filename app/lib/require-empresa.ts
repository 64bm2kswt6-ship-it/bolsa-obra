import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";

export async function requireEmpresa() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role !== "EMPRESA") {
    redirect("/");
  }

  const empresa = await prisma.empresa.findUnique({
    where: { usuarioId: session.user.id },
  });

  if (!empresa) {
    redirect("/");
  }

  return empresa;
}

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('TRABAJADOR', 'EMPRESA', 'ADMIN');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilTrabajador" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "poblacion" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "oficioPrincipal" TEXT NOT NULL,
    "aniosExperiencia" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "PerfilTrabajador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "razonSocial" TEXT NOT NULL,
    "cif" TEXT NOT NULL,
    "personaContacto" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilTrabajador_usuarioId_key" ON "PerfilTrabajador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cif_key" ON "Empresa"("cif");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuarioId_key" ON "Empresa"("usuarioId");

-- AddForeignKey
ALTER TABLE "PerfilTrabajador" ADD CONSTRAINT "PerfilTrabajador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

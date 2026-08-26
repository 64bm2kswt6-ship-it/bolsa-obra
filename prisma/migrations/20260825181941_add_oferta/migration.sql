-- CreateEnum
CREATE TYPE "TipoSalario" AS ENUM ('HORA', 'JORNADA', 'MES');

-- CreateEnum
CREATE TYPE "EstadoOferta" AS ENUM ('ACTIVA', 'CERRADA');

-- CreateTable
CREATE TABLE "Oferta" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "oficio" TEXT NOT NULL,
    "numeroPuestos" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "poblacion" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "duracionDias" INTEGER NOT NULL,
    "salario" DECIMAL(10,2) NOT NULL,
    "tipoSalario" "TipoSalario" NOT NULL,
    "estado" "EstadoOferta" NOT NULL DEFAULT 'ACTIVA',
    "publicadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "empresaId" TEXT NOT NULL,

    CONSTRAINT "Oferta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Oferta" ADD CONSTRAINT "Oferta_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

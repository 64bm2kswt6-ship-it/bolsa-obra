-- CreateEnum
CREATE TYPE "EstadoSolicitud" AS ENUM ('SOLICITADO', 'VISTO', 'CONTRATADO', 'DESCARTADO');

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" TEXT NOT NULL,
    "mensaje" TEXT,
    "estado" "EstadoSolicitud" NOT NULL DEFAULT 'SOLICITADO',
    "creadaEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ofertaId" TEXT NOT NULL,
    "trabajadorId" TEXT NOT NULL,

    CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Solicitud_ofertaId_trabajadorId_key" ON "Solicitud"("ofertaId", "trabajadorId");

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_ofertaId_fkey" FOREIGN KEY ("ofertaId") REFERENCES "Oferta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitud" ADD CONSTRAINT "Solicitud_trabajadorId_fkey" FOREIGN KEY ("trabajadorId") REFERENCES "PerfilTrabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

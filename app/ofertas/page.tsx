import { prisma } from "@/app/lib/prisma";
import OfertasBrowser, { type OfertaDTO } from "./OfertasBrowser";

const formatoFecha = new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" });
const formatoMoneda = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const etiquetaTipoSalario: Record<string, string> = {
  HORA: "/hora",
  JORNADA: "/jornada",
  MES: "/mes",
};

export default async function OfertasPage() {
  const raw = await prisma.oferta.findMany({
    where: { estado: "ACTIVA" },
    orderBy: { publicadaEn: "desc" },
    include: { empresa: { select: { razonSocial: true } } },
  });

  const ofertas: OfertaDTO[] = raw.map((o) => ({
    id: o.id,
    titulo: o.titulo,
    oficio: o.oficio,
    numeroPuestos: o.numeroPuestos,
    descripcion: o.descripcion,
    poblacion: o.poblacion,
    provincia: o.provincia,
    fechaInicioLabel: formatoFecha.format(o.fechaInicio),
    duracionDias: o.duracionDias,
    salarioLabel: `${formatoMoneda.format(Number(o.salario))}${
      etiquetaTipoSalario[o.tipoSalario] ?? ""
    }`,
    tipoSalario: o.tipoSalario,
    empresa: o.empresa.razonSocial,
  }));

  const oficios = [...new Set(ofertas.map((o) => o.oficio))].sort((a, b) =>
    a.localeCompare(b)
  );
  const provincias = [...new Set(ofertas.map((o) => o.provincia))].sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <OfertasBrowser ofertas={ofertas} oficios={oficios} provincias={provincias} />
  );
}

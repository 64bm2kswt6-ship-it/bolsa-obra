import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

const formatoFecha = new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" });
const formatoMoneda = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

const etiquetaTipoSalario: Record<string, string> = {
  HORA: "/hora",
  JORNADA: "/jornada",
  MES: "/mes",
};

export default async function OfertasPage() {
  const ofertas = await prisma.oferta.findMany({
    where: { estado: "ACTIVA" },
    orderBy: { publicadaEn: "desc" },
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Ofertas de empleo</h1>

      {ofertas.length === 0 ? (
        <p className="text-sm text-gray-600">No hay ofertas activas ahora mismo.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {ofertas.map((oferta) => (
            <li key={oferta.id} className="rounded border border-gray-200 p-4">
              <h2 className="font-medium">
                <Link href={`/ofertas/${oferta.id}`} className="hover:underline">
                  {oferta.titulo}
                </Link>
              </h2>
              <p className="text-sm text-gray-600">
                {oferta.oficio} · {oferta.poblacion} ({oferta.provincia})
              </p>

              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600 sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-gray-400">Inicio</dt>
                  <dd>{formatoFecha.format(oferta.fechaInicio)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Duración</dt>
                  <dd>{oferta.duracionDias} días</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Salario</dt>
                  <dd>
                    {formatoMoneda.format(Number(oferta.salario))}
                    {etiquetaTipoSalario[oferta.tipoSalario]}
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

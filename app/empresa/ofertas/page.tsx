import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { requireEmpresa } from "@/app/lib/require-empresa";

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

const etiquetaEstado: Record<string, string> = {
  ACTIVA: "Activa",
  CERRADA: "Cerrada",
};

export default async function OfertasEmpresaPage() {
  const empresa = await requireEmpresa();

  const ofertas = await prisma.oferta.findMany({
    where: { empresaId: empresa.id },
    orderBy: { publicadaEn: "desc" },
    include: { _count: { select: { solicitudes: true } } },
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Mis ofertas</h1>
        <Link
          href="/empresa/ofertas/nueva"
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Publicar oferta
        </Link>
      </div>

      {ofertas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="text-sm text-gray-600">Todavía no has publicado ninguna oferta.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {ofertas.map((oferta) => (
            <li key={oferta.id}>
              <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      <Link href={`/empresa/ofertas/${oferta.id}`} className="hover:underline">
                        {oferta.titulo}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600">
                      {oferta.oficio} · {oferta.poblacion} ({oferta.provincia})
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      oferta.estado === "ACTIVA"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {etiquetaEstado[oferta.estado]}
                  </span>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600 sm:grid-cols-4">
                  <div>
                    <dt className="text-xs text-gray-400">Puestos</dt>
                    <dd>{oferta.numeroPuestos}</dd>
                  </div>
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

                <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-400">
                  Publicada el {formatoFecha.format(oferta.publicadaEn)} ·{" "}
                  <Link
                    href={`/empresa/ofertas/${oferta.id}`}
                    className="font-medium text-gray-600 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900 hover:decoration-gray-900"
                  >
                    {oferta._count.solicitudes} inscritos
                  </Link>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

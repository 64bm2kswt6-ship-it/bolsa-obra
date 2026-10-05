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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-5xl font-black uppercase leading-none">Mis ofertas</h1>
        <Link
          href="/empresa/ofertas/nueva"
          className="btn btn-yellow"
        >
          Publicar oferta
        </Link>
      </div>

      {ofertas.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="text-base text-gray-600">Todavía no has publicado ninguna oferta.</p>
          <Link href="/empresa/ofertas/nueva" className="btn btn-dark btn-sm mt-4">Publicar la primera</Link>
        </div>
      ) : (
        <ul className="lista-entra flex flex-col gap-4">
          {ofertas.map((oferta) => (
            <li key={oferta.id} style={{ ["--i" as string]: ofertas.indexOf(oferta) }}>
              <article className="ficha ficha-link p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl font-extrabold uppercase leading-none">
                      <Link href={`/empresa/ofertas/${oferta.id}`} className="after:absolute after:inset-0 after:content-['']">
                        {oferta.titulo}
                      </Link>
                    </h2>
                    <p className="text-sm text-gray-600">
                      {oferta.oficio} · {oferta.poblacion} ({oferta.provincia})
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                      oferta.estado === "ACTIVA"
                        ? "bg-obra text-asfalto"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {etiquetaEstado[oferta.estado]}
                  </span>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-3 border-y border-gray-200 py-3 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Puestos</dt>
                    <dd className="num mt-0.5 font-semibold text-asfalto">{oferta.numeroPuestos}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Inicio</dt>
                    <dd className="num mt-0.5 font-semibold text-asfalto">{formatoFecha.format(oferta.fechaInicio)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Duración</dt>
                    <dd className="num mt-0.5 font-semibold text-asfalto">{oferta.duracionDias} días</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Salario</dt>
                    <dd className="num mt-0.5 font-semibold text-asfalto">
                      {formatoMoneda.format(Number(oferta.salario))}
                      {etiquetaTipoSalario[oferta.tipoSalario]}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-gray-600">
                  Publicada el {formatoFecha.format(oferta.publicadaEn)} ·{" "}
                  <Link
                    href={`/empresa/ofertas/${oferta.id}`}
                    className="relative z-10 font-bold text-asfalto underline decoration-2 underline-offset-4 decoration-obra"
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

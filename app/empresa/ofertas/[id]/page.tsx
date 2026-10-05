import Link from "next/link";
import { notFound } from "next/navigation";
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

const etiquetaEstadoSolicitud: Record<string, string> = {
  SOLICITADO: "Solicitado",
  VISTO: "Visto",
  CONTRATADO: "Contratado",
  DESCARTADO: "Descartado",
};

export default async function OfertaEmpresaDetallePage(
  props: PageProps<"/empresa/ofertas/[id]">,
) {
  const { id } = await props.params;
  const empresa = await requireEmpresa();

  const oferta = await prisma.oferta.findUnique({
    where: { id },
    include: {
      solicitudes: {
        orderBy: { creadaEn: "desc" },
        include: { trabajador: true },
      },
    },
  });

  if (!oferta || oferta.empresaId !== empresa.id) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12">
      <div className="ficha p-6 sm:p-8">
        <div>
          <Link
            href="/empresa/ofertas"
            className="inline-flex min-h-10 items-center text-sm font-semibold underline decoration-2 underline-offset-4 hover:decoration-obra"
          >
            ← Mis ofertas
          </Link>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="font-display text-5xl font-black uppercase leading-[0.95]">{oferta.titulo}</h1>
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
          <p className="text-sm text-gray-600">
            {oferta.oficio} · {oferta.poblacion} ({oferta.provincia})
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-y-2 border-asfalto py-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Puestos</dt>
            <dd className="num mt-0.5 text-base font-semibold text-asfalto">{oferta.numeroPuestos}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Inicio</dt>
            <dd className="num mt-0.5 text-base font-semibold text-asfalto">{formatoFecha.format(oferta.fechaInicio)}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Duración</dt>
            <dd className="num mt-0.5 text-base font-semibold text-asfalto">{oferta.duracionDias} días</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Salario</dt>
            <dd className="num mt-0.5 text-base font-semibold text-asfalto">
              {formatoMoneda.format(Number(oferta.salario))}
              {etiquetaTipoSalario[oferta.tipoSalario]}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <h2 className="font-display text-3xl font-extrabold uppercase">
            Trabajadores inscritos ({oferta.solicitudes.length})
          </h2>

          {oferta.solicitudes.length === 0 ? (
            <p className="mt-2 text-base text-gray-600">Todavía no se ha inscrito nadie.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-3">
              {oferta.solicitudes.map((solicitud) => (
                <li key={solicitud.id}>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold">
                          {solicitud.trabajador.nombre} {solicitud.trabajador.apellidos}
                        </p>
                        <p className="text-sm text-gray-600">
                          {solicitud.trabajador.oficioPrincipal} ·{" "}
                          {solicitud.trabajador.aniosExperiencia} años de experiencia
                        </p>
                        <p className="text-sm text-gray-600">{solicitud.trabajador.telefono}</p>
                      </div>
                      <span className="shrink-0 rounded-md bg-asfalto px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-obra">
                        {etiquetaEstadoSolicitud[solicitud.estado]}
                      </span>
                    </div>
                    {solicitud.mensaje && (
                      <p className="mt-2 text-sm text-gray-600">“{solicitud.mensaje}”</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

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
      <div>
        <Link href="/empresa/ofertas" className="text-sm text-gray-500 underline">
          ← Mis ofertas
        </Link>
        <div className="mt-2 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold">{oferta.titulo}</h1>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              oferta.estado === "ACTIVA"
                ? "bg-green-100 text-green-800"
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

      <dl className="grid grid-cols-2 gap-4 text-sm text-gray-600 sm:grid-cols-4">
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

      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-medium">
          Trabajadores inscritos ({oferta.solicitudes.length})
        </h2>

        {oferta.solicitudes.length === 0 ? (
          <p className="mt-2 text-sm text-gray-600">Todavía no se ha inscrito nadie.</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {oferta.solicitudes.map((solicitud) => (
              <li key={solicitud.id} className="rounded border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">
                      {solicitud.trabajador.nombre} {solicitud.trabajador.apellidos}
                    </p>
                    <p className="text-sm text-gray-600">
                      {solicitud.trabajador.oficioPrincipal} ·{" "}
                      {solicitud.trabajador.aniosExperiencia} años de experiencia
                    </p>
                    <p className="text-sm text-gray-600">{solicitud.trabajador.telefono}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {etiquetaEstadoSolicitud[solicitud.estado]}
                  </span>
                </div>
                {solicitud.mensaje && (
                  <p className="mt-2 text-sm text-gray-600">“{solicitud.mensaje}”</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

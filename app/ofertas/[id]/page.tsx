import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { SolicitarButton } from "./solicitar-button";

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

export default async function OfertaDetallePage(props: PageProps<"/ofertas/[id]">) {
  const { id } = await props.params;

  const oferta = await prisma.oferta.findUnique({ where: { id } });
  if (!oferta) {
    notFound();
  }

  const session = await auth();

  let yaSolicitada = false;
  let esTrabajador = false;

  if (session?.user?.role === "TRABAJADOR") {
    esTrabajador = true;
    const perfil = await prisma.perfilTrabajador.findUnique({
      where: { usuarioId: session.user.id },
    });
    if (perfil) {
      const solicitud = await prisma.solicitud.findUnique({
        where: { ofertaId_trabajadorId: { ofertaId: oferta.id, trabajadorId: perfil.id } },
      });
      yaSolicitada = !!solicitud;
    }
  }

  const ubicacionTexto = `${oferta.poblacion}, ${oferta.provincia}, España`;
  const ubicacionQuery = encodeURIComponent(ubicacionTexto);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-12">
      <div>
        <h1 className="text-2xl font-semibold">{oferta.titulo}</h1>
        <p className="text-sm text-gray-600">
          {oferta.oficio} · {oferta.poblacion} ({oferta.provincia})
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-4 text-sm text-gray-600 sm:grid-cols-3">
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

      <div>
        <h2 className="text-sm font-medium text-gray-700">Descripción</h2>
        <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
          {oferta.descripcion}
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-700">Ubicación</h2>
        <p className="mt-1 text-sm text-gray-600">
          {oferta.poblacion} ({oferta.provincia})
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-gray-200">
          <iframe
            title={`Mapa de ${oferta.poblacion}`}
            src={`https://maps.google.com/maps?q=${ubicacionQuery}&z=12&output=embed`}
            width="100%"
            height="260"
            loading="lazy"
            style={{ border: 0 }}
          />
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${ubicacionQuery}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-gray-900 underline"
        >
          Abrir en Google Maps
        </a>
      </div>

      <div className="border-t border-gray-200 pt-6">
        {!session?.user ? (
          <p className="text-sm text-gray-600">
            <Link href="/registro" className="underline">
              Regístrate
            </Link>{" "}
            como trabajador para solicitar esta oferta.
          </p>
        ) : esTrabajador ? (
          yaSolicitada ? (
            <button
              type="button"
              disabled
              className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-500"
            >
              Ya has solicitado esta oferta
            </button>
          ) : (
            <SolicitarButton ofertaId={oferta.id} />
          )
        ) : null}
      </div>
    </div>
  );
}

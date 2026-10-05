import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { SolicitarButton } from "./solicitar-button";
import MapaOferta from "./MapaOferta";

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

  const oferta = await prisma.oferta.findUnique({
    where: { id },
    include: { empresa: { select: { razonSocial: true } } },
  });
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

  // Evita consultas ambiguas tipo "Valencia, Valencia, España" (ciudad y
  // provincia con el mismo nombre). Si la empresa indicó una dirección, el
  // mapa apunta a ese punto concreto; si no, al municipio.
  const mismaCiudadQueProvincia =
    oferta.poblacion.trim().toLowerCase() === oferta.provincia.trim().toLowerCase();
  const zona = mismaCiudadQueProvincia
    ? oferta.poblacion
    : `${oferta.poblacion}, ${oferta.provincia}`;
  const ubicacionTexto = oferta.direccion
    ? `${oferta.direccion}, ${zona}, España`
    : `${zona}, España`;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <Link
        href="/ofertas"
        className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        Todas las ofertas
      </Link>

      <article className="ficha mt-3 overflow-hidden">
        <div className="cinta" aria-hidden="true" style={{ height: 8 }} />
        <div className="p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-asfalto px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-obra">
              {oferta.oficio}
            </span>
            <span className="text-sm font-semibold text-gray-600">
              {oferta.poblacion} ({oferta.provincia})
            </span>
          </div>
          <h1
            className="font-display mt-3 text-5xl font-black uppercase leading-[0.95] sm:text-6xl"
            style={{ textWrap: "balance" }}
          >
            {oferta.titulo}
          </h1>

          <dl className="mt-7 grid grid-cols-2 border-y-2 border-asfalto sm:grid-cols-4 sm:divide-x sm:divide-gray-300">
            {[
              ["Puestos", String(oferta.numeroPuestos)],
              ["Empieza", formatoFecha.format(oferta.fechaInicio)],
              ["Duración", `${oferta.duracionDias} días`],
              [
                "Salario",
                `${formatoMoneda.format(Number(oferta.salario))}${etiquetaTipoSalario[oferta.tipoSalario]}`,
              ],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`py-4 sm:px-4 sm:first:pl-0 ${i % 2 === 1 ? "pl-4 sm:pl-4" : ""} ${i > 1 ? "border-t border-gray-300 sm:border-t-0" : ""}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k}</dt>
                <dd className="font-display num mt-1 text-[1.7rem] font-extrabold leading-none">{v}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold uppercase">Descripción</h2>
            <p className="mt-2 max-w-[68ch] whitespace-pre-line text-base leading-relaxed text-gray-700">
              {oferta.descripcion}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-2xl font-extrabold uppercase">Ubicación</h2>
            <p className="mt-1 text-base text-gray-700">
              {oferta.direccion ? `${oferta.direccion} · ` : ""}
              {oferta.poblacion} ({oferta.provincia})
            </p>
            <div className="mt-3">
              <MapaOferta
                consulta={ubicacionTexto}
                nombreLugar={oferta.poblacion}
              />
            </div>
          </section>

          <section className="mt-8 border-t border-gray-300 pt-7">
            <h2 className="font-display text-2xl font-extrabold uppercase">Publicada por</h2>
            <p className="mt-1 text-lg font-bold">{oferta.empresa.razonSocial}</p>
            <p className="text-sm text-gray-600">
              Publicada el {formatoFecha.format(oferta.publicadaEn)}
            </p>
          </section>

          <div className="mt-7 border-t border-gray-300 pt-7">
            {!session?.user ? (
              <p className="text-base text-gray-700">
                <Link
                  href="/registro"
                  className="font-bold underline decoration-obra decoration-4 underline-offset-4"
                >
                  Regístrate
                </Link>{" "}
                como trabajador para solicitar esta oferta.
              </p>
            ) : esTrabajador ? (
              yaSolicitada ? (
                <button type="button" disabled className="btn bg-gray-200 text-gray-600">
                  Ya has solicitado esta oferta
                </button>
              ) : (
                <SolicitarButton ofertaId={oferta.id} />
              )
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}

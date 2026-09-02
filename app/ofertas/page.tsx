import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";

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

type SP = {
  q?: string;
  ubicacion?: string;
  provincia?: string;
  oficio?: string;
  tipo?: string;
};

export default async function OfertasPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const ubicacion = (sp.ubicacion ?? "").trim();
  const provincia = (sp.provincia ?? "").trim();
  const oficio = (sp.oficio ?? "").trim();
  const tipo = (sp.tipo ?? "").trim();

  const and: Prisma.OfertaWhereInput[] = [];
  if (q) {
    and.push({
      OR: [
        { titulo: { contains: q, mode: "insensitive" } },
        { oficio: { contains: q, mode: "insensitive" } },
        { descripcion: { contains: q, mode: "insensitive" } },
      ],
    });
  }
  if (ubicacion) {
    and.push({
      OR: [
        { poblacion: { contains: ubicacion, mode: "insensitive" } },
        { provincia: { contains: ubicacion, mode: "insensitive" } },
      ],
    });
  }
  if (provincia) and.push({ provincia });
  if (oficio) and.push({ oficio });
  if (tipo === "HORA" || tipo === "JORNADA" || tipo === "MES") {
    and.push({ tipoSalario: tipo });
  }

  const where: Prisma.OfertaWhereInput = {
    estado: "ACTIVA",
    ...(and.length ? { AND: and } : {}),
  };

  const [ofertas, provinciasRaw, oficiosRaw] = await Promise.all([
    prisma.oferta.findMany({
      where,
      orderBy: { publicadaEn: "desc" },
      include: { empresa: { select: { razonSocial: true } } },
    }),
    prisma.oferta.findMany({
      where: { estado: "ACTIVA" },
      select: { provincia: true },
      distinct: ["provincia"],
      orderBy: { provincia: "asc" },
    }),
    prisma.oferta.findMany({
      where: { estado: "ACTIVA" },
      select: { oficio: true },
      distinct: ["oficio"],
      orderBy: { oficio: "asc" },
    }),
  ]);

  const provincias = provinciasRaw.map((p) => p.provincia);
  const oficios = oficiosRaw.map((o) => o.oficio);
  const hayFiltros = Boolean(q || ubicacion || provincia || oficio || tipo);

  return (
    <form method="get" action="/ofertas" className="flex flex-1 flex-col">
      {/* Buscador */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Ofertas de trabajo en construcción
          </h1>
          <p className="mt-1 text-gray-600">
            Encuentra obra cerca de ti. Busca por oficio y por zona.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Puesto u oficio</span>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Puesto u oficio (ej. encofrador)"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900"
              />
            </label>
            <label className="flex-1">
              <span className="sr-only">Población o provincia</span>
              <input
                type="text"
                name="ubicacion"
                defaultValue={ubicacion}
                placeholder="Población o provincia (ej. Xàtiva)"
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900"
              />
            </label>
            <button
              type="submit"
              className="rounded-md px-6 py-3 text-sm font-semibold text-gray-900"
              style={{ backgroundColor: "#FFCB05" }}
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Cuerpo: filtros + resultados */}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 px-4 py-8 md:grid-cols-[230px_1fr]">
        {/* Filtros */}
        <aside className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">
              Filtros
            </h2>
            {hayFiltros ? (
              <Link href="/ofertas" className="text-xs text-gray-500 underline">
                Limpiar
              </Link>
            ) : null}
          </div>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-gray-700">Provincia</span>
            <select
              name="provincia"
              defaultValue={provincia}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="">Todas</option>
              {provincias.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-gray-700">Oficio</span>
            <select
              name="oficio"
              defaultValue={oficio}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="">Todos</option>
              {oficios.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-gray-700">Tipo de salario</span>
            <select
              name="tipo"
              defaultValue={tipo}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
            >
              <option value="">Cualquiera</option>
              <option value="HORA">Por hora</option>
              <option value="JORNADA">Por jornada</option>
              <option value="MES">Por mes</option>
            </select>
          </label>

          <button
            type="submit"
            className="rounded-md border border-gray-900 bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          >
            Aplicar filtros
          </button>
        </aside>

        {/* Resultados */}
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">
            {ofertas.length}{" "}
            {ofertas.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
          </p>

          {ofertas.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="font-medium text-gray-900">
                No hay ofertas que coincidan.
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {hayFiltros
                  ? "Prueba a quitar algún filtro o a buscar con otras palabras."
                  : "Todavía no hay ofertas publicadas. Vuelve pronto."}
              </p>
              {hayFiltros ? (
                <Link
                  href="/ofertas"
                  className="mt-4 inline-block text-sm font-medium text-gray-900 underline"
                >
                  Ver todas las ofertas
                </Link>
              ) : null}
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {ofertas.map((oferta) => (
                <li key={oferta.id}>
                  <article className="rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">
                          <Link
                            href={`/ofertas/${oferta.id}`}
                            className="hover:underline"
                          >
                            {oferta.titulo}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">
                          {oferta.empresa.razonSocial}
                        </p>
                      </div>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-gray-900"
                        style={{ backgroundColor: "#FFCB05" }}
                      >
                        {oferta.numeroPuestos}{" "}
                        {oferta.numeroPuestos === 1 ? "puesto" : "puestos"}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                      <span>{oferta.oficio}</span>
                      <span>
                        {oferta.poblacion} ({oferta.provincia})
                      </span>
                      <span>Empieza {formatoFecha.format(oferta.fechaInicio)}</span>
                      <span>{oferta.duracionDias} días</span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {oferta.descripcion}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="font-semibold text-gray-900">
                        {formatoMoneda.format(Number(oferta.salario))}
                        {etiquetaTipoSalario[oferta.tipoSalario]}
                      </span>
                      <Link
                        href={`/ofertas/${oferta.id}`}
                        className="rounded-md border border-gray-900 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
                      >
                        Ver oferta
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
}

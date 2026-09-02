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

  function href(overrides: Partial<SP>) {
    const merged: SP = { q, ubicacion, provincia, oficio, tipo, ...overrides };
    const params = new URLSearchParams();
    (Object.keys(merged) as (keyof SP)[]).forEach((k) => {
      const v = merged[k];
      if (v) params.set(k, v);
    });
    const qs = params.toString();
    return qs ? `/ofertas?${qs}` : "/ofertas";
  }

  const chipBase =
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition";
  const chipOn = "border-gray-900 bg-gray-900 text-white";
  const chipOff = "border-gray-300 bg-white text-gray-700 hover:border-gray-500";
  const chip = (activo: boolean) => `${chipBase} ${activo ? chipOn : chipOff}`;

  return (
    <div className="flex flex-1 flex-col">
      {/* Buscador */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Ofertas de trabajo en construcción
          </h1>
          <p className="mt-1 text-gray-600">
            Encuentra obra cerca de ti. Busca por oficio y por zona.
          </p>

          <form
            method="get"
            action="/ofertas"
            className="mt-5 flex flex-col gap-3 sm:flex-row"
          >
            <input type="hidden" name="provincia" value={provincia} />
            <input type="hidden" name="oficio" value={oficio} />
            <input type="hidden" name="tipo" value={tipo} />
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
          </form>
        </div>
      </section>

      {/* Filtros con chips */}
      <div className="mx-auto w-full max-w-5xl px-4 pt-6">
        <div className="flex flex-col gap-3">
          {oficios.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Oficio
              </span>
              <Link href={href({ oficio: "" })} className={chip(!oficio)}>
                Todos
              </Link>
              {oficios.map((o) => (
                <Link key={o} href={href({ oficio: o })} className={chip(oficio === o)}>
                  {o}
                </Link>
              ))}
            </div>
          ) : null}

          {provincias.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Provincia
              </span>
              <Link href={href({ provincia: "" })} className={chip(!provincia)}>
                Todas
              </Link>
              {provincias.map((p) => (
                <Link key={p} href={href({ provincia: p })} className={chip(provincia === p)}>
                  {p}
                </Link>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Salario
            </span>
            <Link href={href({ tipo: "" })} className={chip(!tipo)}>
              Cualquiera
            </Link>
            <Link href={href({ tipo: "HORA" })} className={chip(tipo === "HORA")}>
              Por hora
            </Link>
            <Link href={href({ tipo: "JORNADA" })} className={chip(tipo === "JORNADA")}>
              Por jornada
            </Link>
            <Link href={href({ tipo: "MES" })} className={chip(tipo === "MES")}>
              Por mes
            </Link>
          </div>

          {hayFiltros ? (
            <div>
              <Link href="/ofertas" className="text-sm text-gray-500 underline">
                Limpiar filtros
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      {/* Resultados */}
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-6">
        <p className="mb-4 text-sm text-gray-600">
          {ofertas.length}{" "}
          {ofertas.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
        </p>

        {ofertas.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-medium text-gray-900">No hay ofertas que coincidan.</p>
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
                        <Link href={`/ofertas/${oferta.id}`} className="hover:underline">
                          {oferta.titulo}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">{oferta.empresa.razonSocial}</p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold text-gray-900"
                      style={{ backgroundColor: "#FFCB05" }}
                    >
                      {oferta.numeroPuestos}{" "}
                      {oferta.numeroPuestos === 1 ? "puesto" : "puestos"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-gray-600">
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      {oferta.oficio}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s-6-5.3-6-10a6 6 0 0 1 12 0c0 4.7-6 10-6 10z" /><circle cx="12" cy="11" r="2" /></svg>
                      {oferta.poblacion} ({oferta.provincia})
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      Empieza {formatoFecha.format(oferta.fechaInicio)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                      {oferta.duracionDias} días
                    </span>
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
  );
}

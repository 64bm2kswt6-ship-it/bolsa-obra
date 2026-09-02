"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type OfertaDTO = {
  id: string;
  titulo: string;
  oficio: string;
  numeroPuestos: number;
  descripcion: string;
  poblacion: string;
  provincia: string;
  fechaInicioLabel: string;
  duracionDias: number;
  salarioLabel: string;
  tipoSalario: string;
  empresa: string;
};

export default function OfertasBrowser({
  ofertas,
  oficios,
  provincias,
}: {
  ofertas: OfertaDTO[];
  oficios: string[];
  provincias: string[];
}) {
  const [q, setQ] = useState("");
  const [ubic, setUbic] = useState("");
  const [oficio, setOficio] = useState("");
  const [provincia, setProvincia] = useState("");
  const [tipo, setTipo] = useState("");

  const filtradas = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const ul = ubic.trim().toLowerCase();
    return ofertas.filter((o) => {
      if (
        ql &&
        !`${o.titulo} ${o.oficio} ${o.descripcion}`.toLowerCase().includes(ql)
      )
        return false;
      if (ul && !`${o.poblacion} ${o.provincia}`.toLowerCase().includes(ul))
        return false;
      if (oficio && o.oficio !== oficio) return false;
      if (provincia && o.provincia !== provincia) return false;
      if (tipo && o.tipoSalario !== tipo) return false;
      return true;
    });
  }, [ofertas, q, ubic, oficio, provincia, tipo]);

  const hayFiltros = Boolean(q || ubic || oficio || provincia || tipo);
  const limpiar = () => {
    setQ("");
    setUbic("");
    setOficio("");
    setProvincia("");
    setTipo("");
  };

  const chipBase =
    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition cursor-pointer";
  const chipOn = "border-gray-900 bg-gray-900 text-white";
  const chipOff = "border-gray-300 bg-white text-gray-700 hover:border-gray-500";
  const chip = (activo: boolean) => `${chipBase} ${activo ? chipOn : chipOff}`;

  const inputCls =
    "w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900";

  return (
    <div className="flex flex-1 flex-col">
      {/* Buscador */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Ofertas de trabajo en construcción
          </h1>
          <p className="mt-1 text-gray-600">
            Encuentra obra cerca de ti. Los resultados se filtran al instante.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <label className="flex-1">
              <span className="sr-only">Puesto u oficio</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Puesto u oficio (ej. encofrador)"
                className={inputCls}
              />
            </label>
            <label className="flex-1">
              <span className="sr-only">Población o provincia</span>
              <input
                type="text"
                value={ubic}
                onChange={(e) => setUbic(e.target.value)}
                placeholder="Población o provincia (ej. Xàtiva)"
                className={inputCls}
              />
            </label>
          </div>
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
              <button type="button" onClick={() => setOficio("")} className={chip(!oficio)}>
                Todos
              </button>
              {oficios.map((o) => (
                <button
                  type="button"
                  key={o}
                  onClick={() => setOficio(o)}
                  className={chip(oficio === o)}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : null}

          {provincias.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Provincia
              </span>
              <button type="button" onClick={() => setProvincia("")} className={chip(!provincia)}>
                Todas
              </button>
              {provincias.map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setProvincia(p)}
                  className={chip(provincia === p)}
                >
                  {p}
                </button>
              ))}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 w-20 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Salario
            </span>
            <button type="button" onClick={() => setTipo("")} className={chip(!tipo)}>
              Cualquiera
            </button>
            <button type="button" onClick={() => setTipo("HORA")} className={chip(tipo === "HORA")}>
              Por hora
            </button>
            <button type="button" onClick={() => setTipo("JORNADA")} className={chip(tipo === "JORNADA")}>
              Por jornada
            </button>
            <button type="button" onClick={() => setTipo("MES")} className={chip(tipo === "MES")}>
              Por mes
            </button>
          </div>

          {hayFiltros ? (
            <div>
              <button
                type="button"
                onClick={limpiar}
                className="text-sm text-gray-500 underline"
              >
                Limpiar filtros
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Resultados */}
      <div className="mx-auto w-full max-w-5xl px-4 pb-12 pt-6">
        <p className="mb-4 text-sm text-gray-600">
          {filtradas.length}{" "}
          {filtradas.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
        </p>

        {filtradas.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-medium text-gray-900">No hay ofertas que coincidan.</p>
            <p className="mt-1 text-sm text-gray-600">
              {ofertas.length === 0
                ? "Todavía no hay ofertas publicadas. Vuelve pronto."
                : "Prueba a quitar algún filtro o a buscar con otras palabras."}
            </p>
            {hayFiltros ? (
              <button
                type="button"
                onClick={limpiar}
                className="mt-4 inline-block text-sm font-medium text-gray-900 underline"
              >
                Ver todas las ofertas
              </button>
            ) : null}
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {filtradas.map((oferta) => (
              <li key={oferta.id}>
                <article className="rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        <Link href={`/ofertas/${oferta.id}`} className="hover:underline">
                          {oferta.titulo}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600">{oferta.empresa}</p>
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
                      Empieza {oferta.fechaInicioLabel}
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
                      {oferta.salarioLabel}
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

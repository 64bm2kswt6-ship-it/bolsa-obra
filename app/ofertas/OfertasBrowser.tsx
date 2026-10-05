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

  const chip = (activo: boolean) => ({
    className: "chip",
    "aria-pressed": activo,
  });

  const grupo =
    "flex flex-wrap items-center gap-2 sm:grid sm:grid-cols-[5.5rem_1fr] sm:items-start";
  const grupoLabel =
    "w-full pt-2.5 text-sm font-bold text-gray-700 sm:w-auto";

  return (
    <div className="flex flex-1 flex-col">
      {/* Buscador */}
      <section className="bg-obra text-asfalto">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
          <h1
            className="font-display text-[2.6rem] font-black uppercase leading-[0.95] sm:text-6xl"
            style={{ textWrap: "balance" }}
          >
            Ofertas de trabajo en construcción
          </h1>
          <p className="mt-3 text-lg text-asfalto/80">
            Encuentra obra cerca de ti. Los resultados se filtran al instante.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <label>
              <span className="sr-only">Puesto u oficio</span>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Puesto u oficio (ej. encofrador)"
                className="campo"
              />
            </label>
            <label>
              <span className="sr-only">Población o provincia</span>
              <input
                type="text"
                value={ubic}
                onChange={(e) => setUbic(e.target.value)}
                placeholder="Población o provincia (ej. Xàtiva)"
                className="campo"
              />
            </label>
          </div>
        </div>
        <div className="cinta" aria-hidden="true" style={{ background: "var(--asfalto)", height: 6 }} />
      </section>

      {/* Filtros con chips */}
      <div className="mx-auto w-full max-w-5xl px-4 pt-8">
        <div className="flex flex-col gap-4">
          {oficios.length > 0 ? (
            <div className={grupo} role="group" aria-label="Oficio">
              <span className={grupoLabel}>Oficio</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setOficio("")} {...chip(!oficio)}>
                  Todos
                </button>
                {oficios.map((o) => (
                  <button type="button" key={o} onClick={() => setOficio(o)} {...chip(oficio === o)}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {provincias.length > 0 ? (
            <div className={grupo} role="group" aria-label="Provincia">
              <span className={grupoLabel}>Provincia</span>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setProvincia("")} {...chip(!provincia)}>
                  Todas
                </button>
                {provincias.map((p) => (
                  <button type="button" key={p} onClick={() => setProvincia(p)} {...chip(provincia === p)}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className={grupo} role="group" aria-label="Salario">
            <span className={grupoLabel}>Salario</span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setTipo("")} {...chip(!tipo)}>
                Cualquiera
              </button>
              <button type="button" onClick={() => setTipo("HORA")} {...chip(tipo === "HORA")}>
                Por hora
              </button>
              <button type="button" onClick={() => setTipo("JORNADA")} {...chip(tipo === "JORNADA")}>
                Por jornada
              </button>
              <button type="button" onClick={() => setTipo("MES")} {...chip(tipo === "MES")}>
                Por mes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mx-auto w-full max-w-5xl px-4 pb-16 pt-8">
        <div className="mb-5 flex items-center justify-between gap-4 border-t border-gray-300 pt-5">
          <p className="font-display num text-2xl font-extrabold uppercase" aria-live="polite">
            {filtradas.length}{" "}
            {filtradas.length === 1 ? "oferta encontrada" : "ofertas encontradas"}
          </p>
          {hayFiltros ? (
            <button
              type="button"
              onClick={limpiar}
              className="min-h-10 cursor-pointer text-sm font-semibold underline underline-offset-4 decoration-2 hover:decoration-obra"
            >
              Limpiar filtros
            </button>
          ) : null}
        </div>

        {filtradas.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="font-display text-3xl font-extrabold uppercase">
              No hay ofertas que coincidan
            </p>
            <p className="mx-auto mt-2 max-w-sm text-gray-600">
              {ofertas.length === 0
                ? "Todavía no hay ofertas publicadas. Vuelve pronto."
                : "Prueba a quitar algún filtro o a buscar con otras palabras."}
            </p>
            {hayFiltros ? (
              <button type="button" onClick={limpiar} className="btn btn-dark btn-sm mt-5">
                Ver todas las ofertas
              </button>
            ) : null}
          </div>
        ) : (
          <ul className="lista-entra flex flex-col gap-4">
            {filtradas.map((oferta, i) => (
              <li key={oferta.id} style={{ ["--i" as string]: i }}>
                <article className="ficha ficha-link relative p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-asfalto px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-obra">
                      {oferta.oficio}
                    </span>
                    <span className="rounded-md bg-obra px-2.5 py-1 text-xs font-bold text-asfalto">
                      {oferta.numeroPuestos}{" "}
                      {oferta.numeroPuestos === 1 ? "puesto" : "puestos"}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-[1.9rem] font-extrabold uppercase leading-[1.02] sm:text-4xl">
                    <Link
                      href={`/ofertas/${oferta.id}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {oferta.titulo}
                    </Link>
                  </h3>
                  <p className="mt-1 text-base text-gray-600">{oferta.empresa}</p>

                  <dl className="mt-5 grid grid-cols-2 gap-y-4 border-y border-gray-200 py-4 text-sm sm:grid-cols-3 sm:gap-y-0 sm:divide-x sm:divide-gray-200">
                    <div className="sm:pr-5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Dónde</dt>
                      <dd className="mt-0.5 font-semibold">
                        {oferta.poblacion} <span className="font-normal text-gray-600">({oferta.provincia})</span>
                      </dd>
                    </div>
                    <div className="sm:px-5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Empieza</dt>
                      <dd className="mt-0.5 font-semibold">{oferta.fechaInicioLabel}</dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1 sm:pl-5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Duración</dt>
                      <dd className="num mt-0.5 font-semibold">{oferta.duracionDias} días</dd>
                    </div>
                  </dl>

                  <p className="mt-4 line-clamp-2 max-w-[68ch] text-base text-gray-600">
                    {oferta.descripcion}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="font-display num whitespace-nowrap text-[2rem] font-black leading-none sm:text-4xl">
                      {oferta.salarioLabel}
                    </span>
                    <span className="ver btn btn-line btn-sm pointer-events-none transition-colors">
                      Ver oferta
                      <svg className="flecha" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
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

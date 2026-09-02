import Link from "next/link";

const pasosTrabajador = [
  { n: 1, t: "Regístrate gratis", d: "Crea tu perfil de trabajador en un minuto. Para ti siempre es gratis." },
  { n: 2, t: "Busca ofertas de tu oficio", d: "Filtra por oficio y por zona y encuentra obra cerca de ti." },
  { n: 3, t: "Solicita y te contactan", d: "Pulsas \"Solicitar\" y la empresa recibe tu perfil y te llama." },
];

const pasosEmpresa = [
  { n: 1, t: "Crea la cuenta de tu empresa", d: "Date de alta como empresa o contratista en unos minutos." },
  { n: 2, t: "Publica tu oferta de obra", d: "Di qué necesitas: oficio, cuántos, dónde y cuándo empiezas." },
  { n: 3, t: "Recibe candidatos y contacta", d: "Te avisamos cuando alguien solicita y contactas directamente." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 text-center sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex select-none flex-col items-center justify-center font-black leading-none"
          style={{ color: "rgba(140, 140, 140, 0.13)" }}
        >
          <span className="text-[19vw] tracking-tighter">BOLSA</span>
          <span className="text-[19vw] tracking-tighter">OBRA</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Bolsa Obra</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          La bolsa de trabajo del sector de la construcción: conectamos empresas y
          trabajadores del oficio, directo y sin complicaciones.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/ofertas"
            className="rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Busco trabajo
          </Link>
          <Link
            href="/registro"
            className="rounded-md px-6 py-3 text-sm font-semibold text-gray-900"
            style={{ backgroundColor: "#FFCB05" }}
          >
            Busco trabajadores
          </Link>
        </div>
      </section>

      {/* Valores */}
      <section className="border-t border-gray-200 px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-gray-900" style={{ backgroundColor: "#FFF3C4" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 5-7 9-7 9s-7-4-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            <div>
              <p className="font-semibold text-gray-900">Solo construcción</p>
              <p className="mt-1 text-sm text-gray-600">Una bolsa especializada en el sector, no un cajón de sastre.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-gray-900" style={{ backgroundColor: "#FFF3C4" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </span>
            <div>
              <p className="font-semibold text-gray-900">Contacto directo</p>
              <p className="mt-1 text-sm text-gray-600">Empresa y trabajador se conectan directamente, sin intermediarios.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full text-gray-900" style={{ backgroundColor: "#FFF3C4" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M14.5 9.5a3 3 0 1 0 0 5M8.5 12h5" /></svg>
            </span>
            <div>
              <p className="font-semibold text-gray-900">Gratis para el trabajador</p>
              <p className="mt-1 text-sm text-gray-600">Buscar trabajo y solicitar ofertas no te cuesta nada.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            Cómo funciona
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
            Sencillo para los dos lados de la obra.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900">Si buscas trabajo</h3>
              <ol className="mt-4 flex flex-col gap-5">
                {pasosTrabajador.map((p) => (
                  <li key={p.n} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                      {p.n}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{p.t}</p>
                      <p className="text-sm text-gray-600">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/ofertas"
                className="mt-6 inline-block text-sm font-semibold text-gray-900 underline"
              >
                Ver ofertas →
              </Link>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-bold text-gray-900">Si buscas trabajadores</h3>
              <ol className="mt-4 flex flex-col gap-5">
                {pasosEmpresa.map((p) => (
                  <li key={p.n} className="flex gap-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-gray-900"
                      style={{ backgroundColor: "#FFCB05" }}
                    >
                      {p.n}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{p.t}</p>
                      <p className="text-sm text-gray-600">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                href="/registro"
                className="mt-6 inline-block text-sm font-semibold text-gray-900 underline"
              >
                Publicar una oferta →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

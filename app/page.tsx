import Link from "next/link";
import Reveal from "./components/Reveal";

const pasosTrabajador = [
  { t: "Regístrate gratis", d: "Crea tu perfil de trabajador en un minuto. Para ti siempre es gratis." },
  { t: "Busca ofertas de tu oficio", d: "Filtra por oficio y por zona y encuentra obra cerca de ti." },
  { t: "Solicita y te contactan", d: "Pulsas \"Solicitar\" y la empresa recibe tu perfil y te llama." },
];

const pasosEmpresa = [
  { t: "Crea la cuenta de tu empresa", d: "Date de alta como empresa o contratista en unos minutos." },
  { t: "Publica tu oferta de obra", d: "Di qué necesitas: oficio, cuántos, dónde y cuándo empiezas." },
  { t: "Recibe candidatos y contacta", d: "Te avisamos cuando alguien solicita y contactas directamente." },
];

const valores = [
  { t: "Solo construcción", d: "Una bolsa especializada en el sector, no un cajón de sastre." },
  { t: "Contacto directo", d: "Empresa y trabajador se conectan directamente, sin intermediarios." },
  { t: "Gratis para el trabajador", d: "Buscar trabajo y solicitar ofertas no te cuesta nada." },
];

function Flecha() {
  return (
    <svg className="flecha" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero: foto real de obra bajo asfalto. La imagen va primero en el
          documento y el contenido dentro de "relative z-10"; sin z-index
          negativo (en Safari, con backdrop-blur, hacía desaparecer la foto). */}
      <section className="on-dark relative isolate overflow-hidden bg-asfalto text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-construccion.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(20,19,15,0.84) 0%, rgba(20,19,15,0.6) 45%, rgba(20,19,15,0.18) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:py-28">
          <div className="min-w-0">
            <h1
              className="entra font-display text-[2.9rem] font-black uppercase leading-[1.2] min-[420px]:text-[3.4rem] sm:text-[5rem] lg:text-[5.5rem]"
              style={{ ["--i" as string]: 0, textWrap: "balance" }}
            >
              El trabajo de la construcción,{" "}
              <span className="box-decoration-clone bg-obra px-2 text-asfalto">
                directo y sin intermediarios
              </span>
            </h1>
            <p
              className="entra mt-9 max-w-xl text-lg leading-relaxed text-gray-200 sm:text-xl"
              style={{ ["--i" as string]: 2 }}
            >
              Empresas y trabajadores del oficio, conectados en un solo sitio.
              Publica tu obra o encuentra la tuya.
            </p>
            <div
              className="entra mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ ["--i" as string]: 3 }}
            >
              <Link href="/ofertas" className="btn btn-yellow min-h-14 px-7 text-base">
                Busco trabajo <Flecha />
              </Link>
              <Link href="/registro" className="btn btn-line-light min-h-14 px-7 text-base">
                Busco trabajadores
              </Link>
            </div>
          </div>

          {/* Ficha de ejemplo: enseña lo que se publica y lo que se lee de un vistazo */}
          <div
            className="entra hidden lg:block"
            style={{ ["--i" as string]: 4 }}
            aria-hidden="true"
          >
            <div className="rounded-2xl bg-white p-5 text-asfalto shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-md bg-asfalto px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-obra">
                  Encofrador
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  Ejemplo de oferta
                </span>
              </div>
              <p className="font-display mt-4 text-[2rem] font-extrabold uppercase leading-none">
                Oficial de 1.ª encofrador
              </p>
              <p className="mt-1.5 text-sm text-gray-600">Xàtiva (Valencia)</p>
              <dl className="mt-5 grid grid-cols-3 divide-x divide-gray-200 border-y border-gray-200 text-center">
                {[
                  ["Puestos", "3"],
                  ["Duración", "120 d."],
                  ["Inicio", "Lunes"],
                ].map(([k, v]) => (
                  <div key={k} className="py-3">
                    <dt className="text-[0.7rem] font-semibold uppercase tracking-wide text-gray-500">
                      {k}
                    </dt>
                    <dd className="font-display mt-0.5 text-2xl font-extrabold">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-display num text-3xl font-black">
                  2.200 €<span className="text-base font-bold text-gray-500">/mes</span>
                </span>
                <span className="btn btn-yellow btn-sm pointer-events-none">Solicitar</span>
              </div>
            </div>
          </div>
        </div>
        <div className="cinta cinta-viva relative z-10" aria-hidden="true" />
      </section>

      {/* Valores: tres frases, sin tarjetas */}
      <section className="px-4 py-16 sm:py-20">
        <ul className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-gray-300">
          {valores.map((v, i) => (
            <li key={v.t} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <Reveal delay={i * 70}>
                <h2 className="font-display text-4xl font-extrabold uppercase leading-none sm:text-[2.6rem]">
                  {v.t}
                </h2>
                <p className="mt-3 max-w-xs text-base leading-relaxed text-gray-600">{v.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Cómo funciona: los dos lados de la obra */}
      <section className="px-4 pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">
              Cómo funciona
            </h2>
            <p className="mt-3 max-w-xl text-lg text-gray-600">
              Sencillo para los dos lados de la obra.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-9">
                <h3 className="font-display text-3xl font-extrabold uppercase">Si buscas trabajo</h3>
                <ol className="mt-7 flex flex-1 flex-col gap-6">
                  {pasosTrabajador.map((p, i) => (
                    <li key={p.t} className="flex gap-5">
                      <span className="font-display num w-9 shrink-0 text-5xl font-black leading-[0.85] text-obra [-webkit-text-stroke:2px_var(--asfalto)]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-lg font-bold">{p.t}</p>
                        <p className="mt-0.5 text-base text-gray-600">{p.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link href="/ofertas" className="btn btn-dark mt-9 self-start">
                  Ver ofertas <Flecha />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={90} className="h-full">
              <div className="on-dark flex h-full flex-col rounded-2xl bg-asfalto p-6 text-white sm:p-9">
                <h3 className="font-display text-3xl font-extrabold uppercase">Si buscas trabajadores</h3>
                <ol className="mt-7 flex flex-1 flex-col gap-6">
                  {pasosEmpresa.map((p, i) => (
                    <li key={p.t} className="flex gap-5">
                      <span className="font-display num w-9 shrink-0 text-5xl font-black leading-[0.85] text-obra">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-lg font-bold">{p.t}</p>
                        <p className="mt-0.5 text-base text-gray-300">{p.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <Link href="/registro" className="btn btn-yellow mt-9 self-start">
                  Publicar una oferta <Flecha />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cierre: el amarillo ocupa la página */}
      <section className="bg-obra px-4 py-16 text-asfalto sm:py-24">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2
            className="font-display max-w-3xl text-[3rem] font-black uppercase leading-[0.92] sm:text-7xl"
            style={{ textWrap: "balance" }}
          >
            ¿Empiezas obra el lunes? Publícala hoy.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/registro" className="btn btn-dark min-h-14 px-7 text-base">
              Crear cuenta <Flecha />
            </Link>
            <Link href="/ofertas" className="btn btn-line min-h-14 px-7 text-base">
              Ver ofertas
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

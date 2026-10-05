import Link from "next/link";

export const metadata = {
  title: "Quiénes somos",
  description:
    "Bolsa Obra es la bolsa de trabajo especializada en el sector de la construcción.",
};

export default function QuienesSomos() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="font-display text-6xl font-black uppercase leading-none sm:text-7xl">
        Quiénes somos
      </h1>

      <div className="ficha mt-8 overflow-hidden"><div className="cinta" aria-hidden="true" style={{ height: 8 }} /><div className="p-6 sm:p-9">
        <div className="flex flex-col gap-5 text-lg leading-relaxed text-gray-700">
          <p>
            Bolsa Obra nace para resolver algo que en la construcción se sigue
            haciendo demasiado a la antigua: encontrar mano de obra y encontrar
            trabajo. Somos una bolsa de empleo{" "}
            <strong>especializada solo en el sector de la construcción</strong>.
          </p>
          <p>
            Nuestro objetivo es sencillo:{" "}
            <strong>
              poner en contacto a empresas y trabajadores del oficio de forma
              directa
            </strong>
            , sin intermediarios ni complicaciones. La empresa publica lo que
            necesita, el trabajador lo encuentra y lo solicita, y se ponen en
            contacto.
          </p>
          <p>
            Trabajamos para los dos lados de la obra: para el{" "}
            <strong>contratista</strong> que necesita gente cualificada para
            empezar el lunes, y para el <strong>profesional</strong> —encofrador,
            albañil, peón, ferrallista— que busca su próxima obra cerca de casa.
          </p>
          <p>
            Es un proyecto que empieza, hecho desde dentro y pensado para la
            gente del sector. Si eres empresa o trabajador de la construcción,
            esta es tu bolsa.
          </p>
        </div>
      </div></div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/ofertas"
          className="btn btn-dark"
        >
          Ver ofertas
        </Link>
        <Link
          href="/registro"
          className="btn btn-yellow"
        >
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}

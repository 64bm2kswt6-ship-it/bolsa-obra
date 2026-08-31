import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center gap-6 overflow-hidden px-4 py-12 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex select-none flex-col items-center justify-center font-black leading-none"
        style={{ color: "rgba(140, 140, 140, 0.13)" }}
      >
        <span className="text-[19vw] tracking-tighter">BOLSA</span>
        <span className="text-[19vw] tracking-tighter">OBRA</span>
      </div>

      <h1 className="text-4xl font-semibold">Bolsa Obra</h1>
      <p className="max-w-md text-gray-600">
        La bolsa de trabajo para el sector de la construcción: conecta empresas y
        trabajadores del oficio.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/ofertas"
          className="rounded bg-gray-900 px-6 py-3 text-sm font-medium text-white"
        >
          Busco trabajo
        </Link>
        <Link
          href="/registro"
          className="rounded bg-[#FFCB05] px-6 py-3 text-sm font-medium text-gray-900"
        >
          Busco trabajadores
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center">
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
          className="rounded border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900"
        >
          Busco trabajadores
        </Link>
      </div>
    </div>
  );
}

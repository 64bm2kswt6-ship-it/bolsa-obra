import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(255,203,5,0.14), transparent 60%), radial-gradient(50% 40% at 85% 90%, rgba(20,20,20,0.05), transparent 60%), linear-gradient(180deg, #fffdf5 0%, #ffffff 55%)",
        }}
      />
      <svg width="60" height="48" viewBox="0 0 100 80" fill="none" aria-hidden="true" className="mb-6">
        <path d="M6 54 Q6 47 14 46 L86 46 Q94 47 94 54 Q94 60 86 60 L14 60 Q6 60 6 54 Z" fill="#FFCB05" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
        <path d="M18 48 Q18 18 50 16 Q82 18 82 48 Z" fill="#FFCB05" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
        <path d="M50 16 L50 48 M34 20 L34 48 M66 20 L66 48" stroke="#141414" strokeWidth="3" />
        <path d="M41 14 Q50 10 59 14 L59 20 Q50 16 41 20 Z" fill="#141414" />
      </svg>
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Error 404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mx-auto mt-3 max-w-md text-gray-600">
        Puede que el enlace esté mal escrito o que la oferta ya no esté disponible.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-gray-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          Ir al inicio
        </Link>
        <Link
          href="/ofertas"
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Ver ofertas
        </Link>
      </div>
    </div>
  );
}

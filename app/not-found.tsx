import Link from "next/link";
import Logo from "./components/Logo";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <Logo size={72} />
      <p className="font-display mt-6 text-[7rem] font-black leading-[0.8] text-obra [-webkit-text-stroke:3px_var(--asfalto)] sm:text-[10rem]">404</p>
      <h1 className="font-display mt-5 text-5xl font-black uppercase leading-none sm:text-6xl">
        Esta página no existe
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-gray-600">
        Puede que el enlace esté mal escrito o que la oferta ya no esté disponible.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="btn btn-dark"
        >
          Ir al inicio
        </Link>
        <Link
          href="/ofertas"
          className="btn btn-line"
        >
          Ver ofertas
        </Link>
      </div>
    </div>
  );
}

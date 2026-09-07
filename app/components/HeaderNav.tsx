"use client";

import Link from "next/link";
import { useState } from "react";

const navLink = "text-gray-600 transition-colors hover:text-gray-900";

export default function HeaderNav({
  loggedIn,
  email,
  role,
  isEmpresa,
  onSignOut,
}: {
  loggedIn: boolean;
  email?: string;
  role?: string;
  isEmpresa: boolean;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Nav de escritorio */}
      <nav className="hidden items-center gap-5 whitespace-nowrap text-sm sm:flex">
        <Link href="/ofertas" className={navLink}>
          Ofertas
        </Link>
        <Link href="/quienes-somos" className={navLink}>
          Quiénes somos
        </Link>
        {loggedIn ? (
          <>
            {isEmpresa && (
              <Link href="/empresa/ofertas" className={navLink}>
                Mis ofertas
              </Link>
            )}
            <span className="hidden text-gray-500 lg:inline">
              {email} ({role})
            </span>
            <form action={onSignOut}>
              <button type="submit" className={navLink}>
                Cerrar sesión
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={navLink}>
              Iniciar sesión
            </Link>
            <Link
              href="/registro"
              className="rounded-full bg-gray-900 px-4 py-1.5 font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Crear cuenta
            </Link>
          </>
        )}
      </nav>

      {/* Botón hamburguesa (móvil) */}
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 sm:hidden"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        )}
      </button>

      {/* Menú desplegable (móvil) */}
      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white p-3 shadow-md sm:hidden">
          <nav className="flex flex-col gap-1 text-sm">
            <Link
              href="/ofertas"
              className="rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Ofertas
            </Link>
            <Link
              href="/quienes-somos"
              className="rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              Quiénes somos
            </Link>
            {loggedIn ? (
              <>
                {isEmpresa && (
                  <Link
                    href="/empresa/ofertas"
                    className="rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Mis ofertas
                  </Link>
                )}
                <div className="px-3 py-1 text-xs text-gray-500">
                  {email} ({role})
                </div>
                <form action={onSignOut}>
                  <button
                    type="submit"
                    className="w-full rounded-lg px-3 py-2.5 text-left text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cerrar sesión
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2.5 text-gray-700 transition-colors hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  className="mt-1 rounded-lg bg-gray-900 px-3 py-2.5 text-center font-medium text-white"
                  onClick={() => setOpen(false)}
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

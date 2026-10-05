"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLink =
  "rounded-md px-1 py-2 font-medium text-gray-300 transition-colors duration-150 hover:text-white";
const itemMovil =
  "flex min-h-12 items-center rounded-lg px-3 font-medium text-gray-100 transition-colors active:bg-white/10";

const etiquetaRol: Record<string, string> = {
  TRABAJADOR: "Trabajador",
  EMPRESA: "Empresa",
  ADMIN: "Admin",
};

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const cerrar = () => setOpen(false);

  return (
    <>
      {/* Nav de escritorio */}
      <nav className="hidden items-center gap-6 whitespace-nowrap text-sm sm:flex">
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
            <span className="hidden max-w-[16rem] truncate text-gray-400 lg:inline">
              {email} · {role ? etiquetaRol[role] ?? role : ""}
            </span>
            <form action={onSignOut}>
              <button type="submit" className={`${navLink} cursor-pointer`}>
                Cerrar sesión
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={navLink}>
              Iniciar sesión
            </Link>
            <Link href="/registro" className="btn btn-yellow btn-sm">
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
        aria-controls="menu-movil"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white transition-[background-color,transform] duration-150 active:scale-95 active:bg-white/10 sm:hidden"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path
            d="M4 7h16"
            style={{
              transformOrigin: "12px 12px",
              transition: "transform 220ms cubic-bezier(0.23,1,0.32,1)",
              transform: open ? "translateY(5px) rotate(45deg)" : "none",
            }}
          />
          <path
            d="M4 12h16"
            style={{
              transition: "opacity 120ms ease",
              opacity: open ? 0 : 1,
            }}
          />
          <path
            d="M4 17h16"
            style={{
              transformOrigin: "12px 12px",
              transition: "transform 220ms cubic-bezier(0.23,1,0.32,1)",
              transform: open ? "translateY(-5px) rotate(-45deg)" : "none",
            }}
          />
        </svg>
      </button>

      {/* Menú desplegable (móvil) */}
      <div
        id="menu-movil"
        data-open={open}
        className="menu-movil absolute left-[-1rem] right-[-1rem] top-full z-40 border-t border-white/10 bg-asfalto p-3 pb-4 shadow-xl sm:hidden"
      >
        <nav className="flex flex-col gap-1 text-base">
          <Link href="/ofertas" className={itemMovil} onClick={cerrar}>
            Ofertas
          </Link>
          <Link href="/quienes-somos" className={itemMovil} onClick={cerrar}>
            Quiénes somos
          </Link>
          {loggedIn ? (
            <>
              {isEmpresa && (
                <Link href="/empresa/ofertas" className={itemMovil} onClick={cerrar}>
                  Mis ofertas
                </Link>
              )}
              <div className="truncate px-3 py-2 text-xs text-gray-400">
                {email} · {role ? etiquetaRol[role] ?? role : ""}
              </div>
              <form action={onSignOut}>
                <button type="submit" className={`${itemMovil} w-full cursor-pointer text-left`}>
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={itemMovil} onClick={cerrar}>
                Iniciar sesión
              </Link>
              <Link href="/registro" className="btn btn-yellow mt-2" onClick={cerrar}>
                Crear cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

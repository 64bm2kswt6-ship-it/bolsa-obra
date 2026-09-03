import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { auth, signOut } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bolsa Obra",
  description:
    "La bolsa de trabajo del sector de la construcción: conecta empresas y trabajadores del oficio.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <svg
              width="30"
              height="24"
              viewBox="0 0 100 80"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 54 Q6 47 14 46 L86 46 Q94 47 94 54 Q94 60 86 60 L14 60 Q6 60 6 54 Z"
                fill="#FFCB05"
                stroke="#141414"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M18 48 Q18 18 50 16 Q82 18 82 48 Z"
                fill="#FFCB05"
                stroke="#141414"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M50 16 L50 48 M34 20 L34 48 M66 20 L66 48"
                stroke="#141414"
                strokeWidth="3"
              />
              <path
                d="M41 14 Q50 10 59 14 L59 20 Q50 16 41 20 Z"
                fill="#141414"
              />
            </svg>
            <span>Bolsa Obra</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/ofertas" className="underline">
              Ofertas
            </Link>
            <Link href="/quienes-somos" className="underline">
              Quiénes somos
            </Link>
            {session?.user ? (
              <>
                {session.user.role === "EMPRESA" && (
                  <Link href="/empresa/ofertas" className="underline">
                    Mis ofertas
                  </Link>
                )}
                <span className="text-gray-600">
                  {session.user.email} ({session.user.role})
                </span>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit" className="underline">
                    Cerrar sesión
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="underline">
                  Iniciar sesión
                </Link>
                <Link href="/registro" className="underline">
                  Crear cuenta
                </Link>
              </>
            )}
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="border-t border-gray-200 bg-gray-50 px-4 py-8 text-sm text-gray-600">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <svg width="24" height="19" viewBox="0 0 100 80" fill="none" aria-hidden="true">
                  <path d="M6 54 Q6 47 14 46 L86 46 Q94 47 94 54 Q94 60 86 60 L14 60 Q6 60 6 54 Z" fill="#FFCB05" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M18 48 Q18 18 50 16 Q82 18 82 48 Z" fill="#FFCB05" stroke="#141414" strokeWidth="4" strokeLinejoin="round" />
                  <path d="M50 16 L50 48 M34 20 L34 48 M66 20 L66 48" stroke="#141414" strokeWidth="3" />
                </svg>
                Bolsa Obra
              </div>
              <p className="mt-2">La bolsa de trabajo del sector de la construcción.</p>
            </div>
            <div className="flex gap-12">
              <nav className="flex flex-col gap-2">
                <span className="font-semibold text-gray-900">Enlaces</span>
                <Link href="/ofertas" className="hover:underline">Ofertas</Link>
                <Link href="/quienes-somos" className="hover:underline">Quiénes somos</Link>
                <Link href="/registro" className="hover:underline">Crear cuenta</Link>
              </nav>
              <nav className="flex flex-col gap-2">
                <span className="font-semibold text-gray-900">Legal</span>
                <Link href="/aviso-legal" className="hover:underline">Aviso legal</Link>
                <Link href="/privacidad" className="hover:underline">Privacidad</Link>
                <Link href="/terminos" className="hover:underline">Términos</Link>
                <Link href="/cookies" className="hover:underline">Cookies</Link>
              </nav>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-5xl border-t border-gray-200 pt-4 text-xs text-gray-500">
            © {new Date().getFullYear()} Bolsa Obra
          </div>
        </footer>
      </body>
    </html>
  );
}

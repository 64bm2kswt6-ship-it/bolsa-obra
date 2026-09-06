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

const SITE_URL = "https://bolsa-obra.vercel.app";
const SITE_TITLE = "Bolsa Obra";
const SITE_DESCRIPTION =
  "La bolsa de trabajo del sector de la construcción: conecta empresas y trabajadores del oficio. Publica tu obra o encuentra la tuya.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const navLink =
  "text-gray-600 transition-colors hover:text-gray-900";

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-gray-900 transition-transform hover:scale-[1.02]"
            >
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
            <nav className="flex items-center gap-5 text-sm">
              <Link href="/ofertas" className={navLink}>
                Ofertas
              </Link>
              <Link href="/quienes-somos" className={navLink}>
                Quiénes somos
              </Link>
              {session?.user ? (
                <>
                  {session.user.role === "EMPRESA" && (
                    <Link href="/empresa/ofertas" className={navLink}>
                      Mis ofertas
                    </Link>
                  )}
                  <span className="hidden text-gray-500 sm:inline">
                    {session.user.email} ({session.user.role})
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
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
          </div>
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
                <Link href="/ofertas" className="transition-colors hover:text-gray-900">Ofertas</Link>
                <Link href="/quienes-somos" className="transition-colors hover:text-gray-900">Quiénes somos</Link>
                <Link href="/registro" className="transition-colors hover:text-gray-900">Crear cuenta</Link>
              </nav>
              <nav className="flex flex-col gap-2">
                <span className="font-semibold text-gray-900">Legal</span>
                <Link href="/aviso-legal" className="transition-colors hover:text-gray-900">Aviso legal</Link>
                <Link href="/privacidad" className="transition-colors hover:text-gray-900">Privacidad</Link>
                <Link href="/terminos" className="transition-colors hover:text-gray-900">Términos</Link>
                <Link href="/cookies" className="transition-colors hover:text-gray-900">Cookies</Link>
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

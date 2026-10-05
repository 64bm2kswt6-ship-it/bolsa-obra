import type { Metadata } from "next";
import { Archivo, Big_Shoulders } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { auth, signOut } from "@/auth";
import HeaderNav from "./components/HeaderNav";
import Logo from "./components/Logo";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-bigshoulders",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  adjustFontFallback: false,
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

async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  return (
    <html
      lang="es"
      className={`${archivo.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <header className="on-dark sticky top-0 z-50 bg-asfalto px-4 text-white">
          <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 whitespace-nowrap transition-transform duration-150 active:scale-[0.97]"
              aria-label="Bolsa Obra, inicio"
            >
              <Logo size={34} outline="#ffffff" />
              <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide">
                Bolsa Obra
              </span>
            </Link>
            <HeaderNav
              loggedIn={!!session?.user}
              email={session?.user?.email ?? undefined}
              role={session?.user?.role ?? undefined}
              isEmpresa={session?.user?.role === "EMPRESA"}
              onSignOut={handleSignOut}
            />
          </div>
          <div className="cinta -mx-4" aria-hidden="true" style={{ height: 6 }} />
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="on-dark bg-asfalto text-sm text-gray-300">
          <div className="cinta" aria-hidden="true" />
          <div className="mx-auto max-w-6xl px-4 pb-8 pt-12">
            <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
              <div className="max-w-sm">
                <div className="flex items-center gap-2.5 text-white">
                  <Logo size={30} outline="#ffffff" />
                  <span className="font-display text-2xl font-extrabold uppercase leading-none tracking-wide">
                    Bolsa Obra
                  </span>
                </div>
                <p className="mt-4 text-base leading-relaxed text-gray-300">
                  La bolsa de trabajo del sector de la construcción. Empresas y
                  trabajadores del oficio, en contacto directo.
                </p>
              </div>
              <div className="flex gap-16">
                <nav className="flex flex-col gap-3" aria-label="Enlaces">
                  <span className="font-display text-lg font-bold uppercase tracking-wider text-obra">
                    Enlaces
                  </span>
                  <Link href="/ofertas" className="transition-colors hover:text-white">Ofertas</Link>
                  <Link href="/quienes-somos" className="transition-colors hover:text-white">Quiénes somos</Link>
                  <Link href="/registro" className="transition-colors hover:text-white">Crear cuenta</Link>
                </nav>
                <nav className="flex flex-col gap-3" aria-label="Legal">
                  <span className="font-display text-lg font-bold uppercase tracking-wider text-obra">
                    Legal
                  </span>
                  <Link href="/aviso-legal" className="transition-colors hover:text-white">Aviso legal</Link>
                  <Link href="/privacidad" className="transition-colors hover:text-white">Privacidad</Link>
                  <Link href="/terminos" className="transition-colors hover:text-white">Términos</Link>
                  <Link href="/cookies" className="transition-colors hover:text-white">Cookies</Link>
                </nav>
              </div>
            </div>
            <div className="mt-10 border-t border-white/15 pt-5 text-xs text-gray-400">
              © {new Date().getFullYear()} Bolsa Obra
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

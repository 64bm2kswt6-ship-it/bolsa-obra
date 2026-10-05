export const metadata = { title: "Aviso Legal" };

export default function AvisoLegal() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">Aviso Legal</h1>
      <p className="mt-2 text-sm text-gray-500">Última actualización: octubre de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">1. Datos identificativos</h2>
          <p className="mt-2">
            En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la
            Información y de Comercio Electrónico (LSSI-CE), se informa de que el
            titular de este sitio web es:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Titular: <strong>Carlos Carmona Palet</strong></li>
            <li>Correo de contacto: comven4@gmail.com</li>
            <li>Sitio web: bolsa-obra.vercel.app</li>
          </ul>
          <p className="mt-2">
            Bolsa Obra es un <strong>proyecto personal, gratuito y sin ánimo de
            lucro</strong>. No incluye publicidad ni se obtienen ingresos de su uso.
            Si en el futuro esto cambiara, se actualizarán estos datos
            identificativos.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">2. Objeto</h2>
          <p className="mt-2">
            Bolsa Obra es una plataforma en línea que pone en contacto a empresas y
            trabajadores del sector de la construcción, permitiendo a las empresas
            publicar ofertas de trabajo y a los trabajadores consultarlas y
            solicitarlas.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">3. Condiciones de uso</h2>
          <p className="mt-2">
            El acceso y uso de este sitio implica la aceptación de este Aviso Legal y
            de los Términos y Condiciones de Uso. Si no está de acuerdo, le rogamos
            que no utilice el sitio.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">4. Propiedad intelectual</h2>
          <p className="mt-2">
            Los contenidos, la marca, el diseño y el software del sitio pertenecen a
            su titular o a terceros que han autorizado su uso. Queda prohibida su
            reproducción sin autorización.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">5. Responsabilidad</h2>
          <p className="mt-2">
            Bolsa Obra actúa únicamente como punto de contacto entre empresas y
            trabajadores. No es parte de la relación laboral que pudiera surgir, ni
            garantiza la veracidad de las ofertas o los perfiles publicados por los
            usuarios, que son responsabilidad de quien los publica.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">6. Enlaces y servicios de terceros</h2>
          <p className="mt-2">
            El sitio puede enlazar o integrar servicios de terceros, como Google
            Maps para mostrar la ubicación de una oferta. Bolsa Obra no se
            responsabiliza de sus contenidos ni de sus políticas.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">7. Legislación aplicable</h2>
          <p className="mt-2">
            Este Aviso Legal se rige por la legislación española.
          </p>
        </section>
      </div>
    </div>
  );
}

export const metadata = { title: "Aviso Legal · Bolsa Obra" };

export default function AvisoLegal() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Aviso Legal</h1>
      <p className="mt-2 text-sm text-gray-500">Última actualización: septiembre de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Datos identificativos</h2>
          <p className="mt-2">
            En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la
            Información y de Comercio Electrónico (LSSI-CE), se informa de que el
            titular de este sitio web es:
          </p>
          <ul className="mt-2 list-disc pl-5">
            <li>Responsable: <strong>[NOMBRE DEL RESPONSABLE]</strong></li>
            <li>Domicilio: [DIRECCIÓN]</li>
            <li>Correo de contacto: comven4@gmail.com</li>
            <li>Sitio web: bolsa-obra.vercel.app</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Objeto</h2>
          <p className="mt-2">
            Bolsa Obra es una plataforma en línea que pone en contacto a empresas y
            trabajadores del sector de la construcción, permitiendo a las empresas
            publicar ofertas de trabajo y a los trabajadores consultarlas y
            solicitarlas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Condiciones de uso</h2>
          <p className="mt-2">
            El acceso y uso de este sitio implica la aceptación de este Aviso Legal y
            de los Términos y Condiciones de Uso. Si no está de acuerdo, le rogamos
            que no utilice el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Propiedad intelectual</h2>
          <p className="mt-2">
            Los contenidos, la marca, el diseño y el software del sitio pertenecen a
            su titular o a terceros que han autorizado su uso. Queda prohibida su
            reproducción sin autorización.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Responsabilidad</h2>
          <p className="mt-2">
            Bolsa Obra actúa únicamente como punto de contacto entre empresas y
            trabajadores. No es parte de la relación laboral que pudiera surgir, ni
            garantiza la veracidad de las ofertas o los perfiles publicados por los
            usuarios, que son responsabilidad de quien los publica.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Legislación aplicable</h2>
          <p className="mt-2">
            Este Aviso Legal se rige por la legislación española.
          </p>
        </section>
      </div>
    </div>
  );
}

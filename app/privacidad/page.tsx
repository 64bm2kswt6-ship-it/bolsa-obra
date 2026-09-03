export const metadata = { title: "Política de Privacidad · Bolsa Obra" };

export default function Privacidad() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-gray-500">Última actualización: septiembre de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Responsable del tratamiento</h2>
          <p className="mt-2">
            Responsable: <strong>[NOMBRE DEL RESPONSABLE]</strong>. Correo de contacto:
            comven4@gmail.com. Tratamos tus datos conforme al Reglamento General de
            Protección de Datos (RGPD) y la LOPDGDD.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Qué datos recogemos</h2>
          <ul className="mt-2 list-disc pl-5">
            <li><strong>Cuenta:</strong> correo electrónico y contraseña (guardada siempre cifrada).</li>
            <li><strong>Trabajadores:</strong> nombre, apellidos, teléfono, población, provincia, oficio y años de experiencia.</li>
            <li><strong>Empresas:</strong> razón social, CIF, persona de contacto y teléfono.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Para qué los usamos</h2>
          <p className="mt-2">
            Para gestionar tu registro, permitir publicar y consultar ofertas,
            gestionar las solicitudes y avisar por correo a la empresa cuando un
            trabajador solicita una oferta.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Base legal</h2>
          <p className="mt-2">
            La ejecución del servicio que solicitas al registrarte y tu
            consentimiento al aceptar esta política durante el registro.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. A quién se comunican</h2>
          <p className="mt-2">
            Cuando un trabajador solicita una oferta, sus datos de contacto se
            comparten con la empresa que la publicó, con esa única finalidad. Además,
            usamos proveedores tecnológicos que hacen funcionar la web (alojamiento,
            base de datos y envío de correos), que actúan como encargados del
            tratamiento. No vendemos ni cedemos tus datos a terceros con fines
            comerciales.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Conservación</h2>
          <p className="mt-2">
            Conservamos tus datos mientras tu cuenta esté activa y, después, durante
            el tiempo legalmente necesario. Puedes solicitar la baja en cualquier
            momento.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Tus derechos</h2>
          <p className="mt-2">
            Puedes ejercer tus derechos de acceso, rectificación, supresión,
            oposición, limitación y portabilidad escribiendo a comven4@gmail.com.
            También puedes reclamar ante la Agencia Española de Protección de Datos
            (www.aepd.es) si consideras que no hemos atendido tus derechos.
          </p>
        </section>
      </div>
    </div>
  );
}

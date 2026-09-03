export const metadata = { title: "Política de Privacidad · Bolsa Obra" };

type Fila = [string, string];

function Bloque({ titulo, filas }: { titulo: string; filas: Fila[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white">
        {titulo}
      </div>
      <dl>
        {filas.map(([k, v], i) => (
          <div
            key={k}
            className={`grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[190px_1fr] sm:gap-4 ${
              i % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <dt className="text-sm font-semibold text-gray-800">{k}</dt>
            <dd className="text-sm text-gray-600">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Privacidad() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
      <p className="mt-2 text-sm text-gray-500">
        Última actualización: septiembre de 2026
      </p>

      <div className="mt-8 flex flex-col gap-8 leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Introducción</h2>
          <p className="mt-2">
            En Bolsa Obra nos tomamos en serio tu privacidad. Esta política explica,
            de forma clara y por cada tipo de dato, qué información recopilamos, para
            qué la usamos, con qué base legal y durante cuánto tiempo la conservamos.
            Tratamos tus datos conforme al Reglamento General de Protección de Datos
            (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            2. Responsable del tratamiento
          </h2>
          <div className="mt-3">
            <Bloque
              titulo="Responsable"
              filas={[
                ["Titular", "[NOMBRE DEL RESPONSABLE]"],
                ["Correo de contacto", "comven4@gmail.com"],
                ["Sitio web", "bolsa-obra.vercel.app"],
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            3. Recopilación y uso de los datos
          </h2>
          <p className="mt-2">
            A continuación se detalla cada categoría de datos que tratamos:
          </p>

          <div className="mt-4 flex flex-col gap-5">
            <Bloque
              titulo="Datos de registro y cuenta"
              filas={[
                ["¿Qué recopilamos?", "Tu correo electrónico y tu contraseña (que se guarda siempre cifrada; nunca en texto legible)."],
                ["¿Cómo lo utilizamos?", "Para crear y gestionar tu cuenta, permitir el inicio de sesión y garantizar la seguridad del acceso."],
                ["Base legal", "La ejecución del servicio que nos solicitas al registrarte."],
                ["Periodo de retención", "Mientras tu cuenta esté activa. Tras la baja, solo el tiempo que exija la ley."],
              ]}
            />

            <Bloque
              titulo="Perfil del trabajador"
              filas={[
                ["¿Qué recopilamos?", "Nombre, apellidos, teléfono, población, provincia, oficio principal y años de experiencia."],
                ["¿Cómo lo utilizamos?", "Para mostrar tu candidatura a la empresa cuando solicitas una de sus ofertas y permitir que se ponga en contacto contigo."],
                ["Base legal", "La ejecución del servicio y tu consentimiento, otorgado al registrarte y aceptar esta política."],
                ["Periodo de retención", "Mientras tu cuenta esté activa o hasta que solicites la baja."],
              ]}
            />

            <Bloque
              titulo="Datos de la empresa"
              filas={[
                ["¿Qué recopilamos?", "Razón social, CIF, persona de contacto y teléfono."],
                ["¿Cómo lo utilizamos?", "Para identificar a la empresa, permitirle publicar ofertas y que los trabajadores puedan contactar con ella."],
                ["Base legal", "La ejecución del servicio contratado por la empresa."],
                ["Periodo de retención", "Mientras la cuenta de empresa esté activa o hasta que solicite la baja."],
              ]}
            />

            <Bloque
              titulo="Ofertas publicadas"
              filas={[
                ["¿Qué recopilamos?", "El contenido de cada oferta: título, oficio, descripción, ubicación, fechas, salario y número de puestos."],
                ["¿Cómo lo utilizamos?", "Para mostrar las ofertas de forma pública en el tablón, de modo que los trabajadores puedan encontrarlas y solicitarlas."],
                ["Base legal", "La ejecución del servicio prestado a la empresa."],
                ["Periodo de retención", "Mientras la oferta esté activa o hasta que la empresa la cierre o la elimine."],
              ]}
            />

            <Bloque
              titulo="Solicitudes de empleo"
              filas={[
                ["¿Qué recopilamos?", "La relación entre un trabajador y la oferta que solicita, junto con un mensaje opcional."],
                ["¿Cómo lo utilizamos?", "Para gestionar tu candidatura, avisar a la empresa y compartir con ella tus datos de contacto con el fin de que valore tu perfil."],
                ["Base legal", "La ejecución del servicio y tu consentimiento, otorgado al pulsar «Solicitar»."],
                ["Periodo de retención", "Mientras tu cuenta y la oferta estén activas."],
              ]}
            />

            <Bloque
              titulo="Comunicaciones por correo"
              filas={[
                ["¿Qué recopilamos?", "Los correos que enviamos, por ejemplo el aviso a una empresa cuando un trabajador solicita su oferta."],
                ["¿Cómo lo utilizamos?", "Para informar a las empresas de la actividad relevante de sus ofertas y facilitar el contacto."],
                ["Base legal", "La ejecución del servicio."],
                ["Periodo de retención", "El tiempo necesario para prestar el servicio."],
              ]}
            />

            <Bloque
              titulo="Datos técnicos"
              filas={[
                ["¿Qué recopilamos?", "Una cookie técnica necesaria para mantener tu sesión iniciada."],
                ["¿Cómo lo utilizamos?", "Únicamente para que no tengas que iniciar sesión en cada página."],
                ["Base legal", "Interés legítimo y necesidad técnica (las cookies estrictamente necesarias están exentas de consentimiento)."],
                ["Periodo de retención", "La duración de la sesión."],
              ]}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">
            4. Con quién compartimos tus datos
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Con las empresas:</strong> cuando solicitas una oferta, tus
              datos de contacto se comparten con la empresa que la publicó, con la
              única finalidad de que valore tu candidatura.
            </li>
            <li>
              <strong>Con proveedores tecnológicos (encargados del tratamiento):</strong>{" "}
              utilizamos servicios que hacen funcionar la web: alojamiento y
              despliegue, base de datos y envío de correos. Solo tratan los datos
              siguiendo nuestras instrucciones.
            </li>
            <li>
              <strong>No vendemos ni cedemos</strong> tus datos a terceros con fines
              comerciales.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Tus derechos</h2>
          <p className="mt-2">
            Puedes ejercer en cualquier momento tus derechos de acceso,
            rectificación, supresión, oposición, limitación del tratamiento y
            portabilidad, así como retirar tu consentimiento, escribiendo a{" "}
            <strong>comven4@gmail.com</strong>. Si consideras que no hemos atendido
            correctamente tu solicitud, puedes reclamar ante la Agencia Española de
            Protección de Datos (www.aepd.es).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">6. Seguridad</h2>
          <p className="mt-2">
            Aplicamos medidas técnicas y organizativas razonables para proteger tus
            datos. Las contraseñas se almacenan siempre cifradas y el acceso a la
            base de datos está restringido.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">7. Cookies</h2>
          <p className="mt-2">
            El uso de cookies se detalla en nuestra Política de Cookies. Actualmente
            solo utilizamos cookies técnicas necesarias.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">8. Menores de edad</h2>
          <p className="mt-2">
            La Plataforma está dirigida a personas mayores de edad. No recogemos de
            forma consciente datos de menores.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">9. Cambios en esta política</h2>
          <p className="mt-2">
            Podemos actualizar esta política para reflejar cambios en el servicio o
            en la normativa. Publicaremos siempre la versión vigente en esta página e
            indicaremos la fecha de la última actualización.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">10. Contacto</h2>
          <p className="mt-2">
            Para cualquier duda sobre esta política o sobre el tratamiento de tus
            datos, escríbenos a comven4@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
}

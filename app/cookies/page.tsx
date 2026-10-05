export const metadata = { title: "Política de Cookies" };

export default function Cookies() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <h1 className="font-display text-5xl font-black uppercase leading-none sm:text-6xl">Política de Cookies</h1>
      <p className="mt-2 text-sm text-gray-500">Última actualización: octubre de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">1. Qué es una cookie</h2>
          <p className="mt-2">
            Una cookie es un pequeño archivo que un sitio web guarda en tu navegador
            para recordar información, por ejemplo que has iniciado sesión.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">2. Qué cookies usamos</h2>
          <p className="mt-2">
            Bolsa Obra utiliza <strong>cookies técnicas necesarias</strong> para
            mantener tu sesión iniciada y proteger el acceso. No utilizamos
            cookies de analítica ni de publicidad propias.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full min-w-[34rem] text-left text-sm">
              <thead className="bg-obra text-asfalto">
                <tr>
                  <th className="px-3 py-2 font-bold">Cookie</th>
                  <th className="px-3 py-2 font-bold">Titular</th>
                  <th className="px-3 py-2 font-bold">Finalidad</th>
                  <th className="px-3 py-2 font-bold">Duración</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="px-3 py-2 font-medium">authjs.session-token</td>
                  <td className="px-3 py-2">Propia</td>
                  <td className="px-3 py-2">Mantiene tu sesión iniciada.</td>
                  <td className="px-3 py-2">Hasta 30 días</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">authjs.csrf-token</td>
                  <td className="px-3 py-2">Propia</td>
                  <td className="px-3 py-2">Protege los formularios de inicio de sesión frente a ataques.</td>
                  <td className="px-3 py-2">Sesión</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium">authjs.callback-url</td>
                  <td className="px-3 py-2">Propia</td>
                  <td className="px-3 py-2">Recuerda a qué página volver tras iniciar sesión.</td>
                  <td className="px-3 py-2">Sesión</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">3. Consentimiento y mapas de Google</h2>
          <p className="mt-2">
            Las cookies técnicas anteriores son imprescindibles para el
            funcionamiento del sitio y no requieren tu consentimiento previo,
            conforme a la normativa y a las directrices de la Agencia Española de
            Protección de Datos (AEPD).
          </p>
          <p className="mt-2">
            En la ficha de cada oferta puedes ver su ubicación en un mapa de{" "}
            <strong>Google Maps</strong>. Ese mapa <strong>no se carga hasta que
            pulsas «Mostrar mapa»</strong>. Al hacerlo, Google (Google LLC o Google
            Ireland Limited) recibe tu dirección IP y puede instalar sus propias
            cookies en tu navegador, sobre las que Bolsa Obra no tiene control. Si
            no pulsas el botón, no se carga nada de Google. Puedes consultar su
            política en policies.google.com/privacy.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">4. Cómo gestionarlas</h2>
          <p className="mt-2">
            Puedes borrar o bloquear las cookies desde la configuración de tu
            navegador. Ten en cuenta que si bloqueas la cookie de sesión no podrás
            mantener el inicio de sesión.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-extrabold uppercase">5. Cambios</h2>
          <p className="mt-2">
            Si en el futuro añadimos cookies de analítica o publicidad, o más servicios
            de terceros, actualizaremos esta política y te pediremos tu
            consentimiento con un aviso de cookies.
          </p>
        </section>
      </div>
    </div>
  );
}

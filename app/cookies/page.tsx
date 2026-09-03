export const metadata = { title: "Política de Cookies · Bolsa Obra" };

export default function Cookies() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Política de Cookies</h1>
      <p className="mt-2 text-sm text-gray-500">Última actualización: septiembre de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Qué es una cookie</h2>
          <p className="mt-2">
            Una cookie es un pequeño archivo que un sitio web guarda en tu navegador
            para recordar información, por ejemplo que has iniciado sesión.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Qué cookies usamos</h2>
          <p className="mt-2">
            Bolsa Obra utiliza únicamente <strong>cookies técnicas necesarias</strong>
            {" "}para mantener tu sesión iniciada mientras usas la web. No utilizamos
            cookies de analítica ni de publicidad, ni compartimos datos con terceros
            con fines de seguimiento.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Consentimiento</h2>
          <p className="mt-2">
            Al tratarse solo de cookies técnicas imprescindibles para el
            funcionamiento del sitio, no requieren tu consentimiento previo, conforme
            a la normativa y a las directrices de la Agencia Española de Protección de
            Datos (AEPD).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Cómo gestionarlas</h2>
          <p className="mt-2">
            Puedes borrar o bloquear las cookies desde la configuración de tu
            navegador. Ten en cuenta que si bloqueas la cookie de sesión no podrás
            mantener el inicio de sesión.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Cambios</h2>
          <p className="mt-2">
            Si en el futuro añadimos cookies de analítica o publicidad, actualizaremos
            esta política y te pediremos tu consentimiento con un aviso de cookies.
          </p>
        </section>
      </div>
    </div>
  );
}

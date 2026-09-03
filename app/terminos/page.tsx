export const metadata = { title: "Términos y Condiciones · Bolsa Obra" };

export default function Terminos() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones de Uso</h1>
      <p className="mt-2 text-sm text-gray-500">Última actualización: septiembre de 2026</p>

      <div className="mt-8 flex flex-col gap-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Objeto y aceptación</h2>
          <p className="mt-2">
            Estos términos regulan el uso de Bolsa Obra. Al registrarte o utilizar el
            sitio, aceptas estas condiciones. Si no estás de acuerdo, no utilices la
            plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Registro y cuenta</h2>
          <p className="mt-2">
            Para usar ciertas funciones debes registrarte con datos veraces y
            mantenerlos actualizados. Eres responsable de la confidencialidad de tu
            contraseña y de la actividad de tu cuenta.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Uso por parte de las empresas</h2>
          <p className="mt-2">
            Las empresas se comprometen a publicar ofertas reales, lícitas y
            relacionadas con el sector de la construcción, y a tratar los datos de los
            candidatos que reciban únicamente para el proceso de selección.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Uso por parte de los trabajadores</h2>
          <p className="mt-2">
            Los trabajadores se comprometen a facilitar información veraz en su perfil
            y en sus solicitudes.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Conducta prohibida</h2>
          <p className="mt-2">
            No está permitido usar la plataforma con fines ilícitos, publicar
            información falsa o engañosa, suplantar a terceros ni enviar spam.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Responsabilidad</h2>
          <p className="mt-2">
            Bolsa Obra solo pone en contacto a empresas y trabajadores. No participa
            en la relación laboral, no garantiza la contratación ni la veracidad de
            los contenidos publicados por los usuarios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Baja y modificaciones</h2>
          <p className="mt-2">
            Puedes dejar de usar el servicio y solicitar la baja cuando quieras.
            Podemos actualizar estos términos; avisaremos de los cambios relevantes.
            Se aplica la legislación española.
          </p>
        </section>
      </div>
    </div>
  );
}

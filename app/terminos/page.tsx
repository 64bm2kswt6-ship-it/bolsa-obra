export const metadata = { title: "Términos y Condiciones · Bolsa Obra" };

export default function Terminos() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Términos y Condiciones de Uso
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Última actualización: septiembre de 2026
      </p>

      <div className="mt-8 flex flex-col gap-7 leading-relaxed text-gray-700">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            1. Información general y aceptación
          </h2>
          <p className="mt-2">
            Los presentes Términos y Condiciones de Uso (en adelante, los
            «Términos») regulan el acceso y la utilización de la plataforma Bolsa
            Obra, accesible en bolsa-obra.vercel.app (en adelante, la
            «Plataforma»), cuyo titular es <strong>[NOMBRE DEL RESPONSABLE]</strong>
            {" "}(en adelante, el «Titular»), con correo de contacto
            comven4@gmail.com.
          </p>
          <p className="mt-2">
            El acceso, registro o uso de la Plataforma atribuye la condición de
            usuario (en adelante, el «Usuario») e implica la aceptación plena y sin
            reservas de todas y cada una de las disposiciones incluidas en estos
            Términos, en la versión publicada en el momento del acceso. Si el
            Usuario no está de acuerdo con ellos, deberá abstenerse de utilizar la
            Plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Definiciones</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>Plataforma:</strong> el sitio web Bolsa Obra y los servicios que ofrece.</li>
            <li><strong>Usuario:</strong> toda persona física o jurídica que accede o se registra en la Plataforma.</li>
            <li><strong>Trabajador:</strong> Usuario registrado que busca empleo en el sector de la construcción y crea un perfil profesional.</li>
            <li><strong>Empresa:</strong> Usuario registrado (empresa, autónomo o contratista) que publica ofertas de trabajo.</li>
            <li><strong>Oferta:</strong> anuncio de empleo publicado por una Empresa.</li>
            <li><strong>Solicitud:</strong> acción por la que un Trabajador manifiesta su interés en una Oferta.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            3. Objeto y naturaleza del servicio
          </h2>
          <p className="mt-2">
            La Plataforma es un servicio tecnológico de la sociedad de la
            información cuya finalidad es <strong>poner en contacto</strong> a
            Empresas y Trabajadores del sector de la construcción, permitiendo la
            publicación y consulta de ofertas de empleo y la gestión de solicitudes.
          </p>
          <p className="mt-2">
            El Titular actúa exclusivamente como <strong>intermediario técnico y
            punto de encuentro</strong>. La Plataforma <strong>no es una agencia de
            colocación ni una empresa de trabajo temporal</strong>, no interviene en
            los procesos de selección, no participa en la relación laboral,
            mercantil o de cualquier otra índole que pudiera surgir entre Usuarios,
            y no garantiza la contratación, la idoneidad de los candidatos ni la
            existencia o veracidad de las ofertas.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            4. Registro y cuenta de Usuario
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Para acceder a determinadas funcionalidades es necesario registrarse y crear una cuenta.</li>
            <li>El Usuario debe ser mayor de edad y tener capacidad legal suficiente para contratar.</li>
            <li>Los datos facilitados deben ser veraces, exactos y estar actualizados. El Usuario es responsable de su veracidad.</li>
            <li>El Usuario es responsable de la custodia de sus credenciales y de toda actividad realizada desde su cuenta. Deberá comunicar de inmediato cualquier uso no autorizado.</li>
            <li>No está permitido crear cuentas falsas, suplantar a terceros ni ceder la cuenta a otras personas.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            5. Obligaciones de las Empresas
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Publicar únicamente ofertas reales, lícitas, vigentes y relacionadas con el sector de la construcción.</li>
            <li>No publicar ofertas discriminatorias por razón de sexo, origen, edad, religión, orientación, discapacidad o cualquier otra circunstancia personal o social.</li>
            <li>Cumplir la legislación laboral, de seguridad social y de prevención de riesgos laborales aplicable a las contrataciones que realicen.</li>
            <li>Tratar los datos de los candidatos que reciban exclusivamente con la finalidad del proceso de selección y conforme a la normativa de protección de datos, actuando como responsables de dicho tratamiento.</li>
            <li>No exigir al Trabajador ningún pago por optar a una oferta o ser contratado.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            6. Obligaciones de los Trabajadores
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Facilitar información veraz y actualizada en su perfil y en sus solicitudes.</li>
            <li>Utilizar la Plataforma con la finalidad de buscar empleo, sin darle un uso comercial o fraudulento.</li>
            <li>Respetar la confidencialidad de la información a la que pueda acceder en el marco de un proceso de selección.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            7. Normas de conducta y usos prohibidos
          </h2>
          <p className="mt-2">Queda expresamente prohibido:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Utilizar la Plataforma con fines ilícitos, fraudulentos o contrarios a estos Términos o a la buena fe.</li>
            <li>Publicar contenidos falsos, engañosos, difamatorios, ofensivos, discriminatorios o que vulneren derechos de terceros.</li>
            <li>Enviar comunicaciones comerciales no solicitadas (spam) a otros Usuarios.</li>
            <li>Recopilar datos de otros Usuarios de forma masiva o automatizada (scraping), así como emplear robots, bots u otros medios automáticos no autorizados.</li>
            <li>Introducir virus o cualquier código malicioso, o intentar acceder, alterar o dañar los sistemas de la Plataforma.</li>
            <li>Realizar ingeniería inversa, descompilar o intentar obtener el código fuente de la Plataforma.</li>
          </ul>
          <p className="mt-2">
            El incumplimiento de estas normas podrá dar lugar a la retirada del
            contenido y a la suspensión o cancelación de la cuenta, sin perjuicio de
            las acciones legales que correspondan.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            8. Contenido publicado por los Usuarios
          </h2>
          <p className="mt-2">
            El Usuario es el único responsable de los contenidos que publica
            (ofertas, datos de perfil, mensajes, etc.) y garantiza que dispone de
            los derechos necesarios sobre ellos. Al publicarlos, autoriza al Titular
            a alojarlos y mostrarlos en la Plataforma con la única finalidad de
            prestar el servicio.
          </p>
          <p className="mt-2">
            El Titular podrá moderar, retirar o bloquear cualquier contenido que
            considere contrario a estos Términos o a la legislación vigente, sin que
            ello genere derecho a indemnización alguna.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            9. Propiedad intelectual e industrial
          </h2>
          <p className="mt-2">
            La Plataforma, su nombre, marca, logotipo, diseño, estructura, código y
            demás elementos son titularidad del Titular o de terceros que han
            autorizado su uso, y están protegidos por la normativa de propiedad
            intelectual e industrial. El acceso a la Plataforma no otorga al Usuario
            ningún derecho sobre dichos elementos más allá del estrictamente
            necesario para su uso conforme a estos Términos.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            10. Protección de datos
          </h2>
          <p className="mt-2">
            El tratamiento de los datos personales de los Usuarios se rige por la
            Política de Privacidad, que forma parte integrante de estos Términos y
            que el Usuario declara conocer y aceptar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            11. Condiciones económicas
          </h2>
          <p className="mt-2">
            El uso de la Plataforma para los Trabajadores es <strong>gratuito</strong>.
            Los servicios dirigidos a las Empresas podrán ser gratuitos o de pago;
            en caso de activarse servicios de pago, sus precios y condiciones
            específicas (incluido, cuando proceda, el derecho de desistimiento
            reconocido a los consumidores) se detallarán en las Condiciones de
            Contratación correspondientes antes de su formalización.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            12. Exclusión de garantías y limitación de responsabilidad
          </h2>
          <p className="mt-2">
            La Plataforma se presta «tal cual» y según disponibilidad. El Titular no
            garantiza la disponibilidad ininterrumpida del servicio ni la ausencia
            de errores, si bien pondrá los medios razonables para su correcto
            funcionamiento.
          </p>
          <p className="mt-2">
            En la medida permitida por la ley, el Titular no será responsable de: (i)
            la veracidad, legalidad o calidad de las ofertas, perfiles o contenidos
            publicados por los Usuarios; (ii) las relaciones, acuerdos o conflictos
            que surjan entre Empresas y Trabajadores; (iii) los daños derivados del
            uso indebido de la Plataforma por parte de los Usuarios; ni (iv) las
            interrupciones causadas por terceros proveedores o por causas de fuerza
            mayor. Nada en estos Términos excluye la responsabilidad que no pueda
            excluirse legalmente, en especial frente a consumidores.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">13. Indemnidad</h2>
          <p className="mt-2">
            El Usuario se compromete a mantener indemne al Titular frente a
            cualquier reclamación, sanción o perjuicio derivado del incumplimiento
            por su parte de estos Términos o de la legislación aplicable.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            14. Suspensión, cancelación y baja
          </h2>
          <p className="mt-2">
            El Titular podrá suspender o cancelar la cuenta de un Usuario que
            incumpla estos Términos o la ley. El Usuario, por su parte, puede darse
            de baja y solicitar la supresión de su cuenta en cualquier momento a
            través del correo de contacto.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            15. Modificación de los Términos y del servicio
          </h2>
          <p className="mt-2">
            El Titular podrá modificar estos Términos, así como las características y
            funcionalidades de la Plataforma. Los cambios se publicarán en esta
            página y, cuando sean sustanciales, se informará a los Usuarios. El uso
            continuado de la Plataforma tras su publicación implica la aceptación de
            la nueva versión.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            16. Enlaces a terceros
          </h2>
          <p className="mt-2">
            La Plataforma puede contener enlaces a sitios de terceros (por ejemplo,
            servicios de mapas). El Titular no se responsabiliza de los contenidos ni
            de las políticas de dichos sitios.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            17. Nulidad parcial
          </h2>
          <p className="mt-2">
            Si alguna cláusula de estos Términos fuera declarada nula o inaplicable,
            el resto de las disposiciones mantendrán su plena validez.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            18. Ley aplicable y jurisdicción
          </h2>
          <p className="mt-2">
            Estos Términos se rigen por la legislación española. Para la resolución
            de cualquier controversia, las partes se someten a los juzgados y
            tribunales que resulten competentes conforme a la ley, respetando en
            todo caso los derechos que la normativa de consumidores reconoce a los
            Usuarios que tengan tal condición.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">19. Contacto</h2>
          <p className="mt-2">
            Para cualquier duda o consulta relativa a estos Términos, puedes
            escribir a comven4@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
}

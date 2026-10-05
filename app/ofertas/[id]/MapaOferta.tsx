"use client";

import Link from "next/link";
import { useState } from "react";

// El mapa de Google solo se carga cuando la persona lo pide. Al cargarlo,
// Google puede guardar cookies y recibir la IP del visitante, así que se
// avisa antes (ver Política de Cookies).
export default function MapaOferta({
  consulta,
  nombreLugar,
}: {
  consulta: string;
  nombreLugar: string;
}) {
  const [cargado, setCargado] = useState(false);
  const q = encodeURIComponent(consulta);

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-300 bg-gray-100">
        {cargado ? (
          <iframe
            title={`Mapa de ${nombreLugar}`}
            src={`https://maps.google.com/maps?q=${q}&z=15&output=embed`}
            width="100%"
            height="300"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        ) : (
          <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-5 py-8 text-center">
            <p className="max-w-md text-sm text-gray-600">
              Al mostrar el mapa se cargará contenido de Google Maps, que puede
              usar cookies. Más información en la{" "}
              <Link href="/cookies" className="font-semibold underline">
                Política de Cookies
              </Link>
              .
            </p>
            <button
              type="button"
              onClick={() => setCargado(true)}
              className="btn btn-dark btn-sm"
            >
              Mostrar mapa
            </button>
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${q}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex min-h-10 items-center text-sm font-semibold underline decoration-2 underline-offset-4 hover:decoration-obra"
      >
        Abrir en Google Maps
      </a>
    </div>
  );
}

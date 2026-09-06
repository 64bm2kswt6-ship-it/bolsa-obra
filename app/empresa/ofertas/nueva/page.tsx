import { requireEmpresa } from "@/app/lib/require-empresa";
import { NuevaOfertaForm } from "./form";

export default async function NuevaOfertaPage() {
  await requireEmpresa();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold text-gray-900">Publicar oferta</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <NuevaOfertaForm />
      </div>
    </div>
  );
}

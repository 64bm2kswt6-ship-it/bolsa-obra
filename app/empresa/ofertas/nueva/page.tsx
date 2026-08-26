import { requireEmpresa } from "@/app/lib/require-empresa";
import { NuevaOfertaForm } from "./form";

export default async function NuevaOfertaPage() {
  await requireEmpresa();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Publicar oferta</h1>
      <NuevaOfertaForm />
    </div>
  );
}

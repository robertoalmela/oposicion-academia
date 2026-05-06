import temario from "@/data/temario.json";
import { Tema } from "@/lib/types";
import TemaDetailClient from "./client-page";

const temas = temario as Tema[];

export function generateStaticParams() {
  return temas.map((tema) => ({ id: tema.id }));
}

export default function TemaDetailPage() {
  return <TemaDetailClient />;
}

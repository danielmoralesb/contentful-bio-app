import { client } from "@/lib/contentfulClient";
import BioList from "@/components/BioList";

async function fetchBios() {
  const response = await client.getEntries({
    content_type: "bio",
  });
  return response.items;
}

export default async function Home() {
  const bios = await fetchBios();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Branding Cup</h1>
        <hr className="w-full border-1 border-gray-400" />
        <BioList bios={bios} />
      </main>
    </div>
  );
}

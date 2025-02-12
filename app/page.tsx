import FileUpload from "@/components/FileUpload"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Data-Driven Strategy Bot</h1>
      <FileUpload />
    </main>
  )
}


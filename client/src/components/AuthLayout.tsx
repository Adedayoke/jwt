
export default function AuthLayout({children, header, handleSubmit}: { children: React.ReactNode, header: string, handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#152127]">
        <form onSubmit={handleSubmit} className="min-h-[40%] flex flex-col gap-4 w-[35%] text-white">
            <h1 className="text-xl">{header}</h1>
            {children}

        </form>
    </div>
  )
}

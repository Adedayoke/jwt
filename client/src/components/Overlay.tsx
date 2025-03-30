export default function Overlay({children}: {children: React.ReactNode}) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70 backdrop:blur-[4px] z-40 transition-all">{children}</div>
    )
  }
  
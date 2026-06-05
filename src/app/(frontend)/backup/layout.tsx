export default function BackupLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 bg-yellow-400 py-2 text-black text-sm font-bold tracking-widest uppercase">
        <span>⚠</span>
        <span>BACKUP — Old Homepage (Dev Only)</span>
        <span>⚠</span>
      </div>
      <div className="pt-10">
        {children}
      </div>
    </>
  );
}

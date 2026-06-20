export function Monogram() {
  return (
    <div className="bg-card border-mauve w-full max-w-xs rounded-lg border shadow-sm">
      <div className="border-border text-mauve flex items-center gap-1 border-b px-3 py-1.5 font-mono text-[11px] tracking-wider uppercase">
        <span aria-hidden>╭─[</span>
        <span>dat</span>
        <span aria-hidden>]─</span>
        <span aria-hidden>─────────────</span>
        <span aria-hidden>╮</span>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-sm">
        <p className="text-foreground font-bold">Đỗ Phan Tuấn Đạt</p>
        <p className="text-muted-foreground">QA at Netcompany</p>
        <p className="text-muted-foreground">Ho Chi Minh City, VN</p>
      </div>
      <div
        className="text-muted-foreground px-3 py-1.5 font-mono text-[11px]"
        aria-hidden
      >
        ╰──────────────────────╯
      </div>
    </div>
  );
}

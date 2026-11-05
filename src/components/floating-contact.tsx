import { MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";

export function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2">
      <a
        href={`tel:+91${site.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-white shadow-lg ring-2 ring-white/50 transition hover:scale-105"
        aria-label="Call JivOra"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi JivOra, I would like help with insurance.")}`}
        target="_blank"
        rel="noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-2 ring-white/50 transition hover:scale-105"
        aria-label="WhatsApp JivOra"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

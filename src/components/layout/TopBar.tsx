import { Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-primary text-white py-2">
      <div className="container flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <Link
            href="tel:0478250003"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <Phone size={14} />
            <span>0478 250 003</span>
          </Link>
          <Link
            href="mailto:admin@capitalex.com.au"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <Mail size={14} />
            <span>admin@capitalex.com.au</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs text-gray-300">
          <span>PO Box 1026, Mitcham, VIC 3132</span>
        </div>
      </div>
    </div>
  );
}
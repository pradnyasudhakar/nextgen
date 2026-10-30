import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

const links = [
  {
    label: "WhatsApp",
    href: "https://wa.me/92686717402",
    icon: <FaWhatsapp size={16} />,
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/nextgenlg",
    icon: <FaFacebookF size={14} />,
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/nextgenlg/",
    icon: <FaInstagram size={16} />,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/nextgen-lending-group/",
    icon: <FaLinkedinIn size={15} />,
    external: true,
  },
];

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-[85%] -translate-y-1/2 z-40 flex flex-col overflow-hidden rounded-l-lg shadow-md">
      {links.map((item) => (
        <a
          key={item.label}
          href={item.href}
          aria-label={item.label}
          {...(item.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="flex h-8 w-8 items-center justify-center text-white border-b border-white/20 last:border-b-0 sm:h-9 sm:w-9"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
import Link from "next/link";
import { H2, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">

        {/* Green tick */}
        <div className="flex justify-center mb-6">
          <CheckCircle
            size={72}
            strokeWidth={1.5}
            style={{ color: "var(--color-primary)" }}
          />
        </div>

        <H2 className="mb-4">Thank You!</H2>

        <P className="mb-8 text-[#4a6460]">
          Your message has been received. Our team will get back to you
          within 1–2 business days.
        </P>

        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>

      </div>
    </div>
  );
}
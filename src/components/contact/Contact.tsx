"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { H2, H3, Label, P, Highlight } from "@/components/ui/typography";
import { Phone, AlertCircle } from "lucide-react";

// ← Component BAHAR hai — focus issue fix
const ErrorField = ({
  field,
  errors,
  children,
}: {
  field: string;
  errors: Record<string, string>;
  children: React.ReactNode;
}) => {
  const hasError = !!errors[field];
  return (
    <div className="relative">
      <div
        style={{
          background: hasError ? "#FFF0E6" : "transparent",
          border: hasError ? "1.5px solid #DA5400" : "1.5px solid #e5e7eb",
          borderRadius: "6px",
          transition: "all 0.2s ease",
        }}
      >
        {children}
      </div>

      {hasError && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          <div className="relative mr-1" style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                position: "absolute",
                right: "28px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "#DA5400",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 500,
                padding: "5px 10px",
                borderRadius: "6px",
                whiteSpace: "nowrap",
                zIndex: 10,
              }}
            >
              {errors[field]}
              <span
                style={{
                  position: "absolute",
                  right: "-6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 0, height: 0,
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "6px solid #DA5400",
                }}
              />
            </div>
            <AlertCircle
              size={18}
              style={{ color: "#DA5400", flexShrink: 0 }}
              fill="#DA5400"
              stroke="#fff"
              strokeWidth={2.5}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", state: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "This field is required";
    if (!form.email.trim()) newErrors.email = "This field is required";
    if (!form.phone.trim()) newErrors.phone = "This field is required";
    if (!form.state) newErrors.state = "This field is required";
    if (!form.message.trim()) newErrors.message = "This field is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        router.push("/thank-you");
        setForm({ name: "", email: "", phone: "", state: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (field: string) =>
    `w-full px-4 py-2 outline-none bg-transparent rounded-md text-sm ${errors[field] ? "pr-10" : ""}`;

  return (
    <section className="max-w-7xl mx-auto px-10 sm:px-16 lg:px-26 py-10 lg:py-20">
      <div className="mb-12 max-w-120">
        <Label className="mb-4">CONTACT US</Label>
        <H2 className="mb-4">
          Get in Touch with <Highlight>Our Team</Highlight>
        </H2>
        <P>
          We&apos;re here to answer your questions and help you find the best
          solutions for your loan needs. Reach out to us.
        </P>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* FORM */}
        <div className="bg-[#FBFBFB] rounded-md shadow-[0px_3px_30px_0px_#0000001A] p-8">
          <div className="space-y-4">

            <div>
              <label className="text-sm font-[500] text-dark block mb-1">
                Name <span className="text-[#DA5400]">*</span>
              </label>
              <ErrorField field="name" errors={errors}>
                <input
                  type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="Your Full Name"
                  className={inputCls("name")}
                />
              </ErrorField>
            </div>

            <div>
              <label className="text-sm font-[500] text-dark block mb-1">
                Email Address <span className="text-[#DA5400]">*</span>
              </label>
              <ErrorField field="email" errors={errors}>
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="We'll get back to you here"
                  className={inputCls("email")}
                />
              </ErrorField>
            </div>

            <div>
              <label className="text-sm font-[500] text-dark block mb-1">
                Phone Number <span className="text-[#DA5400]">*</span>
              </label>
              <ErrorField field="phone" errors={errors}>
                <input
                  type="text" name="phone" value={form.phone}
                  onChange={handleChange} placeholder="We'll contact you on this"
                  className={inputCls("phone")}
                />
              </ErrorField>
            </div>

            <div>
              <label className="text-sm font-[500] text-dark block mb-1">
                State Based in <span className="text-[#DA5400]">*</span>
              </label>
              <ErrorField field="state" errors={errors}>
                <select
                  name="state" value={form.state}
                  onChange={handleChange}
                  className={`${inputCls("state")} text-[#9C9C9C] w-full`}
                >
                  <option value="">Select your locality</option>
                  <option>NSW</option><option>VIC</option><option>QLD</option>
                  <option>WA</option><option>SA</option><option>TAS</option>
                  <option>ACT</option><option>NT</option>
                </select>
              </ErrorField>
            </div>

            <div>
              <label className="text-sm font-[500] text-dark block mb-1">
                Message <span className="text-[#DA5400]">*</span>
              </label>
              <ErrorField field="message" errors={errors}>
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange} rows={4}
                  placeholder="Tell us how we can help"
                  className={`${inputCls("message")} resize-y`}
                />
              </ErrorField>
            </div>

            {status === "error" && (
              <p className="text-sm text-[#DA5400] font-medium">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex justify-end">
              <Button variant="primary" size="lg" onClick={handleSubmit} disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div className="border-[1.5px] border-primary rounded-md p-6">
          <H3 className="text-dark text-2xl mb-6">
            Prefer a <span className="text-primary">Direct Approach?</span>
          </H3>
          <P className="mb-6">You can contact us directly through the details below.</P>

          <div className="space-y-6 text-dark">
            <P className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" fill="currentColor" strokeWidth={0} />
              0424-687-866
            </P>
            <P className="flex items-center gap-3">
              <Image src="/images/mail.png" alt="email" width={20} height={20} />
              admin@nextgenlg.com.au
            </P>
            <P className="flex items-center gap-3">
              <Image src="/images/clock.png" alt="hours" width={20} height={20} />
              Monday to Friday, 9 AM – 6 PM (AEDT)
            </P>
            <P className="flex items-center gap-3">
              <Image src="/images/send.png" alt="address" width={20} height={20} />
              PO Box 52, Vermont, VIC 3133
            </P>
          </div>

          <div className="relative mt-8 h-70 rounded-md overflow-hidden">
            <Image src="/images/contact-img.png" alt="contact" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
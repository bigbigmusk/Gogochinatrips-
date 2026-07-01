import type { Metadata } from "next";
import { Mail, MessageCircle, Clock, Building2 } from "lucide-react";
import { SITE } from "@/content/site";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Talk to a China travel expert. Questions about trips, custom journeys, group travel or partnerships — we reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        eyebrow="Get in touch"
        title="Talk to a China expert"
        intro="Whether you're ready to book or just have a question, a real person on our China team will get back to you."
      />

      <section className="container-site py-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-3 rounded-card border border-soft-gray bg-paper p-5">
              <Mail className="h-5 w-5 shrink-0 text-gogo-red" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">Email</h2>
                <a href={`mailto:${SITE.email}`} className="text-sm text-muted-text hover:text-ink">{SITE.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-card border border-soft-gray bg-paper p-5">
              <MessageCircle className="h-5 w-5 shrink-0 text-gogo-red" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">WhatsApp</h2>
                <a
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-text hover:text-ink"
                >
                  {SITE.whatsapp}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-card border border-soft-gray bg-paper p-5">
              <Clock className="h-5 w-5 shrink-0 text-gogo-red" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">Response time</h2>
                <p className="text-sm text-muted-text">Within one business day (China time).</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-card border border-soft-gray bg-paper p-5">
              <Building2 className="h-5 w-5 shrink-0 text-gogo-red" aria-hidden="true" />
              <div>
                <h2 className="font-semibold">For partners</h2>
                <p className="text-sm text-muted-text">Travel agents, student groups and MICE — mention it in your message.</p>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

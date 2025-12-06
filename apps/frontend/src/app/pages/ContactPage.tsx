import {
  Container,
  Section,
  Card,
  Heading,
  Text,
  Divider,
  Link as UILink,
} from '@alanspurlock-profile/spurlock-ui';

const contactInfo = [
  {
    label: 'Email',
    value: 'ams07141986@gmail.com',
    href: 'mailto:ams07141986@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '(469) 514-9600',
    href: 'tel:+14695149600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/alans-6a57a8180',
    href: 'https://www.linkedin.com/in/alans-6a57a8180',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    value: '@NalaLockspur',
    href: 'https://x.com/NalaLockspur',
    external: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="py-12 md:py-16">
        <Container size="lg">
          <Heading as="h1" size="2xl" className="mb-4">
            Get in Touch
          </Heading>
          <Text size="lg" variant="muted" className="max-w-2xl">
            I'm always open to discussing new projects, creative ideas, or 
            opportunities to be part of your visions. Let's connect!
          </Text>
        </Container>
      </section>

      <Divider variant="soft" spacing="sm" />

      {/* Contact Options */}
      <Section>
        <Container size="md">
          <div className="grid gap-4">
            {contactInfo.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                className="group"
              >
                <Card 
                  variant="default" 
                  padding="lg" 
                  className="flex items-center gap-4 hover:shadow-[var(--shadow-md)] hover:border-[var(--color-primary-light)] transition-all cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {contact.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text size="sm" variant="soft" className="mb-0.5">
                      {contact.label}
                    </Text>
                    <Text className="truncate font-medium group-hover:text-[var(--color-primary)] transition-colors">
                      {contact.value}
                    </Text>
                  </div>
                  {contact.external && (
                    <svg
                      className="w-5 h-5 text-[var(--color-text-soft)] group-hover:text-[var(--color-primary)] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </Card>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Divider variant="soft" />

      {/* Location & Availability */}
      <Section>
        <Container size="md">
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="elevated" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-dark)] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <Heading as="h3" size="md">
                  Location
                </Heading>
              </div>
              <Text variant="muted">
                Based in <strong className="text-[var(--color-text)]">Burleson, Texas</strong>
              </Text>
              <Text size="sm" variant="soft" className="mt-2">
                Dallas/Fort Worth Area • Central Time Zone
              </Text>
            </Card>

            <Card variant="elevated" padding="lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)] flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <Heading as="h3" size="md">
                  Availability
                </Heading>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                <Text variant="muted">
                  <strong className="text-[var(--color-text)]">Open to opportunities</strong>
                </Text>
              </div>
              <Text size="sm" variant="soft">
                Interested in full-time, contract, or consulting roles
              </Text>
            </Card>
          </div>
        </Container>
      </Section>

      <Divider variant="soft" />

      {/* CTA */}
      <Section>
        <Container size="md">
          <Card variant="default" padding="lg" className="text-center bg-gradient-to-br from-[var(--color-primary-light)]/30 to-[var(--color-secondary-light)]/30">
            <Heading as="h2" size="lg" className="mb-3">
              Let's Build Something Great
            </Heading>
            <Text variant="muted" className="mb-6 max-w-lg mx-auto">
              Whether you have a project in mind, need technical expertise, or 
              just want to chat about tech — I'd love to hear from you.
            </Text>
            <a
              href="mailto:ams07141986@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send me an email
            </a>
          </Card>
        </Container>
      </Section>
    </div>
  );
}

export default ContactPage;

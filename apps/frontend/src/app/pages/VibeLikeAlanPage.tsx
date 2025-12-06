import { Container, Card } from '@alanspurlock-profile/spurlock-ui';
import { Link } from 'react-router-dom';

export function VibeLikeAlanPage() {
  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6">
              Vibe Like Alan
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              Why my prompts are as simple as{' '}
              <span className="font-black text-[#ff0055]">
                "bruh, that's ugly, do better"
              </span>
            </p>
            <p className="text-lg text-gray-600 mt-4">
              ...and why AI and I are best friends 🤝
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container size="lg" className="mt-12">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* The Secret Sauce */}
          <Card
            variant="elevated"
            padding="xl"
            className="border-l-4 border-[#00d1b2]"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              The Secret Sauce 🧑‍🍳
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              With <span className="font-bold text-[#00d1b2]">17 years</span> of
              experience, I've learned that the key to rapid development isn't
              writing more code—it's building the{' '}
              <span className="font-bold">right foundation</span>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Instead of micromanaging every detail, I've created a
              comprehensive set of{' '}
              <span className="font-semibold">constitutions and rules</span>{' '}
              that guide AI assistants (Claude, Code, Gemini) to make smart
              decisions automatically. This means I can focus on the creative
              work while AI handles the implementation details.
            </p>
          </Card>

          {/* How It Works */}
          <Card
            variant="elevated"
            padding="xl"
            dashedBorder
            className="bg-white"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              How It Works ⚙️
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-4xl font-black text-[#ff0055]">01</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Set the Foundation
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    I create{' '}
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono">
                      .mdc
                    </code>{' '}
                    rule files that establish the architecture, tech stack, and
                    code quality standards. These rules are{' '}
                    <span className="font-semibold">always applied</span> in
                    Cursor IDE.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                      <p className="text-sm font-mono text-gray-600 mb-2">
                        .cursor/rules/project-rules.mdc
                      </p>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>
                          ✅ Architecture: DDD, SOLID, Separation of Concerns
                        </li>
                        <li>✅ Tech Stack: Nx, pnpm, React</li>
                        <li>✅ Code Quality: Cyclomatic complexity &lt; 10</li>
                        <li>✅ Best Practices: Code splitting, lazy loading</li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-lg border-2 border-[#ff0055]">
                      <p className="text-sm font-mono text-gray-600 mb-2">
                        .cursor/rules/security-rules.mdc
                      </p>
                      <ul className="text-gray-700 space-y-1 text-sm">
                        <li>🔒 Input validation & XSS prevention</li>
                        <li>🔒 SQL injection prevention</li>
                        <li>🔒 Authentication & authorization</li>
                        <li>🔒 API security & rate limiting</li>
                        <li>🔒 Secrets management</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl font-black text-[#00d1b2]">02</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Define UI Standards
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    My UI rules ensure consistent component usage and styling
                    across the entire project—no need to repeat myself.
                  </p>
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-sm font-mono text-gray-600 mb-2">
                      .cursor/rules/ui-rules.mdc
                    </p>
                    <ul className="text-gray-700 space-y-1 text-sm">
                      <li>✅ Use Spurlock UI component library</li>
                      <li>✅ Tailwind CSS for styling</li>
                      <li>✅ Radix UI for primitives</li>
                      <li>✅ TanStack Table for data tables</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="text-4xl font-black text-[#ff0055]">03</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Vibe Code!
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Now I can say things like{' '}
                    <span className="font-bold text-[#ff0055]">
                      "bruh, that's ugly, do better"
                    </span>{' '}
                    and AI{' '}
                    <span className="underline decoration-wavy decoration-[#00d1b2]">
                      just knows
                    </span>{' '}
                    what to do because:
                  </p>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    <li>✨ It knows the component library to use</li>
                    <li>✨ It knows the styling framework and conventions</li>
                    <li>✨ It knows the architecture patterns to follow</li>
                    <li>✨ It knows the code quality standards to maintain</li>
                    <li>🔒 It knows the security best practices to enforce</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Real Examples */}
          <Card
            variant="elevated"
            padding="xl"
            className="border-l-4 border-[#ff0055]"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Real Examples 💬
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Me: "Add a contact form"
                </p>
                <p className="text-gray-600 mb-4">AI automatically knows to:</p>
                <ul className="text-gray-700 space-y-1 text-sm ml-6">
                  <li>
                    → Use Spurlock UI components (not random npm packages)
                  </li>
                  <li>→ Style with Tailwind CSS</li>
                  <li>→ Follow SOLID principles</li>
                  <li>→ Separate concerns (UI vs. logic)</li>
                  <li>→ Keep cyclomatic complexity low</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Me: "That button looks terrible"
                </p>
                <p className="text-gray-600 mb-4">AI automatically knows to:</p>
                <ul className="text-gray-700 space-y-1 text-sm ml-6">
                  <li>
                    → Check Spurlock UI library for existing button variants
                  </li>
                  <li>→ Use site's color palette (#00d1b2, #ff0055)</li>
                  <li>→ Add proper hover states and transitions</li>
                  <li>→ Ensure accessibility standards</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Me: "Create a new feature page"
                </p>
                <p className="text-gray-600 mb-4">AI automatically knows to:</p>
                <ul className="text-gray-700 space-y-1 text-sm ml-6">
                  <li>→ Add route to router.tsx</li>
                  <li>→ Use MainLayout wrapper</li>
                  <li>→ Import Container from Spurlock UI</li>
                  <li>→ Match existing page structure and styling</li>
                  <li>→ NOT run the dev server (it's already running!)</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#ff0055]">
                <p className="text-lg font-bold text-gray-900 mb-2">
                  Me: "Add user authentication"
                </p>
                <p className="text-gray-600 mb-4">AI automatically knows to:</p>
                <ul className="text-gray-700 space-y-1 text-sm ml-6">
                  <li>🔒 NEVER expose admin keys to frontend</li>
                  <li>🔒 Use httpOnly, secure, sameSite cookies</li>
                  <li>🔒 Implement proper JWT validation</li>
                  <li>🔒 Add rate limiting to auth endpoints</li>
                  <li>🔒 Hash passwords with bcrypt/argon2</li>
                  <li>🔒 NEVER store PII in localStorage/sessionStorage</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Why This Works */}
          <Card variant="elevated" padding="xl" className="bg-white">
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Why This Works 🎯
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                <span className="font-bold text-[#00d1b2]">
                  Experience matters.
                </span>{' '}
                After 17 years, I know what good architecture looks like. I've
                codified that knowledge into rules that AI can follow.
              </p>
              <p>
                <span className="font-bold text-[#ff0055]">
                  Context is king.
                </span>{' '}
                In Cursor IDE, these rules are always present. Every AI
                interaction starts with the full context of how this project
                should work.
              </p>
              <p>
                <span className="font-bold text-gray-900">
                  AI handles the tedious stuff.
                </span>{' '}
                I don't want to repeat myself explaining the same patterns over
                and over. The rules do that for me. I focus on the creative,
                high-level decisions.
              </p>
              <p>
                <span className="font-bold text-[#00d1b2]">
                  Fast iteration.
                </span>{' '}
                When the foundation is solid, I can move at lightning speed. No
                decision paralysis, no bikeshedding—just pure flow state.
              </p>
              <p>
                <span className="font-bold text-[#ff0055]">
                  Security by default.
                </span>{' '}
                My security rules ensure AI never makes rookie mistakes like
                exposing API keys, skipping input validation, or storing PII in
                localStorage. Security isn't an afterthought—it's baked in.
              </p>
            </div>
          </Card>

          {/* CTA */}
          <Card
            variant="elevated"
            padding="xl"
            className="bg-white text-center border-2 border-gray-900"
          >
            <h2 className="text-4xl font-black mb-4 text-gray-900">
              Want to Vibe Like This?
            </h2>
            <p className="text-xl mb-8 text-gray-700">
              Check out the actual rules and constitutions that power this
              workflow—from architecture to UI to security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/AlanGreyjoy/alanspurlock-profile/tree/main/.cursor/rules"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View the Rules
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Let's Build Something
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default VibeLikeAlanPage;

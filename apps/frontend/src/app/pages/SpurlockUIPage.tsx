import { Container, Section, Text } from '@alanspurlock-profile/spurlock-ui';
import { Link } from 'react-router-dom';

export function SpurlockUIPage() {
  return (
    <div className="w-full py-12 md:py-24">
      <Container size="lg">
        <Section>
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <Link
              to="/"
              className="inline-flex items-center text-[#ff0055] hover:text-[#d40047] font-bold mb-8 transition-colors"
            >
              ← Back to Home
            </Link>

            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                Spurlock UI
              </h1>
              <p className="text-2xl text-gray-600 font-medium mb-6">
                A Modern React Component Library
              </p>
              <a
                href="http://localhost:4400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[#00d1b2] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-[#00b89f] hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                View Storybook →
              </a>
            </div>

            <div className="h-96 bg-gradient-to-br from-[#00d1b2]/10 to-[#ff0055]/10 rounded-2xl mb-12 flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <span className="text-8xl mb-4 block">🎨</span>
                <p className="text-gray-500 font-medium">
                  Beautiful, Accessible Components
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is Spurlock UI?
              </h2>
              <Text size="lg" className="text-gray-600 leading-relaxed">
                Spurlock UI is a comprehensive React component library built
                with modern best practices and designed for developer
                experience. Built on top of Radix UI primitives and styled with
                Tailwind CSS, it provides a solid foundation for building
                beautiful, accessible web applications. The library is
                documented in Storybook, making it easy to explore components,
                their variants, and use cases.
              </Text>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">♿</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Accessibility First
                  </h3>
                  <p className="text-gray-600">
                    Built on Radix UI primitives, ensuring WCAG compliance and
                    keyboard navigation out of the box. Every component is
                    tested for accessibility.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Customizable Design
                  </h3>
                  <p className="text-gray-600">
                    Powered by Tailwind CSS with a flexible theming system.
                    Easily customize colors, spacing, and typography to match
                    your brand.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Storybook Documentation
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive Storybook documentation with interactive
                    examples, making it easy to explore and understand each
                    component.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    TypeScript Support
                  </h3>
                  <p className="text-gray-600">
                    Fully typed with TypeScript for enhanced developer
                    experience and code intelligence in your IDE.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">🧩</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Composable Components
                  </h3>
                  <p className="text-gray-600">
                    Built with composition in mind. Combine components to create
                    complex UIs while maintaining clean, readable code.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">📦</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Monorepo Ready
                  </h3>
                  <p className="text-gray-600">
                    Organized in an Nx monorepo structure, making it easy to
                    maintain and scale alongside your applications.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Component Library
              </h2>
              <div className="space-y-4">
                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Layout Components
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Container, Section, Grid, and Flex components for building
                    responsive layouts with ease.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Container', 'Section', 'Grid', 'Flex', 'Stack'].map(
                      (comp) => (
                        <span
                          key={comp}
                          className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded"
                        >
                          {comp}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Typography Components
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Text, Heading, and specialized typography components with
                    consistent sizing and spacing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Text', 'Heading', 'Label', 'Code'].map((comp) => (
                      <span
                        key={comp}
                        className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Interactive Components
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Buttons, forms, dialogs, and other interactive elements
                    built with accessibility in mind.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Button',
                      'Card',
                      'Dialog',
                      'Dropdown',
                      'Tabs',
                      'Tooltip',
                    ].map((comp) => (
                      <span
                        key={comp}
                        className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Data Display
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Components for displaying data in various formats, including
                    tables built with TanStack Table.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Table', 'HorizontalCard', 'Badge', 'Avatar'].map(
                      (comp) => (
                        <span
                          key={comp}
                          className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-medium rounded"
                        >
                          {comp}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Technology Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  'React',
                  'TypeScript',
                  'Radix UI',
                  'Tailwind CSS',
                  'Storybook',
                  'TanStack Table',
                  'Nx',
                  'pnpm',
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 text-gray-900 font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Design Principles
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-[#00d1b2] font-bold text-xl">→</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Consistency
                    </h3>
                    <p className="text-gray-600">
                      Unified design language across all components with
                      consistent spacing, sizing, and behavior patterns.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#00d1b2] font-bold text-xl">→</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Flexibility
                    </h3>
                    <p className="text-gray-600">
                      Components are designed to be flexible and composable,
                      allowing you to build exactly what you need.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#00d1b2] font-bold text-xl">→</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Performance
                    </h3>
                    <p className="text-gray-600">
                      Optimized for performance with minimal bundle size and
                      efficient rendering strategies.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-[#00d1b2] font-bold text-xl">→</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Developer Experience
                    </h3>
                    <p className="text-gray-600">
                      Clear APIs, excellent TypeScript support, and
                      comprehensive documentation make development a joy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <div className="bg-gradient-to-r from-[#00d1b2]/10 to-[#ff0055]/10 rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Why I Built This
                </h2>
                <Text size="lg" className="text-gray-600 leading-relaxed">
                  As a developer who values clean code and great user
                  experiences, I wanted to create a component library that
                  embodies the principles I believe in: accessibility,
                  composability, and developer happiness. Spurlock UI is the
                  result of countless hours refining patterns and building
                  components that I actually want to use in my projects. It's
                  built on the shoulders of giants like Radix UI and Tailwind
                  CSS, combining their strengths into a cohesive system that
                  makes building modern web applications faster and more
                  enjoyable.
                </Text>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}

export default SpurlockUIPage;

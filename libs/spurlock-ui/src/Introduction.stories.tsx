import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './lib/Card/Card';

const IntroductionComponent = () => {
  return (
    <div className="sb-container">
      <style>{`
        .sb-container {
          margin: 0 auto;
          padding: 3rem 2rem;
          max-width: 1200px;
          background: white;
        }

        .sb-section-title {
          margin-bottom: 3rem;
        }

        .sb-section-title h1 {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: #ff0055;
        }

        .sb-section-title p {
          font-size: 1.25rem;
          color: #4b5563;
          line-height: 1.75;
        }

        .sb-section {
          margin-bottom: 3rem;
          padding-bottom: 3rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .sb-section:last-child {
          border-bottom: none;
        }

        .sb-section h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .sb-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #374151;
        }

        .sb-section-item {
          margin-bottom: 2rem;
        }

        .sb-section-item h3 {
          margin-bottom: 0.5rem;
        }

        .sb-section-item h3 a {
          color: #ff0055;
          text-decoration: none;
          transition: color 0.2s;
        }

        .sb-section-item h3 a:hover {
          color: #00d1b2;
        }

        .sb-section p {
          font-size: 1rem;
          line-height: 1.75;
          color: #4b5563;
          margin-bottom: 1rem;
        }

        .sb-section ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1rem;
        }

        .sb-section li {
          font-size: 1rem;
          line-height: 1.75;
          color: #4b5563;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .sb-section li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #ff0055;
          font-weight: bold;
        }

        .sb-section code {
          background: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #ff0055;
          font-family: 'Courier New', monospace;
        }

        .sb-section pre {
          background: #1f2937;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .sb-section pre code {
          background: transparent;
          color: #e5e7eb;
          padding: 0;
          display: block;
          font-family: 'Courier New', monospace;
        }
      `}</style>

      <div className="sb-section-title">
        <h1>Welcome to Spurlock UI</h1>
        <p>
          A modern, opinionated component library built for performance and
          developer experience.
        </p>
      </div>

      <div className="sb-section">
        <h2>🎨 What is Spurlock UI?</h2>
        <p>
          Spurlock UI is a personal component library that powers Alan
          Spurlock's portfolio and projects. It combines the best tools in the
          React ecosystem to deliver beautiful, accessible, and performant
          components.
        </p>

        <h3>Built With</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Card variant="feature" padding="md">
            <strong className="text-gray-900">React</strong>
            <p className="text-gray-600 text-sm mt-1">UI framework</p>
          </Card>
          <Card variant="feature" padding="md">
            <strong className="text-gray-900">Tailwind CSS</strong>
            <p className="text-gray-600 text-sm mt-1">Utility-first styling</p>
          </Card>
          <Card variant="feature" padding="md">
            <strong className="text-gray-900">Radix UI</strong>
            <p className="text-gray-600 text-sm mt-1">
              Accessible component primitives
            </p>
          </Card>
          <Card variant="feature" padding="md">
            <strong className="text-gray-900">TypeScript</strong>
            <p className="text-gray-600 text-sm mt-1">Type safety</p>
          </Card>
          <Card variant="feature" padding="md">
            <strong className="text-gray-900">Storybook</strong>
            <p className="text-gray-600 text-sm mt-1">
              Component development & documentation
            </p>
          </Card>
        </div>
      </div>

      <div className="sb-section">
        <h2>🚀 Getting Started</h2>

        <h3>Installation</h3>
        <pre>
          <code>pnpm install @alanspurlock/spurlock-ui</code>
        </pre>

        <h3>Basic Usage</h3>
        <pre>
          <code>{`import { Button, Card } from '@alanspurlock/spurlock-ui';

function App() {
  return (
    <Card>
      <Button variant="primary">Click me!</Button>
    </Card>
  );
}`}</code>
        </pre>
      </div>

      <div className="sb-section">
        <h2>📚 Explore the Library</h2>

        <div className="sb-section-item">
          <h3>
            <a href="/?path=/story/design-system-theme--brand">
              Design System → Theme
            </a>
          </h3>
          <p>
            Discover our brand colors, typography, and design tokens that form
            the foundation of Spurlock UI.
          </p>
        </div>

        <div className="sb-section-item">
          <h3>Components</h3>
          <p>Browse our collection of production-ready components:</p>
          <ul>
            <li>
              <strong>Inputs</strong> - Button, Input, Checkbox, ColorInput,
              AngleSlider
            </li>
            <li>
              <strong>Layout</strong> - Card, Container, Section, Divider,
              HorizontalCard
            </li>
            <li>
              <strong>Navigation</strong> - Link, NavButton, Pills
            </li>
            <li>
              <strong>Data Display</strong> - Badge, Chip, Avatar, Timeline
            </li>
            <li>
              <strong>Typography</strong> - Text components with consistent
              styling
            </li>
          </ul>
        </div>
      </div>

      <div className="sb-section">
        <h2>🎯 Design Principles</h2>

        <h3>Heavily Vibe Coded</h3>
        <p>
          This library is built with confidence and purpose. Every component is
          crafted with intention.
        </p>

        <h3>Domain-Driven Design</h3>
        <p>
          Components are organized by business domains and use cases, not just
          technical categories.
        </p>

        <h3>SOLID Principles</h3>
        <ul>
          <li>Single Responsibility</li>
          <li>Open/Closed</li>
          <li>Liskov Substitution</li>
          <li>Interface Segregation</li>
          <li>Dependency Inversion</li>
        </ul>

        <h3>Performance First</h3>
        <ul>
          <li>Optimized bundle sizes</li>
          <li>Lazy loading support</li>
          <li>Minimal re-renders</li>
          <li>Tree-shakeable exports</li>
        </ul>
      </div>

      <div className="sb-section">
        <h2>📖 Component Standards</h2>
        <p>Every component in this library follows strict standards:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Card
            variant="feature"
            padding="md"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <strong className="text-gray-900 block">TypeScript</strong>
              <span className="text-gray-600 text-sm">Full type safety</span>
            </div>
          </Card>
          <Card
            variant="feature"
            padding="md"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <strong className="text-gray-900 block">Accessible</strong>
              <span className="text-gray-600 text-sm">WCAG compliant</span>
            </div>
          </Card>
          <Card
            variant="feature"
            padding="md"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <strong className="text-gray-900 block">Responsive</strong>
              <span className="text-gray-600 text-sm">Mobile-first design</span>
            </div>
          </Card>
          <Card
            variant="feature"
            padding="md"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <strong className="text-gray-900 block">Themeable</strong>
              <span className="text-gray-600 text-sm">
                Consistent with brand
              </span>
            </div>
          </Card>
          <Card
            variant="feature"
            padding="md"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <strong className="text-gray-900 block">Documented</strong>
              <span className="text-gray-600 text-sm">
                Min 7 stories per component
              </span>
            </div>
          </Card>
          <Card
            variant="feature"
            padding="md"
            className="flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <div>
              <strong className="text-gray-900 block">Tested</strong>
              <span className="text-gray-600 text-sm">Production-ready</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="sb-section">
        <h2>🛠️ Development</h2>

        <h3>Adding New Components</h3>
        <p>When creating a new component:</p>
        <ul>
          <li>
            Create component directory under <code>src/lib/</code>
          </li>
          <li>Implement component with TypeScript</li>
          <li>Use Tailwind CSS for styling</li>
          <li>Use Radix UI primitives when available</li>
          <li>Create at least 7 stories demonstrating variants</li>
          <li>
            Export from <code>index.ts</code>
          </li>
        </ul>

        <h3>Storybook Categories</h3>
        <p>Organize components into meaningful categories:</p>
        <ul>
          <li>
            <strong>Design System</strong> - Theme, colors, typography, icons
          </li>
          <li>
            <strong>Inputs</strong> - Interactive form elements
          </li>
          <li>
            <strong>Layout</strong> - Structural components
          </li>
          <li>
            <strong>Navigation</strong> - Routing and menu components
          </li>
          <li>
            <strong>Data Display</strong> - Content presentation
          </li>
          <li>
            <strong>Feedback</strong> - Alerts, toasts, modals
          </li>
        </ul>
      </div>

      <div className="sb-section">
        <h2>💡 Tips</h2>
        <ul>
          <li>Explore components by clicking through the sidebar</li>
          <li>
            Use the <strong>Controls</strong> panel to interact with component
            props
          </li>
          <li>Check out multiple stories to see different use cases</li>
          <li>
            View the <strong>Docs</strong> tab for detailed prop documentation
          </li>
          <li>Copy code snippets directly from stories</li>
        </ul>
      </div>

      <div className="sb-section">
        <h2>🔗 Resources</h2>
        <ul>
          <li>
            <a
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tailwind CSS Documentation
            </a>
          </li>
          <li>
            <a
              href="https://www.radix-ui.com/docs/primitives/overview/introduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Radix UI Documentation
            </a>
          </li>
          <li>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Documentation
            </a>
          </li>
          <li>
            <a
              href="https://storybook.js.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Storybook Documentation
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const meta: Meta<typeof IntroductionComponent> = {
  title: 'Introduction',
  component: IntroductionComponent,
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof IntroductionComponent>;

export const Welcome: Story = {};

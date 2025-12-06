import { Container, Section, Text } from '@alanspurlock-profile/spurlock-ui';
import { Link } from 'react-router-dom';

export function HotasHelperPage() {
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
                HotasHelper
              </h1>
              <p className="text-2xl text-gray-600 font-medium">
                Visual HOTAS Control Binding Mapper
              </p>
            </div>

            <div className="h-96 bg-gradient-to-br from-[#00d1b2]/10 to-[#ff0055]/10 rounded-2xl mb-12 flex items-center justify-center border border-gray-100">
              <div className="text-center">
                <span className="text-8xl mb-4 block">🕹️</span>
                <p className="text-gray-500 font-medium">
                  Interactive 3D Visualization
                </p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is HotasHelper?
              </h2>
              <Text size="lg" className="text-gray-600 leading-relaxed">
                HotasHelper is a React/Vite application that revolutionizes how
                gamers manage and visualize their HOTAS (Hands On
                Throttle-And-Stick) control bindings. By combining the power of
                Three.js for 3D visualization and React Flow for node-based
                mapping, it creates an intuitive interface for managing complex
                control schemes.
              </Text>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">🎮</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    3D Visualization
                  </h3>
                  <p className="text-gray-600">
                    Interactive 3D models of your HOTAS setup using Three.js,
                    allowing you to see exactly which buttons and axes are
                    mapped to which game functions.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">🔄</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Flow-Based Mapping
                  </h3>
                  <p className="text-gray-600">
                    Leverage React Flow to create visual node-based control
                    mappings, making complex binding configurations easy to
                    understand and manage.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Multi-Game Support
                  </h3>
                  <p className="text-gray-600">
                    Pre-configured profiles for popular space sim games
                    including Star Citizen, Star Wars Squadrons, Elite
                    Dangerous, and more.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-100 rounded-xl">
                  <div className="text-3xl mb-4">💾</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Save & Share
                  </h3>
                  <p className="text-gray-600">
                    Export and import your custom control schemes, making it
                    easy to share configurations with friends or backup your
                    setups.
                  </p>
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
                  'Vite',
                  'Three.js',
                  'React Flow',
                  'TypeScript',
                  'Tailwind CSS',
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Supported Games
              </h2>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-center">
                  <span className="text-[#00d1b2] mr-3 font-bold">→</span>
                  Star Citizen
                </li>
                <li className="flex items-center">
                  <span className="text-[#00d1b2] mr-3 font-bold">→</span>
                  Star Wars Squadrons
                </li>
                <li className="flex items-center">
                  <span className="text-[#00d1b2] mr-3 font-bold">→</span>
                  Elite Dangerous
                </li>
                <li className="flex items-center">
                  <span className="text-[#00d1b2] mr-3 font-bold">→</span>
                  Microsoft Flight Simulator
                </li>
                <li className="flex items-center">
                  <span className="text-[#00d1b2] mr-3 font-bold">→</span>
                  And more...
                </li>
              </ul>
            </div>

            <div className="border-t border-gray-100 pt-12">
              <div className="bg-gradient-to-r from-[#00d1b2]/10 to-[#ff0055]/10 rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Why I Built This
                </h2>
                <Text size="lg" className="text-gray-600 leading-relaxed">
                  As an avid space sim enthusiast, I found managing complex
                  HOTAS configurations across multiple games to be frustrating
                  and time-consuming. Existing solutions were either too simple
                  or overly complicated. HotasHelper bridges that gap by
                  providing an intuitive visual interface that makes control
                  mapping feel natural and fun.
                </Text>
              </div>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
}

export default HotasHelperPage;

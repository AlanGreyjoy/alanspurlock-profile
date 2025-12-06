import { Link } from 'react-router-dom';
import {
  Container,
  HorizontalCard,
  Pill,
} from '@alanspurlock-profile/spurlock-ui';
import { useState, useEffect } from 'react';
import { PERSONAL_INFO, ROLES, STATS } from '../constants'; // Adjust path if needed

export function HomePage() {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    const tick = () => {
      const i = roleIndex % ROLES.length;
      const fullText = ROLES[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta((prevDelta) => prevDelta / 2);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(2000); // Wait before deleting
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setRoleIndex(roleIndex + 1);
        setDelta(150); // Reset typing speed
      } else {
        if (isDeleting) setDelta(50);
        else setDelta(150);
      }
    };

    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text, delta, isDeleting, roleIndex]);

  return (
    <div className="w-full pt-12 md:pt-24 pb-20">
      <Container size="lg">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-left mb-32">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Hi, I'm {PERSONAL_INFO.name}, <br />a{' '}
            <span className="text-[#00d1b2]">{text}</span>
            <span className="inline-block w-1 md:w-2 h-10 md:h-16 bg-[#00d1b2] ml-2 animate-pulse align-middle"></span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-2xl mb-8">
            {PERSONAL_INFO.title}
          </p>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mb-12">
            {PERSONAL_INFO.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              to="/experience"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#ff0055] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-[#e6004c] hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              See my Work
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 font-bold text-lg rounded-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1"
            >
              Get in Touch
            </Link>
          </div>

          {/* Social Proof */}
          <div className="border-t border-gray-100 pt-8">
            <p className="text-gray-400 mb-6 text-sm font-medium uppercase tracking-wide">
              Career Highlights
            </p>
            <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-12">
              {STATS.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-bold text-xl md:text-2xl text-gray-900 mb-1">
                    {stat.value}
                  </span>
                  <span className="text-gray-500 text-sm leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIBE CODED SECTION */}
        <section className="max-w-6xl mx-auto mb-32">
          <div className="bg-gradient-to-br from-[#00d1b2]/10 via-[#ff0055]/5 to-transparent border-2 border-gray-900 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">✨</span>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  100% Vibe Coded
                </h2>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
                  Everything you see here is{' '}
                  <span className="font-bold text-[#ff0055]">vibe coded</span> —
                  meaning I trust my instincts and iterate rapidly. With{' '}
                  <span className="font-bold text-[#00d1b2]">
                    17 years of experience
                  </span>
                  , I know what works. I leverage AI assistants like Claude,
                  Code, and Gemini in{' '}
                  <span className="font-semibold">Cursor IDE</span>, guided by
                  custom{' '}
                  <span className="font-semibold">constitutions and rules</span>{' '}
                  to keep everything on target and maintain quality.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  This site is a full-stack showcase featuring React, NestJS, a
                  custom component library, and a complete CI/CD pipeline —
                  demonstrating modern development practices from end to end.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/vibe-like-alan"
                    className="inline-flex items-center justify-center gap-2 h-14 px-8 text-lg font-bold border-2 border-[#00d1b2] bg-transparent text-[#00d1b2] hover:bg-[#00d1b2]/10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00d1b2] rounded-md hover:-translate-y-0.5 transition-all"
                  >
                    <span className="text-xl">✨</span>
                    How This Works
                  </Link>
                  <a
                    href="https://github.com/AlanGreyjoy/alanspurlock-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
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
                    View Source on GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECT SECTION */}
        <section className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900">
              Featured Projects
            </h2>
            <Link
              to="/experience"
              className="text-xl font-bold text-[#ff0055] hover:text-[#d40047] transition-colors"
            >
              See All Work →
            </Link>
          </div>

          <div className="space-y-8">
            <Link to="/spurlock-ui" className="block group max-w-5xl">
              <HorizontalCard
                imageSrc="/images/storybook-ss.png"
                imageAlt="Spurlock UI component library in Storybook"
                title="Spurlock UI"
                subtitle="Modern React Component Library"
                description="A comprehensive React component library built with accessibility in mind. Built on Radix UI primitives and Tailwind CSS, documented in Storybook. Features composable components, TypeScript support, and a flexible theming system for building beautiful web applications."
                tags={[
                  'React',
                  'TypeScript',
                  'Radix UI',
                  'Tailwind CSS',
                  'Storybook',
                ]}
                footer="Learn More →"
              >
                <div className="mt-4">
                  <Pill variant="accent" size="md">
                    <span role="img" aria-label="sparkles">
                      ✨
                    </span>{' '}
                    100% Vibe Coded
                  </Pill>
                </div>
              </HorizontalCard>
            </Link>

            <Link to="/hotas-helper" className="block group max-w-5xl">
              <HorizontalCard
                imageSrc="/images/HotashelperReact-12-06-2025_12_47_AM.png"
                imageAlt="HotasHelper application screenshot"
                title="HotasHelper"
                subtitle="Visual HOTAS Control Binding Mapper"
                description="A React/Vite application that uses Three.js and React Flow to visually map HOTAS control bindings for games like Star Citizen, Star Wars Squadrons, and more. An intuitive 3D interface that makes complex control mapping feel natural."
                tags={['React', 'Vite', 'Three.js', 'React Flow']}
                footer="Learn More →"
              >
                <div className="mt-4">
                  <Pill variant="accent" size="md">
                    <span role="img" aria-label="sparkles">
                      ✨
                    </span>{' '}
                    100% Vibe Coded
                  </Pill>
                </div>
              </HorizontalCard>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default HomePage;

import { Link } from 'react-router-dom';
import { Container, HorizontalCard } from '@alanspurlock-profile/spurlock-ui';
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
            <p className="text-gray-400 mb-4 text-sm font-medium uppercase tracking-wide">
              Career Highlights
            </p>
            <div className="flex gap-12">
              {STATS.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-bold text-2xl text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-gray-500 text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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
                imageSrc="/images/spurlock-ui-placeholder.png"
                imageAlt="Spurlock UI component library"
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
              />
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
              />
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default HomePage;

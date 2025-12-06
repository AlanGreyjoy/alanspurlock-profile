import { Container, NavButton } from '@alanspurlock-profile/spurlock-ui';
import { PERSONAL_INFO } from '../constants';
import { AnimatedOutlet } from '../../components/AnimatedOutlet';
import { ScrollToTop } from '../../components/ScrollToTop';
import { Link } from 'react-router-dom';

// Navigation items matching the requested style "Home, Work, Storybook..."
const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/experience', label: 'Work' },
  {
    path: import.meta.env.VITE_STORYBOOK_URL,
    label: 'Storybook',
    external: true,
  },
  { path: '/contact', label: 'Contact' },
];

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-500 selection:text-white">
      <ScrollToTop />
      {/* Header */}
      <header className="w-full py-8 md:py-12">
        <Container size="lg">
          <nav className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-[#ff0055] rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-sm rotate-3 transform group-hover:rotate-6 transition-transform cursor-pointer">
                AS
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-gray-500 text-sm font-medium">
                  Engineering Leader & Consultant
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <ul className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavButton to={item.path} external={item.external}>
                    {item.label}
                  </NavButton>
                </li>
              ))}
            </ul>

            {/* Social Icons (Desktop only typically, but we can keep them) */}
            <div className="hidden md:flex items-center gap-4 text-gray-400">
              {/* Using standard check for icons. If lucide not installed, we might error. 
                   I'll use span placeholders if I'm not sure, but let's try to keep it safe. 
                   Actually, I don't see lucide imported in the original file. 
                   I will use simple emoji or text if icons are missing, or check package.json.
                   Checking the 'imports' from previous view_file, no icons were imported.
                   I'll stick to text or simple SVGs inline to avoid breaking build.
               */}
              <a
                href={PERSONAL_INFO.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#1DA1F2] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-black transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0077b5] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </nav>
        </Container>
      </header>

      {/* Main Content */}
      <main className="w-full">
        <AnimatedOutlet />
      </main>

      {/* Footer */}
      <footer className="py-12 mt-20 border-t border-gray-100">
        <Container size="lg">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} {PERSONAL_INFO.name}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href={PERSONAL_INFO.social.twitter}
                className="hover:text-black"
              >
                Twitter
              </a>
              <a
                href={PERSONAL_INFO.social.github}
                className="hover:text-black"
              >
                Github
              </a>
              <a
                href={PERSONAL_INFO.social.linkedin}
                className="hover:text-black"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default MainLayout;

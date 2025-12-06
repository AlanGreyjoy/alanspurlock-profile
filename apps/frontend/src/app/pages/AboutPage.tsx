import {
  Container,
  Section,
  Card,
  Avatar,
  Pills,
} from '@alanspurlock-profile/spurlock-ui';
import { PERSONAL_INFO, SKILLS } from '../constants';

export function AboutPage() {
  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <Avatar
              src="/images/profile.jpg"
              alt={PERSONAL_INFO.name}
              variant="circle"
              size="2xl"
              className="shadow-2xl mx-auto mb-8 !w-48 !h-48 ring-4 ring-gray-100 ring-offset-4 ring-offset-white"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
              Engineering Leader, Consultant, Manager & Disney Enthusiast
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section>
        <Container size="md">
          {/* Introduction */}
          <Card
            variant="elevated"
            padding="xl"
            className="mb-8 border-l-4 border-[#00d1b2]"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span>Hi, I'm Alan!</span>
              <span className="text-4xl">👋</span>
            </h2>
            <div className="prose prose-lg max-w-none space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                I'm a seasoned technology leader with over 17 years of
                experience building innovative solutions in startup environments
                and SaaS platforms. I specialize in leading engineering teams,
                architecting scalable systems, consulting on technical strategy,
                and delivering full-stack solutions with AI integration.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                I'm the founder of{' '}
                <span className="font-semibold text-gray-900">
                  Sipharmony, LLC
                </span>
                , where I built and manage a complete UCaaS/CPaaS platform from
                the ground up. I handle everything from system architecture and
                infrastructure to team leadership and client consulting. It's
                been an incredible journey building something from scratch and
                watching it grow.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                When I'm not architecting systems or consulting with clients,
                you'll find me hunting for rare Disney collectibles or exploring
                the latest AI technologies. I believe in "vibe coding" —
                building with passion, creativity, and a deep understanding of
                what makes great software.
              </p>
            </div>
          </Card>

          {/* Skills & Technologies */}
          <Card
            variant="default"
            padding="xl"
            className="mb-8 bg-white border-l-4 border-blue-500"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Skills & Technologies</span>
            </h2>
            <Pills items={SKILLS} variant="primary" size="md" gap="md" />
          </Card>

          {/* Fun Facts */}
          <Card variant="elevated" padding="xl" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Fun Facts About Me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-white border-2 border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-5xl mb-4">🏰</span>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Disney Collector
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Passionate about collecting rare Disney items and memorabilia.
                  My collection includes vintage pieces and hard-to-find
                  treasures.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white border-2 border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-5xl mb-4">🤖</span>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  AI Native Developer
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Embrace AI-powered development tools and integrate LLMs into
                  my workflow. Building future-ready solutions is my specialty.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white border-2 border-gray-100 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-5xl mb-4">✨</span>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">
                  Vibe Coder
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Believe in coding with intuition and experience. Sometimes the
                  best solutions come from trusting your instincts and deep
                  expertise.
                </p>
              </div>
            </div>
          </Card>

          {/* Philosophy */}
          <Card
            variant="default"
            padding="xl"
            className="bg-white border-2 border-[#00d1b2]/20"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">💭</span>
              <span>My Philosophy</span>
            </h2>
            <blockquote className="border-l-4 border-[#00d1b2] pl-6 py-4 italic text-xl text-gray-700 leading-relaxed">
              "Build with passion, architect with purpose, and never stop
              learning. The best code is written when you deeply understand both
              the problem and the solution."
            </blockquote>
          </Card>
        </Container>
      </Section>
    </div>
  );
}

export default AboutPage;

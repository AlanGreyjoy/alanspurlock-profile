import {
  Container,
  Section,
  Card,
  Avatar,
  Badge,
} from '@alanspurlock-profile/spurlock-ui';
import { PERSONAL_INFO, SKILLS } from '../constants';

export function AboutPage() {
  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="py-16">
        <Container size="lg">
          <div className="max-w-4xl mx-auto text-center">
            <Avatar
              src="/images/profile.jpg"
              alt={PERSONAL_INFO.name}
              variant="circle"
              size="2xl"
              className="shadow-2xl mx-auto mb-8 !w-48 !h-48"
            />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Me
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Engineering Leader, Consultant, Manager & Disney Enthusiast
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section>
        <Container size="md">
          {/* Introduction */}
          <Card variant="elevated" padding="xl" className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Hi, I'm Alan! 👋
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                I'm a seasoned technology leader with over 17 years of
                experience building innovative solutions in startup environments
                and SaaS platforms. I specialize in leading engineering teams,
                architecting scalable systems, consulting on technical strategy,
                and delivering full-stack solutions with AI integration.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When I'm not coding, you'll find me hunting for rare Disney
                collectibles, building elaborate Popsicle stick houses, or
                exploring the latest AI technologies. I believe in "vibe coding"
                — building with passion, creativity, and a deep understanding of
                what makes great software.
              </p>
              <p className="text-gray-700 leading-relaxed">
                I'm currently working at Goosehead Insurance Agency as a Senior
                Software Engineer, where I lead frontend innovation initiatives
                in the insurance tech space. I'm also the founder of Sipharmony,
                LLC, where I built and manage a complete UCaaS/CPaaS platform
                from the ground up, handling everything from architecture to
                team leadership and client consulting.
              </p>
            </div>
          </Card>

          {/* Skills & Technologies */}
          <Card variant="default" padding="xl" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Badge key={skill} variant="primary" size="md">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Fun Facts */}
          <Card variant="elevated" padding="xl" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Fun Facts About Me
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-3xl">🏰</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Disney Collector
                  </h3>
                  <p className="text-gray-600">
                    I'm passionate about collecting rare Disney items and
                    memorabilia. My collection includes vintage pieces and
                    hard-to-find treasures.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🏗️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Popsicle House Architect
                  </h3>
                  <p className="text-gray-600">
                    I'm a master builder of Popsicle stick houses. It's a
                    creative outlet that combines patience, precision, and
                    architectural vision.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">🤖</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    AI Native Developer
                  </h3>
                  <p className="text-gray-600">
                    I embrace AI-powered development tools and integrate LLMs
                    into my workflow. Building future-ready solutions is my
                    specialty.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-3xl">✨</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Vibe Coder
                  </h3>
                  <p className="text-gray-600">
                    I believe in coding with intuition and experience. Sometimes
                    the best solutions come from trusting your instincts and
                    deep expertise.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Philosophy */}
          <Card variant="default" padding="xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              My Philosophy
            </h2>
            <blockquote className="border-l-4 border-[#00d1b2] pl-6 py-2 italic text-lg text-gray-700">
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

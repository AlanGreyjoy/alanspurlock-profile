import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ContactPage } from './pages/ContactPage';
import { HotasHelperPage } from './pages/HotasHelperPage';
import { SpurlockUIPage } from './pages/SpurlockUIPage';
import { VibeLikeAlanPage } from './pages/VibeLikeAlanPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'experience',
        element: <ExperiencePage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'hotas-helper',
        element: <HotasHelperPage />,
      },
      {
        path: 'spurlock-ui',
        element: <SpurlockUIPage />,
      },
      {
        path: 'vibe-like-alan',
        element: <VibeLikeAlanPage />,
      },
    ],
  },
]);

export default router;

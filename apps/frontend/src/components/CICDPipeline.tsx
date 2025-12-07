import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Position,
  NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Dialog } from '@alanspurlock-profile/spurlock-ui';

const nodeDefaults = {
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
};

const nodeInfo: Record<
  string,
  { title: string; description: string; details: string[] }
> = {
  commit: {
    title: 'Git Push',
    description:
      'The starting point of our CI/CD pipeline. When code is pushed to the repository, it triggers the automated build and deployment process.',
    details: [
      'Developer commits code changes',
      'Code is pushed to GitHub repository',
      'GitHub webhook triggers the pipeline',
      'All subsequent stages are automated',
    ],
  },
  github: {
    title: 'GitHub Actions',
    description:
      'Our CI/CD orchestrator that manages the entire build and deployment workflow. GitHub Actions runs all tests, builds, and deploys our applications.',
    details: [
      'Workflow defined in .github/workflows/',
      'Runs on GitHub-hosted runners',
      'Parallel execution of CI checks',
      'Automatic deployment on success',
    ],
  },
  lint: {
    title: 'Lint',
    description:
      'Code quality and style checking using ESLint. Ensures consistent code formatting and catches common errors before they reach production.',
    details: [
      'Runs ESLint on TypeScript/JavaScript',
      'Checks code style and formatting',
      'Enforces best practices',
      'Fast feedback on code quality',
    ],
  },
  test: {
    title: 'Test',
    description:
      'Automated testing suite that validates functionality and prevents regressions. Runs unit tests, integration tests, and end-to-end tests.',
    details: [
      'Unit tests for components',
      'Integration tests for features',
      'E2E tests for critical paths',
      'Code coverage reporting',
    ],
  },
  build: {
    title: 'Build',
    description:
      'Compiles and bundles the application code for production. Uses Nx to build multiple apps and libraries in the monorepo efficiently.',
    details: [
      'TypeScript compilation',
      'Vite bundling for frontend',
      'Webpack bundling for backend',
      'Asset optimization',
    ],
  },
  docker: {
    title: 'Docker',
    description:
      'Containerizes applications for consistent deployment across environments. Each service gets its own optimized Docker image.',
    details: [
      'Multi-stage Docker builds',
      'Optimized image layers',
      'Security scanning',
      'Push to container registry',
    ],
  },
  railway: {
    title: 'Railway',
    description:
      'Our deployment platform that hosts all services. Railway automatically deploys new versions when the pipeline completes successfully.',
    details: [
      'Automatic deployments from GitHub',
      'Managed infrastructure',
      'Custom domains and SSL',
      'Environment variable management',
    ],
  },
  api: {
    title: 'API Gateway',
    description:
      'NestJS backend service that handles API requests, resume generation, and business logic. Built with TypeScript for type safety.',
    details: [
      'Built with NestJS framework',
      'TypeScript for type safety',
      'RESTful API endpoints',
      'PDF resume generation with Puppeteer',
    ],
  },
  frontend: {
    title: 'Frontend',
    description:
      "React application with Vite, featuring the portfolio website you're currently viewing. Built with TypeScript, React Router, and Tailwind CSS.",
    details: [
      'React 19 with TypeScript',
      'Vite for fast dev and builds',
      'React Router for navigation',
      'Tailwind CSS for styling',
    ],
  },
  storybook: {
    title: 'Storybook',
    description:
      'Component library documentation and development environment. Showcases the Spurlock UI component library with interactive examples.',
    details: [
      'Interactive component playground',
      'Full documentation for each component',
      'Design system showcase',
      'Isolated component development',
    ],
  },
};

const initialNodes: Node[] = [
  {
    id: 'commit',
    type: 'input',
    data: { label: '📝 Git Push' },
    position: { x: 350, y: 0 },
    style: {
      background: '#00d1b2',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '12px 20px',
      fontWeight: 'bold',
      fontSize: '14px',
      minWidth: '140px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'github',
    data: { label: '🔀 GitHub Actions' },
    position: { x: 330, y: 90 },
    style: {
      background: '#24292e',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '12px 20px',
      fontWeight: 'bold',
      fontSize: '14px',
      minWidth: '180px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'lint',
    data: { label: '🔍 Lint' },
    position: { x: 100, y: 190 },
    style: {
      background: '#ff0055',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '110px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'test',
    data: { label: '🧪 Test' },
    position: { x: 250, y: 190 },
    style: {
      background: '#ff0055',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '110px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'build',
    data: { label: '🔨 Build' },
    position: { x: 400, y: 190 },
    style: {
      background: '#ff0055',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '110px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'docker',
    data: { label: '🐳 Docker' },
    position: { x: 550, y: 190 },
    style: {
      background: '#ff0055',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '110px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'railway',
    data: { label: '🚂 Railway' },
    position: { x: 340, y: 290 },
    style: {
      background: '#0B0D0E',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '12px 20px',
      fontWeight: 'bold',
      fontSize: '14px',
      minWidth: '160px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'api',
    type: 'output',
    data: { label: '🔌 API Gateway' },
    position: { x: 100, y: 390 },
    style: {
      background: '#48c774',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '140px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'frontend',
    type: 'output',
    data: { label: '🌐 Frontend' },
    position: { x: 330, y: 390 },
    style: {
      background: '#48c774',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '140px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'storybook',
    type: 'output',
    data: { label: '📚 Storybook' },
    position: { x: 560, y: 390 },
    style: {
      background: '#48c774',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '140px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [
  {
    id: 'commit-github',
    source: 'commit',
    target: 'github',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'github-lint',
    source: 'github',
    target: 'lint',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'github-test',
    source: 'github',
    target: 'test',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'github-build',
    source: 'github',
    target: 'build',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'github-docker',
    source: 'github',
    target: 'docker',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'lint-railway',
    source: 'lint',
    target: 'railway',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'test-railway',
    source: 'test',
    target: 'railway',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'build-railway',
    source: 'build',
    target: 'railway',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'docker-railway',
    source: 'docker',
    target: 'railway',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'railway-api',
    source: 'railway',
    target: 'api',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'railway-frontend',
    source: 'railway',
    target: 'frontend',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'railway-storybook',
    source: 'railway',
    target: 'storybook',
    type: 'step',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
];

export function CICDPipeline() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dialogOpened, setDialogOpened] = useState(false);

  const onNodesChange = useCallback(() => {
    // Intentionally empty - makes nodes static
  }, []);

  const onEdgesChange = useCallback(() => {
    // Intentionally empty - makes edges static
  }, []);

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setSelectedNode(node.id);
    setDialogOpened(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpened(false);
    setTimeout(() => setSelectedNode(null), 200); // Delay to allow animation
  }, []);

  const selectedNodeInfo = selectedNode ? nodeInfo[selectedNode] : null;
  const selectedNodeData = initialNodes.find((n) => n.id === selectedNode);

  return (
    <>
      <Dialog
        opened={dialogOpened}
        onClose={handleCloseDialog}
        title={selectedNodeInfo?.title}
        size="lg"
      >
        {selectedNodeInfo && selectedNodeData && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold border-2 border-gray-900"
                style={{
                  background: selectedNodeData.style?.background,
                  color: selectedNodeData.style?.color,
                }}
              >
                {String(selectedNodeData.data.label).substring(0, 2)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedNodeInfo.title}</h3>
                <p className="text-sm text-gray-600">
                  {selectedNode === 'commit' && 'Source Control'}
                  {selectedNode === 'github' && 'CI/CD Orchestrator'}
                  {(selectedNode === 'lint' ||
                    selectedNode === 'test' ||
                    selectedNode === 'build' ||
                    selectedNode === 'docker') &&
                    'CI Stage'}
                  {selectedNode === 'railway' && 'Deployment Platform'}
                  {(selectedNode === 'api' ||
                    selectedNode === 'frontend' ||
                    selectedNode === 'storybook') &&
                    'Production Service'}
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {selectedNodeInfo.description}
            </p>

            <div className="bg-gray-50 border-2 border-gray-900 rounded-lg p-4">
              <h4 className="font-bold mb-3 text-gray-900">Key Features:</h4>
              <ul className="space-y-2">
                {selectedNodeInfo.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[#00d1b2] font-bold mt-0.5">→</span>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Dialog>
      <div className="w-full h-[450px] border-2 border-gray-900 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </>
  );
}

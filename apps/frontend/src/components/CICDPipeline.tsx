import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Position,
  NodeMouseHandler,
  Handle,
  NodeProps,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Dialog } from '@alanspurlock-profile/spurlock-ui';
import dagre from 'dagre';

// Custom diamond-shaped node for conditional logic
function DiamondNode({ data, selected }: NodeProps) {
  const size = 120;
  const label = (data as { label: string }).label;

  return (
    <div
      className={`diamond-node ${selected ? 'selected' : ''}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
      }}
    >
      {/* Top vertex handle - positioned BEFORE rotation */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: '#555',
          top: '0px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          border: '2px solid #111',
          zIndex: 10,
        }}
      />

      {/* Bottom vertex handle - Yes path */}
      <Handle
        type="source"
        id="yes-bottom"
        position={Position.Bottom}
        style={{
          background: '#48c774',
          bottom: '0px',
          left: '50%',
          transform: 'translate(-50%, 50%)',
          width: '10px',
          height: '10px',
          border: '2px solid #111',
          zIndex: 10,
        }}
      />

      {/* Left vertex handle - No path */}
      <Handle
        type="source"
        id="no"
        position={Position.Left}
        style={{
          background: '#dc2626',
          left: '0px',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10px',
          height: '10px',
          border: '2px solid #111',
          zIndex: 10,
        }}
      />

      {/* The actual diamond shape */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#ffa500',
          border: '3px solid #111',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: selected ? '0 0 0 3px #00d1b2' : 'none',
        }}
      >
        <div
          style={{
            transform: 'rotate(-45deg)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '13px',
            textAlign: 'center',
            width: '90px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  diamond: DiamondNode,
};

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
      'GitHub webhook triggers CI workflow',
      'All subsequent stages are automated',
    ],
  },
  githubCI: {
    title: 'GitHub Actions - CI',
    description:
      'The CI workflow that orchestrates code quality checks and builds. Runs linting, generates Prisma client, and builds all applications.',
    details: [
      'Workflow: .github/workflows/ci.yml',
      'Runs on ubuntu-latest',
      'Sets up Node.js 20 and pnpm',
      'Parallel execution of builds',
      'Caches dependencies for speed',
    ],
  },
  install: {
    title: 'Install Dependencies',
    description:
      'Installs all required Node.js packages using pnpm. Uses frozen lockfile to ensure consistent dependencies across environments.',
    details: [
      'Runs: pnpm install --frozen-lockfile',
      'Uses pnpm for fast, efficient installs',
      'Leverages pnpm cache for speed',
      'Validates package versions',
    ],
  },
  lint: {
    title: 'Lint',
    description:
      'Code quality and style checking using ESLint. Ensures consistent code formatting and catches common errors before they reach production.',
    details: [
      'Runs: pnpm lint',
      'ESLint checks TypeScript/JavaScript',
      'Validates code style and formatting',
      'Enforces best practices',
      'Fast feedback on code quality',
    ],
  },
  prisma: {
    title: 'Generate Prisma Client',
    description:
      'Generates TypeScript types and database client from Prisma schema. This step ensures type-safe database access before building the API.',
    details: [
      'Runs: pnpm exec prisma generate',
      'Reads prisma/schema.prisma',
      'Generates TypeScript types',
      'Creates Prisma Client',
      'Enables type-safe database queries',
    ],
  },
  buildApi: {
    title: 'Build API',
    description:
      'Compiles and bundles the NestJS API Gateway for production. Uses Webpack to create an optimized server bundle.',
    details: [
      'Runs: pnpm build:api',
      'Compiles TypeScript to JavaScript',
      'Webpack bundling for Node.js',
      'Includes Prisma Client',
      'Output: dist/apps/api-gateway/',
    ],
  },
  buildFrontend: {
    title: 'Build Frontend',
    description:
      'Compiles and bundles the React frontend application using Vite. Optimizes assets and creates production-ready static files.',
    details: [
      'Runs: pnpm build',
      'Vite bundling for React 19',
      'TypeScript compilation',
      'Asset optimization',
      'Output: dist/apps/frontend/',
    ],
  },
  buildStorybook: {
    title: 'Build Storybook',
    description:
      'Builds the static Storybook site for the Spurlock UI component library. Creates an interactive documentation site.',
    details: [
      'Runs: pnpm build:storybook',
      'Builds component documentation',
      'Static site generation',
      'Interactive component playground',
      'Output: dist/storybook/spurlock-ui/',
    ],
  },
  ciCheck: {
    title: 'CI Checks Pass?',
    description:
      'Decision point that evaluates if all CI stages completed successfully. Only if install, lint, Prisma generation, and all builds pass will the deployment proceed.',
    details: [
      'Validates all CI stages succeeded',
      'Checks for linting errors',
      'Verifies Prisma Client generation',
      'Confirms all builds completed',
      'Blocks deployment on any failure',
    ],
  },
  ciFailed: {
    title: 'CI Failed - Stop',
    description:
      'Terminal state when any CI check fails. The pipeline stops here and no deployment occurs. Developers must fix issues and push again.',
    details: [
      'Pipeline execution stops',
      'No deployment triggered',
      'Developer notification sent',
      'Fix issues and retry',
      'Prevents broken code in production',
    ],
  },
  githubDeploy: {
    title: 'GitHub Actions - Deploy',
    description:
      'The deployment workflow that triggers after CI succeeds. Uses Railway CLI to deploy all three services to production.',
    details: [
      'Workflow: .github/workflows/deploy-railway.yml',
      'Triggers only after CI passes',
      'Runs on ubuntu-latest',
      'Installs Railway CLI',
      'Deploys three services in parallel',
    ],
  },
  railway: {
    title: 'Railway Platform',
    description:
      'Our deployment platform that hosts all services and infrastructure. Railway automatically provisions resources and manages deployments.',
    details: [
      'Manages three services',
      'PostgreSQL database hosting',
      'Custom domains and SSL',
      'Environment variable management',
      'Automatic health checks',
    ],
  },
  postgres: {
    title: 'PostgreSQL Database',
    description:
      'Managed PostgreSQL database hosted on Railway. Stores all application data including personal info, experience, education, skills, and resume download tracking.',
    details: [
      'Service: Railway PostgreSQL',
      'Managed PostgreSQL instance',
      'Prisma ORM for type-safe queries',
      'Automatic backups',
      'Connection pooling',
      'Secure connection strings',
    ],
  },
  api: {
    title: 'API Gateway',
    description:
      'NestJS backend service deployed to Railway. Handles API requests, resume generation, and business logic. Built with TypeScript for type safety.',
    details: [
      'Service: api-gateway on Railway',
      'Built with NestJS framework',
      'TypeScript for type safety',
      'Prisma ORM for database access',
      'RESTful API endpoints',
      'PDF resume generation with Puppeteer',
    ],
  },
  frontend: {
    title: 'Frontend Website',
    description:
      "React application deployed to Railway. The portfolio website you're currently viewing. Built with TypeScript, React Router, and Tailwind CSS.",
    details: [
      'Service: website on Railway',
      'React 19 with TypeScript',
      'Vite for fast builds',
      'React Router for navigation',
      'Tailwind CSS for styling',
      'Spurlock UI component library',
    ],
  },
  storybook: {
    title: 'Storybook Documentation',
    description:
      'Component library documentation site deployed to Railway. Showcases the Spurlock UI component library with interactive examples.',
    details: [
      'Service: storybook on Railway',
      'Interactive component playground',
      'Full documentation for each component',
      'Design system showcase',
      'Isolated component development',
      'Accessible at docs subdomain',
    ],
  },
};

// Dagre layout configuration
const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = 'TB'
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const nodeWidth = 180;
  const nodeHeight = 60;

  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 80, // Horizontal spacing between nodes
    ranksep: 120, // Vertical spacing between ranks
    marginx: 50,
    marginy: 50,
  });

  nodes.forEach((node) => {
    // Diamond nodes need more space
    const width = node.type === 'diamond' ? 150 : nodeWidth;
    const height = node.type === 'diamond' ? 150 : nodeHeight;
    dagreGraph.setNode(node.id, { width, height });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const width = node.type === 'diamond' ? 150 : nodeWidth;
    const height = node.type === 'diamond' ? 150 : nodeHeight;

    return {
      ...node,
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const initialNodes: Node[] = [
  {
    id: 'commit',
    type: 'input',
    data: { label: '📝 Git Push' },
    position: { x: 0, y: 0 }, // Will be calculated by dagre
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
    id: 'githubCI',
    data: { label: '🔀 GitHub Actions CI' },
    position: { x: 0, y: 0 },
    style: {
      background: '#24292e',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '12px 20px',
      fontWeight: 'bold',
      fontSize: '14px',
      minWidth: '200px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'install',
    data: { label: '📦 Install Dependencies' },
    position: { x: 0, y: 0 },
    style: {
      background: '#8b5cf6',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '180px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'prisma',
    data: { label: '🗄️ Prisma Generate' },
    position: { x: 0, y: 0 },
    style: {
      background: '#8b5cf6',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '180px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'lint',
    data: { label: '🔍 Lint' },
    position: { x: 0, y: 0 },
    style: {
      background: '#8b5cf6',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '120px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'buildApi',
    data: { label: '🔨 Build API' },
    position: { x: 0, y: 0 },
    style: {
      background: '#ff0055',
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
    id: 'buildFrontend',
    data: { label: '🔨 Build Frontend' },
    position: { x: 0, y: 0 },
    style: {
      background: '#ff0055',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '160px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'buildStorybook',
    data: { label: '🔨 Build Storybook' },
    position: { x: 0, y: 0 },
    style: {
      background: '#ff0055',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '180px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'ciCheck',
    type: 'diamond',
    data: { label: '✅ CI Pass?' },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'ciFailed',
    type: 'output',
    data: { label: '❌ CI Failed' },
    position: { x: 0, y: 0 },
    style: {
      background: '#dc2626',
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
    id: 'githubDeploy',
    data: { label: '🚀 GitHub Actions Deploy' },
    position: { x: 0, y: 0 },
    style: {
      background: '#24292e',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '12px 20px',
      fontWeight: 'bold',
      fontSize: '14px',
      minWidth: '220px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'railway',
    data: { label: '🚂 Railway Platform' },
    position: { x: 0, y: 0 },
    style: {
      background: '#0B0D0E',
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
    id: 'postgres',
    data: { label: '🐘 PostgreSQL' },
    position: { x: 0, y: 0 },
    style: {
      background: '#336791',
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
    id: 'api',
    type: 'output',
    data: { label: '🔌 API Gateway' },
    position: { x: 0, y: 0 },
    style: {
      background: '#48c774',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '160px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'frontend',
    type: 'output',
    data: { label: '🌐 Frontend Website' },
    position: { x: 0, y: 0 },
    style: {
      background: '#48c774',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '180px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
  {
    id: 'storybook',
    type: 'output',
    data: { label: '📚 Storybook Docs' },
    position: { x: 0, y: 0 },
    style: {
      background: '#48c774',
      color: 'white',
      border: '2px solid #111',
      borderRadius: '8px',
      padding: '10px 16px',
      fontWeight: 'bold',
      fontSize: '13px',
      minWidth: '180px',
      textAlign: 'center',
      cursor: 'pointer',
    },
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [
  // Start: Git Push → CI Workflow
  {
    id: 'commit-githubCI',
    source: 'commit',
    target: 'githubCI',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // CI Workflow → Install Dependencies
  {
    id: 'githubCI-install',
    source: 'githubCI',
    target: 'install',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // Install → Prisma Generate & Lint (parallel)
  {
    id: 'install-prisma',
    source: 'install',
    target: 'prisma',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'install-lint',
    source: 'install',
    target: 'lint',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // Prisma → All Builds (parallel)
  {
    id: 'prisma-buildApi',
    source: 'prisma',
    target: 'buildApi',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'prisma-buildFrontend',
    source: 'prisma',
    target: 'buildFrontend',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'prisma-buildStorybook',
    source: 'prisma',
    target: 'buildStorybook',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // All CI stages → CI Check
  {
    id: 'lint-ciCheck',
    source: 'lint',
    target: 'ciCheck',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'buildApi-ciCheck',
    source: 'buildApi',
    target: 'ciCheck',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'buildFrontend-ciCheck',
    source: 'buildFrontend',
    target: 'ciCheck',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'buildStorybook-ciCheck',
    source: 'buildStorybook',
    target: 'ciCheck',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // CI Check → Failed (No)
  {
    id: 'ciCheck-failed',
    source: 'ciCheck',
    sourceHandle: 'no',
    target: 'ciFailed',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#dc2626', strokeWidth: 2 },
    label: 'No',
    labelStyle: { fill: '#dc2626', fontWeight: 'bold' },
  },
  // CI Check → Deploy Workflow (Yes)
  {
    id: 'ciCheck-githubDeploy',
    source: 'ciCheck',
    sourceHandle: 'yes-bottom',
    target: 'githubDeploy',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#48c774', strokeWidth: 2 },
    label: 'Yes',
    labelStyle: { fill: '#48c774', fontWeight: 'bold' },
  },
  // Deploy Workflow → Railway Platform
  {
    id: 'githubDeploy-railway',
    source: 'githubDeploy',
    target: 'railway',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // Railway → Services
  {
    id: 'railway-postgres',
    source: 'railway',
    target: 'postgres',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'railway-api',
    source: 'railway',
    target: 'api',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'railway-frontend',
    source: 'railway',
    target: 'frontend',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  {
    id: 'railway-storybook',
    source: 'railway',
    target: 'storybook',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#111', strokeWidth: 2 },
  },
  // PostgreSQL → API (database connection)
  {
    id: 'postgres-api',
    source: 'postgres',
    target: 'api',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#336791', strokeWidth: 2, strokeDasharray: '5,5' },
  },
];

export function CICDPipeline() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [dialogOpened, setDialogOpened] = useState(false);

  // Calculate layout using dagre
  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(initialNodes, initialEdges),
    []
  );

  const [nodes, setNodes] = useState<Node[]>(layoutedNodes);
  const [edges] = useState<Edge[]>(layoutedEdges);

  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange: OnEdgesChange = useCallback(() => {
    // Edges are static but we need this callback
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
  const selectedNodeData = nodes.find((n) => n.id === selectedNode);

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
                  {(selectedNode === 'githubCI' ||
                    selectedNode === 'githubDeploy') &&
                    'CI/CD Orchestrator'}
                  {selectedNode === 'install' && 'Setup Stage'}
                  {(selectedNode === 'lint' || selectedNode === 'prisma') &&
                    'CI Stage'}
                  {(selectedNode === 'buildApi' ||
                    selectedNode === 'buildFrontend' ||
                    selectedNode === 'buildStorybook') &&
                    'Build Stage'}
                  {selectedNode === 'ciCheck' && 'Decision Point'}
                  {selectedNode === 'ciFailed' && 'Terminal State'}
                  {selectedNode === 'railway' && 'Deployment Platform'}
                  {selectedNode === 'postgres' && 'Database Service'}
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
      <div className="w-full h-[800px] border-2 border-gray-900 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.1, maxZoom: 1 }}
          attributionPosition="bottom-right"
          proOptions={{ hideAttribution: true }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          panOnDrag={[1, 2]}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          minZoom={0.3}
          maxZoom={2}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </>
  );
}

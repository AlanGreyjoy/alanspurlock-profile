import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  Node,
  Edge,
  Position,
  NodeMouseHandler,
  Handle,
  NodeProps,
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Dialog } from '@alanspurlock-profile/spurlock-ui';
import dagre from 'dagre';

// Custom node component matching Railway page style
const PipelineNode = ({
  data,
}: {
  data: { label: string; icon: string; bgColor: string; description: string };
}) => {
  return (
    <div className="bg-white border-2 border-gray-900 rounded-lg p-4 min-w-[220px] shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{ background: data.bgColor, color: 'white' }}
        >
          {data.icon}
        </div>
        <h4 className="font-bold text-sm text-gray-900">{data.label}</h4>
      </div>
      <p className="text-xs text-gray-600 leading-tight">{data.description}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

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
      {/* Top vertex handle */}
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
        className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        style={{
          width: '100%',
          height: '100%',
          background: '#ffa500',
          border: '3px solid #111',
          transform: 'rotate(45deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
  pipeline: PipelineNode,
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
    type: 'pipeline',
    data: {
      label: 'Git Push',
      icon: '📝',
      bgColor: '#00d1b2',
      description: 'Push code to GitHub',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'githubCI',
    type: 'pipeline',
    data: {
      label: 'GitHub Actions CI',
      icon: '🔀',
      bgColor: '#24292e',
      description: 'Trigger CI workflow',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'install',
    type: 'pipeline',
    data: {
      label: 'Install Dependencies',
      icon: '📦',
      bgColor: '#8b5cf6',
      description: 'Install pnpm packages',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'prisma',
    type: 'pipeline',
    data: {
      label: 'Prisma Generate',
      icon: '🗄️',
      bgColor: '#8b5cf6',
      description: 'Generate DB client',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'lint',
    type: 'pipeline',
    data: {
      label: 'Lint',
      icon: '🔍',
      bgColor: '#8b5cf6',
      description: 'Check code quality',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'buildApi',
    type: 'pipeline',
    data: {
      label: 'Build API',
      icon: '🔨',
      bgColor: '#ff0055',
      description: 'Compile NestJS API',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'buildFrontend',
    type: 'pipeline',
    data: {
      label: 'Build Frontend',
      icon: '🔨',
      bgColor: '#ff0055',
      description: 'Bundle React app',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'buildStorybook',
    type: 'pipeline',
    data: {
      label: 'Build Storybook',
      icon: '🔨',
      bgColor: '#ff0055',
      description: 'Build component docs',
    },
    position: { x: 0, y: 0 },
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
    type: 'pipeline',
    data: {
      label: 'CI Failed',
      icon: '❌',
      bgColor: '#dc2626',
      description: 'Stop deployment',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'githubDeploy',
    type: 'pipeline',
    data: {
      label: 'GitHub Deploy',
      icon: '🚀',
      bgColor: '#24292e',
      description: 'Trigger deploy workflow',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'railway',
    type: 'pipeline',
    data: {
      label: 'Railway Platform',
      icon: '🚂',
      bgColor: '#0B0D0E',
      description: 'Deploy to Railway',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'postgres',
    type: 'pipeline',
    data: {
      label: 'PostgreSQL',
      icon: '🐘',
      bgColor: '#336791',
      description: 'Managed database',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'api',
    type: 'pipeline',
    data: {
      label: 'API Gateway',
      icon: '🔌',
      bgColor: '#48c774',
      description: 'NestJS backend live',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'frontend',
    type: 'pipeline',
    data: {
      label: 'Frontend',
      icon: '🌐',
      bgColor: '#48c774',
      description: 'React website live',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
  {
    id: 'storybook',
    type: 'pipeline',
    data: {
      label: 'Storybook',
      icon: '📚',
      bgColor: '#48c774',
      description: 'Component docs live',
    },
    position: { x: 0, y: 0 },
    ...nodeDefaults,
  },
];

const initialEdges: Edge[] = [
  // Start: Git Push → CI Workflow
  {
    id: 'commit-githubCI',
    source: 'commit',
    target: 'githubCI',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  // CI Workflow → Install Dependencies
  {
    id: 'githubCI-install',
    source: 'githubCI',
    target: 'install',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  // Install → Prisma Generate & Lint (parallel)
  {
    id: 'install-prisma',
    source: 'install',
    target: 'prisma',
    type: 'step',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' },
  },
  {
    id: 'install-lint',
    source: 'install',
    target: 'lint',
    type: 'step',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' },
  },
  // Prisma → All Builds (parallel)
  {
    id: 'prisma-buildApi',
    source: 'prisma',
    target: 'buildApi',
    type: 'step',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'prisma-buildFrontend',
    source: 'prisma',
    target: 'buildFrontend',
    type: 'step',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'prisma-buildStorybook',
    source: 'prisma',
    target: 'buildStorybook',
    type: 'step',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  // All CI stages → CI Check
  {
    id: 'lint-ciCheck',
    source: 'lint',
    target: 'ciCheck',
    type: 'step',
    animated: true,
    style: { stroke: '#8b5cf6', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' },
  },
  {
    id: 'buildApi-ciCheck',
    source: 'buildApi',
    target: 'ciCheck',
    type: 'step',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'buildFrontend-ciCheck',
    source: 'buildFrontend',
    target: 'ciCheck',
    type: 'step',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'buildStorybook-ciCheck',
    source: 'buildStorybook',
    target: 'ciCheck',
    type: 'step',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  // CI Check → Failed (No)
  {
    id: 'ciCheck-failed',
    source: 'ciCheck',
    sourceHandle: 'no',
    target: 'ciFailed',
    type: 'step',
    animated: true,
    style: { stroke: '#dc2626', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#dc2626' },
    label: 'No',
    labelStyle: { fill: '#dc2626', fontWeight: 'bold' },
  },
  // CI Check → Deploy Workflow (Yes)
  {
    id: 'ciCheck-githubDeploy',
    source: 'ciCheck',
    sourceHandle: 'yes-bottom',
    target: 'githubDeploy',
    type: 'step',
    animated: true,
    style: { stroke: '#48c774', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#48c774' },
    label: 'Yes',
    labelStyle: { fill: '#48c774', fontWeight: 'bold' },
  },
  // Deploy Workflow → Railway Platform
  {
    id: 'githubDeploy-railway',
    source: 'githubDeploy',
    target: 'railway',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  // Railway → Services
  {
    id: 'railway-postgres',
    source: 'railway',
    target: 'postgres',
    type: 'step',
    animated: true,
    style: { stroke: '#336791', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#336791' },
  },
  {
    id: 'railway-api',
    source: 'railway',
    target: 'api',
    type: 'step',
    animated: true,
    style: { stroke: '#48c774', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#48c774' },
  },
  {
    id: 'railway-frontend',
    source: 'railway',
    target: 'frontend',
    type: 'step',
    animated: true,
    style: { stroke: '#48c774', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#48c774' },
  },
  {
    id: 'railway-storybook',
    source: 'railway',
    target: 'storybook',
    type: 'step',
    animated: true,
    style: { stroke: '#48c774', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#48c774' },
  },
  // PostgreSQL → API (database connection)
  {
    id: 'postgres-api',
    source: 'postgres',
    target: 'api',
    type: 'step',
    animated: true,
    style: { stroke: '#336791', strokeWidth: 2, strokeDasharray: '5,5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#336791' },
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
      <div className="w-full h-[800px] border-2 border-gray-900 rounded-xl overflow-hidden shadow-xl">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15, duration: 300 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100"
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
          <Background color="#00d1b2" gap={16} />
          <Controls className="border-2 border-gray-900 rounded-lg overflow-hidden" />
        </ReactFlow>
      </div>
    </>
  );
}

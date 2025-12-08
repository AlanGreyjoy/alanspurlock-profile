import { Container } from '@alanspurlock-profile/spurlock-ui';
import { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';

// Custom node component for Railway features
const FeatureNode = ({
  data,
}: {
  data: { label: string; description: string; icon: string };
}) => {
  return (
    <div className="bg-white border-2 border-gray-900 rounded-lg p-4 min-w-[250px] shadow-lg hover:shadow-xl transition-shadow">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{data.icon}</span>
        <h4 className="font-bold text-lg text-gray-900">{data.label}</h4>
      </div>
      <p className="text-sm text-gray-600 leading-tight">{data.description}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  feature: FeatureNode,
};

// Dagre layout function
const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction: 'TB' | 'LR' = 'TB'
) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 150 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 250, height: 120 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 125,
        y: nodeWithPosition.y - 60,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

// Deployment workflow nodes (positions will be calculated by dagre)
const initialDeploymentNodes: Node[] = [
  {
    id: '1',
    type: 'feature',
    position: { x: 0, y: 0 },
    data: {
      label: 'Git Push',
      description: 'Push code to GitHub',
      icon: '🚀',
    },
  },
  {
    id: '2',
    type: 'feature',
    position: { x: 0, y: 0 },
    data: {
      label: 'Auto Deploy',
      description: 'Railway detects changes instantly',
      icon: '⚡',
    },
  },
  {
    id: '3',
    type: 'feature',
    position: { x: 0, y: 0 },
    data: {
      label: 'Build',
      description: 'Docker image built automatically',
      icon: '🏗️',
    },
  },
  {
    id: '4',
    type: 'feature',
    position: { x: 0, y: 0 },
    data: {
      label: 'Deploy',
      description: 'Zero-downtime deployment',
      icon: '🎯',
    },
  },
  {
    id: '5',
    type: 'feature',
    position: { x: 0, y: 0 },
    data: {
      label: 'Live!',
      description: 'App is live with SSL',
      icon: '✨',
    },
  },
];

const initialDeploymentEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  {
    id: 'e3-5',
    source: '3',
    target: '5',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'step',
    animated: true,
    style: { stroke: '#00d1b2', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#00d1b2' },
  },
];

// Railway ecosystem nodes (manual circular layout around center)
const initialEcosystemNodes: Node[] = [
  {
    id: 'center',
    type: 'feature',
    position: { x: 300, y: 200 },
    data: {
      label: 'Railway',
      description: 'The Developer Platform',
      icon: '🚂',
    },
  },
  {
    id: 'postgres',
    type: 'feature',
    position: { x: 100, y: 50 },
    data: {
      label: 'PostgreSQL',
      description: 'Managed database with automatic backups',
      icon: '🐘',
    },
  },
  {
    id: 'redis',
    type: 'feature',
    position: { x: 500, y: 50 },
    data: {
      label: 'Redis',
      description: 'In-memory caching made easy',
      icon: '⚡',
    },
  },
  {
    id: 'docker',
    type: 'feature',
    position: { x: 100, y: 350 },
    data: {
      label: 'Docker Support',
      description: 'Native Dockerfile support',
      icon: '🐳',
    },
  },
  {
    id: 'monitoring',
    type: 'feature',
    position: { x: 500, y: 350 },
    data: {
      label: 'Monitoring',
      description: 'Built-in metrics & logs',
      icon: '📊',
    },
  },
  {
    id: 'env',
    type: 'feature',
    position: { x: 50, y: 200 },
    data: {
      label: 'Environments',
      description: 'Multiple environments per project',
      icon: '🌍',
    },
  },
  {
    id: 'scaling',
    type: 'feature',
    position: { x: 550, y: 200 },
    data: {
      label: 'Auto Scaling',
      description: 'Scale up/down automatically',
      icon: '📈',
    },
  },
];

const initialEcosystemEdges: Edge[] = [
  {
    id: 'center-postgres',
    source: 'center',
    target: 'postgres',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'center-redis',
    source: 'center',
    target: 'redis',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'center-docker',
    source: 'center',
    target: 'docker',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'center-monitoring',
    source: 'center',
    target: 'monitoring',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'center-env',
    source: 'center',
    target: 'env',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
  {
    id: 'center-scaling',
    source: 'center',
    target: 'scaling',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#ff0055', strokeWidth: 3 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#ff0055' },
  },
];

export function WhyIUseRailwayPage() {
  const [activeGraph, setActiveGraph] = useState<'deployment' | 'ecosystem'>(
    'deployment'
  );

  // Apply dagre layout to deployment nodes only
  const deploymentLayout = useMemo(
    () => getLayoutedElements(initialDeploymentNodes, initialDeploymentEdges),
    []
  );

  const [deploymentNodesState, , onDeploymentNodesChange] = useNodesState(
    deploymentLayout.nodes
  );
  const [deploymentEdgesState, , onDeploymentEdgesChange] = useEdgesState(
    deploymentLayout.edges
  );

  // Ecosystem uses manual circular layout
  const [ecosystemNodesState, , onEcosystemNodesChange] = useNodesState(
    initialEcosystemNodes
  );
  const [ecosystemEdgesState, , onEcosystemEdgesChange] = useEdgesState(
    initialEcosystemEdges
  );

  return (
    <div className="w-full pt-12 md:pt-24 pb-20">
      <Container size="lg">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-left mb-16">
          <div className="mb-8 rounded-xl overflow-hidden border-2 border-gray-900 shadow-xl">
            <img
              src="/images/railway-ss.png"
              alt="Railway Dashboard Screenshot"
              className="w-full h-auto"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-8 tracking-tight">
            Why I Use <span className="text-[#00d1b2]">Railway</span> 🚂
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed mb-6">
            Railway is the developer platform that just{' '}
            <span className="font-bold text-[#ff0055]">works</span>. No
            configuration hell, no DevOps nightmares, just pure productivity.
          </p>

          <div className="bg-gradient-to-br from-[#00d1b2]/10 via-[#ff0055]/5 to-transparent border-2 border-gray-900 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              The Problem with Traditional Hosting
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <span className="font-bold text-[#ff0055]">
                  ❌ AWS/GCP/Azure:
                </span>{' '}
                Overwhelming complexity, thousands of services, cryptic
                configurations, surprise bills.
              </p>
              <p>
                <span className="font-bold text-[#ff0055]">❌ Heroku:</span>{' '}
                Great UX, but expensive, limited features, and uncertain future.
              </p>
              <p>
                <span className="font-bold text-[#ff0055]">
                  ❌ DigitalOcean:
                </span>{' '}
                Manual everything, you're the DevOps team now.
              </p>
              <p>
                <span className="font-bold text-[#00d1b2]">✅ Railway:</span>{' '}
                The perfect balance of simplicity, power, and affordability.
                Deploy with a git push, scale with a slider.
              </p>
            </div>
          </div>
        </div>

        {/* Why Railway Rocks Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12">
            Why Railway is <span className="text-[#00d1b2]">Awesome</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Feature Cards */}
            <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Lightning Fast Deploys
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Git push and you're live in seconds. Railway's build cache and
                optimized infrastructure means your changes go live faster than
                you can refresh the browser.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Zero Configuration
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Railway automatically detects your tech stack. Dockerfile?
                Node.js? Python? It just works. No YAML files, no infrastructure
                as code, no headaches.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Transparent Pricing
              </h3>
              <p className="text-gray-700 leading-relaxed">
                $5/month gets you started with $5 of usage credits. Pay for what
                you use, no surprise bills. The free tier is actually useful for
                hobby projects.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Developer Experience
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Beautiful UI, intuitive CLI, comprehensive docs. Railway is
                built by developers, for developers. It respects your time and
                intelligence.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Managed Databases
              </h3>
              <p className="text-gray-700 leading-relaxed">
                PostgreSQL, MySQL, MongoDB, Redis - all with automatic backups,
                scaling, and monitoring. One click to provision, zero
                maintenance required.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Preview Environments
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Every PR gets its own deployment URL. Test in production-like
                environments before merging. Share with stakeholders for instant
                feedback.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Graphs Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
            How Railway <span className="text-[#ff0055]">Works</span>
          </h2>

          {/* Graph Switcher */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveGraph('deployment')}
              className={`px-6 py-3 font-bold rounded-lg transition-all ${
                activeGraph === 'deployment'
                  ? 'bg-[#00d1b2] text-white shadow-lg'
                  : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50'
              }`}
            >
              🚀 Deployment Flow
            </button>
            <button
              onClick={() => setActiveGraph('ecosystem')}
              className={`px-6 py-3 font-bold rounded-lg transition-all ${
                activeGraph === 'ecosystem'
                  ? 'bg-[#00d1b2] text-white shadow-lg'
                  : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50'
              }`}
            >
              🌐 Railway Ecosystem
            </button>
          </div>

          {/* React Flow Graph */}
          <div
            className="bg-white border-2 border-gray-900 rounded-xl overflow-hidden shadow-xl"
            style={{ height: '600px' }}
          >
            {activeGraph === 'deployment' ? (
              <ReactFlow
                nodes={deploymentNodesState}
                edges={deploymentEdgesState}
                onNodesChange={onDeploymentNodesChange}
                onEdgesChange={onDeploymentEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <Background color="#00d1b2" gap={16} />
                <Controls className="border-2 border-gray-900 rounded-lg overflow-hidden" />
              </ReactFlow>
            ) : (
              <ReactFlow
                nodes={ecosystemNodesState}
                edges={ecosystemEdgesState}
                onNodesChange={onEcosystemNodesChange}
                onEdgesChange={onEcosystemEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                className="bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <Background color="#ff0055" gap={16} />
                <Controls className="border-2 border-gray-900 rounded-lg overflow-hidden" />
              </ReactFlow>
            )}
          </div>

          <p className="text-gray-600 text-center mt-4 text-sm">
            💡 Drag nodes around, zoom in/out, and explore the{' '}
            {activeGraph === 'deployment'
              ? 'deployment workflow'
              : 'Railway ecosystem'}
          </p>
        </section>

        {/* Real World Example */}
        <section className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-[#ff0055]/10 via-[#00d1b2]/5 to-transparent border-2 border-gray-900 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🎯 This Website Runs on Railway
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                This exact site you're viewing is hosted on Railway. It's a
                full-stack application with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>React frontend (Vite + TypeScript)</li>
                <li>NestJS backend API</li>
                <li>PostgreSQL database</li>
                <li>Automated CI/CD pipeline</li>
                <li>Docker containerization</li>
              </ul>
              <p className="font-bold text-[#00d1b2]">
                Total setup time? About 10 minutes. Ongoing maintenance? Zero.
              </p>
              <p>
                Every time I push to GitHub, Railway automatically builds and
                deploys both services with zero downtime. The database is
                automatically backed up. Logs are aggregated and searchable.
                Metrics are collected automatically.
              </p>
              <p className="font-bold text-[#ff0055]">
                I can focus on building features instead of fighting
                infrastructure. That's why I use Railway.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Try Railway?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Stop fighting your infrastructure. Start building your product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#00d1b2] text-white font-bold text-lg rounded-lg shadow-lg hover:bg-[#00b89f] hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              🚂 Try Railway Free
            </a>
            <a
              href="https://docs.railway.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border-2 border-gray-900 font-bold text-lg rounded-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1"
            >
              📚 Read the Docs
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default WhyIUseRailwayPage;

import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  Search,
  User,
  Settings,
  Mail,
  Bell,
  Heart,
  Star,
  Calendar,
  Clock,
  Download,
  Upload,
  Trash,
  Edit,
  Save,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Menu,
  MoreVertical,
  Plus,
  Minus,
  Sun,
  Moon,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Zap,
  Sparkles,
  Database,
  Code,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  type LucideIcon,
} from 'lucide-react';

// Icon showcase component
const IconShowcase = () => {
  const iconGroups = [
    {
      title: 'Navigation',
      icons: [
        { Icon: Home, name: 'Home' },
        { Icon: Search, name: 'Search' },
        { Icon: User, name: 'User' },
        { Icon: Settings, name: 'Settings' },
        { Icon: Menu, name: 'Menu' },
        { Icon: MoreVertical, name: 'MoreVertical' },
      ],
    },
    {
      title: 'Communication',
      icons: [
        { Icon: Mail, name: 'Mail' },
        { Icon: Bell, name: 'Bell' },
        { Icon: Heart, name: 'Heart' },
        { Icon: Star, name: 'Star' },
      ],
    },
    {
      title: 'Actions',
      icons: [
        { Icon: Download, name: 'Download' },
        { Icon: Upload, name: 'Upload' },
        { Icon: Trash, name: 'Trash' },
        { Icon: Edit, name: 'Edit' },
        { Icon: Save, name: 'Save' },
        { Icon: Plus, name: 'Plus' },
        { Icon: Minus, name: 'Minus' },
      ],
    },
    {
      title: 'Feedback',
      icons: [
        { Icon: Check, name: 'Check' },
        { Icon: X, name: 'X' },
        { Icon: AlertCircle, name: 'AlertCircle' },
        { Icon: Info, name: 'Info' },
        { Icon: HelpCircle, name: 'HelpCircle' },
      ],
    },
    {
      title: 'Arrows',
      icons: [
        { Icon: ChevronRight, name: 'ChevronRight' },
        { Icon: ChevronLeft, name: 'ChevronLeft' },
        { Icon: ChevronUp, name: 'ChevronUp' },
        { Icon: ChevronDown, name: 'ChevronDown' },
      ],
    },
    {
      title: 'Time',
      icons: [
        { Icon: Calendar, name: 'Calendar' },
        { Icon: Clock, name: 'Clock' },
      ],
    },
    {
      title: 'Authentication',
      icons: [
        { Icon: LogIn, name: 'LogIn' },
        { Icon: LogOut, name: 'LogOut' },
        { Icon: Eye, name: 'Eye' },
        { Icon: EyeOff, name: 'EyeOff' },
        { Icon: Lock, name: 'Lock' },
        { Icon: Unlock, name: 'Unlock' },
      ],
    },
    {
      title: 'Special',
      icons: [
        { Icon: Sun, name: 'Sun' },
        { Icon: Moon, name: 'Moon' },
        { Icon: Zap, name: 'Zap' },
        { Icon: Sparkles, name: 'Sparkles' },
      ],
    },
    {
      title: 'Development',
      icons: [
        { Icon: Database, name: 'Database' },
        { Icon: Code, name: 'Code' },
        { Icon: Terminal, name: 'Terminal' },
      ],
    },
    {
      title: 'Social',
      icons: [
        { Icon: Github, name: 'Github' },
        { Icon: Linkedin, name: 'Linkedin' },
        { Icon: Twitter, name: 'Twitter' },
      ],
    },
  ];

  return (
    <div className="p-10 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Icon Library</h1>
      <p className="text-gray-600 mb-8">
        We use Lucide React for icons. All icons are customizable with size and
        color.
      </p>

      {iconGroups.map((group) => (
        <section key={group.title} className="mb-12">
          <h2 className="text-xl font-semibold mb-6 text-gray-700">
            {group.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {group.icons.map(({ Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Icon className="w-8 h-8 text-gray-700 mb-2" />
                <span className="text-xs text-gray-500 text-center font-mono">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

// Icon sizes component
const IconSizes = () => {
  const sizes = [
    { size: 16, label: 'Small (16px)', className: 'w-4 h-4' },
    { size: 20, label: 'Default (20px)', className: 'w-5 h-5' },
    { size: 24, label: 'Medium (24px)', className: 'w-6 h-6' },
    { size: 32, label: 'Large (32px)', className: 'w-8 h-8' },
    { size: 48, label: 'XL (48px)', className: 'w-12 h-12' },
    { size: 64, label: 'XXL (64px)', className: 'w-16 h-16' },
  ];

  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Icon Sizes</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {sizes.map(({ size, label, className }) => (
          <div key={size} className="flex flex-col items-center space-y-3">
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-xl">
              <Star className={className} />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-500 font-mono mt-1">
                {className}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Icon colors component
const IconColors = () => {
  const colors = [
    { name: 'Primary', className: 'text-brand-primary', hex: '#ff0055' },
    { name: 'Secondary', className: 'text-brand-secondary', hex: '#00d1b2' },
    { name: 'Gray 900', className: 'text-gray-900', hex: '#111827' },
    { name: 'Gray 700', className: 'text-gray-700', hex: '#374151' },
    { name: 'Gray 500', className: 'text-gray-500', hex: '#6b7280' },
    { name: 'Gray 400', className: 'text-gray-400', hex: '#9ca3af' },
    { name: 'Red 600', className: 'text-red-600', hex: '#dc2626' },
    { name: 'Orange 600', className: 'text-orange-600', hex: '#ea580c' },
    { name: 'Yellow 600', className: 'text-yellow-600', hex: '#ca8a04' },
    { name: 'Green 600', className: 'text-green-600', hex: '#16a34a' },
    { name: 'Blue 600', className: 'text-blue-600', hex: '#2563eb' },
    { name: 'Purple 600', className: 'text-purple-600', hex: '#9333ea' },
    { name: 'Pink 600', className: 'text-pink-600', hex: '#db2777' },
    {
      name: 'White',
      className: 'text-white',
      hex: '#ffffff',
      bg: 'bg-gray-800',
    },
  ];

  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Icon Colors</h1>
      <p className="text-gray-600 mb-8">
        Icons inherit their color from the text color. Use Tailwind color
        utilities to style them.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        {colors.map(({ name, className, hex, bg }) => (
          <div key={name} className="space-y-3">
            <div
              className={`h-32 rounded-xl ${
                bg || 'bg-gray-50'
              } shadow-lg flex items-center justify-center`}
            >
              <Heart className={`w-12 h-12 ${className}`} strokeWidth={2} />
            </div>
            <div className="text-sm">
              <p className="font-bold text-gray-900">{name}</p>
              <p className="text-gray-500 font-mono text-xs">{className}</p>
              <p className="text-gray-400 font-mono text-xs">{hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Icon states component
const IconStates = () => {
  return (
    <div className="p-10 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        Icon States & Usage
      </h1>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Interactive States
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">Default</p>
            <Heart className="w-8 h-8 text-gray-700" />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">Hover</p>
            <Heart className="w-8 h-8 text-brand-primary hover:scale-110 transition-transform cursor-pointer" />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">Active</p>
            <Heart className="w-8 h-8 text-brand-primary fill-brand-primary" />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">Disabled</p>
            <Heart className="w-8 h-8 text-gray-300 cursor-not-allowed" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Stroke Width
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">Thin (1)</p>
            <Star className="w-8 h-8 text-gray-700" strokeWidth={1} />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Default (2)
            </p>
            <Star className="w-8 h-8 text-gray-700" strokeWidth={2} />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              Medium (2.5)
            </p>
            <Star className="w-8 h-8 text-gray-700" strokeWidth={2.5} />
          </div>
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">Bold (3)</p>
            <Star className="w-8 h-8 text-gray-700" strokeWidth={3} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-6 text-gray-700">
          Usage Examples
        </h2>
        <div className="space-y-4">
          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              In Buttons
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Github className="w-5 h-5" />
                GitHub
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              In Navigation
            </p>
            <nav className="flex gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors"
              >
                <Home className="w-5 h-5" />
                Home
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors"
              >
                <User className="w-5 h-5" />
                Profile
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-700 hover:text-brand-primary transition-colors"
              >
                <Bell className="w-5 h-5" />
                Notifications
              </a>
            </nav>
          </div>

          <div className="p-6 bg-gray-50 rounded-xl">
            <p className="text-sm font-semibold text-gray-600 mb-4">
              In Alerts
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-800">
                  Success! Your changes have been saved.
                </p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800">Error: Something went wrong.</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <p className="text-blue-800">
                  Info: New updates are available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const meta: Meta = {
  title: 'Design System/Icons',
  component: IconShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof IconShowcase>;

export const AllIcons: Story = {
  render: () => <IconShowcase />,
};

export const Sizes: Story = {
  render: () => <IconSizes />,
};

export const Colors: Story = {
  render: () => <IconColors />,
};

export const States: Story = {
  render: () => <IconStates />,
};

import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Tab, Tabs, Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Font } from '@react-pdf/renderer';

// Type definitions


// Register fonts for PDF generation
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/fonts/roboto-regular.ttf',
      fontWeight: 'normal'
    },
    {
      src: '/fonts/roboto-bold.ttf',
      fontWeight: 'bold'
    }
  ]
});

type TabType = 'profile' | 'resources' | 'assets' | 'contacts' | 'beneficiaries' | 'will';

interface UIState {
  activeTab: TabType;
  showAddAsset: boolean;
  showAddContact: boolean;
  showAddBeneficiary: boolean;
  isLoggedIn: boolean;
  user: User | null;
  isGuest: boolean;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video';
  url: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video';
  url: string;
}

interface UIState {
  activeTab: TabType;
  showAddAsset: boolean;
  showAddContact: boolean;
  showAddBeneficiary: boolean;
  isLoggedIn: boolean;
  user: User | null;
  isGuest: boolean;
}

interface Asset {
  id: string;
  name: string;
  value: number;
  description: string;
  beneficiaryId?: string;
  type: 'property' | 'investment' | 'bank' | 'other';
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface Beneficiary {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  percentage: number;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video';
  url: string;
}

// Define types and interfaces
interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video';
  url: string;
}

interface Asset {
  id: string;
  name: string;
  value: number;
  description: string;
  beneficiaryId?: string;
  type: 'property' | 'investment' | 'bank' | 'other';
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface Beneficiary {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  percentage: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
}

const App: React.FC = () => {
  const theme = createTheme();
  
  // State management
  const [uiState, setUiState] = useState<UIState>({
    activeTab: 'profile',
    showAddAsset: false,
    showAddContact: false,
    showAddBeneficiary: false,
    isLoggedIn: false,
    user: null,
    isGuest: false
  });
  
  // Initialize resources data
  const [resources, setResources] = useState<Resource[]>([]);

  const handleVideoClick = (videoId: string) => {
    const video = videoRefs.current[videoId];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    setUiState(prev => ({ ...prev, activeTab: newValue }));
  };

  const renderResources = () => (
    <Box sx={{ padding: 2 }}>
      {resourcesData.map((resource: Resource) => (
        <Box key={resource.id} sx={{ marginBottom: 2 }}>
          <Typography variant="h6">{resource.title}</Typography>
          <Typography>{resource.description}</Typography>
          {resource.type === 'video' ? (
            <Box sx={{ position: 'relative', marginTop: 2 }}>
              <video
                ref={(el) => { videoRefs.current[resource.id] = el; }}
                onClick={() => handleVideoClick(resource.id)}
                style={{ width: '100%', cursor: 'pointer' }}
              >
                <source src={resource.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          ) : (
            <Button
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{ marginTop: 1 }}
            >
              Read Article
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Tabs
            value={uiState.activeTab}
            onChange={handleTabChange}
            aria-label="estate planning tabs"
          >
            <Tab value="profile" label="Profile" />
            <Tab value="resources" label="Resources" />
            <Tab value="assets" label="Assets" />
            <Tab value="contacts" label="Contacts" />
            <Tab value="beneficiaries" label="Beneficiaries" />
            <Tab value="will" label="Will" />
          </Tabs>
          {uiState.activeTab === 'resources' && renderResources()}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

const handleVideoClick = (videoId: string) => {
  // Handle video play/pause events
  const video = videoRefs.current[videoId];
  if (video) {
    // Add any video-specific handling here
    console.log(`Video ${videoId} ${video.paused ? 'paused' : 'playing'}`);
  }
};

// Styles
const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '24px',
    display: 'flex',
  }
};

const [uiState, setUiState] = useState<UIState>({
  activeTab: 'profile',
  showAddAsset: false,
  showAddContact: false,
  showAddBeneficiary: false,
  isLoggedIn: false,
  user: null,
  isGuest: false
});

const [resourcesData, setResourcesData] = useState<Resource[]>([]);

// Debug logging for resources
useEffect(() => {
  if (uiState.activeTab === 'resources') {
    console.log('Resources Tab Active');
    console.log('Resources Data:', resourcesData);
    console.log('Articles:', resourcesData.filter((r: Resource) => r.type === 'article'));
    console.log('Videos:', resourcesData.filter((r: Resource) => r.type === 'video'));
  }
}, [uiState.activeTab, resourcesData]);

// Render resources content
const renderResources = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Educational Resources
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
        {resourcesData.map((resource) => (
          <Box
            key={resource.id}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: 1,
              p: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 2
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              {resource.title}
            </Typography>
            <Typography color="text.secondary" paragraph>
              {resource.description}
            </Typography>
            {resource.type === 'video' ? (
              <Box>
                <video
                  ref={(el) => { if (el) videoRefs.current[resource.id] = el; }}
                  width="100%"
                  controls
                  onPlay={() => handleVideoClick(resource.id)}
                  onPause={() => handleVideoClick(resource.id)}
                >
                  <source src={resource.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Box>
            ) : (
              <Button
                variant="contained"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Article
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default App;
interface User {
  name: string;
  email: string;
  address?: string;
  profileComplete?: boolean;
};

// UI Components
const CustomButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`rounded-lg font-medium transition-all ${
      variant === 'primary'
        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
        : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
    } ${size === 'sm' ? 'px-3 py-1.5 text-sm' : 
      size === 'md' ? 'px-4 py-2' : 
      'px-5 py-2.5'} ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Load current user from localStorage
const loadCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
};

// Main App Component
export const EstateManager: React.FC = () => {
  // State management using custom hooks
  const [resources, setResources] = useState<Resource[]>([]);
  
  // User state
  const [user, setUser] = useState<User | null>(() => loadCurrentUser());
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'assets' | 'will' | 'resources' | 'profile'>('assets');
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Form state
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    address: ''
  });
  
  // Data state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [activeWillStep, setActiveWillStep] = useState<number>(1);
  
  // Video refs

  // Debug logging for resources
  useEffect(() => {
    if (activeTab === 'resources') {
      console.log('Resources Tab Active');
      console.log('Resources Data:', resources);
      console.log('Articles:', resources.filter(r => r.type === 'article'));
      console.log('Videos:', resources.filter(r => r.type === 'video'));
    }
  }, [activeTab, resources]);

  // Video handlers
  const handleVideoFullscreen = async (videoId: string) => {
    const video = videoRefs.current?.[videoId];
    if (video) {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        } else {
          await video.requestFullscreen();
        }
      } catch (error) {
        console.error('Error toggling fullscreen:', error);
      }
    }
  };

  const handleVideoClick = (videoId: string) => {
    const video = videoRefs.current?.[videoId];
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  const renderResources = () => (
    <Box sx={{ p: 3 }}>
      {resources.map((resource) => (
        <Box key={resource.id} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {resource.title}
          </Typography>
          <Typography sx={{ mb: 2 }}>
            {resource.description}
          </Typography>
          {resource.type === 'video' ? (
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 600 }}>
              <video
                ref={(el) => {
                  if (el) videoRefs.current[resource.id] = el;
                }}
                onClick={() => handleVideoClick(resource.id)}
                style={{ width: '100%', cursor: 'pointer' }}
                src={resource.url}
              />
              <Button
                onClick={() => handleVideoFullscreen(resource.id)}
                sx={{ position: 'absolute', bottom: 8, right: 8 }}
              >
                Fullscreen
              </Button>
            </Box>
          ) : (
            <Button
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Article
            </Button>
          )}
        </Box>
      ))}
    </Box>
  )};

  return (
    <div className="min-h-screen bg-gray-100">
      {!user && !isGuest ? (
        <div className="min-h-screen bg-gray-50 py-6 flex flex-col sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="text-center mb-8">
              <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome to EstateSecure</h2>
              <p className="text-gray-600">Manage your estate securely</p>
            </div>

            <div className="space-y-4">
              <CustomButton onClick={() => setShowSignUp(true)} className="w-full">
                Create Account
              </CustomButton>
              <CustomButton onClick={() => setShowLogin(true)} variant="secondary" className="w-full">
                Sign In
              </CustomButton>
              <CustomButton onClick={handleGuest} variant="secondary" className="w-full">
                Continue as Guest
              </CustomButton>
            </div>
          </div>

          {/* Sign Up Modal */}
          {showSignUp && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md">
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Account</h2>
                    <p className="text-gray-600 mb-6">
                      Sign up to start managing your estate
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={authForm.email}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                      </label>
                      <Input
                        type="password"
                        value={authForm.password}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        value={authForm.confirmPassword}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="contained" onClick={() => setShowSignUp(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSignUp}>
                      Create Account
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Login Modal */}
          {showLogin && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md">
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In</h2>
                    <p className="text-gray-600 mb-6">
                      Welcome back! Please sign in to continue
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <Input
                        type="email"
                        value={authForm.email}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <Input
                        type="password"
                        value={authForm.password}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="contained" onClick={() => setShowLogin(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleLogin}>
                      Sign In
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Profile Setup Modal */}
          {showProfileSetup && !user?.profileComplete && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md">
                <div className="p-6 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile</h2>
                    <p className="text-gray-600 mb-6">
                      Please provide your full name and address to complete your profile setup.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <textarea
                        value={profileForm.address}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your full address"
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleProfileSetup}>
                      Complete Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-xl font-bold text-indigo-600">EstateSecure</h1>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <button
                      onClick={() => setActiveTab('assets')}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        activeTab === 'assets'
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Assets
                    </button>
                    <button
                      onClick={() => setActiveTab('will')}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        activeTab === 'will'
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Will
                    </button>
                    <button
                      onClick={() => setActiveTab('resources')}
                      className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                        activeTab === 'resources'
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Resources
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative flex items-center space-x-4">
                    <button
                      onClick={() => setActiveTab('profile')}
                      className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                      <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        {user?.name ? user.name[0].toUpperCase() : 'U'}
                      </span>
                      <span>{user?.name || 'User'}</span>
                    </button>
                    <Button
                      variant="contained"
                      size="sm"
                      onClick={handleLogout}
                      color="error"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Assets Tab */}
            {activeTab === 'assets' && (
              <div className="space-y-6">
                {/* Asset Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <div className="p-6">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">💰</span>
                        <div>
                          <p className="text-sm text-gray-500">Total Value</p>
                          <p className="text-xl font-semibold">
                            {formatCurrency(assets.reduce((sum, asset) => sum + asset.value, 0))}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-6">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">📊</span>
                        <div>
                          <p className="text-sm text-gray-500">Total Assets</p>
                          <p className="text-xl font-semibold">{assets.length}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-6">
                      <div className="flex items-center">
                        <span className="text-2xl mr-4">🏦</span>
                        <div>
                          <p className="text-sm text-gray-500">Asset Types</p>
                          <p className="text-xl font-semibold">
                            {new Set(assets.map(a => a.type)).size}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Asset List */}
                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Your Assets</h2>
                      <Button variant="contained" onClick={() => setShowAddAsset(true)}>Add Asset</Button>
                    </div>
                    {assets.length === 0 ? (
                      <div sx={{ textAlign: 'center', py: 3 }}>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No assets</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding your first asset.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {assets.map((asset) => (
                              <tr key={asset.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {asset.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatCurrency(asset.value)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {asset.type}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {asset.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <Button
                                    variant="contained"
                                    size="sm"
                                    onClick={() => handleEditAsset(asset)}
                                    className="mr-2"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant="contained"
                                    size="sm"
                                    onClick={() => handleDeleteAsset(asset.id)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* Will Tab */}
            {activeTab === 'will' && (
              <div className="space-y-6">
                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Will Creation</h2>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Step {activeWillStep} of 5</span>
                      </div>
                    </div>

                    {activeWillStep === 1 && (
                      <div className="space-y-6">
                        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-yellow-800">Step 1: Personal Information</h3>
                              <div className="mt-2 text-sm text-yellow-700">
                                <p>Please verify your personal information before proceeding.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <Input value={user?.name || ''} disabled className="mt-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                              value={user?.address || ''}
                              disabled
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button variant="contained" onClick={() => setActiveWillStep(2)}>Next: Contact Details</Button>
                        </div>
                      </div>
                    )}

                    {activeWillStep === 2 && (
                      <div className="space-y-6">
                        <div className="border-l-4 border-indigo-400 bg-indigo-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-indigo-800">Step 2: Contact Details</h3>
                              <div className="mt-2 text-sm text-indigo-700">
                                <p>Please provide details for all the important people in your will.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-8">
                          {/* Executor Details */}
                          <div className="bg-white p-6 rounded-lg border">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Executor Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <Input
                                  value={willForm.executor.name}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    executor: { ...prev.executor, name: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                  value={willForm.executor.address}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    executor: { ...prev.executor, address: e.target.value }
                                  }))}
                                  rows={2}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <Input
                                  value={willForm.executor.phone}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    executor: { ...prev.executor, phone: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Input
                                  type="email"
                                  value={willForm.executor.email}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    executor: { ...prev.executor, email: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Alternate Executor Details */}
                          <div className="bg-white p-6 rounded-lg border">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Alternate Executor</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <Input
                                  value={willForm.alternateExecutor.name}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    alternateExecutor: { ...prev.alternateExecutor, name: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                  value={willForm.alternateExecutor.address}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    alternateExecutor: { ...prev.alternateExecutor, address: e.target.value }
                                  }))}
                                  rows={2}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <Input
                                  value={willForm.alternateExecutor.phone}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    alternateExecutor: { ...prev.alternateExecutor, phone: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Input
                                  type="email"
                                  value={willForm.alternateExecutor.email}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    alternateExecutor: { ...prev.alternateExecutor, email: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Guardian Details */}
                          <div className="bg-white p-6 rounded-lg border">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Guardian for Minor Children</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <Input
                                  value={willForm.guardian.name}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    guardian: { ...prev.guardian, name: e.target.value }
                                  }))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                  value={willForm.guardian.address}
                                  onChange={(e) => setWillForm(prev => ({
                                    ...prev,
                                    guardian: { ...prev.guardian, address: e.target.value }
                                  }))}
                                  rows={2}
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="contained" onClick={() => setActiveWillStep(1)}>Previous</Button>
                          <Button onClick={() => setActiveWillStep(3)}>Next: Select Assets</Button>
                        </div>
                      </div>
                    )}

                    {activeWillStep === 3 && (
                      <div className="space-y-6">
                        <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-blue-800">Step 3: Asset Selection</h3>
                              <div className="mt-2 text-sm text-blue-700">
                                <p>Select the assets you want to include in your will.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {assets.map((asset) => (
                            <div key={asset.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <p className="font-medium">{asset.name}</p>
                                <p className="text-sm text-gray-500">{formatCurrency(asset.value)}</p>
                              </div>
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between">
                          <Button variant="contained" onClick={() => setActiveWillStep(2)}>Previous</Button>
                          <Button onClick={() => setActiveWillStep(4)}>Next: Choose Beneficiaries</Button>
                        </div>
                      </div>
                    )}

                    {activeWillStep === 4 && (
                      <div>
                        <div className="border-l-4 border-green-400 bg-green-50 p-4 mb-6">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-green-800">Step 4: Beneficiary Assignment</h3>
                              <div className="mt-2 text-sm text-green-700">
                                <p>Assign what percentage of each asset goes to each beneficiary. Total allocation for each asset must equal 100%.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {assets.length === 0 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-yellow-800">Please add assets in Step 3 before assigning beneficiaries.</p>
                          </div>
                        )}

                        {assets.length > 0 && willForm.beneficiaries.length === 0 && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-yellow-800">Please add beneficiaries in Step 2 before assigning assets.</p>
                          </div>
                        )}

                        {assets.length > 0 && willForm.beneficiaries.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {assets.map((asset, assetIndex) => {
                              const assetShare = willForm.assetShares.find(a => a.assetId === asset.id) || {
                                assetId: asset.id,
                                shares: []
                              };

                              return (
                                <div key={asset.id} className="bg-white p-6 rounded-lg border">
                                  <h4 className="font-medium text-gray-900 mb-4">{asset.name}</h4>
                                  <div className="space-y-4">
                                    {willForm.beneficiaries.map((beneficiary, beneficiaryIndex) => (
                                      <div key={beneficiaryIndex} className="flex items-center gap-4">
                                        <div className="flex-grow">
                                          <label className="block text-sm font-medium text-gray-700">
                                            {beneficiary.name}
                                          </label>
                                          <Input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={assetShare.shares.find(s => s.beneficiaryIndex === beneficiaryIndex)?.percentage || 0}
                                            onChange={(e) => {
                                              const newValue = Number(e.target.value);
                                              setWillForm(prev => {
                                                const newShares = [...prev.assetShares];
                                                const assetIndex = newShares.findIndex(a => a.assetId === asset.id);

                                                if (assetIndex === -1) {
                                                  newShares.push({
                                                    assetId: asset.id,
                                                    shares: [{
                                                      beneficiaryIndex,
                                                      percentage: newValue
                                                    }]
                                                  });
                                                } else {
                                                  const shareIndex = newShares[assetIndex].shares.findIndex(
                                                    s => s.beneficiaryIndex === beneficiaryIndex
                                                  );

                                                  if (shareIndex === -1) {
                                                    newShares[assetIndex].shares.push({
                                                      beneficiaryIndex,
                                                      percentage: newValue
                                                    });
                                                  } else {
                                                    newShares[assetIndex].shares[shareIndex].percentage = newValue;
                                                  }
                                                }

                                                return {
                                                  ...prev,
                                                  assetShares: newShares
                                                };
                                              });
                                            }}
                                            className="mt-1"
                                          />
                                        </div>
                                        <div className="flex-none pt-6">%</div>
                                      </div>
                                    ))}
                                    
                                    {/* Show total percentage allocated for this asset */}
                                    <div className="mt-4 pt-4 border-t">
                                      <div className="flex justify-between text-sm">
                                        <span className="font-medium">Total Allocated:</span>
                                        <span className={`font-medium ${
                                          assetShare.shares.reduce((sum, s) => sum + s.percentage, 0) === 100 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                        }`}>
                                          {assetShare.shares.reduce((sum, s) => sum + s.percentage, 0)}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        <div className="flex justify-between mt-6">
                          <Button variant="contained" onClick={() => setActiveWillStep(3)}>Previous</Button>
                          {console.log('Debug - Render conditions:', {
                            hasUser: !!user,
                            hasWillForm: !!willForm,
                            step: activeWillStep,
                            hasAssets: assets.length > 0,
                            hasBeneficiaries: willForm?.beneficiaries?.length > 0
                          })}
                          {user && willForm && activeWillStep === 5 && (
                            <PDFDownloadLink
                              document={<WillDocument user={user} willForm={willForm} assets={assets} />}
                              fileName="last_will_and_testament.pdf"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {({ loading, error }) => {
                                console.log('PDF Status:', { loading, error });
                                if (loading) return 'Generating PDF...';
                                if (error) {
                                  console.error('PDF Error:', error);
                                  return 'Error creating PDF';
                                }
                                return 'Download Will';
                              }}
                            </PDFDownloadLink>
                          )}
                        </div>
                      </div>
                    )}

                    {activeWillStep === 5 && (
                      <div className="space-y-6">
                        <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              <svg className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-purple-800">Step 5: Review and Finalize</h3>
                              <div className="mt-2 text-sm text-purple-700">
                                <p>Review your will details before finalizing.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 className="font-medium mb-2">Personal Information</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p><span className="text-gray-500">Name:</span> {user?.name}</p>
                              <p><span className="text-gray-500">Address:</span> {user?.address}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Executor Information</h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              <div>
                                <p className="font-medium">Primary Executor</p>
                                <p><span className="text-gray-500">Name:</span> {willForm.executor.name}</p>
                                <p><span className="text-gray-500">Contact:</span> {willForm.executor.phone} | {willForm.executor.email}</p>
                              </div>
                              <div className="border-t pt-2">
                                <p className="font-medium">Alternate Executor</p>
                                <p><span className="text-gray-500">Name:</span> {willForm.alternateExecutor.name}</p>
                                <p><span className="text-gray-500">Contact:</span> {willForm.alternateExecutor.phone} | {willForm.alternateExecutor.email}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Guardian Information</h4>
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p><span className="text-gray-500">Name:</span> {willForm.guardian.name}</p>
                              <p><span className="text-gray-500">Contact:</span> {willForm.guardian.phone} | {willForm.guardian.email}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Asset Distribution</h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                              {assets.map(asset => {
                                const assetShare = willForm.assetShares.find(a => a.assetId === asset.id) || {
                                  assetId: asset.id,
                                  shares: []
                                };

                                return (
                                  <div key={asset.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                                    <div className="flex justify-between mb-2">
                                      <span className="font-medium">{asset.name}</span>
                                      <span>{formatCurrency(asset.value)}</span>
                                    </div>
                                    <div className="space-y-1">
                                      {willForm.beneficiaries.map((beneficiary, beneficiaryIndex) => {
                                        const share = assetShare.shares.find(s => s.beneficiaryIndex === beneficiaryIndex);
                                        return (
                                          <div key={beneficiaryIndex} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{beneficiary.name}</span>
                                            <span className="text-gray-600">{share?.percentage || 0}%</span>
                                          </div>
                                        );
                                      })}
                                      <div className="flex justify-between text-sm pt-1 border-t">
                                        <span className="font-medium">Total Allocated</span>
                                        <span className={`font-medium ${
                                          assetShare.shares.reduce((sum, s) => sum + s.percentage, 0) === 100 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                        }`}>
                                          {assetShare.shares.reduce((sum, s) => sum + s.percentage, 0)}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Witnesses</h4>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                              {willForm.witnesses.map((witness, index) => (
                                <div key={index} className={index > 0 ? 'border-t pt-4' : ''}>
                                  <p className="font-medium">Witness {index + 1}</p>
                                  <p><span className="text-gray-500">Name:</span> {witness.name}</p>
                                  <p><span className="text-gray-500">Contact:</span> {witness.phone} | {witness.email}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button variant="contained" onClick={() => setActiveWillStep(4)}>Previous</Button>
                          {user && willForm && activeWillStep === 5 && (
                            <PDFDownloadLink
                              document={<WillDocument user={user} willForm={willForm} assets={assets} />}
                              fileName="last_will_and_testament.pdf"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              {({ loading, error }) => {
                                console.log('PDF Status:', { loading, error });
                                if (loading) return 'Generating PDF...';
                                if (error) {
                                  console.error('PDF Error:', error);
                                  return 'Error creating PDF';
                                }
                                return 'Download Will';
                              }}
                            </PDFDownloadLink>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h2 className="text-2xl font-bold mb-6">Estate Planning Resources</h2>
                  
                  {/* Articles Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Articles</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {resources?.filter(r => r.type === 'article').map(resource => {
                        const isExpanded = expandedArticles.includes(resource.id);
                        return (
                          <div key={resource.id} className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-medium mb-3">{resource.title}</h4>
                            <p className="text-gray-600 mb-4">{resource.description}</p>
                            {isExpanded && resource.fullContent && (
                              <div className="mt-4 prose max-w-none">
                                <div className="whitespace-pre-wrap text-gray-600 mb-4">
                                  {resource.fullContent}
                                </div>
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                              <button
                                onClick={() => {
                                  setExpandedArticles(prev =>
                                    isExpanded
                                      ? prev.filter(id => id !== resource.id)
                                      : [...prev, resource.id]
                                  );
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                {isExpanded ? 'Show Less' : 'Read More'}
                              </button>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                View Source →
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Videos Section */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Video Resources</h3>
                    <div className="grid grid-cols-1 gap-6">
                      {resources?.filter(r => r.type === 'video').map(resource => {
                        const iframeRef = useRef<HTMLIFrameElement>(null);
                        
                        useEffect(() => {
                          const handleFullscreenChange = () => {
                            const iframe = iframeRef.current;
                            if (!document.fullscreenElement && iframe) {
                              iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                            }
                          };

                          document.addEventListener('fullscreenchange', handleFullscreenChange);
                          return () => {
                            document.removeEventListener('fullscreenchange', handleFullscreenChange);
                          };
                        }, []);

                        const handleVideoClick = async (e: React.MouseEvent<HTMLDivElement>) => {
                          e.preventDefault();
                          const iframe = iframeRef.current;
                          if (!iframe) return;

                          try {
                            if (iframe.requestFullscreen) {
                              await iframe.requestFullscreen();
                            } else if ((iframe as any).webkitRequestFullscreen) {
                              await (iframe as any).webkitRequestFullscreen();
                            } else if ((iframe as any).mozRequestFullScreen) {
                              await (iframe as any).mozRequestFullScreen();
                            } else if ((iframe as any).msRequestFullscreen) {
                              await (iframe as any).msRequestFullscreen();
                            }
                            
                            iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
                          } catch (error) {
                            console.error('Error entering fullscreen:', error);
                          }
                        };

                        return (
                          <div key={resource.id} className="bg-gray-50 rounded-lg overflow-hidden">
                            <div className="relative">
                              <div 
                                className="aspect-w-16 aspect-h-9 cursor-pointer group"
                                onClick={handleVideoClick}
                              >
                                <iframe
                                  ref={iframeRef}
                                  src={`https://www.youtube.com/embed/${resource.url.split('v=')[1]}?rel=0&modestbranding=1&enablejsapi=1&origin=${window.location.origin}`}
                                  title={resource.title}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                  allowFullScreen
                                  className="w-full h-full rounded-t-lg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm-1.5-4l4-3-4-3v6z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="p-6">
                              <h4 className="text-lg font-medium mb-2">{resource.title}</h4>
                              <p className="text-gray-600 mb-4">{resource.description}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Duration: {resource.duration}</span>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  Watch on YouTube →
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <Card>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Profile Information</h2>
                      <Button
                        variant="contained"
                        onClick={handleLogout}
                        color="error"
                      >
                        Sign Out
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{user?.address}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </>
      )}
      {showAddAsset && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Asset</h2>
                <p className="text-gray-600 mb-6">
                  Enter the details of your asset
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Asset Name
                  </label>
                  <Input
                    value={assetForm.name}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Savings Account"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <Input
                    type="number"
                    value={assetForm.value}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, value: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={assetForm.type}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a type</option>
                    <option value="bank">Bank Account</option>
                    <option value="property">Property</option>
                    <option value="investment">Investment</option>
                    <option value="vehicle">Vehicle</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={assetForm.status}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, status: e.target.value as Asset['status'] }))}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="contained" onClick={() => {
                  setAssetForm({
                    name: '',
                    value: 0,
                    type: '',
                    status: 'active'
                  });
                  setShowAddAsset(false);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleAddAsset}>
                  Add Asset
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
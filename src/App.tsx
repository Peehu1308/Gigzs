import React, { useState, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  ChevronDown,
  Wallet,
  Star,
  FileText,
  Clock,
  Award,
  BookOpen,
  Calendar,
  PieChart,
  Zap,
  Shield,
  HelpCircle,
  BarChart,
  User,
  Mail,
  Lock,
  BellRing,
  Globe,
  Moon,
  Sun,
  Palette,
  Trash2
} from 'lucide-react'
import Login from './components/Login'
import Signup from './components/Signup'
import FreelancerDashboard from './components/freelancer/dashboard/FreelancerDashboard'
import ClientDashboard from './components/client/dashboard/ClientDashboard'
import FreelancerOnboarding from './components/freelancer/FreelancerOnboarding'
import ClientOnboarding from './components/client/ClientOnboarding'
import FreelancerDirectory from './components/client/dashboard/FreelancerDirectory'
import ProjectsDirectory from './components/client/dashboard/ProjectsDirectory'
import MessagesPage from './components/messages/MessagesPage'
import SettingsPage from './components/settings/SettingsPage'
import FindJobs from './components/freelancer/dashboard/FindJobs'
import MyProposals from './components/freelancer/dashboard/MyProposals'
import Contracts from './components/freelancer/dashboard/Contracts'
import MyProjects from './components/freelancer/dashboard/MyProjects'
import ProjectDetails from './components/freelancer/dashboard/ProjectDetails'
import TimeTracking from './components/freelancer/dashboard/TimeTracking'
import Portfolio from './components/freelancer/dashboard/Portfolio'
import MyEarnings from './components/freelancer/dashboard/MyEarnings'
import Transactions from './components/freelancer/dashboard/Transactions'
import Reports from './components/freelancer/dashboard/Reports'
import Profile from './components/freelancer/dashboard/Profile'
import SkillsBadges from './components/freelancer/dashboard/SkillsBadges'
import Reviews from './components/freelancer/dashboard/Reviews'
import MyClients from './components/freelancer/dashboard/MyClients'
import SecurityPage from './components/freelancer/dashboard/SecurityPage'
import HelpCenter from './components/freelancer/dashboard/HelpCenter'
import { supabase } from './lib/supabase'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isOnboarding, setIsOnboarding] = useState(true)
  const [userType, setUserType] = useState<'freelancer' | 'client'>('freelancer')
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [freelancerName, setFreelancerName] = useState('')

  useEffect(() => {
    loadFreelancerProfile()
  }, [])

  const loadFreelancerProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: freelancerProfile } = await supabase
        .from('freelancer_profiles')
        .select('full_name')
        .eq('user_id', user.id)
        .single()

      if (freelancerProfile) {
        setFreelancerName(freelancerProfile.full_name || '')
      }
    } catch (error) {
      console.error('Error loading freelancer profile:', error)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      // First delete all related data
      if (userType === 'freelancer') {
        // Get freelancer profile ID
        const { data: freelancerProfile, error: profileIdError } = await supabase
          .from('freelancer_profiles')
          .select('id, avatar_url')
          .eq('user_id', user.id)
          .single()

        if (profileIdError) throw profileIdError
        if (!freelancerProfile) throw new Error('Freelancer profile not found')

        // Delete job applications
        const { error: applicationsError } = await supabase
          .from('job_applications')
          .delete()
          .eq('freelancer_id', freelancerProfile.id)

        if (applicationsError) throw applicationsError

        // Delete profile image from storage if exists
        if (freelancerProfile.avatar_url) {
          const fileName = freelancerProfile.avatar_url.split('/').pop()
          if (fileName) {
            const { error: storageError } = await supabase.storage
              .from('avatars')
              .remove([fileName])
            if (storageError) console.error('Error deleting avatar:', storageError)
          }
        }

        // Delete freelancer profile
        const { error: profileError } = await supabase
          .from('freelancer_profiles')
          .delete()
          .eq('id', freelancerProfile.id)

        if (profileError) throw profileError
      } else {
        // Get client profile ID
        const { data: clientProfile, error: profileIdError } = await supabase
          .from('client_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (profileIdError) throw profileIdError
        if (!clientProfile) throw new Error('Client profile not found')

        // Delete all jobs posted by the client
        const { error: jobsError } = await supabase
          .from('jobs')
          .delete()
          .eq('client_id', clientProfile.id)

        if (jobsError) throw jobsError

        // Delete client profile
        const { error: profileError } = await supabase
          .from('client_profiles')
          .delete()
          .eq('id', clientProfile.id)

        if (profileError) throw profileError
      }

      // Finally delete the user's auth account
      await supabase.auth.signOut()
      setIsAuthenticated(false)
      setShowDeleteConfirm(false)
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Failed to delete account. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        {showSignup ? (
          <Signup
            onSwitch={() => setShowSignup(false)}
            onSuccess={(type: 'freelancer' | 'client') => {
              setUserType(type)
              setIsAuthenticated(true)
            }}
          />
        ) : (
          <Login
            onSwitch={() => setShowSignup(true)}
            onSuccess={(type: 'freelancer' | 'client') => {
              setUserType(type)
              setIsAuthenticated(true)
            }}
          />
        )}
      </div>
    )
  }

  if (isOnboarding) {
    return userType === 'freelancer' ? (
      <FreelancerOnboarding onComplete={() => setIsOnboarding(false)} />
    ) : (
      <ClientOnboarding onComplete={() => setIsOnboarding(false)} />
    )
  }

  const freelancerMenuSections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', icon: Home, text: 'Dashboard' },
        { id: 'jobs', icon: Briefcase, text: 'Find Jobs' },
        { id: 'proposals', icon: FileText, text: 'My Proposals' },
        { id: 'contracts', icon: FileText, text: 'Contracts' },
      ]
    },
    {
      title: 'Work',
      items: [
        { id: 'projects', icon: Briefcase, text: 'My Projects' },
        { id: 'timesheet', icon: Clock, text: 'Time Tracking' },
        { id: 'portfolio', icon: BookOpen, text: 'Portfolio' },
      ]
    },
    {
      title: 'Earnings',
      items: [
        { id: 'earnings', icon: Wallet, text: 'My Earnings' },
        { id: 'transactions', icon: PieChart, text: 'Transactions' },
        { id: 'reports', icon: BarChart, text: 'Reports' },
      ]
    },
    {
      title: 'Profile',
      items: [
        { id: 'profile', icon: User, text: 'Profile' },
        { id: 'skills', icon: Zap, text: 'Skills & Badges' },
        { id: 'reviews', icon: Star, text: 'Reviews' },
      ]
    },
    {
      title: 'Communication',
      items: [
        { id: 'messages', icon: MessageSquare, text: 'Messages' },
        { id: 'clients', icon: Users, text: 'My Clients' },
      ]
    },
    {
      title: 'Settings',
      items: [
        { id: 'settings', icon: Settings, text: 'Settings' },
        { id: 'security', icon: Shield, text: 'Security' },
        { id: 'help', icon: HelpCircle, text: 'Help Center' },
        { id: 'logout', icon: LogOut, text: 'Logout', onClick: () => setIsAuthenticated(false) },
        { 
          id: 'delete', 
          icon: Trash2, 
          text: 'Delete Account',
          onClick: () => setShowDeleteConfirm(true)
        }
      ]
    }
  ]

  const clientMenuSections = [
    { id: 'dashboard', icon: Home, text: 'Dashboard' },
    { id: 'freelancers', icon: Users, text: 'Freelancers' },
    { id: 'projects', icon: Briefcase, text: 'Projects' },
    { id: 'messages', icon: MessageSquare, text: 'Messages' },
    { id: 'settings', icon: Settings, text: 'Settings' },
    { id: 'logout', icon: LogOut, text: 'Logout', onClick: () => setIsAuthenticated(false) },
    { 
      id: 'delete', 
      icon: Trash2, 
      text: 'Delete Account',
      onClick: () => setShowDeleteConfirm(true)
    }
  ]

  const renderContent = () => {
    if (userType === 'client') {
      switch (activeSection) {
        case 'freelancers':
          return <FreelancerDirectory />
        case 'projects':
          return <ProjectsDirectory />
        case 'messages':
          return <MessagesPage />
        case 'settings':
          return <SettingsPage />
        default:
          return <ClientDashboard />
      }
    }
    
    // Handle project details view
    if (activeSection === 'projects' && selectedProjectId) {
      return <ProjectDetails projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
    }
    
    switch (activeSection) {
      case 'jobs':
        return <FindJobs />
      case 'proposals':
        return <MyProposals />
      case 'contracts':
        return <Contracts />
      case 'projects':
        return <MyProjects onViewDetails={setSelectedProjectId} />
      case 'timesheet':
        return <TimeTracking />
      case 'portfolio':
        return <Portfolio />
      case 'earnings':
        return <MyEarnings />
      case 'transactions':
        return <Transactions />
      case 'reports':
        return <Reports />
      case 'profile':
        return <Profile />
      case 'skills':
        return <SkillsBadges />
      case 'reviews':
        return <Reviews />
      case 'messages':
        return <MessagesPage />
      case 'clients':
        return <MyClients />
      case 'settings':
        return <SettingsPage />
      case 'security':
        return <SecurityPage />
      case 'help':
        return <HelpCenter />
      default:
        return <FreelancerDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`bg-[#00704A] text-white fixed left-0 top-0 h-screen transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#005538]">
          <h1 className={`font-sans font-bold ${isSidebarOpen ? 'block' : 'hidden'}`}>
            {userType === 'freelancer' ? 'Freelancer Hub' : 'Client Hub'}
          </h1>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[#005538] rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4">
            {userType === 'freelancer' ? (
              // Freelancer Menu Sections
              <div className="space-y-6">
                {freelancerMenuSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {isSidebarOpen && (
                      <h2 className="px-2 text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                        {section.title}
                      </h2>
                    )}
                    {section.items.map((item, itemIndex) => (
                      <NavItem
                        key={itemIndex}
                        icon={<item.icon size={20} />}
                        text={item.text}
                        isOpen={isSidebarOpen}
                        isActive={activeSection === item.id}
                        onClick={() => {
                          if (item.onClick) {
                            item.onClick()
                          } else {
                            setActiveSection(item.id)
                            setSelectedProjectId(null) // Reset selected project when changing sections
                          }
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              // Client Menu Items
              clientMenuSections.map((item) => (
                <NavItem
                  key={item.id}
                  icon={<item.icon size={20} />}
                  text={item.text}
                  isOpen={isSidebarOpen}
                  isActive={activeSection === item.id}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick()
                    } else {
                      setActiveSection(item.id)
                    }
                  }}
                />
              ))
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className={`min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-10" style={{ left: isSidebarOpen ? '16rem' : '5rem' }}>
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex items-center flex-1">
              <h2 className="text-xl font-semibold text-gray-800">
                {userType === 'freelancer' ? 'Freelancer Dashboard' : 'Client Dashboard'}
              </h2>
              <div className="relative w-64 ml-8">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#00704A]"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold">{freelancerName}</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pt-20 px-6 pb-8">
          {renderContent()}
        </div>
      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NavItem({ 
  icon, 
  text, 
  isOpen, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode
  text: string
  isOpen: boolean
  isActive?: boolean
  onClick?: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-[#005538] text-white'
          : 'text-gray-100 hover:bg-[#005538]'
      }`}
    >
      <span className="min-w-[2rem]">{icon}</span>
      {isOpen && <span className="ml-2 truncate">{text}</span>}
    </button>
  )
}

export default App
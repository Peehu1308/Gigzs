import React, { useState } from 'react'
import { 
  Award, 
  Star, 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle, 
  Plus,
  Search,
  Filter,
  ChevronDown,
  Info
} from 'lucide-react'

function SkillsBadges() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Skills & Badges</h2>
          <p className="text-sm text-gray-600 mt-1">Showcase your expertise and achievements</p>
        </div>
        <button
          onClick={() => setShowAddSkillModal(true)}
          className="px-4 py-2 bg-[#00704A] text-white rounded-lg hover:bg-[#005538] flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Add New Skill
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search skills and badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical Skills</option>
              <option value="soft">Soft Skills</option>
              <option value="certifications">Certifications</option>
            </select>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Earned Badges</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${badge.bgColor}`}>
                  <badge.icon className={`h-6 w-6 ${badge.iconColor}`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{badge.name}</h4>
                  <p className="text-sm text-gray-500">{badge.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Earned {badge.earnedDate}</span>
                <button className="text-[#00704A] hover:text-[#005538]">
                  <Info size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{skill.name}</h4>
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="ml-1 text-sm font-medium">{skill.rating}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Proficiency</span>
                  <span>{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#00704A] h-2 rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                <span>{skill.experience} experience</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Certifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{cert.name}</h4>
                  <p className="text-sm text-gray-500">{cert.issuer}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-gray-500">Issued {cert.issueDate}</span>
                {cert.expires ? (
                  <span className="text-yellow-600">Expires {cert.expires}</span>
                ) : (
                  <span className="text-green-600">No Expiration</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const badges = [
  {
    id: 1,
    name: 'Top Rated',
    description: 'Consistently high client satisfaction',
    icon: Star,
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    earnedDate: 'Mar 2024'
  },
  {
    id: 2,
    name: 'Expert',
    description: 'Demonstrated expertise in field',
    icon: Shield,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    earnedDate: 'Feb 2024'
  },
  {
    id: 3,
    name: 'Rising Talent',
    description: 'Exceptional early performance',
    icon: Zap,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    earnedDate: 'Jan 2024'
  }
]

const skills = [
  {
    id: 1,
    name: 'React',
    rating: 4.9,
    proficiency: 95,
    experience: '5 years'
  },
  {
    id: 2,
    name: 'Node.js',
    rating: 4.8,
    proficiency: 90,
    experience: '4 years'
  },
  {
    id: 3,
    name: 'TypeScript',
    rating: 4.7,
    proficiency: 85,
    experience: '3 years'
  }
]

const certifications = [
  {
    id: 1,
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    issueDate: 'Jan 2024',
    expires: 'Jan 2027'
  },
  {
    id: 2,
    name: 'Google Cloud Professional',
    issuer: 'Google Cloud',
    logo: 'https://images.unsplash.com/photo-1573141597928-403fcee0e056?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    issueDate: 'Dec 2023',
    expires: 'Dec 2026'
  },
  {
    id: 3,
    name: 'React Certification',
    issuer: 'Meta',
    logo: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    issueDate: 'Nov 2023',
    expires: null
  }
]

export default SkillsBadges
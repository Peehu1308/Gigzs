import React, { useState } from 'react'
import { 
  Star, 
  Search, 
  Filter, 
  ChevronDown,
  ThumbsUp,
  MessageSquare,
  Calendar,
  DollarSign,
  Clock
} from 'lucide-react'

function Reviews() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [projectFilter, setProjectFilter] = useState('all')

  const getStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-900">{rating}.0</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Client Reviews</h2>
          <p className="text-sm text-gray-600 mt-1">See what clients are saying about your work</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Star className="h-8 w-8 text-yellow-400" />
            <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
              +0.2
            </span>
          </div>
          <h3 className="text-2xl font-semibold">4.9</h3>
          <p className="text-gray-600 text-sm">Overall Rating</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-semibold">98%</h3>
          <p className="text-gray-600 text-sm">Job Success</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-semibold">45</h3>
          <p className="text-gray-600 text-sm">Total Reviews</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-2xl font-semibold">100%</h3>
          <p className="text-gray-600 text-sm">On-Time Delivery</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
            >
              <option value="all">All Projects</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="design">UI/UX Design</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={review.clientAvatar}
                  alt={review.clientName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{review.clientName}</h3>
                  <p className="text-sm text-gray-600">{review.projectTitle}</p>
                </div>
              </div>
              <div className="text-right">
                {getStarRating(review.rating)}
                <p className="text-sm text-gray-500 mt-1">{review.date}</p>
              </div>
            </div>

            <p className="mt-4 text-gray-700">{review.comment}</p>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="text-gray-400" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Project Value</p>
                  <p className="text-sm font-medium">${review.projectValue}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-400" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm font-medium">{review.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Completed</p>
                  <p className="text-sm font-medium">{review.completedDate}</p>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {review.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700  rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center space-x-4">
              <button className="flex items-center text-gray-600 hover:text-[#00704A]">
                <ThumbsUp size={18} className="mr-1" />
                <span>Helpful ({review.helpfulCount})</span>
              </button>
              <button className="flex items-center text-gray-600 hover:text-[#00704A]">
                <MessageSquare size={18} className="mr-1" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const reviews = [
  {
    id: 1,
    clientName: 'Sarah Johnson',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    projectTitle: 'E-commerce Website Development',
    rating: 5,
    date: 'March 15, 2024',
    comment: 'Exceptional work! The developer went above and beyond our expectations. They were highly professional, delivered on time, and the quality of work was outstanding. Would definitely hire again.',
    projectValue: 12000,
    duration: '3 months',
    completedDate: 'Mar 10, 2024',
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    helpfulCount: 12
  },
  {
    id: 2,
    clientName: 'Michael Chen',
    clientAvatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    projectTitle: 'Mobile App Development',
    rating: 5,
    date: 'March 10, 2024',
    comment: 'Great experience working with this developer. They have strong technical skills and excellent communication. The app was delivered on time and met all our requirements.',
    projectValue: 15000,
    duration: '4 months',
    completedDate: 'Mar 5, 2024',
    skills: ['React Native', 'Firebase', 'iOS', 'Android'],
    helpfulCount: 8
  },
  {
    id: 3,
    clientName: 'Emma Wilson',
    clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    projectTitle: 'UI/UX Design Project',
    rating: 4,
    date: 'March 5, 2024',
    comment: 'Very talented designer with a great eye for detail. They were responsive to feedback and delivered a modern, user-friendly design. Would recommend for future projects.',
    projectValue: 8000,
    duration: '2 months',
    completedDate: 'Mar 1, 2024',
    skills: ['UI Design', 'UX Design', 'Figma', 'Prototyping'],
    helpfulCount: 5
  }
]

export default Reviews
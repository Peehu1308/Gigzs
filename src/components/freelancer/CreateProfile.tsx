import React, { useState } from 'react'
import { Briefcase, GraduationCap, Star, Clock } from 'lucide-react'

interface CreateProfileProps {
  onNext: () => void
  onBack: () => void
}

function CreateProfile({ onNext }: CreateProfileProps) {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Create Your Profile</h2>
        <p className="mt-2 text-gray-600">Let potential clients know about your expertise and experience</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Basic Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Professional Title</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#00704A] focus:outline-none"
                placeholder="e.g. Senior Web Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#00704A] focus:outline-none"
                placeholder="e.g. 50"
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Skills</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-[#00704A] focus:outline-none"
              placeholder="Add a skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-[#00704A] text-white rounded-lg hover:bg-[#005538]"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#00704A]/10 text-[#00704A] rounded-full text-sm flex items-center"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-[#00704A] hover:text-[#005538]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Experience</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <div className="mt-1 flex items-center space-x-4">
                <Clock size={20} className="text-gray-400" />
                <select className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#00704A] focus:outline-none">
                  <option>1-2 years</option>
                  <option>3-5 years</option>
                  <option>5-10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Education</label>
              <div className="mt-1 flex items-center space-x-4">
                <GraduationCap size={20} className="text-gray-400" />
                <input
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#00704A] focus:outline-none"
                  placeholder="Degree, Institution"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Portfolio</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Portfolio URL</label>
              <div className="mt-1 flex items-center space-x-4">
                <Briefcase size={20} className="text-gray-400" />
                <input
                  type="url"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#00704A] focus:outline-none"
                  placeholder="https://your-portfolio.com"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProfile
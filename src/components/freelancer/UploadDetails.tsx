import React, { useState } from 'react'
import { Upload, FileText, Image, X } from 'lucide-react'

interface UploadDetailsProps {
  onNext: () => void
  onBack: () => void
}

function UploadDetails({ onNext }: UploadDetailsProps) {
  const [documents, setDocuments] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)])
    }
  }

  const removeDocument = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Upload Your Documents</h2>
        <p className="mt-2 text-gray-600">Please provide the necessary documentation to verify your identity and skills</p>
      </div>

      {/* Document Upload Section */}
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-[#00704A]">
                  Click to upload
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, JPG, JPEG, PNG up to 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Uploaded Documents List */}
        {documents.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Uploaded Documents</h3>
            <div className="grid grid-cols-1 gap-3">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    {doc.type.includes('image') ? (
                      <Image className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FileText className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="ml-2 text-sm text-gray-600">{doc.name}</span>
                  </div>
                  <button
                    onClick={() => removeDocument(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Required Documents List */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">Required Documents</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Government-issued ID (Passport or Driver's License)</li>
          <li>• Professional certifications (if applicable)</li>
          <li>• Portfolio samples</li>
          <li>• Resume/CV</li>
        </ul>
      </div>
    </div>
  )
}

export default UploadDetails
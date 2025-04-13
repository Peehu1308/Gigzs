import React, { useState } from 'react'
import { Search, Phone, Video, MoreVertical, Send, Paperclip, Image as ImageIcon, Smile, ChevronDown } from 'lucide-react'

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(chats[0])
  const [message, setMessage] = useState('')

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle sending message
      setMessage('')
    }
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex rounded-lg overflow-hidden bg-white border border-gray-200">
      {/* Chats List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-gray-50' : ''
              }`}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.lastMessageTime}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00704A] text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="font-medium text-gray-900">{selectedChat.name}</h2>
                <p className="text-sm text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    msg.sent
                      ? 'bg-[#00704A] text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sent ? 'text-[#00704A]/75' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                <Paperclip size={20} className="text-gray-600" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                <ImageIcon size={20} className="text-gray-600" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00704A]"
              />
              <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
                <Smile size={20} className="text-gray-600" />
              </button>
              <button
                type="submit"
                className="p-2 bg-[#00704A] text-white rounded-full hover:bg-[#005538]"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  )
}

const chats = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Looking forward to our meeting tomorrow!',
    lastMessageTime: '2m ago',
    unread: 2,
    messages: [
      { text: 'Hi, how are you?', time: '10:00 AM', sent: false },
      { text: 'I\'m good, thanks! How about you?', time: '10:02 AM', sent: true },
      { text: 'Looking forward to our meeting tomorrow!', time: '10:05 AM', sent: false }
    ]
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'The project is coming along nicely',
    lastMessageTime: '1h ago',
    unread: 0,
    messages: [
      { text: 'How\'s the project going?', time: '9:30 AM', sent: false },
      { text: 'The project is coming along nicely', time: '9:35 AM', sent: true }
    ]
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastMessage: 'Can you review the latest designs?',
    lastMessageTime: '3h ago',
    unread: 1,
    messages: [
      { text: 'Can you review the latest designs?', time: '8:00 AM', sent: false },
      { text: 'I\'ll take a look right away', time: '8:05 AM', sent: true }
    ]
  }
]

export default MessagesPage
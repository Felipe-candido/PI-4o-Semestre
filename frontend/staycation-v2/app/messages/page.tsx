"use client"

import type React from "react"

import MainLayout from "@/components/layout/MainLayout"
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { useState } from "react"

export default function Messages() {
  // Em uma aplicação real, você obteria os dados do usuário do seu contexto de autenticação
  const userRole = "tenant" // ou "owner" dependendo de quem está acessando
  const userName = "João Silva"
  const userAvatar = "/images/tenant-avatar.jpg"

  // Estado para controlar a mensagem sendo digitada
  const [message, setMessage] = useState("")

  // Dados simulados de conversas
  const conversations = [
    {
      id: "1",
      name: "Maria Oliveira",
      avatar: "/images/owner-avatar.jpg",
      lastMessage: "Olá! Tudo bem? Estou aguardando sua chegada amanhã.",
      time: "10:30",
      unread: 2,
      isActive: true,
    },
    {
      id: "2",
      name: "Carlos Pereira",
      avatar: "/images/owner-avatar-2.jpg",
      lastMessage: "A propriedade está disponível nas datas solicitadas.",
      time: "Ontem",
      unread: 0,
      isActive: false,
    },
    {
      id: "3",
      name: "Ana Costa",
      avatar: "/placeholder.svg?height=40&width=40&text=AC",
      lastMessage: "Obrigada pela sua estadia! Esperamos vê-lo novamente.",
      time: "25/04",
      unread: 0,
      isActive: false,
    },
    {
      id: "4",
      name: "Roberto Alves",
      avatar: "/placeholder.svg?height=40&width=40&text=RA",
      lastMessage: "Sim, temos Wi-Fi de alta velocidade em toda a propriedade.",
      time: "20/04",
      unread: 0,
      isActive: false,
    },
  ]

  // Dados simulados da conversa ativa
  const activeConversation = {
    id: "1",
    name: "Maria Oliveira",
    avatar: "/images/owner-avatar.jpg",
    status: "Online",
    property: "Chalé na Montanha",
    messages: [
      {
        id: "m1",
        sender: "them",
        text: "Olá João! Tudo bem com você?",
        time: "10:00",
      },
      {
        id: "m2",
        sender: "me",
        text: "Olá Maria! Tudo ótimo, e com você?",
        time: "10:05",
      },
      {
        id: "m3",
        sender: "them",
        text: "Estou bem também, obrigada! Estou entrando em contato para confirmar sua chegada amanhã no Chalé na Montanha.",
        time: "10:10",
      },
      {
        id: "m4",
        sender: "them",
        text: "O check-in pode ser feito a partir das 15h. Você tem alguma preferência de horário?",
        time: "10:12",
      },
      {
        id: "m5",
        sender: "me",
        text: "Pretendo chegar por volta das 16h. Isso seria conveniente?",
        time: "10:20",
      },
      {
        id: "m6",
        sender: "them",
        text: "Perfeito! 16h está ótimo. Estarei lá para recebê-lo e entregar as chaves.",
        time: "10:25",
      },
      {
        id: "m7",
        sender: "them",
        text: "Você precisa de alguma informação adicional sobre como chegar ou sobre a propriedade?",
        time: "10:30",
      },
    ],
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Em uma aplicação real, você enviaria a mensagem para o backend
      console.log("Mensagem enviada:", message)
      setMessage("")
    }
  }

  return (
    <MainLayout userRole={userRole} userName={userName} userAvatar={userAvatar}>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex h-[calc(80vh)]">
            {/* Sidebar de conversas */}
            <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-primary mb-4">Mensagens</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Buscar conversas..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(80vh-88px)]">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                      conversation.isActive ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        <img
                          src={conversation.avatar || "/placeholder.svg"}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.isActive && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold">{conversation.name}</h3>
                          <span className="text-xs text-gray-500">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-secondary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Área de conversa */}
            <div className="hidden md:flex flex-col w-2/3 lg:w-3/4">
              {/* Cabeçalho da conversa */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={activeConversation.avatar || "/placeholder.svg"}
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{activeConversation.name}</h3>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      <p className="text-xs text-gray-500">{activeConversation.status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Video className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Mensagens */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="mb-4">
                  <div className="bg-primary/10 text-center py-2 px-4 rounded-lg inline-block mx-auto">
                    <p className="text-xs text-gray-600">Hoje</p>
                  </div>
                </div>

                {activeConversation.messages.map((msg) => (
                  <div key={msg.id} className={`mb-4 flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "them" && (
                      <img
                        src={activeConversation.avatar || "/placeholder.svg"}
                        alt={activeConversation.name}
                        className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                      />
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sender === "me"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white border border-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 text-right ${msg.sender === "me" ? "text-white/80" : "text-gray-500"}`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input de mensagem */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <button type="button" className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg mx-2 focus:ring-2 focus:ring-primary focus:border-primary"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className={`p-2 rounded-full ${
                      message.trim() ? "bg-primary text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!message.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Mensagem para selecionar uma conversa (apenas em mobile) */}
            <div className="flex md:hidden flex-col w-full items-center justify-center text-center p-8">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Send className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Suas mensagens</h3>
              <p className="text-gray-600 mb-4">Selecione uma conversa para começar a enviar mensagens</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}


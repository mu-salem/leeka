"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ChatWindow } from "./ChatWindow";
import { TransferModal } from "./TransferModal";
import { mockConversations, mockUsers, Conversation, Message } from "@/lib/chat-data";
import { toast } from "sonner";

export function ChatApp() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    conversations[0]?.id || null
  );
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(true);

  const selectedConversation = conversations.find(
    (conv) => conv.id === selectedConversationId
  );

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setIsMobileSidebarVisible(false);
  };

  const handleBackToSidebar = () => {
    setIsMobileSidebarVisible(true);
  };

  const handleSendMessage = (text: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `msg${Date.now()}`,
      senderId: "current",
      text,
      timestamp: new Date(),
      isRead: true,
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: text,
            lastMessageTime: new Date(),
          };
        }
        return conv;
      })
    );

    // Show success feedback
    toast.success("Message sent successfully!");
  };

  const handleTransferChat = (adminId: string) => {
    if (!selectedConversation) return;

    const admin = mockUsers.find((u) => u.id === adminId);
    const user = mockUsers.find((u) => u.id === selectedConversation.userId);

    if (admin && user) {
      // In a real app, this would make an API call to transfer the chat
      console.log(`Transferring chat with ${user.name} to ${admin.name}`);
      
      // Show success feedback
      toast.success(`Chat transferred to ${admin.name} successfully!`);

      // Optionally remove the conversation from the current admin's list
      // For now, we'll just show the feedback
    }
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-gray-950">
      {/* Sidebar - Hidden on mobile when chat is open */}
      <div
        className={`
          w-full lg:w-80 xl:w-96 flex-shrink-0
          ${isMobileSidebarVisible ? "block" : "hidden lg:block"}
        `}
      >
        <Sidebar
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Chat Window - Hidden on mobile when sidebar is visible */}
      <div
        className={`
          flex-1
          ${!isMobileSidebarVisible ? "block" : "hidden lg:block"}
        `}
      >
        <ChatWindow
          conversation={selectedConversation || null}
          onSendMessage={handleSendMessage}
          onTransferClick={() => setIsTransferModalOpen(true)}
          onBack={handleBackToSidebar}
        />
      </div>

      {/* Transfer Modal */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        onTransfer={handleTransferChat}
        currentConversationUser={
          mockUsers.find((u) => u.id === selectedConversation?.userId)?.name || ""
        }
      />
    </div>
  );
}

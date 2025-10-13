"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockAdmins, User } from "@/lib/chat-data";
import Image from "next/image";

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransfer: (adminId: string) => void;
  currentConversationUser: string;
}

export function TransferModal({
  isOpen,
  onClose,
  onTransfer,
  currentConversationUser,
}: TransferModalProps) {
  if (!isOpen) return null;

  const handleTransfer = (admin: User) => {
    onTransfer(admin.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate__animated animate__fadeIn animate__faster"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate__animated animate__zoomIn animate__faster"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Transfer Chat
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Transfer conversation with {currentConversationUser} to another admin
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Admin List */}
        <div className="p-6 space-y-2 max-h-[400px] overflow-y-auto">
          {mockAdmins.map((admin) => (
            <button
              key={admin.id}
              onClick={() => handleTransfer(admin)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online Status */}
                {admin.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </div>

              {/* Admin Info */}
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {admin.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {admin.isOnline ? "Online" : "Offline"}
                </p>
              </div>

              {/* Status Badge */}
              <div
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  admin.isOnline
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                )}
              >
                {admin.isOnline ? "Available" : "Away"}
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

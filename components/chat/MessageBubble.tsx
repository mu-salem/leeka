"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/lib/chat-data";
import { formatDistanceToNow } from "date-fns";

interface MessageBubbleProps {
  message: Message;
  senderName: string;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, senderName, isCurrentUser }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate__animated animate__fadeIn animate__faster",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3 shadow-sm",
          isCurrentUser
            ? "bg-blue-500 text-white rounded-br-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md"
        )}
      >
        {!isCurrentUser && (
          <p className="text-xs font-semibold mb-1 text-gray-600 dark:text-gray-400">
            {senderName}
          </p>
        )}
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        <p
          className={cn(
            "text-xs mt-1",
            isCurrentUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
          )}
        >
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}

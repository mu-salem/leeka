// Sample chat data for testing
export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  role?: "admin" | "user";
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
    isOnline: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isOnline: true,
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    isOnline: false,
  },
  {
    id: "4",
    name: "Fatima Ali",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    isOnline: true,
  },
  {
    id: "5",
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    isOnline: false,
  },
];

export const mockAdmins: User[] = [
  {
    id: "admin1",
    name: "Admin - David Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    isOnline: true,
    role: "admin",
  },
  {
    id: "admin2",
    name: "Admin - Lisa Wang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    isOnline: true,
    role: "admin",
  },
  {
    id: "admin3",
    name: "Admin - Omar Ibrahim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    isOnline: false,
    role: "admin",
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    userId: "1",
    lastMessage: "Thanks for your help with the project!",
    lastMessageTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    unreadCount: 2,
    messages: [
      {
        id: "msg1",
        senderId: "1",
        text: "Hi, I need help with my website project",
        timestamp: new Date(Date.now() - 30 * 60000),
        isRead: true,
      },
      {
        id: "msg2",
        senderId: "current",
        text: "Hello Ahmed! I'd be happy to help. What specific issues are you facing?",
        timestamp: new Date(Date.now() - 28 * 60000),
        isRead: true,
      },
      {
        id: "msg3",
        senderId: "1",
        text: "I'm having trouble with the mobile responsiveness of my site.",
        timestamp: new Date(Date.now() - 25 * 60000),
        isRead: true,
      },
      {
        id: "msg4",
        senderId: "current",
        text: "I see. Could you share the URL so I can take a look?",
        timestamp: new Date(Date.now() - 20 * 60000),
        isRead: true,
      },
      {
        id: "msg5",
        senderId: "1",
        text: "Sure, it's www.example-site.com",
        timestamp: new Date(Date.now() - 15 * 60000),
        isRead: true,
      },
      {
        id: "msg6",
        senderId: "current",
        text: "Let me check that out. I'll get back to you with some recommendations shortly.",
        timestamp: new Date(Date.now() - 10 * 60000),
        isRead: true,
      },
      {
        id: "msg7",
        senderId: "1",
        text: "Thanks for your help with the project!",
        timestamp: new Date(Date.now() - 5 * 60000),
        isRead: false,
      },
    ],
  },
  {
    id: "conv2",
    userId: "2",
    lastMessage: "When can we schedule a call?",
    lastMessageTime: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    unreadCount: 1,
    messages: [
      {
        id: "msg8",
        senderId: "2",
        text: "Hi, I'm interested in your mobile app development services",
        timestamp: new Date(Date.now() - 45 * 60000),
        isRead: true,
      },
      {
        id: "msg9",
        senderId: "current",
        text: "Great! We'd love to work with you. What kind of app are you looking to build?",
        timestamp: new Date(Date.now() - 40 * 60000),
        isRead: true,
      },
      {
        id: "msg10",
        senderId: "2",
        text: "It's a fitness tracking app with social features",
        timestamp: new Date(Date.now() - 35 * 60000),
        isRead: true,
      },
      {
        id: "msg11",
        senderId: "2",
        text: "When can we schedule a call?",
        timestamp: new Date(Date.now() - 15 * 60000),
        isRead: false,
      },
    ],
  },
  {
    id: "conv3",
    userId: "3",
    lastMessage: "Thank you! Looking forward to it.",
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
    unreadCount: 0,
    messages: [
      {
        id: "msg12",
        senderId: "3",
        text: "Do you offer SEO services?",
        timestamp: new Date(Date.now() - 3 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg13",
        senderId: "current",
        text: "Yes, we do! We offer comprehensive SEO packages including technical SEO, content optimization, and link building.",
        timestamp: new Date(Date.now() - 2.5 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg14",
        senderId: "3",
        text: "That sounds perfect. Can you send me more details?",
        timestamp: new Date(Date.now() - 2.2 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg15",
        senderId: "current",
        text: "Absolutely! I'll email you our SEO services brochure right away.",
        timestamp: new Date(Date.now() - 2.1 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg16",
        senderId: "3",
        text: "Thank you! Looking forward to it.",
        timestamp: new Date(Date.now() - 2 * 60 * 60000),
        isRead: true,
      },
    ],
  },
  {
    id: "conv4",
    userId: "4",
    lastMessage: "Perfect! Talk to you then.",
    lastMessageTime: new Date(Date.now() - 24 * 60 * 60000), // 1 day ago
    unreadCount: 0,
    messages: [
      {
        id: "msg17",
        senderId: "4",
        text: "Hello, I'd like to discuss a potential project",
        timestamp: new Date(Date.now() - 25 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg18",
        senderId: "current",
        text: "Hi Fatima! I'd be delighted to hear about your project. What do you have in mind?",
        timestamp: new Date(Date.now() - 24.5 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg19",
        senderId: "4",
        text: "We need an e-commerce platform for our retail business",
        timestamp: new Date(Date.now() - 24.2 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg20",
        senderId: "current",
        text: "Excellent! Let's schedule a call to discuss the requirements in detail. How does tomorrow at 2 PM work for you?",
        timestamp: new Date(Date.now() - 24.1 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg21",
        senderId: "4",
        text: "Perfect! Talk to you then.",
        timestamp: new Date(Date.now() - 24 * 60 * 60000),
        isRead: true,
      },
    ],
  },
  {
    id: "conv5",
    userId: "5",
    lastMessage: "Got it, thanks!",
    lastMessageTime: new Date(Date.now() - 48 * 60 * 60000), // 2 days ago
    unreadCount: 0,
    messages: [
      {
        id: "msg22",
        senderId: "5",
        text: "Hi, quick question about pricing",
        timestamp: new Date(Date.now() - 48.5 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg23",
        senderId: "current",
        text: "Sure! What would you like to know?",
        timestamp: new Date(Date.now() - 48.3 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg24",
        senderId: "5",
        text: "What's the starting price for a basic website?",
        timestamp: new Date(Date.now() - 48.2 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg25",
        senderId: "current",
        text: "Our basic website packages start at $2,500 and include responsive design, up to 5 pages, and basic SEO setup.",
        timestamp: new Date(Date.now() - 48.1 * 60 * 60000),
        isRead: true,
      },
      {
        id: "msg26",
        senderId: "5",
        text: "Got it, thanks!",
        timestamp: new Date(Date.now() - 48 * 60 * 60000),
        isRead: true,
      },
    ],
  },
];

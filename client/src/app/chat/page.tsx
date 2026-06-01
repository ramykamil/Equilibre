"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Send, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import "../globals.css";

// Interface for a message
interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}

export default function ChatPage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // For MVP, randomly assign as "user" or "coach" based on a mock ID
  const [myId] = useState(() => `user_${Math.floor(Math.random() * 1000)}`);
  
  useEffect(() => {
    // Connect to the Express server
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    // Initial fetch of message history (if we had a real DB)
    fetch("http://localhost:3001/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Failed to fetch messages", err));

    newSocket.on("receive_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !socket) return;

    socket.emit("send_message", {
      text: inputText,
      senderId: myId,
    });

    setInputText("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header glass-panel">
        <Link href="/dashboard" className="back-btn">
          <ArrowLeft size={20} />
        </Link>
        <div className="header-info">
          <div className="avatar">
            <User size={24} color="#6366f1" />
          </div>
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Coach Sophie</h1>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Conseil Permanent • En ligne
            </p>
          </div>
        </div>
      </header>

      <main className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Commencez votre accompagnement avec Sophie.</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === myId;
            return (
              <div key={msg.id} className={`message-wrapper ${isMe ? "me" : "them"}`}>
                <div className={`message-bubble ${isMe ? "bg-primary" : "bg-surface"}`}>
                  <p>{msg.text}</p>
                  <span className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-footer glass-panel">
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            className="input-field"
            placeholder="Écrivez votre message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary send-btn" disabled={!inputText.trim()}>
            <Send size={18} />
          </button>
        </form>
      </footer>

      {/* Scoped styles for the chat page */}
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          max-width: 600px;
          margin: 0 auto;
          background-color: var(--bg-color);
          position: relative;
        }

        .chat-header {
          display: flex;
          align-items: center;
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 10;
          border-radius: 0 0 16px 16px;
          margin-bottom: 1rem;
        }

        .back-btn {
          margin-right: 1rem;
          color: var(--text-primary);
          transition: transform var(--transition-fast);
        }
        .back-btn:hover {
          transform: translateX(-4px);
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(99, 102, 241, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-state {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-style: italic;
        }

        .message-wrapper {
          display: flex;
          width: 100%;
        }
        .message-wrapper.me {
          justify-content: flex-end;
        }
        .message-wrapper.them {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 75%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          position: relative;
          box-shadow: var(--shadow-sm);
        }

        .message-wrapper.me .message-bubble {
          border-bottom-right-radius: 4px;
        }
        
        .message-wrapper.them .message-bubble {
          border-bottom-left-radius: 4px;
        }

        .bg-primary {
          background-color: var(--primary-color);
          color: white;
        }

        .bg-surface {
          background-color: var(--surface-color);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .timestamp {
          display: block;
          font-size: 0.7rem;
          margin-top: 0.25rem;
          opacity: 0.8;
          text-align: right;
        }

        .chat-footer {
          padding: 1rem;
          position: sticky;
          bottom: 0;
          border-radius: 16px 16px 0 0;
        }

        .chat-input-form {
          display: flex;
          gap: 0.5rem;
        }

        .send-btn {
          padding: 0.75rem;
          border-radius: 12px;
        }
      `}</style>
    </div>
  );
}

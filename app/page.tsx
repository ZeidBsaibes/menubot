"use client";

import { type CoreMessage } from "ai";
import { useState } from "react";
import { continueConversation } from "@/actions";
import { readStreamableValue } from "ai/rsc";

import { promises as fs } from "fs";
import {
  ChatContainer,
  MainContainer,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import Header from "./components/Header";

export default function Chat() {
  const [messages, setMessages] = useState<CoreMessage[]>([]);
  const [input, setInput] = useState("");

  return (
    <>
      <div className="flex flex-col w-3/4 py-24 items-center justify-center mx-auto ">
        {messages.map((m, i) => (
          <div key={i} className="whitespace-pre-wrap">
            <div className="text-orange-600 py-2">
              {m.role === "user" ? "User: " : "AI: "}
            </div>
            {m.content as string}
          </div>
        ))}

        <form
          className="sticky bottom-0 bg-white items-center justify-center"
          action={async () => {
            const newMessages: CoreMessage[] = [
              ...messages,
              { content: input, role: "user" },
            ];

            setMessages(newMessages);
            setInput("");

            const result = await continueConversation([
              // systemMessage,
              ...newMessages,
            ]);

            for await (const content of readStreamableValue(result)) {
              setMessages([
                ...newMessages,
                {
                  role: "assistant",
                  content: content as string,
                },
              ]);
            }
          }}
        >
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black "
            value={input}
            placeholder="Find your food...."
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}

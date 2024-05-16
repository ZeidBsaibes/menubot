## Getting Started

First `npm install`

Then, either:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Context Querying within the chatbot

The root page is a chat bot which allows for the querying of the context using ChatGPT 4o.

The server-side engine for making these queries is located within the server actions file: ` actions.tsx`

The query, conversation history and context (all the .csv files bundled up) are sent to the LLM for resposne.

Changes can be made to the process of querying this data within this file

UI changes to the chat interface can be made within the `page.tsx`

## Context Adding

Restaurant Menus can be added though the `/upload/page.tsx` page

This page `POSTS` the pdf and metadata `Restaurant Name`, `Location`, `Website` `Cuisine` to the api endpoint: `/upload`

### Process of Context Adding

1. Pdf Menu is uploaded
2. Pdf is saved to the local file system in the `uploads` folder
3. Pdf is locally converted to a buffer and is sent to `LLMTextParse` function
4. Text from LLM is returned (in the format indicated by the prompt in `prompt.ts`)
5. Text is written into a csv file along with the metadata added through the form

# Startup Diagnosis S2S Frontend

This is an AI-powered voice agent frontend designed specifically for conducting automated interviews with startup owners who are students at Link School of Business. The application provides an intelligent conversational interface that gathers insights about startup ventures, challenges, and opportunities through natural voice interactions.

Built with [LiveKit Agents](https://docs.livekit.io/agents) and the [LiveKit JavaScript SDK](https://github.com/livekit/client-sdk-js), it supports advanced [voice AI](https://docs.livekit.io/agents/start/voice-ai), real-time [transcriptions](https://docs.livekit.io/agents/build/text/), and [virtual avatars](https://docs.livekit.io/agents/integrations/avatar) for an engaging interview experience.

<picture>
  <source srcset="./.github/assets/readme-hero-dark.webp" media="(prefers-color-scheme: dark)">
  <source srcset="./.github/assets/readme-hero-light.webp" media="(prefers-color-scheme: light)">
  <img src="./.github/assets/readme-hero-light.webp" alt="App screenshot">
</picture>

### Features:

- **AI-Powered Startup Interviews**: Intelligent voice agent specifically trained to conduct structured interviews with startup founders
- **Real-time Voice Interaction**: Natural conversation flow with LiveKit Agents for seamless communication
- **Automated Insight Extraction**: Captures and analyzes key startup metrics, challenges, and opportunities
- **Student-Focused Design**: Tailored interface for Link School of Business students and their startup ventures
- **Camera Video Streaming**: Visual connection during interviews for better engagement
- **Live Transcription**: Real-time speech-to-text for accurate record keeping
- **Virtual Avatar Integration**: Professional AI interviewer avatar for consistent experience
- **Audio Visualization**: Real-time audio level monitoring and feedback
- **Responsive Design**: Light/dark theme switching with modern, accessible UI
- **Customizable Branding**: Configurable colors, logos, and UI text for institutional branding

This application is built with Next.js and designed specifically for educational institutions conducting startup research and mentorship programs.

### Project structure

```
agent-starter-react/
├── app/
│   ├── (app)/
│   ├── api/
│   ├── components/
│   ├── fonts/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── livekit/
│   ├── ui/
│   ├── app.tsx
│   ├── session-view.tsx
│   └── welcome.tsx
├── hooks/
├── lib/
├── public/
└── package.json
```

## Getting started

### Prerequisites

- Node.js 18+ and pnpm
- LiveKit Cloud account or self-hosted LiveKit server
- AI agent backend configured for startup interview scenarios

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-org/startup-diagnosis-s2s-frontend.git
cd startup-diagnosis-s2s-frontend
pnpm install
```

Then run the app with:

```bash
pnpm install
pnpm dev
```

And open http://localhost:3000 in your browser.

You'll also need a backend AI agent configured for startup interviews. The agent should be trained to ask relevant questions about business models, market validation, funding needs, and growth challenges specific to student entrepreneurs: Check out the [Agent Repository](https://github.com/MekhyW/Startup-Diagnosis-S2S-Agent)

#### Environment Variables

You'll also need to configure your LiveKit credentials in `.env.local` (copy `.env.example` if you don't have one):

```env
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=https://your-livekit-server-url
```

These are required for the voice agent functionality to work with your LiveKit project and startup interview backend.

## Contributing

This project is specifically designed for Link School of Business and startup education programs. We welcome contributions that enhance the interview experience and diagnostic capabilities. Please open a PR or issue through GitHub.

For technical support with LiveKit integration, join the [LiveKit Community Slack](https://livekit.io/join-slack).

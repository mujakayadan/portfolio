# React Three.js Portfolio Documentation

## Project Overview

This is a modern portfolio website built with React, Three.js, and TypeScript. It features 3D animations, interactive components, and a responsive design. Live portfolio content and the chat assistant are powered by [YARBA](https://www.yarba.app/).

## Architecture

### Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Type Checking**: TypeScript
- **Linting**: ESLint (`.eslintrc.js`)
- **Testing**: Vitest
- **CI/CD**: GitHub Actions
- **Hosting**: AWS S3 + CloudFront
- **Portfolio + Chat API**: YARBA
- **Contact Form**: mailto link (owner email from YARBA profile)

### Directory Structure

```
muja-kayadan-portfolio/
├── src/
│   ├── assets/          # Static assets (images, 3D models)
│   ├── components/      # React components
│   │   └── canvas/      # Three.js canvas components
│   ├── config/          # Skills and asset configuration
│   ├── context/         # Portfolio context provider
│   ├── services/        # API clients (portfolio, chat)
│   ├── test/            # Vitest tests
│   └── utils/           # Utility functions
├── public/              # Public assets and 3D models
├── design/              # Architecture diagrams
├── .github/workflows/   # CI and deploy pipelines
└── dist/                # Build output
```

### Key Components

1. **Canvas Components** (`src/components/canvas/`)

   - `Ball.tsx`: Interactive 3D ball component
   - `Earth.tsx`: 3D Earth model component
   - `Stars.tsx`: Background stars effect
   - `Computers.tsx`: 3D computer model

2. **Core Components**

   - `About.tsx`: About section with animations
   - `ChatBot.tsx`: AI assistant chat widget (YARBA API)
   - `Contact.tsx`: Contact form (mailto using profile email from YARBA)
   - `Hero.tsx`: Hero section with 3D elements
   - `Navbar.tsx`: Navigation component
   - `Loader.tsx`: Loading animation component
   - `ErrorBoundary.tsx`: Error handling component

3. **Services** (`src/services/`)
   - `portfolioApi.ts`: Fetches live portfolio content from YARBA
   - `portfolioChatApi.ts`: Sends chat messages to YARBA public portfolio chat

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm
- Git

### Installation

```bash
git clone https://github.com/mujakayadan/react-threejs-portfolio.git
cd react-threejs-portfolio
npm install
cp .env.example .env
```

### Environment Variables

| Variable                         | Purpose                  |
| -------------------------------- | ------------------------ |
| `VITE_YARBA_API_URL`             | YARBA API base URL       |
| `VITE_YARBA_PORTFOLIO_TOKEN`     | Portfolio content token  |
| `VITE_YARBA_PORTFOLIO_SUBDOMAIN` | Chat assistant subdomain |

### Running the Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
npm run preview
```

## Type Checking and Linting

### TypeScript

```bash
npm run ts:check
```

### ESLint

Configuration is in `.eslintrc.js`.

```bash
npm run lint
npm run lint:fix
```

### Tests

```bash
npm run test
```

## CI/CD Pipeline

### CI Workflow (`.github/workflows/ci.yml`)

Runs on push and pull request to `main`:

- TypeScript type checking
- ESLint
- Vitest tests
- Production build

### Deploy Workflow (`.github/workflows/deploy.yml`)

Runs on push to `main`:

1. Creates `.env.production` from GitHub secrets
2. Builds the site
3. Syncs `dist/` to S3
4. Invalidates CloudFront cache

### Required GitHub Secrets

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `VITE_YARBA_API_URL`
- `VITE_YARBA_PORTFOLIO_TOKEN`
- `VITE_YARBA_PORTFOLIO_SUBDOMAIN`

## Deployment Architecture

See `design/aws_architecture.mmd` for the current diagram. In summary:

- **Route 53 + ACM + CloudFront + S3** serve the static React app
- **YARBA API** provides portfolio sections and chat responses
- **Contact form** opens the visitor's email app with a prefilled message

## Git Workflow

### Branch Strategy

- `main`: Production-ready code
- `feature/*`: New features
- `bugfix/*`: Bug fixes

### Commit Message Convention

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

## Performance Optimization

- Route-based code splitting with `React.lazy`
- WebP image optimization
- Async 3D model loading
- Tailwind CSS purging in production

## Troubleshooting

1. **Chat not responding**

   - Verify `VITE_YARBA_API_URL` and `VITE_YARBA_PORTFOLIO_SUBDOMAIN` are set
   - Confirm the YARBA site has chatbot enabled

2. **Portfolio sections empty**

   - Verify `VITE_YARBA_API_URL` and `VITE_YARBA_PORTFOLIO_TOKEN`

3. **TypeScript Errors**

   - Run `npm run ts:check`

4. **Build Issues**
   - Clear cache: remove `dist/`
   - Reinstall: `npm ci`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

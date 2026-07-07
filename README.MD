# React Three.js Portfolio

A modern, interactive portfolio website built with React, Three.js, and TypeScript. Features stunning 3D animations, interactive components, and a responsive design.

Live site: [mujakayadan.com](https://mujakayadan.com)

## Features

- **Interactive 3D Elements**
  - Animated 3D models and scenes
  - Dynamic lighting and effects
  - Responsive 3D components

- **Modern Tech Stack**
  - React 18 with TypeScript for type safety
  - Three.js with React Three Fiber for 3D graphics
  - Framer Motion for smooth animations
  - Tailwind CSS for styling
  - Vite for fast development and building

- **YARBA Integration**
  - Portfolio content loaded from the YARBA API
  - AI chat assistant powered by YARBA public portfolio chat

- **Performance Optimized**
  - Code splitting and lazy loading
  - Optimized 3D model loading
  - Responsive design for all devices
  - WebP image optimization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mujakayadan/react-threejs-portfolio.git
cd react-threejs-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` with your values. See [Environment Variables](#environment-variables) below.

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

Copy `.env.example` to `.env` for local development.

| Variable | Purpose |
|----------|---------|
| `VITE_YARBA_API_URL` | YARBA API base URL for portfolio content and chat |
| `VITE_YARBA_PORTFOLIO_TOKEN` | Token for fetching live portfolio sections |
| `VITE_YARBA_PORTFOLIO_SUBDOMAIN` | YARBA site subdomain used by the chat assistant |

Production builds receive these values from GitHub Actions secrets during deploy.

### GitHub Actions Secrets

Required for `.github/workflows/deploy.yml`:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_BUCKET_NAME`
- `CLOUDFRONT_DISTRIBUTION_ID`
- `VITE_YARBA_API_URL`
- `VITE_YARBA_PORTFOLIO_TOKEN`
- `VITE_YARBA_PORTFOLIO_SUBDOMAIN`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run Vitest tests
- `npm run ts:check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run validate` - Run all checks (types, lint, test, build)

### Project Structure

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
└── .github/workflows/   # CI and deploy pipelines
```

### Key Components

- **3D Components**
  - `Ball.tsx`: Interactive 3D ball component
  - `Earth.tsx`: 3D Earth model component
  - `Stars.tsx`: Background stars effect
  - `Computers.tsx`: 3D computer model

- **Core Components**
  - `About.tsx`: About section with animations
  - `ChatBot.tsx`: AI assistant chat widget
  - `Contact.tsx`: Contact form (opens visitor email app via mailto)
  - `Hero.tsx`: Hero section with 3D elements
  - `Navbar.tsx`: Navigation component

## Quality Assurance

### Type Checking

```bash
npm run ts:check
```

### Linting

ESLint configuration lives in `.eslintrc.js`.

```bash
npm run lint
npm run lint:fix
```

### Testing

```bash
npm run test
```

### Pre-commit Hooks

Husky and lint-staged run ESLint and Prettier before commits.

## Deployment

Production deploys automatically to AWS S3 + CloudFront on pushes to `main` via `.github/workflows/deploy.yml`.

CI runs on every push and pull request via `.github/workflows/ci.yml` (type check, lint, test, build).

### Manual Build

```bash
npm run build
npm run preview
```

See `design/aws_architecture.mmd` for the current architecture diagram.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

We follow the Conventional Commits specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Original 3D portfolio template by [Sunny Patel](https://github.com/sunnypatell)
- Three.js for 3D graphics capabilities
- React Three Fiber for React integration
- Framer Motion for animations
- Tailwind CSS for styling

## Contact

For questions or feedback:

- GitHub Issues
- Email: mujakayadan@outlook.com
- LinkedIn: [Muja Kayadan](https://linkedin.com/in/muja-kayadan)

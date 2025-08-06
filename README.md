# Conectory - Digital Product Storefront

A mobile-first digital product storefront and motivational content vault. Creators can upload ebooks, quote vaults, PDFs, and motivational products. Each product gets a shareable link like `/p/[slug]`. Buyers can browse, discover, and purchase these products, while Conectory takes a 10% platform fee.

## 🚀 Features

### For Creators
- **Product Upload**: Upload ebooks, PDFs, audio files, and digital products
- **Creator Dashboard**: Track sales, earnings, and product performance
- **Shareable Links**: Each product gets a unique shareable URL
- **Earnings Tracking**: Monitor your 90% earnings after platform fees
- **Product Management**: Edit, update, and manage your product catalog

### For Buyers
- **Product Discovery**: Browse curated digital products by category
- **Secure Checkout**: Industry-standard payment processing
- **Instant Downloads**: Get immediate access to purchased products
- **Product Reviews**: Rate and review products
- **Mobile-First Design**: Optimized for all devices

### Platform Features
- **10% Platform Fee**: Transparent fee structure
- **Shareable Links**: Easy product sharing with `/p/[slug]` URLs
- **Copy-to-Clipboard**: One-click link sharing
- **Responsive Design**: Works perfectly on mobile and desktop
- **TypeScript**: Full type safety and better developer experience

## 🛠 Tech Stack

- **Frontend**: Next.js 15 App Router, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Context + LocalStorage
- **Testing**: Jest + Testing Library (configured)
- **Deployment**: Vercel (optimized)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd conectory-homepage

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start development server
pnpm dev
```

### Environment Variables
Create a `.env.local` file with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (for future Supabase integration)
DATABASE_URL=your_database_url

# Auth (for future Supabase Auth)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Payments (for future Stripe integration)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests (Playwright)
pnpm test:e2e
```

## 🏗 Project Structure

```
conectory-homepage/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── creator/           # Creator dashboard pages
│   ├── p/[slug]/          # Product detail pages
│   ├── products/          # Product listing
│   └── checkout/          # Checkout flow
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── creator-layout.tsx # Creator dashboard layout
│   ├── navbar.tsx        # Navigation component
│   └── footer.tsx        # Footer component
├── contexts/             # React Context providers
│   └── auth-context.tsx  # Authentication context
├── lib/                  # Utility functions and types
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── mock-data.ts      # Mock data for development
├── public/               # Static assets
└── tests/                # Test files
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

### Environment Variables for Production
Make sure to set all required environment variables in your deployment platform:

- `NEXT_PUBLIC_APP_URL`: Your production domain
- Database credentials (when implementing Supabase)
- Payment processing keys (when implementing Stripe)

## 🔧 Development

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Component Guidelines
- Use shadcn/ui components when possible
- Create reusable components in `components/ui/`
- Follow mobile-first design principles
- Use semantic HTML and proper accessibility

### State Management
- Use React Context for global state (auth, user data)
- Use local state for component-specific data
- Consider React Query for server state (future)

## 🎯 Roadmap

### Phase 1 (Current - MVP)
- ✅ Basic product listing and detail pages
- ✅ Authentication system (mock)
- ✅ Creator dashboard
- ✅ Checkout flow (mock)
- ✅ Shareable product links
- ✅ Copy-to-clipboard functionality

### Phase 2 (Next)
- 🔄 Real authentication with Supabase
- 🔄 File upload functionality
- 🔄 Real payment processing with Stripe
- 🔄 Product search and filtering
- 🔄 User reviews and ratings

### Phase 3 (Future)
- 📋 Advanced analytics for creators
- 📋 Email notifications
- 📋 Affiliate program
- 📋 Mobile app
- 📋 API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow
1. Create an issue describing the feature/bug
2. Assign yourself to the issue
3. Create a feature branch from `main`
4. Implement the feature with tests
5. Submit a PR with a clear description
6. Get code review and merge

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

---

**Conectory** - Empowering creators to share their wisdom with the world. ✨ 
# Movie App 🎬

A modern web application to discover movies using The Movie Database (TMDB) API.

### Features
- Browse popular, top-rated, and upcoming movies
- Detailed movie information page (poster, overview, genres, ratings, budget, etc.)
- Responsive dark-themed design with smooth animations & hover effects
- User authentication (Sign up / Login)
- Protected routes using Context API
- Loading states & toast notifications

### Tech Stack
- React + Vite
- React Router v6
- Tailwind CSS
- HeroUI (formerly NextUI)
- React Hook Form + Zod (form validation)
- Axios (API requests)
- React Toastify (notifications)
- Context API (auth state management)

### Live Demo
🌐 https://movie-app-pink-nu.vercel.app/

### Installation & Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/movie-app.git

# Enter project directory
cd movie-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
````

## Project Structure (Simplified)
src/
├── Components/         # Reusable components (MovieCard, Loading...)
├── Context/            # Auth context
├── pages/              # Main pages
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── LoginForm.jsx
│   └── SignUpForm.jsx
├── Services/           # API services
├── lib/schema/         # Zod validation schemas
└── App.jsx             # Main router configuration

## Notes
- Uses TMDB API (API key is hardcoded – not recommended for production)
- Authentication is connected to an external API
- Designed with a beautiful dark theme and pink accents (#e94560)

### Enjoy your movie night! 🍿

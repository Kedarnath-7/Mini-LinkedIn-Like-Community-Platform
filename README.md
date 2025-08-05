# Mini-LinkedIn Like Community Platform

A modern, full-stack social networking platform built for the Ciaan Cyber Tech internship application. This project demonstrates comprehensive web development skills with a focus on user experience, real-time interactions, and professional design.

## 🌟 Features

### Core Functionality
- **User Authentication**: Secure email/password registration and login
- **User Profiles**: Customizable profiles with bio, avatar, and profile management
- **Post Creation**: Create and share text-based posts with the community
- **Real-time Feed**: Dynamic post feed with real-time updates
- **Profile Pages**: View user profiles and their post history
- **Search & Discovery**: Find users and posts with advanced search functionality
- **Responsive Design**: Mobile-first design that works on all devices

### Technical Highlights
- **Real-time Updates**: Live post feed updates using Supabase real-time subscriptions
- **Advanced Search**: Full-text search for users and posts with performance optimization
- **Modern UI/UX**: Beautiful, gradient-based design with smooth animations
- **Type Safety**: Full TypeScript implementation for robust development
- **Authentication Flow**: Complete auth system with profile creation
- **Database Relations**: Proper PostgreSQL schema with foreign key relationships
- **Error Handling**: Comprehensive error states and user feedback
- **Keyboard Shortcuts**: Professional UX with Ctrl+K search shortcut

## 🚀 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **Lucide React** - Modern icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Built-in authentication

### Deployment
- **Netlify** - Serverless deployment platform

## 📁 Project Structure

```
linkedin-clone/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   ├── profile/[id]/      # Dynamic profile pages
│   │   ├── globals.css        # Global styles and animations
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── auth/             # Authentication forms
│   │   ├── layout/           # Layout components (Navbar)
│   │   ├── posts/            # Post-related components
│   │   └── profile/          # Profile components
│   ├── contexts/             # React contexts
│   │   └── AuthContext.tsx   # Authentication state management
│   └── lib/                  # Utilities and configurations
│       └── supabase.ts       # Supabase client setup
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🎨 Design Features

### Modern UI Elements
- **Gradient Backgrounds**: Beautiful blue-to-purple gradients throughout
- **Glass Morphism**: Subtle backdrop blur effects on cards
- **Smooth Animations**: Hover effects, scale transforms, and fade-in animations
- **Custom Scrollbar**: Styled scrollbar with gradient thumb
- **Interactive Buttons**: Scale and shadow effects on user interactions

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive navigation
- Touch-friendly interface

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kedarnath-7/Mini-LinkedIn-Like-Community-Platform
   cd linkedin-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   
   1. **Create Supabase Project**:
      - Go to https://supabase.com
      - Click "New Project"
      - Choose organization and name your project
      - Wait for project creation (~2 minutes)

   2. **Set up Database**:
      - Go to SQL Editor in Supabase dashboard
      - Copy the entire content from `supabase-schema.sql`
      - Paste and click "Run"
      - Verify tables are created in Table Editor

   3. **Get API Keys**:
      - Go to Settings > API
      - Copy "Project URL" and "anon public" key
   4. **Add your Supabase credentials to .env.local**:
      ```
      NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
      ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🌐 Deployment

### Netlify Deployment (Recommended)

1. **Connect to Netlify**
   - Push your code to GitHub
   - Import project in Netlify dashboard
   - Connect your GitHub repository

2. **Environment Variables**
   Add the same environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   Netlify will automatically deploy on every push to main branch

## 📊 Key Features Breakdown

### Authentication System
- Email/password registration with validation
- Secure login with error handling
- Automatic profile creation on signup
- Protected routes and auth state management

### Post Management
- Create posts with character validation
- Real-time post feed updates
- User attribution with profile links
- Timestamp formatting with relative dates

### Search System
- Advanced search functionality for users and posts
- Real-time search with debouncing for better performance
- Tabbed search interface (All, Users, Posts)
- Keyboard shortcut support (Ctrl+K / Cmd+K)
- Search result highlighting and categorization

### Profile System
- Customizable user profiles
- Bio editing functionality
- Post count tracking
- Profile viewing for all users

### Real-time Features
- Live post feed updates
- Instant post creation feedback
- Real-time user interactions

## 🎯 Development Highlights

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **Error Handling**: Comprehensive error states and user feedback
- **Performance**: Optimized React patterns and minimal re-renders
- **Security**: Row Level Security policies and protected routes

### User Experience
- **Loading States**: Skeleton screens and loading indicators
- **Form Validation**: Real-time input validation and feedback
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and proper ARIA labels

### Best Practices
- **Component Composition**: Reusable, composable React components
- **State Management**: Efficient use of React Context and local state
- **API Integration**: Clean separation of concerns with Supabase
- **CSS Architecture**: Utility-first approach with custom components

## 🚀 Future Enhancements

### Planned Features
- [ ] Image upload for posts and profiles
- [ ] Like and comment system
- [ ] Direct messaging
- [ ] Connection requests
- [ ] Notification system
- ✅ **Search functionality** - User and post search implemented
- [ ] Email notifications

### Technical Improvements
- [ ] Server-side rendering optimization
- [ ] Image optimization and CDN
- [ ] Progressive Web App (PWA)
- [ ] Performance monitoring
- [ ] Automated testing suite

---

## 🏆 Project Achievement Summary

✅ **Complete Authentication System** - Secure user registration and login  
✅ **Dynamic User Profiles** - Customizable profiles with editing capabilities  
✅ **Real-time Post Feed** - Live updates using Supabase subscriptions  
✅ **Advanced Search System** - Users and posts search with keyboard shortcuts  
✅ **Modern UI/UX Design** - Professional, responsive interface  
✅ **Type-Safe Development** - Full TypeScript implementation  
✅ **Database Design** - Proper PostgreSQL schema with relationships  
✅ **Deployment Ready** - Configured for Vercel deployment  
✅ **Mobile Responsive** - Works perfectly on all device sizes  
✅ **Error Handling** - Comprehensive error states and user feedback  
✅ **Performance Optimized** - Fast loading and smooth interactions

This project showcases the complete skillset required for modern full-stack web development, making it an ideal demonstration of capabilities for the Full Stack Development Internship position at Ciaan Cyber Tech.

## 🚀 Live Demo

🔗 **Live URL**: [https://kedarnath-ciaancybertech.netlify.app/](https://kedarnath-ciaancybertech.netlify.app/)

## 🧪 Demo User Accounts

After setting up the database, you can create demo accounts by registering through the application:

**Test User 1:**
- Email: demo1@example.com
- Password: demo123456
- Name: John Doe

**Test User 2:**
- Email: demo2@example.com
- Password: demo123456
- Name: Jane Smith

## 📱 Usage Guide

1. **Registration/Login**: Create an account or sign in
2. **Create Posts**: Click "Create Post" or use the form on the home page
3. **View Feed**: See all posts in real-time on the home page
4. **Visit Profiles**: Click on user names to view their profiles
5. **Edit Profile**: Visit your own profile to edit name and bio
6. **Search**: Use the search feature to find users and posts

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Authentication required** for post creation
- **User isolation** - users can only edit their own content
- **Input validation** and sanitization
- **Type safety** with TypeScript

## 📈 Performance Optimizations

- **Next.js 14** with App Router for optimal performance
- **Server-side rendering** for faster initial loads
- **Optimized images** and assets
- **Efficient database queries** with proper indexing
- **Real-time subscriptions** only when needed

## 🤝 Contributing

This project was created for an internship application. For any questions or suggestions, please contact:

**Developer**: Kedarnath N  
**Email**: kedarnath7218gtl@gmail.com
**Applied for**: Full Stack Development Internship at CIAAN Cyber Tech Pvt Ltd

## 📄 License

This project is created for educational and internship application purposes.

---

**Built with ❤️ for CIAAN Cyber Tech Pvt Ltd**

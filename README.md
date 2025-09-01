# 🚀 REST Client App

A modern, full-featured REST API testing tool built with Next.js, featuring a beautiful UI, request history management, and real-time response display.

![REST Client](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![MikroORM](https://img.shields.io/badge/MikroORM-6.0.0-orange?style=for-the-badge)

## ✨ Features

- **🌐 HTTP Methods Support**: GET, POST, PUT, DELETE, PATCH
- **📝 Custom Headers**: Add multiple custom headers with key-value pairs
- **📄 Request Body**: Support for JSON and text data in request body
- **⚡ Real-time Responses**: Instant response display with status codes and timing
- **📊 Response Tabs**: View response body and headers separately
- **📚 Request History**: Automatically save and manage request history
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS
- **💾 Persistent Storage**: SQLite database for reliable data persistence
- **🔄 Copy to Clipboard**: Easy copying of response data
- **📱 Responsive Design**: Works perfectly on desktop and mobile

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with MikroORM
- **UI Components**: Custom components with Lucide React icons
- **Styling**: Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rest-client-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Making API Requests

1. **Select HTTP Method**: Choose from GET, POST, PUT, DELETE, or PATCH
2. **Enter URL**: Input your API endpoint URL
3. **Add Headers** (Optional): Add custom headers as needed
4. **Add Body** (Optional): For POST/PUT/PATCH requests, add request body
5. **Send Request**: Click the "Send" button
6. **View Response**: See status, headers, body, and response time

### Managing Request History

- **View History**: All requests are automatically saved in the right sidebar
- **Reuse Requests**: Click on any history item to populate the form
- **Delete Requests**: Remove individual requests from history

### Example API Calls

**GET Request**
```
Method: GET
URL: https://jsonplaceholder.typicode.com/posts?_limit=5
```

**POST Request**
```
Method: POST
URL: https://jsonplaceholder.typicode.com/posts
Headers: Content-Type: application/json
Body: {
  "title": "My New Post",
  "body": "This is the content of my post",
  "userId": 1
}
```

## 🗄️ Database

The application uses SQLite with MikroORM for data persistence:

- **Database File**: `rest-client.db` (created automatically)
- **Tables**: `request_history` (stores all API requests and responses)
- **Migrations**: Automatic schema creation on first run

### Database Schema

```sql
CREATE TABLE request_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  method TEXT NOT NULL,
  url TEXT NOT NULL,
  headers JSON,
  body TEXT,
  status INTEGER NOT NULL,
  response_headers JSON,
  response_body TEXT,
  response_time INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run migration:create  # Create new migration
npm run migration:up      # Run migrations
npm run migration:down    # Rollback migration
npm run schema:create     # Create database schema
npm run schema:drop       # Drop database schema
```

### Project Structure

```
rest-client-app/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   │   ├── request/    # Main request handler
│   │   │   └── history/    # History management
│   │   ├── globals.css     # Global styles
│   │   ├── layout.js       # Root layout
│   │   └── page.js         # Home page
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── RequestForm.js  # Request form component
│   │   ├── ResponseDisplay.js # Response display
│   │   └── RequestHistory.js # History component
│   ├── entities/          # Database entities
│   │   └── RequestHistory.js
│   └── lib/               # Utility functions
│       ├── database.js    # Database configuration
│       └── utils.js       # Helper functions
├── mikro-orm.config.js    # MikroORM configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json
```

## 🎨 UI Components

The application features a custom design system with:

- **Cards**: For organizing content sections
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Inputs**: Text inputs, selects, and textareas
- **Icons**: Lucide React icons throughout the interface
- **Responsive Grid**: Adaptive layout for different screen sizes

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
# Database
DATABASE_URL=./rest-client.db

# API Configuration
API_TIMEOUT=30000
```

### Customization

- **Styling**: Modify `tailwind.config.js` for theme customization
- **Database**: Update `mikro-orm.config.js` for database settings
- **API Routes**: Extend API routes in `src/app/api/`

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

### Other Platforms

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MikroORM](https://mikro-orm.io/) - TypeScript ORM
- [Lucide React](https://lucide.dev/) - Beautiful icons
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake API for testing

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/rest-client-app/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Happy API Testing! 🎉**

Built with ❤️ using Next.js and modern web technologies.
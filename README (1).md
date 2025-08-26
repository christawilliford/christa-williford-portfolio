# Christa Williford - Professional Portfolio

A modern, responsive portfolio website showcasing expertise in library science, digital preservation, and research assessment.

## 🌟 Features

- **Modern Design**: Clean, professional styling with distinctive teal color scheme
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices
- **Dynamic Content**: Backend-powered with MongoDB for easy content management
- **Fast & Secure**: Built with React and FastAPI for optimal performance
- **Professional Focus**: Tailored for academic and library science professionals

## 🛠 Tech Stack

### Frontend
- **React** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - High-performance Python API framework
- **MongoDB** - Document database with Motor async driver
- **Pydantic** - Data validation and serialization
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── App.js          # Main application
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
│
├── backend/                 # FastAPI server
│   ├── models.py           # Pydantic models
│   ├── database.py         # Database operations
│   ├── server.py           # API endpoints
│   ├── init_data.py        # Database initialization
│   └── requirements.txt    # Python dependencies
│
└── README.md               # Project documentation
```

## 🚀 Deployment

This portfolio is designed for easy deployment on modern platforms:

### Recommended Stack
- **Frontend**: Vercel (connects directly to this GitHub repo)
- **Backend**: Railway.app or Render.com
- **Database**: MongoDB Atlas (free tier available)

### Environment Variables

**Frontend (.env)**:
```
REACT_APP_BACKEND_URL=your-backend-url
```

**Backend (.env)**:
```
MONGO_URL=your-mongodb-connection-string
DB_NAME=portfolio
```

## 💼 About Christa Williford

Senior Director of Research and Assessment at the Council on Library and Information Resources (CLIR), specializing in:

- Research assessment and program evaluation
- Digital preservation and software stewardship
- Academic library services and scholarly communication
- Cross-sector collaboration in cultural heritage

## 📝 Content Management

The portfolio supports dynamic content management through the FastAPI backend:

- **Profile Information**: Personal details, about section, education
- **Skills**: Categorized professional competencies
- **Experience**: Work history with detailed achievements
- **Projects**: Research publications and major initiatives

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB (local or Atlas)

### Setup
1. Clone this repository
2. Install frontend dependencies: `cd frontend && yarn install`
3. Install backend dependencies: `cd backend && pip install -r requirements.txt`
4. Set up environment variables (see .env.example files)
5. Initialize database: `cd backend && python init_data.py`
6. Start development servers:
   - Frontend: `cd frontend && yarn start`
   - Backend: `cd backend && uvicorn server:app --reload --port 8001`

## 📄 License

This project is for professional portfolio use. Feel free to use as inspiration for your own portfolio projects.

## 🤝 Contact

**Christa Williford**
- LinkedIn: [linkedin.com/in/christawilliford](https://linkedin.com/in/christawilliford)
- ORCID: [orcid.org/0000-0001-6273-3793](https://orcid.org/0000-0001-6273-3793)
- Academia: [academia.edu/ChristaWilliford](https://independent.academia.edu/ChristaWilliford)

---
*Built with modern web technologies for optimal performance and user experience.*
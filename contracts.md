# Portfolio Backend Integration Contracts

## Overview
Simple, secure backend for Christa Williford's portfolio website with MongoDB storage.

## Current Mock Data (to be replaced)
Located in: `/app/frontend/src/components/mock.js`

### Data Structure to Implement:
1. **Personal Info**: Name, title, tagline, contact information, social links
2. **About**: Summary, highlights, education
3. **Skills**: Categories with skill lists (only Research & Assessment, Leadership & Communication)
4. **Experience**: Work history with achievements
5. **Projects**: Research publications and assessments

## Backend Implementation Plan

### 1. Database Models (MongoDB)
- `Profile` - Single document for personal info, about, education
- `Skills` - Array of skill categories 
- `Experience` - Array of work experience entries
- `Projects` - Array of project/publication entries

### 2. API Endpoints (All prefixed with /api)
```
GET /api/profile - Get all portfolio data
PUT /api/profile - Update personal info and about section
GET /api/skills - Get skills data
PUT /api/skills - Update skills
GET /api/experience - Get experience data  
POST /api/experience - Add new experience
PUT /api/experience/:id - Update experience
DELETE /api/experience/:id - Delete experience
GET /api/projects - Get projects data
POST /api/projects - Add new project
PUT /api/projects/:id - Update project  
DELETE /api/projects/:id - Delete project
```

### 3. Security Measures
- Input validation with Pydantic models
- MongoDB injection prevention
- CORS properly configured
- Error handling without data leakage

### 4. Frontend Integration
- Replace mock.js imports with API calls
- Add loading states for better UX
- Error handling for failed requests
- Maintain same component structure

### 5. Data Migration
- Initialize database with current mock data
- Ensure seamless transition from static to dynamic

## Implementation Priority
1. Create MongoDB models
2. Build API endpoints  
3. Integrate frontend with backend
4. Test all CRUD operations
5. Ensure data persistence

## Hosting Considerations
- Simple deployment-ready structure
- Environment variables for production
- Database connection flexibility
- Minimal dependencies for reliability
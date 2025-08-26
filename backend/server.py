from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from typing import Dict, Any

# Import our models and database
from models import Profile, SkillsData, ExperienceData, ProjectsData, ProfileUpdate, SkillsUpdate, ExperienceUpdate, ProjectUpdate, Experience, Project
from database import portfolio_db

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(title="Christa Williford Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Portfolio API Routes
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}

# Profile endpoints
@api_router.get("/portfolio", response_model=Dict[str, Any])
async def get_full_portfolio():
    """Get complete portfolio data"""
    try:
        profile = await portfolio_db.get_profile()
        skills = await portfolio_db.get_skills()
        experience = await portfolio_db.get_experience()
        projects = await portfolio_db.get_projects()
        
        return {
            "personal": profile.personal.dict() if profile else None,
            "about": profile.about.dict() if profile else None,
            "education": [edu.dict() for edu in profile.education] if profile else [],
            "skills": [skill.dict() for skill in skills.skills] if skills else [],
            "experience": [exp.dict() for exp in experience.experience] if experience else [],
            "projects": [proj.dict() for proj in projects.projects] if projects else []
        }
    except Exception as e:
        logging.error(f"Error getting portfolio: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve portfolio data")

@api_router.get("/profile", response_model=Profile)
async def get_profile():
    """Get profile data"""
    try:
        profile = await portfolio_db.get_profile()
        if not profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        return profile
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve profile")

@api_router.put("/profile")
async def update_profile(profile_update: ProfileUpdate):
    """Update profile data"""
    try:
        current_profile = await portfolio_db.get_profile()
        
        if current_profile:
            # Update existing profile
            if profile_update.personal:
                current_profile.personal = profile_update.personal
            if profile_update.about:
                current_profile.about = profile_update.about
            if profile_update.education is not None:
                current_profile.education = profile_update.education
        else:
            # Create new profile if none exists
            if not all([profile_update.personal, profile_update.about]):
                raise HTTPException(status_code=400, detail="Personal and about data required for new profile")
            current_profile = Profile(
                personal=profile_update.personal,
                about=profile_update.about,
                education=profile_update.education or []
            )
        
        success = await portfolio_db.update_profile(current_profile)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to update profile")
        
        return {"message": "Profile updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating profile: {e}")
        raise HTTPException(status_code=500, detail="Failed to update profile")

# Skills endpoints
@api_router.get("/skills", response_model=SkillsData)
async def get_skills():
    """Get skills data"""
    try:
        skills = await portfolio_db.get_skills()
        if not skills:
            raise HTTPException(status_code=404, detail="Skills not found")
        return skills
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting skills: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve skills")

@api_router.put("/skills")
async def update_skills(skills_update: SkillsUpdate):
    """Update skills data"""
    try:
        skills_data = SkillsData(skills=skills_update.skills)
        success = await portfolio_db.update_skills(skills_data)
        if not success:
            raise HTTPException(status_code=500, detail="Failed to update skills")
        
        return {"message": "Skills updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating skills: {e}")
        raise HTTPException(status_code=500, detail="Failed to update skills")

# Experience endpoints
@api_router.get("/experience", response_model=ExperienceData)
async def get_experience():
    """Get experience data"""
    try:
        experience = await portfolio_db.get_experience()
        if not experience:
            raise HTTPException(status_code=404, detail="Experience not found")
        return experience
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve experience")

@api_router.post("/experience")
async def add_experience(exp_data: ExperienceUpdate):
    """Add new experience entry"""
    try:
        new_exp = Experience(**exp_data.dict())
        exp_id = await portfolio_db.add_experience(new_exp)
        if not exp_id:
            raise HTTPException(status_code=500, detail="Failed to add experience")
        
        return {"message": "Experience added successfully", "id": exp_id}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error adding experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to add experience")

@api_router.put("/experience/{exp_id}")
async def update_experience(exp_id: str, exp_data: ExperienceUpdate):
    """Update experience entry"""
    try:
        updated_exp = Experience(id=exp_id, **exp_data.dict())
        success = await portfolio_db.update_experience_item(exp_id, updated_exp)
        if not success:
            raise HTTPException(status_code=404, detail="Experience not found or update failed")
        
        return {"message": "Experience updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to update experience")

@api_router.delete("/experience/{exp_id}")
async def delete_experience(exp_id: str):
    """Delete experience entry"""
    try:
        success = await portfolio_db.delete_experience(exp_id)
        if not success:
            raise HTTPException(status_code=404, detail="Experience not found")
        
        return {"message": "Experience deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error deleting experience: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete experience")

# Projects endpoints
@api_router.get("/projects", response_model=ProjectsData)
async def get_projects():
    """Get projects data"""
    try:
        projects = await portfolio_db.get_projects()
        if not projects:
            raise HTTPException(status_code=404, detail="Projects not found")
        return projects
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve projects")

@api_router.post("/projects")
async def add_project(project_data: ProjectUpdate):
    """Add new project"""
    try:
        new_project = Project(**project_data.dict())
        project_id = await portfolio_db.add_project(new_project)
        if not project_id:
            raise HTTPException(status_code=500, detail="Failed to add project")
        
        return {"message": "Project added successfully", "id": project_id}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error adding project: {e}")
        raise HTTPException(status_code=500, detail="Failed to add project")

@api_router.put("/projects/{project_id}")
async def update_project(project_id: str, project_data: ProjectUpdate):
    """Update project"""
    try:
        updated_project = Project(id=project_id, **project_data.dict())
        success = await portfolio_db.update_project(project_id, updated_project)
        if not success:
            raise HTTPException(status_code=404, detail="Project not found or update failed")
        
        return {"message": "Project updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating project: {e}")
        raise HTTPException(status_code=500, detail="Failed to update project")

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    """Delete project"""
    try:
        success = await portfolio_db.delete_project(project_id)
        if not success:
            raise HTTPException(status_code=404, detail="Project not found")
        
        return {"message": "Project deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error deleting project: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete project")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Database connection events
@app.on_event("startup")
async def startup_db():
    await portfolio_db.connect_db()
    logger.info("Portfolio API started successfully")

@app.on_event("shutdown")
async def shutdown_db():
    await portfolio_db.close_db()
    logger.info("Portfolio API shut down")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

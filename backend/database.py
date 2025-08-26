from motor.motor_asyncio import AsyncIOMotorClient
from models import Profile, SkillsData, ExperienceData, ProjectsData, Experience, Project
from typing import List, Optional
import os
import uuid
import logging

logger = logging.getLogger(__name__)

class PortfolioDatabase:
    def __init__(self):
        self.client: AsyncIOMotorClient = None
        self.database = None
        
    async def connect_db(self):
        """Create database connection"""
        try:
            self.client = AsyncIOMotorClient(os.environ['MONGO_URL'])
            self.database = self.client[os.environ['DB_NAME']]
            logger.info("Connected to MongoDB successfully")
        except Exception as e:
            logger.error(f"Error connecting to MongoDB: {e}")
            raise
    
    async def close_db(self):
        """Close database connection"""
        if self.client:
            self.client.close()
            logger.info("MongoDB connection closed")

    # Profile operations
    async def get_profile(self) -> Optional[Profile]:
        """Get profile data"""
        try:
            profile_data = await self.database.profiles.find_one({"_id": "main_profile"})
            if profile_data:
                return Profile(**profile_data)
            return None
        except Exception as e:
            logger.error(f"Error getting profile: {e}")
            return None

    async def update_profile(self, profile: Profile) -> bool:
        """Update or create profile"""
        try:
            profile_dict = profile.dict(by_alias=True)
            result = await self.database.profiles.replace_one(
                {"_id": "main_profile"}, 
                profile_dict, 
                upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating profile: {e}")
            return False

    # Skills operations
    async def get_skills(self) -> Optional[SkillsData]:
        """Get skills data"""
        try:
            skills_data = await self.database.skills.find_one({"_id": "main_skills"})
            if skills_data:
                return SkillsData(**skills_data)
            return None
        except Exception as e:
            logger.error(f"Error getting skills: {e}")
            return None

    async def update_skills(self, skills: SkillsData) -> bool:
        """Update skills data"""
        try:
            skills_dict = skills.dict(by_alias=True)
            result = await self.database.skills.replace_one(
                {"_id": "main_skills"}, 
                skills_dict, 
                upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating skills: {e}")
            return False

    # Experience operations  
    async def get_experience(self) -> Optional[ExperienceData]:
        """Get experience data"""
        try:
            exp_data = await self.database.experience.find_one({"_id": "main_experience"})
            if exp_data:
                return ExperienceData(**exp_data)
            return None
        except Exception as e:
            logger.error(f"Error getting experience: {e}")
            return None

    async def add_experience(self, experience: Experience) -> Optional[str]:
        """Add new experience entry"""
        try:
            experience.id = str(uuid.uuid4())
            exp_data = await self.get_experience()
            
            if not exp_data:
                exp_data = ExperienceData(experience=[experience])
            else:
                exp_data.experience.append(experience)
            
            success = await self.update_experience_data(exp_data)
            return experience.id if success else None
        except Exception as e:
            logger.error(f"Error adding experience: {e}")
            return None

    async def update_experience_item(self, exp_id: str, updated_exp: Experience) -> bool:
        """Update specific experience entry"""
        try:
            exp_data = await self.get_experience()
            if not exp_data:
                return False
                
            for i, exp in enumerate(exp_data.experience):
                if exp.id == exp_id:
                    updated_exp.id = exp_id
                    exp_data.experience[i] = updated_exp
                    return await self.update_experience_data(exp_data)
            return False
        except Exception as e:
            logger.error(f"Error updating experience: {e}")
            return False

    async def delete_experience(self, exp_id: str) -> bool:
        """Delete experience entry"""
        try:
            exp_data = await self.get_experience()
            if not exp_data:
                return False
                
            exp_data.experience = [exp for exp in exp_data.experience if exp.id != exp_id]
            return await self.update_experience_data(exp_data)
        except Exception as e:
            logger.error(f"Error deleting experience: {e}")
            return False

    async def update_experience_data(self, exp_data: ExperienceData) -> bool:
        """Update entire experience data"""
        try:
            exp_dict = exp_data.dict(by_alias=True)
            result = await self.database.experience.replace_one(
                {"_id": "main_experience"}, 
                exp_dict, 
                upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating experience data: {e}")
            return False

    # Projects operations
    async def get_projects(self) -> Optional[ProjectsData]:
        """Get projects data"""
        try:
            projects_data = await self.database.projects.find_one({"_id": "main_projects"})
            if projects_data:
                return ProjectsData(**projects_data)
            return None
        except Exception as e:
            logger.error(f"Error getting projects: {e}")
            return None

    async def add_project(self, project: Project) -> Optional[str]:
        """Add new project"""
        try:
            project.id = str(uuid.uuid4())
            projects_data = await self.get_projects()
            
            if not projects_data:
                projects_data = ProjectsData(projects=[project])
            else:
                projects_data.projects.append(project)
            
            success = await self.update_projects_data(projects_data)
            return project.id if success else None
        except Exception as e:
            logger.error(f"Error adding project: {e}")
            return None

    async def update_project(self, project_id: str, updated_project: Project) -> bool:
        """Update specific project"""
        try:
            projects_data = await self.get_projects()
            if not projects_data:
                return False
                
            for i, proj in enumerate(projects_data.projects):
                if proj.id == project_id:
                    updated_project.id = project_id
                    projects_data.projects[i] = updated_project
                    return await self.update_projects_data(projects_data)
            return False
        except Exception as e:
            logger.error(f"Error updating project: {e}")
            return False

    async def delete_project(self, project_id: str) -> bool:
        """Delete project"""
        try:
            projects_data = await self.get_projects()
            if not projects_data:
                return False
                
            projects_data.projects = [proj for proj in projects_data.projects if proj.id != project_id]
            return await self.update_projects_data(projects_data)
        except Exception as e:
            logger.error(f"Error deleting project: {e}")
            return False

    async def update_projects_data(self, projects_data: ProjectsData) -> bool:
        """Update entire projects data"""
        try:
            projects_dict = projects_data.dict(by_alias=True)
            result = await self.database.projects.replace_one(
                {"_id": "main_projects"}, 
                projects_dict, 
                upsert=True
            )
            return result.acknowledged
        except Exception as e:
            logger.error(f"Error updating projects data: {e}")
            return False

# Global database instance
portfolio_db = PortfolioDatabase()
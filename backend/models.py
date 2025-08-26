from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime

# Personal Information Models
class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    email: str
    phone: str
    location: str
    linkedin: str
    orcid: str
    academia: str

class AboutInfo(BaseModel):
    summary: str
    highlights: List[str]

class Education(BaseModel):
    degree: str
    institution: str
    year: str

class Profile(BaseModel):
    id: Optional[str] = Field(default="main_profile", alias="_id")
    personal: PersonalInfo
    about: AboutInfo
    education: List[Education]
    
    class Config:
        populate_by_name = True

# Skills Models
class SkillCategory(BaseModel):
    category: str
    skills: List[str]

class SkillsData(BaseModel):
    id: Optional[str] = Field(default="main_skills", alias="_id")
    skills: List[SkillCategory]
    
    class Config:
        populate_by_name = True

# Experience Models
class Experience(BaseModel):
    id: Optional[str] = Field(default=None)
    title: str
    organization: str
    period: str
    description: str
    achievements: List[str]

class ExperienceData(BaseModel):
    id: Optional[str] = Field(default="main_experience", alias="_id")
    experience: List[Experience]
    
    class Config:
        populate_by_name = True

# Projects Models
class Project(BaseModel):
    id: Optional[str] = Field(default=None)
    title: str
    description: str
    technologies: List[str]
    status: str
    link: Optional[str] = None

class ProjectsData(BaseModel):
    id: Optional[str] = Field(default="main_projects", alias="_id")
    projects: List[Project]
    
    class Config:
        populate_by_name = True

# Update Models for API
class ProfileUpdate(BaseModel):
    personal: Optional[PersonalInfo] = None
    about: Optional[AboutInfo] = None
    education: Optional[List[Education]] = None

class SkillsUpdate(BaseModel):
    skills: List[SkillCategory]

class ExperienceUpdate(BaseModel):
    title: str
    organization: str
    period: str
    description: str
    achievements: List[str]

class ProjectUpdate(BaseModel):
    title: str
    description: str
    technologies: List[str]
    status: str
    link: Optional[str] = None
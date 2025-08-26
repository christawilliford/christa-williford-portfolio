"""
Initialize database with portfolio data
"""
import asyncio
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Add the backend directory to Python path
sys.path.append(str(Path(__file__).parent))

from models import (
    Profile, PersonalInfo, AboutInfo, Education,
    SkillsData, SkillCategory,
    ExperienceData, Experience,
    ProjectsData, Project
)
from database import portfolio_db
import uuid

async def init_portfolio_data():
    """Initialize the database with Christa Williford's portfolio data"""
    
    # Connect to database
    await portfolio_db.connect_db()
    
    try:
        # Personal Information
        personal = PersonalInfo(
            name="Christa Williford",
            title="Senior Director of Research and Assessment",
            tagline="Bridging scholarship with digital stewardship and cultural preservation",
            email="christa.williford@email.com",
            phone="(555) 123-4567",
            location="Washington, DC",
            linkedin="https://www.linkedin.com/in/christawilliford/",
            orcid="https://orcid.org/0000-0001-6273-3793",
            academia="https://independent.academia.edu/ChristaWilliford"
        )

        # About Information
        about = AboutInfo(
            summary="As Senior Director of Research and Assessment at the Council on Library and Information Resources (CLIR), I design and implement documentation and evaluation strategies for programs that advance the work of information organizations. My interdisciplinary background spans library science, theatre history, and digital preservation, enabling me to bridge traditional scholarship with innovative approaches to cultural heritage stewardship.",
            highlights=[
                "Leading strategic research initiatives at CLIR since my appointment as Senior Director",
                "Designing comprehensive assessment programs for digital preservation initiatives",
                "Publishing extensively on software preservation, data curation, and academic libraries",
                "Mentoring the next generation of information professionals through fellowship programs"
            ]
        )

        # Education
        education = [
            Education(
                degree="PhD in Theatre History, Dramatic Literature, and Criticism",
                institution="Indiana University",
                year="Completed"
            ),
            Education(
                degree="MLIS (Master of Library and Information Science)",
                institution="University of Washington Information School",
                year="Completed"
            ),
            Education(
                degree="ACE Certified Personal Trainer",
                institution="American Council on Exercise",
                year="2025"
            )
        ]

        # Create Profile
        profile = Profile(
            personal=personal,
            about=about,
            education=education
        )

        # Skills
        skills = SkillsData(skills=[
            SkillCategory(
                category="Research & Assessment",
                skills=["Program Evaluation", "Strategic Planning", "Grant Writing", "Data Analysis", "Publication Management"]
            ),
            SkillCategory(
                category="Leadership & Communication",
                skills=["Team Management", "Academic Writing", "Public Speaking", "Stakeholder Engagement", "Cross-sector Collaboration"]
            )
        ])

        # Experience
        experience_data = ExperienceData(experience=[
            Experience(
                id=str(uuid.uuid4()),
                title="Senior Director of Research and Assessment",
                organization="Council on Library and Information Resources (CLIR)",
                period="Current Position",
                description="Design and implement documentation and evaluation strategies for CLIR's programs. Lead initiatives related to information organizations, manage publications program, and advance new program development.",
                achievements=[
                    "Designed and supported implementation of two-year external assessment of CLIR's Recordings at Risk Program",
                    "Managed evaluation of Digitizing Hidden Collections: Amplifying Unheard Voices program",
                    "Co-authored multiple influential reports on software preservation and data curation",
                    "Implemented strategic documentation processes across multiple program areas"
                ]
            ),
            Experience(
                id=str(uuid.uuid4()),
                title="User Services Librarian",
                organization="Haverford College",
                period="2006-Present Role",
                description="Provided comprehensive user services and reference support to undergraduate students and faculty in a liberal arts college setting.",
                achievements=[
                    "Developed innovative user service programs",
                    "Enhanced library accessibility and user experience",
                    "Collaborated with academic departments on research support initiatives"
                ]
            ),
            Experience(
                id=str(uuid.uuid4()),
                title="CLIR Postdoctoral Fellow in Academic Libraries",
                organization="Bryn Mawr College",
                period="2004-2006",
                description="Conducted research on academic library services and digital humanities applications while contributing to library operations and strategic planning.",
                achievements=[
                    "Completed groundbreaking research on academic library services",
                    "Contributed to digital humanities initiatives",
                    "Developed expertise in library assessment and evaluation methods"
                ]
            ),
            Experience(
                id=str(uuid.uuid4()),
                title="Research Fellow - Theatre and Computer Modeling",
                organization="University of Warwick",
                period="1999-2004",
                description="Conducted interdisciplinary research combining theatre history with computational modeling approaches.",
                achievements=[
                    "Pioneered computational approaches to theatre historical research",
                    "Published research on dramatic literature and performance history",
                    "Developed innovative methodologies for humanities computing"
                ]
            )
        ])

        # Projects
        projects_data = ProjectsData(projects=[
            Project(
                id=str(uuid.uuid4()),
                title="Recordings at Risk Program Assessment",
                description="Led the design and implementation of a comprehensive two-year external assessment of CLIR's Recordings at Risk Program, working with Shift Collective to evaluate program effectiveness and impact.",
                technologies=["Program Evaluation", "Stakeholder Analysis", "Impact Assessment"],
                status="Ongoing - Report expected 2025",
                link="https://www.clir.org/2023/11/shift-collective-and-recordings-at-risk/"
            ),
            Project(
                id=str(uuid.uuid4()),
                title="Supporting Software Preservation Services",
                description="Co-authored comprehensive report examining software preservation challenges and opportunities in research and memory organizations, providing strategic recommendations for institutional planning.",
                technologies=["Software Preservation", "Research Analysis", "Strategic Planning"],
                status="Published 2022",
                link="https://www.clir.org/pubs/reports/supporting-software-preservation-services-in-research-and-memory-organizations/"
            ),
            Project(
                id=str(uuid.uuid4()),
                title="The Curated Futures Project",
                description="Co-edited major initiative exploring the future of cultural heritage institutions and their role in preserving and providing access to digital materials.",
                technologies=["Digital Curation", "Future Planning", "Cultural Heritage"],
                status="Published 2022",
                link="https://futures.clir.org/"
            ),
            Project(
                id=str(uuid.uuid4()),
                title="One Culture: Computationally Intensive Research",
                description="Co-authored influential report on computational research in humanities and social sciences, examining the intersection of traditional scholarship and computational methods.",
                technologies=["Digital Humanities", "Computational Research", "Interdisciplinary Studies"],
                status="Published 2012",
                link="https://www.clir.org/pubs/reports/pub151/"
            ),
            Project(
                id=str(uuid.uuid4()),
                title="National Digital Stewardship Residencies Assessment",
                description="Designed and conducted comprehensive assessment of the National Digital Stewardship Residencies program from 2013-2016, evaluating program outcomes and long-term impact.",
                technologies=["Program Assessment", "Digital Stewardship", "Career Development"],
                status="Published 2016, Updated 2018",
                link="https://www.clir.org/pubs/reports/pub173/pub173abst"
            ),
            Project(
                id=str(uuid.uuid4()),
                title="Terra Cognita: Graduate Students in the Archives",
                description="Led research project examining the experiences and needs of graduate students working in archives, providing insights for improving archival education and practice.",
                technologies=["Archival Research", "Graduate Education", "User Studies"],
                status="Published 2016",
                link="https://www.clir.org/pubs/reports/pub170/"
            )
        ])

        # Save all data to database
        print("Initializing portfolio data...")
        
        profile_success = await portfolio_db.update_profile(profile)
        skills_success = await portfolio_db.update_skills(skills)
        experience_success = await portfolio_db.update_experience_data(experience_data)
        projects_success = await portfolio_db.update_projects_data(projects_data)

        if all([profile_success, skills_success, experience_success, projects_success]):
            print("✅ Portfolio data initialized successfully!")
            print(f"   - Profile: {'✓' if profile_success else '✗'}")
            print(f"   - Skills: {'✓' if skills_success else '✗'}")
            print(f"   - Experience: {'✓' if experience_success else '✗'}")
            print(f"   - Projects: {'✓' if projects_success else '✗'}")
        else:
            print("❌ Some data initialization failed")
            print(f"   - Profile: {'✓' if profile_success else '✗'}")
            print(f"   - Skills: {'✓' if skills_success else '✗'}")
            print(f"   - Experience: {'✓' if experience_success else '✗'}")
            print(f"   - Projects: {'✓' if projects_success else '✗'}")

    except Exception as e:
        print(f"❌ Error initializing data: {e}")
    finally:
        await portfolio_db.close_db()

if __name__ == "__main__":
    asyncio.run(init_portfolio_data())
"""
FastAPI backend for PRD Assistant application.
This module provides endpoints for managing Product Requirements Documents.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Literal
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="PRD Assistant API",
    description="API for managing Product Requirements Documents",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class ReferenceLink(BaseModel):
    """Model for storing reference links and their features"""
    link: str = Field(..., description="URL of the reference")
    features: List[str] = Field(..., description="List of features from this reference")

class TechStack(BaseModel):
    """Model for storing technology stack details"""
    domain: str = Field(..., description="Domain where the project will be hosted")
    repo_name: str = Field(..., description="Repository name for the project")
    frontend_framework: str = Field(..., description="Frontend framework to be used")
    custom_frontend_framework: Optional[str] = Field(None, description="Custom frontend framework if 'Other' is selected")
    backend_framework: str = Field(..., description="Backend framework to be used")
    custom_backend_framework: Optional[str] = Field(None, description="Custom backend framework if 'Other' is selected")
    databases: List[str] = Field(..., description="List of databases to be used")
    team_members: List[str] = Field(..., description="List of team members")
    deployment_option: str = Field(..., description="Deployment option for the project")
    custom_deployment_option: Optional[str] = Field(None, description="Custom deployment option if 'Other' is selected")

class DatabaseField(BaseModel):
    """Model for database field definition"""
    name: str = Field(..., description="Name of the field")
    type: str = Field(..., description="Data type of the field")
    required: bool = Field(..., description="Whether the field is required")
    description: str = Field(..., description="Description of the field")

class DatabaseRelationship(BaseModel):
    """Model for database relationship definition"""
    table: str = Field(..., description="Name of the related table")
    type: Literal["one-to-one", "one-to-many", "many-to-many"] = Field(
        ..., description="Type of relationship"
    )

class DatabaseTable(BaseModel):
    """Model for database table definition"""
    name: str = Field(..., description="Name of the table")
    fields: List[DatabaseField] = Field(..., description="List of fields in the table")
    relationships: List[DatabaseRelationship] = Field(
        default_list=[],
        description="List of relationships with other tables"
    )

class DatabaseSchema(BaseModel):
    """Model for complete database schema"""
    tables: List[DatabaseTable] = Field(..., description="List of database tables")

class PRDData(BaseModel):
    """Model for complete PRD data"""
    project_name: str = Field(..., description="Name of the project")
    vision: str = Field(..., description="Vision statement for the project")
    reference_links: List[ReferenceLink] = Field(..., description="List of reference links")
    tech_stack: TechStack = Field(..., description="Technology stack details")
    database_schema: DatabaseSchema = Field(..., description="Database schema definition")
    user_stories: List[str] = Field(..., description="List of user stories")

# In-memory storage (replace with database in production)
prd_storage: Dict[str, PRDData] = {}

@app.get("/")
async def read_root():
    """Root endpoint to verify API is running"""
    logger.info("Root endpoint accessed")
    return {
        "status": "active",
        "message": "PRD Assistant API is running",
        "version": "1.0.0"
    }

@app.post("/prd/", response_model=PRDData)
async def create_prd(prd: PRDData):
    """Create a new PRD entry"""
    logger.info(f"Creating new PRD for project: {prd.project_name}")
    
    if prd.project_name in prd_storage:
        logger.warning(f"PRD already exists for project: {prd.project_name}")
        raise HTTPException(
            status_code=400,
            detail="A PRD with this project name already exists"
        )
    
    # Validate reference links
    for link in prd.reference_links:
        if not link.features:
            raise HTTPException(
                status_code=422,
                detail="Each reference link must have at least one feature"
            )

    # Validate tech stack
    if not prd.tech_stack.databases:
        raise HTTPException(
            status_code=422,
            detail="At least one database must be specified"
        )
    
    if not prd.tech_stack.team_members:
        raise HTTPException(
            status_code=422,
            detail="At least one team member must be specified"
        )

    # Validate database schema
    if not prd.database_schema.tables:
        raise HTTPException(
            status_code=422,
            detail="At least one database table must be defined"
        )

    for table in prd.database_schema.tables:
        if not table.fields:
            raise HTTPException(
                status_code=422,
                detail=f"Table '{table.name}' must have at least one field"
            )

    # Validate user stories
    if not prd.user_stories:
        raise HTTPException(
            status_code=422,
            detail="At least one user story must be specified"
        )

    prd_storage[prd.project_name] = prd
    logger.info(f"Successfully created PRD for project: {prd.project_name}")
    return prd

@app.get("/prd/{project_name}", response_model=PRDData)
async def get_prd(project_name: str):
    """Retrieve a PRD by project name"""
    logger.info(f"Retrieving PRD for project: {project_name}")
    
    if project_name not in prd_storage:
        logger.error(f"PRD not found for project: {project_name}")
        raise HTTPException(
            status_code=404,
            detail="PRD not found"
        )
    
    return prd_storage[project_name]

@app.put("/prd/{project_name}", response_model=PRDData)
async def update_prd(project_name: str, prd: PRDData):
    """Update an existing PRD"""
    logger.info(f"Updating PRD for project: {project_name}")
    
    if project_name not in prd_storage:
        logger.error(f"PRD not found for project: {project_name}")
        raise HTTPException(
            status_code=404,
            detail="PRD not found"
        )
    
    if project_name != prd.project_name:
        logger.error(f"Project name mismatch: {project_name} != {prd.project_name}")
        raise HTTPException(
            status_code=400,
            detail="Project name in URL does not match PRD data"
        )
    
    prd_storage[project_name] = prd
    logger.info(f"Successfully updated PRD for project: {project_name}")
    return prd

@app.delete("/prd/{project_name}")
async def delete_prd(project_name: str):
    """Delete a PRD"""
    logger.info(f"Deleting PRD for project: {project_name}")
    
    if project_name not in prd_storage:
        logger.error(f"PRD not found for project: {project_name}")
        raise HTTPException(
            status_code=404,
            detail="PRD not found"
        )
    
    del prd_storage[project_name]
    logger.info(f"Successfully deleted PRD for project: {project_name}")
    return {
        "status": "success",
        "message": f"PRD for {project_name} deleted"
    }

@app.get("/prd/{project_name}/export")
async def export_prd(project_name: str):
    """Export PRD data as JSON"""
    logger.info(f"Exporting PRD for project: {project_name}")
    
    if project_name not in prd_storage:
        logger.error(f"PRD not found for project: {project_name}")
        raise HTTPException(
            status_code=404,
            detail="PRD not found"
        )
    
    prd_data = prd_storage[project_name]
    export_data = {
        "project_name": prd_data.project_name,
        "vision": prd_data.vision,
        "reference_links": [{"link": ref.link, "features": ref.features} for ref in prd_data.reference_links],
        "tech_stack": prd_data.tech_stack.dict(),
        "database_schema": prd_data.database_schema.dict(),
        "user_stories": prd_data.user_stories,
        "exported_at": datetime.now().isoformat()
    }
    
    logger.info(f"Successfully exported PRD for project: {project_name}")
    return export_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

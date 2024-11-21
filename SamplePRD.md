Project Name: DMS (Document Management System)

Project Description:

DMS is a web-based Document Management System that provides role-based access control (RBAC) for document handling. It includes a FastAPI backend and a Next.js frontend, all orchestrated through Docker containers for seamless deployment.

1. GitHub Repository Setup
Repository Name: [DMS]

Repository Setup Steps:

Create a new GitHub repository
Currently, the repository for this project is hosted at Serendipity2-0/DMS where the code is version-controlled and maintained.

RBAC System Setup
We have implemented a basic RBAC (Role-Based Access Control) in the application backend for user roles and permissions.
Currently, the RBAC system is part of the application code. We have Admin, Managers, and Users roles.

Add and maintain README.md: https://github.com/Serendipity2-0/DMS/blob/dev/README.md This README file contains detailed instructions on how to set up, run, and contribute to the project.

Documentation of Tools/Libraries/Frameworks:
(Include links to documentation for primary tools, libraries, and frameworks used in this project. For example, Python, FastAPI, Next.js, Docker, etc.)

Python (3.11.x): Official Documentation
FastAPI: Documentation
Next.js: Documentation
Docker: Documentation
.gitignore Maintenance:
The .gitignore file excludes files and directories that should not be committed to the repository, such as:

kaas.env
Python cache files (*.pyc)
Compiled front-end assets
Node modules
Database files
requirements.txt Maintenance:
The requirements.txt file lists the Python dependencies for the backend, including versions: (Detailed dependencies are listed in requirements.txt already.)

Dependencies are automatically installed using pip install -r requirements.txt.
Link the repo to the GitHub project board
The repository issues and pull requests are managed using GitHub Projects for task tracking, bug tracking, and feature planning.
Link to the Github Project Board: https://github.com/users/Serendipity2-0/projects/4 If you don't have the access to the project board, contact the admin.

Branch Protection and Workflow

The main and dev branches are protected to avoid direct pushes.
All contributions must be made via pull requests against the dev branch.
Pull requests require at least one approval and passing CI checks before merging.
GitHub Actions (CI/CD Workflow)
The .github/workflows/docker-deploy.yml file contains the CI/CD pipeline:

Linting: We can either use flake8 or pylint for linting.
Testing: We can use pytest for unit testing.
CI/CD: On pushing to the dev branch, the workflow builds the Docker image and deploys it.
Rules for PRs and Commits

All commits should follow a specified format or convention.
Pull requests must pass all checks (tests, linting, etc.) before merging.
We can use pre-commit to run the linting and testing checks before committing. If you don't have the pre-commit installed, you can install it using pip install pre-commit. Contact the admin if you need help with the installation or the pre-commit configuration.
2. Communication System
Discord Webhooks Setup

The repository integrates Discord webhooks to send notifications for pull requests, commits, and merges to a designated Discord channel.
Notification to Users

Updates and notifications for new features or deployments are sent through the established Discord channel or via email.
We need to discuss on how to alert the users about the new features or deployments.
Telegram Channel for Team Communication

All the internal communications are done through the Telegram channel (Serendipity18).
All the updates and the tasks are discussed in the channel.
3. IDE Configuration
We use Cursor, Visual Studio Code, or PyCharm as the IDE for this project.

Cursor Rules:
Contact the admin for the Cursor rules.
Once the file is received, we can set up the Cursor settings.
4. Database
Database Selection:

This project uses SQLite for local development and production.
On we are confident about the DMS and we can migrate to POSTGRESQL once the project is completed.
Database Schema Design:

The schema is defined in db_utils.py, with the following tables:
User (stores user details, roles)
Role (stores different roles and their permissions)
Department (stores department details)
Database Hosting:

For production, the database is hosted using Docker volumes (rbac-db-volume).
We have also hosted the docs folder on the Docker volumes (rbac-docs-volume).
5. Testing
Unit Testing at Commit Level:

Each code commit should pass unit tests before it is pushed.
Create the test files in the tests folder.
Functional Testing at Pull Request Level:

Pull requests trigger functional tests via GitHub Actions.
Create the test files in the tests folder.
Integrate the test files into the CI/CD pipeline.
Integration Testing at Deployment Level:

Upon deployment to staging (triggered by push to dev), integration tests run to ensure everything works in a production-like environment.
6. Deployment
Deployment System:

The project uses Docker for containerization, and the CI/CD pipeline is defined in .github/workflows/docker-deploy.yml.
The application is deployed to a server using the pipeline triggered on push to dev.
Tunnel and Subdomain Setup:

We use Cloudflare or a similar service to manage DNS and tunnel connections for the subdomain:
dms.theserendipity.org
docs.theserendipity.org
Dockerfile and CI/CD Pipeline Setup:

The Dockerfile in the project root builds both the front-end and back-end.
GitHub Actions uses docker-deploy.yml to build, push, and run the Docker container on the self-hosted runner.
ACT for Local CI/CD Testing:

act can be used to test GitHub Actions locally:
brew install act
act
Refer the ACT documentation for more details.

7. Bug Tracker
We use the Issues tab in the GitHub repository as a bug tracker.
For each bug found:
Create a new issue with a descriptive title.
Fill out the issue template with steps to reproduce, expected behavior, and actual behavior.
The team can discuss and assign the issue to a milestone or project board.
Link the issue to the corresponding pull request and the project board.

Additional Information:
1. Implement shortcuts in app for quick access to the most used features.
2. Implement a search bar to search for any information in the app.
3. Implement a dark mode for the app.
4. Implement mobile friendly version of the app.
5. Implement Readme file using selected template.
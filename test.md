I need a simple webapp which assists with creation of detailed step by step interactive PRD, which assists user in rapid creation, development and deployment of a tech project.

The app flow is as follows:
1. User is asked to give a name of the project. ( String)
2. User is asked to give vision about the project. ( String)
3. User is asked to provide reference links for the project along with features from the reference links. ( Array of Dictionaries with keys as "link" and "features")
4. User is provided with a tech stack checklist to select the tech stack for the project.
   4.1 Domain details where the project will be hosted. ( String)
   4.2 Repo name for the project. ( String)
   4.3 Frontend framework for the project. ( Enum of ["NextJS", "React", "Vue", "Angular", "Svelte", "Ember", "Backbone", "Other"] or "Other" if other is selected then user is asked to provide the name of the framework)
   4.4 Backend framework for the project. ( Enum of ["FastAPI", "Django", "Flask", "Express", "Laravel", "Rails", "Other"] or "Other" if other is selected then user is asked to provide the name of the framework)
   4.5 Databases for the project. ( Array of Strings)
   4.6 Assign team members to the project. ( Array of Strings)
   4.7 Deployment options for the project. ( Enum of ["Docker", "Kubernetes", "Other"] or "Other" if other is selected then user is asked to provide the name of the deployment option)
5. User is asked relevant questions to arrive at database schema.
6. User is asked about user stories to decide an optimum frontend flow
7. User is provided with navigation button to edit the flow.
8. User is provided with save and Download button to save or download the flow.

Use fast api and nextjs to implement the above. 

Session 2:
2. Font color issue
3. Interactive view of existing projects with checklists and step by actionable instructions for each section with drill down for each section.


1. Please fix Font color issue throughout the app
2. Please make the Interactive view of existing prd page component with checklists and step by actionable instructions for each section with drill down for each section.
3. Make sure to implement all items from the prd json in the view
4. refer @/frontend/PRD/1732189748409-fms.json to implement the appropriate items for the checklist. Like how would l create a github repo and make first commit and push. Breakdown such that even a lay man implement the project and report back by checking each items from this prd checklist. 
Again make it interactive and fun
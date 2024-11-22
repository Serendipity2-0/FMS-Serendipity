/**
 * Validation utilities for PRD form data
 */
import { PRDData, ReferenceLink, TechStack, DatabaseSchema } from '@/types/prd';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate project information
 */
export const validateProjectInfo = (
  projectName?: string,
  vision?: string
): ValidationResult => {
  const errors: string[] = [];

  if (!projectName?.trim()) {
    errors.push('Project name is required');
  }

  if (!vision?.trim()) {
    errors.push('Project vision is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate reference links
 */
export const validateReferenceLinks = (links?: ReferenceLink[]): ValidationResult => {
  const errors: string[] = [];

  if (!links?.length) {
    errors.push('At least one reference link is required');
    return { isValid: false, errors };
  }

  links.forEach((link, index) => {
    if (!link.link?.trim()) {
      errors.push(`Reference link ${index + 1} URL is required`);
    }
    if (!link.features?.length || !link.features.some(f => f.trim())) {
      errors.push(`Reference link ${index + 1} must have at least one feature`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate tech stack
 */
export const validateTechStack = (techStack?: TechStack): ValidationResult => {
  const errors: string[] = [];

  if (!techStack) {
    errors.push('Tech stack information is required');
    return { isValid: false, errors };
  }

  if (!techStack.domain?.trim()) {
    errors.push('Domain is required');
  }

  if (!techStack.repo_name?.trim()) {
    errors.push('Repository name is required');
  }

  if (!techStack.frontend_framework?.trim()) {
    errors.push('Frontend framework is required');
  } else if (techStack.frontend_framework === 'Other' && !techStack.custom_frontend_framework?.trim()) {
    errors.push('Custom frontend framework name is required');
  }

  if (!techStack.backend_framework?.trim()) {
    errors.push('Backend framework is required');
  } else if (techStack.backend_framework === 'Other' && !techStack.custom_backend_framework?.trim()) {
    errors.push('Custom backend framework name is required');
  }

  if (!techStack.databases?.length || !techStack.databases.some(db => db.trim())) {
    errors.push('At least one database is required');
  }

  if (!techStack.team_members?.length || !techStack.team_members.some(member => member.trim())) {
    errors.push('At least one team member is required');
  }

  if (!techStack.deployment_option?.trim()) {
    errors.push('Deployment option is required');
  } else if (techStack.deployment_option === 'Other' && !techStack.custom_deployment_option?.trim()) {
    errors.push('Custom deployment option is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate database schema
 */
export const validateDatabaseSchema = (schema?: DatabaseSchema): ValidationResult => {
  const errors: string[] = [];

  if (!schema?.tables?.length) {
    errors.push('At least one database table is required');
    return { isValid: false, errors };
  }

  schema.tables.forEach((table, tableIndex) => {
    if (!table.name?.trim()) {
      errors.push(`Table ${tableIndex + 1} name is required`);
    }

    if (!table.fields?.length) {
      errors.push(`Table ${tableIndex + 1} must have at least one field`);
    } else {
      table.fields.forEach((field, fieldIndex) => {
        if (!field.name?.trim()) {
          errors.push(`Field ${fieldIndex + 1} in table ${table.name || tableIndex + 1} must have a name`);
        }
        if (!field.type?.trim()) {
          errors.push(`Field ${field.name || fieldIndex + 1} in table ${table.name || tableIndex + 1} must have a type`);
        }
      });
    }

    table.relationships?.forEach((rel, relIndex) => {
      if (!rel.table?.trim()) {
        errors.push(`Relationship ${relIndex + 1} in table ${table.name || tableIndex + 1} must specify a related table`);
      }
      if (!rel.type) {
        errors.push(`Relationship ${relIndex + 1} in table ${table.name || tableIndex + 1} must specify a relationship type`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate user stories
 */
export const validateUserStories = (stories?: string[]): ValidationResult => {
  const errors: string[] = [];

  if (!stories?.length || !stories.some(story => story.trim())) {
    errors.push('At least one user story is required');
  }

  stories?.forEach((story, index) => {
    if (!story.trim()) {
      errors.push(`User story ${index + 1} cannot be empty`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate complete PRD data
 */
export const validatePRDData = (data: Partial<PRDData>): ValidationResult => {
  const projectInfoValidation = validateProjectInfo(data.project_name, data.vision);
  const referenceLinksValidation = validateReferenceLinks(data.reference_links);
  const techStackValidation = validateTechStack(data.tech_stack);
  const databaseSchemaValidation = validateDatabaseSchema(data.database_schema);
  const userStoriesValidation = validateUserStories(data.user_stories);

  const errors = [
    ...projectInfoValidation.errors,
    ...referenceLinksValidation.errors,
    ...techStackValidation.errors,
    ...databaseSchemaValidation.errors,
    ...userStoriesValidation.errors,
  ];

  return {
    isValid: errors.length === 0,
    errors,
  };
};

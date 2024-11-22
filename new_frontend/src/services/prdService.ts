/**
 * Service for managing PRD storage and retrieval operations
 */
import { PRDData } from '../types/prd';
import { promises as fs } from 'fs';
import path from 'path';

const PRD_FOLDER = path.join(process.cwd(), 'PRD');

export class PRDService {
  /**
   * Save a new PRD document
   * @param prdData The PRD data to save
   * @returns The saved PRD with its ID
   */
  static async savePRD(prdData: PRDData): Promise<PRDData & { id: string }> {
    try {
      // Create PRD folder if it doesn't exist
      await fs.mkdir(PRD_FOLDER, { recursive: true });
      
      const id = `${Date.now()}-${prdData.project_name.toLowerCase().replace(/\s+/g, '-')}`;
      const prdWithId = { ...prdData, id };
      
      await fs.writeFile(
        path.join(PRD_FOLDER, `${id}.json`),
        JSON.stringify(prdWithId, null, 2)
      );
      
      console.log(`Successfully saved PRD: ${id}`);
      return prdWithId;
    } catch (error) {
      console.error('Error saving PRD:', error);
      throw new Error('Failed to save PRD');
    }
  }

  /**
   * Retrieve all saved PRDs
   * @returns Array of saved PRDs
   */
  static async getAllPRDs(): Promise<(PRDData & { id: string })[]> {
    try {
      await fs.mkdir(PRD_FOLDER, { recursive: true });
      const files = await fs.readdir(PRD_FOLDER);
      
      const prds = await Promise.all(
        files
          .filter(file => file.endsWith('.json'))
          .map(async file => {
            const content = await fs.readFile(path.join(PRD_FOLDER, file), 'utf-8');
            return JSON.parse(content);
          })
      );
      
      console.log(`Retrieved ${prds.length} PRDs`);
      return prds;
    } catch (error) {
      console.error('Error retrieving PRDs:', error);
      throw new Error('Failed to retrieve PRDs');
    }
  }

  /**
   * Get a specific PRD by ID
   * @param id The PRD ID
   * @returns The PRD data if found
   */
  static async getPRDById(id: string): Promise<(PRDData & { id: string }) | null> {
    try {
      const filePath = path.join(PRD_FOLDER, `${id}.json`);
      const content = await fs.readFile(filePath, 'utf-8');
      console.log(`Retrieved PRD: ${id}`);
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error retrieving PRD ${id}:`, error);
      return null;
    }
  }
}

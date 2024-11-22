/**
 * API route for handling PRD implementation data
 */
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { PRDImplementation } from '../../../../types/implementation';

const IMPLEMENTATIONS_DIR = path.join(process.cwd(), 'PRDImplementation');

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure directory exists
    await fs.mkdir(IMPLEMENTATIONS_DIR, { recursive: true });

    const filePath = path.join(IMPLEMENTATIONS_DIR, `${params.id}.json`);
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      const implementation = JSON.parse(fileContent);
      return NextResponse.json(implementation);
    } catch (fileError) {
      console.log(`Implementation file not found for ID: ${params.id}`);
      // If file doesn't exist, return 404
      return new NextResponse(null, { status: 404 });
    }
  } catch (error) {
    console.error('Error accessing implementation directory:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to access implementation data' }), 
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Ensure directory exists
    await fs.mkdir(IMPLEMENTATIONS_DIR, { recursive: true });

    const implementation: PRDImplementation = await request.json();
    const filePath = path.join(IMPLEMENTATIONS_DIR, `${params.id}.json`);
    
    await fs.writeFile(filePath, JSON.stringify(implementation, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving implementation:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to save implementation data' }), 
      { status: 500 }
    );
  }
}

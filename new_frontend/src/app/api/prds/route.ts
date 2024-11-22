/**
 * API routes for PRD operations
 */
import { NextResponse } from 'next/server';
import { PRDService } from '../../../services/prdService';

/**
 * GET /api/prds
 * Retrieve all PRDs
 */
export async function GET() {
  try {
    const prds = await PRDService.getAllPRDs();
    return NextResponse.json(prds);
  } catch (error) {
    console.error('Error in GET /api/prds:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve PRDs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/prds
 * Save a new PRD
 */
export async function POST(request: Request) {
  try {
    const prdData = await request.json();
    const savedPRD = await PRDService.savePRD(prdData);
    return NextResponse.json(savedPRD);
  } catch (error) {
    console.error('Error in POST /api/prds:', error);
    return NextResponse.json(
      { error: 'Failed to save PRD' },
      { status: 500 }
    );
  }
}

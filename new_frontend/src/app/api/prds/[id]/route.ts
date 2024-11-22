/**
 * API route for individual PRD operations
 */
import { NextResponse } from 'next/server';
import { PRDService } from '../../../../services/prdService';

/**
 * GET /api/prds/[id]
 * Retrieve a specific PRD by ID
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const prd = await PRDService.getPRDById(params.id);
    
    if (!prd) {
      return NextResponse.json(
        { error: 'PRD not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(prd);
  } catch (error) {
    console.error(`Error in GET /api/prds/${params.id}:`, error);
    return NextResponse.json(
      { error: 'Failed to retrieve PRD' },
      { status: 500 }
    );
  }
}

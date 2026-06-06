import { supabase } from './supabase';

export interface MemorySubmission {
  id: string;
  wish: string;
  decade: string;
  timestamp: string;
  ipAddress?: string;
}

export interface PaginatedSubmissions {
  submissions: MemorySubmission[];
  total: number;
  page: number;
  limit: number;
}

// Fetch approved submissions from Supabase
export async function getApprovedSubmissions(page = 1, limit = 20): Promise<PaginatedSubmissions> {
  try {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    // Get the total count
    const { count, error: countError } = await supabase
      .from('memory_wall')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');

    if (countError) throw countError;

    // Fetch the paginated slice
    const { data, error } = await supabase
      .from('memory_wall')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) throw error;

    const mappedSubmissions = (data || []).map(row => ({
      id: row.id,
      wish: row.wish,
      decade: row.decade,
      timestamp: row.created_at,
    }));

    return {
      submissions: mappedSubmissions,
      total: count || 0,
      page,
      limit,
    };
  } catch (error) {
    console.error('Failed to fetch from Supabase Memory Wall:', error);
    return {
      submissions: [],
      total: 0,
      page,
      limit,
    };
  }
}

// Save a new submission using Supabase
export async function submitMemory(wish: string, decade: string, ipAddress?: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('memory_wall')
      .insert({
        wish,
        decade,
        ip_address: ipAddress || 'unknown',
        status: 'approved', // Auto-approving for now
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to submit to Supabase Memory Wall:', error);
    return false;
  }
}

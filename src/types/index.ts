export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: string;
    page?: number;
    limit?: number;
    total?: number;
  };
}

export type CategorySlug = 'chains' | 'rings' | 'bracelets' | 'necklaces' | 'watches' | 'bijoux';

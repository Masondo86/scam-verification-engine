export type SupabaseInsertClient = {
  from: (table: string) => {
    insert: (payload: Record<string, unknown>) => Promise<void>;
  };
};

export function createServerSupabaseClient(): SupabaseInsertClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return {
    from: (table: string) => ({
      insert: async (payload: Record<string, unknown>) => {
        await fetch(`${url}/rest/v1/${table}`, {
          method: 'POST',
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(payload),
        });
      },
    }),
  };
}

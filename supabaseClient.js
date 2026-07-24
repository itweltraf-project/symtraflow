/* Symtraflow - Supabase Realtime Client Integration */

// Global Supabase Credentials configuration
// Replace these with your actual Supabase URL & Anon Key from Supabase Dashboard -> Settings -> API
window.SUPABASE_CONFIG = window.SUPABASE_CONFIG || {
  url: '', // Example: 'https://xyzcompany.supabase.co'
  anonKey: '' // Example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

let supabaseClient = null;

// Initialize Supabase Client safely
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const url = window.SUPABASE_CONFIG.url;
  const key = window.SUPABASE_CONFIG.anonKey;

  if (url && key && url.startsWith('http') && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      console.log('⚡ Connected to Supabase Realtime Database!');
    } catch (err) {
      console.warn('⚠️ Supabase Initialization Notice:', err);
    }
  }
  return supabaseClient;
}

// Check if Supabase connection is active
function isSupabaseConfigured() {
  return getSupabaseClient() !== null;
}

// Fetch all production orders from Supabase
async function fetchOrdersFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('orders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to fetch orders from Supabase:', err);
    return null;
  }
}

// Create new order in Supabase
async function createOrderInSupabase(orderData) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('orders').insert([orderData]).select();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to insert order to Supabase:', err);
    return null;
  }
}

// Update order progress in Supabase
async function updateOrderInSupabase(orderId, updates) {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client.from('orders').update(updates).eq('id', orderId).select();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Failed to update order in Supabase:', err);
    return null;
  }
}

// Subscribe to Supabase Realtime changes
function subscribeSupabaseRealtime(onOrdersUpdate, onActivityUpdate) {
  const client = getSupabaseClient();
  if (!client) return;

  client
    .channel('public:orders')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, payload => {
      console.log('⚡ Realtime Order Change received from Supabase:', payload);
      if (onOrdersUpdate) onOrdersUpdate(payload);
    })
    .subscribe();

  client
    .channel('public:activity_logs')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'activity_logs' }, payload => {
      console.log('⚡ Realtime Activity Log received from Supabase:', payload);
      if (onActivityUpdate) onActivityUpdate(payload.new);
    })
    .subscribe();
}

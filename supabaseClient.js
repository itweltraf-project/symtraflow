/* Symtraflow - Supabase Realtime Global Client & Cloud Database Engine */

// Global Supabase Credentials configuration
// Ganti nilai url dan anonKey di bawah ini dengan kredensial Supabase Project Anda (Project Settings -> API)
window.SUPABASE_CONFIG = window.SUPABASE_CONFIG || {
  url: '',      // Contoh: 'https://xyzcompany.supabase.co'
  anonKey: ''   // Contoh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

// Check localStorage for runtime configured credentials
(function loadStoredSupabaseConfig() {
  try {
    const savedUrl = localStorage.getItem('SYMTRAFLOW_SUPABASE_URL');
    const savedKey = localStorage.getItem('SYMTRAFLOW_SUPABASE_KEY');
    if (savedUrl && !window.SUPABASE_CONFIG.url) window.SUPABASE_CONFIG.url = savedUrl;
    if (savedKey && !window.SUPABASE_CONFIG.anonKey) window.SUPABASE_CONFIG.anonKey = savedKey;
  } catch (e) {}
})();

let supabaseClient = null;

// Initialize Supabase Client safely
function getSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  const url = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || localStorage.getItem('SYMTRAFLOW_SUPABASE_URL') || '';
  const key = (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || localStorage.getItem('SYMTRAFLOW_SUPABASE_KEY') || '';

  if (url && key && url.startsWith('http') && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key, {
        realtime: {
          params: {
            eventsPerSecond: 10
          }
        }
      });
      console.log('⚡ Connected to Supabase Cloud Database:', url);
    } catch (err) {
      console.warn('⚠️ Supabase Client Init Notice:', err);
    }
  }
  return supabaseClient;
}

// Check if Supabase connection is active
function isSupabaseConfigured() {
  return getSupabaseClient() !== null;
}

/* ==========================================================================
   GLOBAL REALTIME CLOUD SYNCHRONIZATION ENGINE
   ========================================================================== */
window.SymtraGlobalSync = {
  isConfigured: isSupabaseConfigured,

  /**
   * Menyimpan data secara global ke Cloud Supabase & LocalStorage lokal
   * @param {string} key Nama kunci storage (e.g. 'SYMTRAFLOW_PT_PROJECTS')
   * @param {any} data Objek/Array data yang disimpan
   * @param {string} label Deskripsi aksi untuk notifikasi
   */
  async save(key, data, label = '') {
    // 1. Simpan ke LocalStorage agar UI instan dan responsif
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}

    // 2. Broadcast lokal antar tab di browser yang sama
    if (window.SymtraSync && typeof window.SymtraSync.broadcast === 'function') {
      window.SymtraSync.broadcast('PRODUCTION_DATA_UPDATED', {
        action: 'STORAGE_CHANGE',
        key: key,
        desc: label || `Pembaruan data ${key}`
      });
    }

    // 3. Simpan secara global ke Supabase Database
    const client = getSupabaseClient();
    if (!client) {
      console.warn(`⚠️ Supabase Cloud belum terhubung. Perubahan [${key}] hanya tersimpan lokal.`);
      return false;
    }

    try {
      let authUser = {};
      try {
        authUser = JSON.parse(sessionStorage.getItem('SYMTRAFLOW_AUTH_USER') || '{}');
      } catch (e) {}
      const updatedBy = authUser.name || authUser.username || 'User';

      const { error } = await client
        .from('symtraflow_global_data')
        .upsert({
          key: key,
          data: data,
          updated_at: new Date().toISOString(),
          updated_by: updatedBy
        }, { onConflict: 'key' });

      if (error) {
        console.error(`❌ Gagal menyimpan [${key}] ke Supabase Cloud:`, error);
        return false;
      }

      console.log(`☁️ Berhasil tersinkronisasi global ke Supabase: [${key}] oleh ${updatedBy}`);
      return true;
    } catch (err) {
      console.error(`Error saving ${key} to Supabase:`, err);
      return false;
    }
  },

  /**
   * Membaca satu kunci data dari Cloud Supabase
   */
  async get(key) {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('symtraflow_global_data')
        .select('data')
        .eq('key', key)
        .single();

      if (error) return null;
      return data ? data.data : null;
    } catch (err) {
      return null;
    }
  },

  /**
   * Mengunduh seluruh data global dari Cloud Supabase saat aplikasi dibuka
   */
  async loadAll() {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('symtraflow_global_data')
        .select('*');

      if (error) {
        console.warn('Gagal membaca data global dari Supabase:', error);
        return null;
      }

      if (Array.isArray(data) && data.length > 0) {
        data.forEach(row => {
          if (row.key && row.data !== undefined) {
            try {
              localStorage.setItem(row.key, JSON.stringify(row.data));
            } catch (e) {}
          }
        });
        console.log(`⚡ Berhasil memuat ${data.length} modul data dari Cloud Supabase!`);
        return data;
      } else {
        // Jika database cloud masih kosong, lakukan migrasi data lokal yang ada ke cloud
        await this.syncInitialDataToCloud();
      }
    } catch (err) {
      console.error('Error fetching global data from Supabase:', err);
    }
    return null;
  },

  /**
   * Mengunggah data lokal yang ada saat ini ke cloud jika belum ada di database cloud
   */
  async syncInitialDataToCloud() {
    const client = getSupabaseClient();
    if (!client) return;

    const keysToSync = [
      'SYMTRAFLOW_PT_PROJECTS',
      'SYMTRAFLOW_UNITS_DATA_V7',
      'SYMTRAFLOW_ERP_SALES_ORDERS_V2',
      'SYMTRAFLOW_FAT_SCHEDULES_V3',
      'SYMTRAFLOW_MONITORING_MATERIALS_V1',
      'SYMTRAFLOW_ERP_PRODUKSI_UNITS_V1',
      'SYMTRAFLOW_ERP_SHIPMENTS_V1',
      'SYMTRAFLOW_MASTER_DATA_V2',
      'SYMTRAFLOW_USERS_V2'
    ];

    for (const key of keysToSync) {
      try {
        const localVal = localStorage.getItem(key);
        if (localVal) {
          const parsed = JSON.parse(localVal);
          if (parsed) {
            await this.save(key, parsed, `Migrasi awal ${key} ke Cloud`);
          }
        }
      } catch (e) {}
    }
  },

  /**
   * Mendaftarkan listener WebSocket Realtime agar jika ada user lain mengupdate data,
   * layar semua user lain langsung terupdate secara otomatis dan seketika.
   */
  subscribeRealtime(onDataChanged) {
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const channel = client
        .channel('symtraflow_global_realtime_channel')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'symtraflow_global_data'
        }, payload => {
          console.log('📡 Realtime Cloud update diterima dari user lain:', payload);
          const newRow = payload.new;
          if (newRow && newRow.key) {
            try {
              localStorage.setItem(newRow.key, JSON.stringify(newRow.data));
            } catch (e) {}

            if (typeof onDataChanged === 'function') {
              onDataChanged(newRow.key, newRow.data, newRow.updated_by);
            }
          }
        })
        .subscribe((status) => {
          console.log('📡 Status Langganan Supabase Realtime Global:', status);
        });

      return channel;
    } catch (err) {
      console.warn('Gagal berlangganan ke Supabase Realtime:', err);
      return null;
    }
  }
};

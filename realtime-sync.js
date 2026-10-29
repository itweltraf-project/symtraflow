/**
 * SYMTRAFLOW - REALTIME SYNCHRONIZATION ENGINE & RBAC (Role-Based Access Control)
 * Memastikan sinkronisasi instan antara Website Portal Admin & Master Data
 * dengan Website Monitoring Produksi secara realtime melalui BroadcastChannel,
 * LocalStorage storage event, dan Supabase Realtime (bila aktif).
 */

const SYMTRAFLOW_SYNC_CHANNEL_NAME = 'symtraflow_realtime_sync_v2';
const STORAGE_USERS_KEY = 'SYMTRAFLOW_USERS_V2';
const STORAGE_LEGACY_USERS_KEY = 'SYMTRAFLOW_USERS';
const STORAGE_MASTER_DATA_KEY = 'SYMTRAFLOW_MASTER_DATA_V2';
const STORAGE_SYNC_LOGS_KEY = 'SYMTRAFLOW_SYNC_LOGS';
const STORAGE_AUTH_SESSION_KEY = 'SYMTRAFLOW_AUTH_USER';

// Default Master Data
const DEFAULT_MASTER_DATA = {
  pelanggan: [
    { code: 'CUST-01', name: 'PT Indobara Energi Utama', sector: 'Mining & Power Generation', city: 'Samarinda', contact: 'Ir. Hendra (0541-7412345)', orders: '8 Unit' },
    { code: 'CUST-02', name: 'PT Cikarang Listrindo Tbk', sector: 'Industrial Estate IPP', city: 'Bekasi', contact: 'Ibu Ratna (021-8934567)', orders: '4 Unit' },
    { code: 'CUST-03', name: 'PT Krakatau Posco', sector: 'Steel Industry', city: 'Cilegon', contact: 'Bpk. Tri Wahyudi (0254-371290)', orders: '2 Unit' },
    { code: 'CUST-04', name: 'PT Semen Indonesia Group', sector: 'Industrial Manufacturing', city: 'Gresik', contact: 'Ir. Bambang (031-3981732)', orders: '5 Unit' },
    { code: 'CUST-05', name: 'PT Semen Indonesia', sector: 'Industrial Manufacturing', city: 'Gresik', contact: 'Ir. Bambang (031-3981732)', orders: '2 Unit' }
  ],
  trafo: [
    { model: 'TRF-DIS-250', type: 'Trafo Distribusi', cap: '250 kVA', volt: '20 kV / 400 V', cooling: 'ONAN (Minyak Mineral)', standard: 'SPLN D3.002-1' },
    { model: 'TRF-DIS-500', type: 'Trafo Distribusi', cap: '500 kVA', volt: '20 kV / 400 V', cooling: 'ONAN (Hermetically Sealed)', standard: 'IEC 60076' },
    { model: 'TRF-DIS-1000', type: 'Trafo Distribusi', cap: '1000 kVA', volt: '20 kV / 400 V', cooling: 'ONAN Tier-2 Low Loss', standard: 'SPLN D3.002-1' },
    { model: 'TRF-PWR-2500', type: 'Trafo Tenaga / Daya', cap: '2500 kVA', volt: '20 kV / 6.6 kV', cooling: 'ONAF with Radiator Fans', standard: 'IEC 60076' },
    { model: 'TRF-PWR-20MVA', type: 'Power Transformer', cap: '20 MVA', volt: '150 kV / 20 kV', cooling: 'ONAF / OFAF Substation', standard: 'IEEE C57.12' }
  ],
  proses: [
    { step: 1, code: 'TANK MAKING', name: 'Tank Making', dept: 'Fabrikasi', desc: 'Pemotongan, pembentukan plat, pengelasan & uji kebocoran tangki trafo', cycle: '3 Hari', icon: 'fa-box-open' },
    { step: 2, code: 'CORE MAKING', name: 'Core Making', dept: 'Core Stacking', desc: 'Pemotongan & penyusunan plat silikon baja CRGO dengan presisi tinggi', cycle: '2 Hari', icon: 'fa-layer-group' },
    { step: 3, code: 'COIL MAKING', name: 'Coil Making', dept: 'Winding', desc: 'Penggulungan kawat tembaga enamel lapis isolasi paper/nomex (LV & HV)', cycle: '4 Hari', icon: 'fa-scroll' },
    { step: 4, code: 'ASSEMBLY', name: 'Assembly', dept: 'Perakitan', desc: 'Pemasangan kumparan ke inti besi & insulasi fasa', cycle: '2 Hari', icon: 'fa-wrench' },
    { step: 5, code: 'CONNECTION', name: 'Connection', dept: 'Wiring & Tap', desc: 'Penyambungan tap changer, terminal lead, dan bushing', cycle: '1 Hari', icon: 'fa-diagram-project' },
    { step: 6, code: 'FINAL ASSEMBLY', name: 'Final Assembly', dept: 'Oven & Tanking', desc: 'Pengeringan ruang vakum dan pemasangan trafo ke dalam tangki', cycle: '2 Hari', icon: 'fa-cubes' },
    { step: 7, code: 'INTERNAL TEST', name: 'Internal Test', dept: 'Testing Lab', desc: 'Pengujian rasio tegangan, polaritas, dan tahanan isolasi Megger', cycle: '1 Hari', icon: 'fa-file-signature' },
    { step: 8, code: 'FINISHING', name: 'Finishing', dept: 'Painting', desc: 'Sandblasting, pelapisan primer epoxy, dan pengecatan polyurethane', cycle: '2 Hari', icon: 'fa-spray-can' },
    { step: 9, code: 'FAT', name: 'FAT', dept: 'Quality Control', desc: 'Factory Acceptance Test & pengujian saksi langsung bersama pihak pelanggan/PLN', cycle: '1 Hari', icon: 'fa-clipboard-check' },
    { step: 10, code: 'PUNCHLIST', name: 'Punchlist', dept: 'QC & Engineering', desc: 'Penyelesaian daftar catatan/temuan uji FAT sebelum serah terima unit', cycle: '1 Hari', icon: 'fa-list-check' },
    { step: 11, code: 'DELIVERY', name: 'Delivery', dept: 'Logistik', desc: 'Pengisian oli trafo, sealing, pemasangan proteksi & pengiriman ke lokasi pelanggan', cycle: '1 Hari', icon: 'fa-truck-fast' }
  ],
  material: [
    { code: 'MAT-CU-01', name: 'Kawat Tembaga Enamel Kelas H', spec: '99.9% Cu ETP, Suhu 180°C', stock: '4,850 kg', uom: 'Kilogram', status: 'Aman' },
    { code: 'MAT-CRGO-02', name: 'Silicon Steel CRGO M4/0.27', spec: 'Grain-oriented low core loss', stock: '12,400 kg', uom: 'Kilogram', status: 'Aman' },
    { code: 'MAT-OIL-03', name: 'Minyak Trafo Nytro Taurus', spec: 'IEC 60296 Uninhibited, BDV > 70kV', stock: '8,500 Liter', uom: 'Liter', status: 'Aman' },
    { code: 'MAT-BSH-04', name: 'Bushing HV Porselen 24 kV', spec: 'DIN 42531 Standard outdoor', stock: '64 Pcs', uom: 'Pcs', status: 'Cukup' },
    { code: 'MAT-BSH-05', name: 'Bushing LV 1 kV / 1000A', spec: 'DIN 42530 Standard copper stud', stock: '96 Pcs', uom: 'Pcs', status: 'Aman' },
    { code: 'MAT-RAD-06', name: 'Radiator Fin Panel 1200x520', spec: 'Ketebalan 1.2mm Cold Rolled Steel', stock: '180 Pcs', uom: 'Pcs', status: 'Aman' }
  ],
  pic: [
    { id: 'EMP-101', name: 'I Wayan Eva Verdiana', role: 'Supervisor Produksi & Assembly', dept: 'Produksi', status: 'Aktif' },
    { id: 'EMP-102', name: 'Shevira Indraswari', role: 'Quality Control & FAT Engineer', dept: 'QC Lab', status: 'Aktif' },
    { id: 'EMP-103', name: 'Willi Syukran', role: 'Electrical Design & Core Specialist', dept: 'Engineering', status: 'Aktif' },
    { id: 'EMP-104', name: 'Cassa Vita Sari', role: 'Planning & Material Controller', dept: 'PPIC', status: 'Aktif' },
    { id: 'EMP-105', name: 'Budi Santoso', role: 'Lead Technician HV Winding', dept: 'Workshop', status: 'Aktif' },
    { id: 'ADM-001', name: 'Administrator', role: 'Super Administrator ERP', dept: 'IT & System', status: 'Online' }
  ]
};

// Default Admins with granular RBAC permissions
const DEFAULT_ADMINS = [
  {
    id: 'usr_superadmin',
    username: 'Jodi',
    name: 'Super Administrator',
    pass: 'symphos1011',
    role: 'Super Admin',
    rolePreset: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    permissions: {
      all: true,
      proyek_edit: true,
      produksi_edit: true,
      pengiriman_edit: true,
      doc_edit: true,
      master_edit: true,
      admin_edit: true
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'usr_admin_so',
    username: 'admin1',
    name: 'Admin Proyek SO (Hendra Pratama)',
    pass: 'admin123',
    role: 'Admin Proyek SO',
    rolePreset: 'admin_so',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    permissions: {
      all: false,
      proyek_edit: true,
      produksi_edit: false,
      pengiriman_edit: false,
      doc_edit: false,
      master_edit: false,
      admin_edit: false
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'usr_admin_prod',
    username: 'admin2',
    name: 'Admin Produksi (I Wayan Eva)',
    pass: 'admin123',
    role: 'Admin Produksi',
    rolePreset: 'admin_produksi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    permissions: {
      all: false,
      proyek_edit: false,
      produksi_edit: true,
      pengiriman_edit: false,
      doc_edit: false,
      master_edit: false,
      admin_edit: false
    },
    updatedAt: new Date().toISOString()
  },
  {
    id: 'usr_admin_legacy',
    username: 'Admin',
    name: 'Administrator Produksi',
    pass: 'admin123',
    role: 'Admin Produksi',
    rolePreset: 'admin_produksi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    permissions: {
      all: false,
      proyek_edit: false,
      produksi_edit: true,
      pengiriman_edit: false,
      doc_edit: false,
      master_edit: false,
      admin_edit: false
    },
    updatedAt: new Date().toISOString()
  }
];

// BroadcastChannel instance
let syncChannel = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    syncChannel = new BroadcastChannel(SYMTRAFLOW_SYNC_CHANNEL_NAME);
  }
} catch (e) {
  console.warn('BroadcastChannel not supported in this environment:', e);
}

// Event Listeners Registry
const syncListeners = {
  users: [],
  master: [],
  production: [],
  general: []
};

/**
 * Inisialisasi Realtime Sync Engine
 */
function initRealtimeSync(options = {}) {
  // Ensure default data exists
  getAllAdmins();
  getAllMasterData();

  // Listen to BroadcastChannel
  if (syncChannel) {
    syncChannel.onmessage = (event) => {
      handleIncomingSyncMessage(event.data);
    };
  }

  // Listen to LocalStorage cross-tab events as fallback
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_USERS_KEY || event.key === STORAGE_LEGACY_USERS_KEY) {
      notifyListeners('users', getAllAdmins());
    } else if (event.key === STORAGE_MASTER_DATA_KEY) {
      notifyListeners('master', getAllMasterData());
    } else if (event.key === 'SYMTRAFLOW_LAST_SYNC') {
      try {
        const item = JSON.parse(event.newValue || '{}');
        if (item.type === 'PRODUCTION_DATA_UPDATED' || item.type === 'STAGE_CHANGED') {
          notifyListeners('production', item.payload);
        } else if (item.type === 'USERS_UPDATED') {
          notifyListeners('users', item.payload || getAllAdmins());
        } else if (item.type === 'MASTER_DATA_UPDATED') {
          notifyListeners('master', item.payload?.data || getAllMasterData());
        }
      } catch (e) {}
    } else if (event.key && (
      event.key === 'SYMTRAFLOW_ORDERS_V1' ||
      event.key === 'SYMTRAFLOW_PT_PROJECTS' ||
      event.key === 'SYMTRAFLOW_ERP_SALES_ORDERS_V2' ||
      event.key === 'SYMTRAFLOW_ERP_PRODUKSI_UNITS_V1' ||
      event.key === 'SYMTRAFLOW_ERP_SHIPMENTS_V1' ||
      event.key === 'SYMTRAFLOW_FAT_SCHEDULES_V3' ||
      event.key === 'SYMTRAFLOW_UNITS_DATA_V7'
    )) {
      notifyListeners('production', { key: event.key, action: 'STORAGE_CHANGE', desc: 'Pembaruan data produksi' });
    }
  });

  console.log('⚡ Symtraflow Realtime Sync & RBAC Engine initialized.');
}

function handleIncomingSyncMessage(data) {
  if (!data || !data.type) return;

  console.log('📡 Realtime Sync Message received:', data.type, data);

  switch (data.type) {
    case 'USERS_UPDATED':
      notifyListeners('users', data.payload);
      break;
    case 'MASTER_DATA_UPDATED':
      notifyListeners('master', data.payload);
      break;
    case 'PRODUCTION_DATA_UPDATED':
    case 'STAGE_CHANGED':
      notifyListeners('production', data.payload);
      break;
    case 'SYNC_PING':
      if (syncChannel) {
        syncChannel.postMessage({
          type: 'SYNC_PONG',
          sender: window.location.pathname,
          time: Date.now()
        });
      }
      break;
    default:
      notifyListeners('general', data);
      break;
  }
}

function notifyListeners(category, payload) {
  if (syncListeners[category]) {
    syncListeners[category].forEach(fn => {
      try { fn(payload); } catch (err) { console.error('Listener callback error:', err); }
    });
  }
}

function subscribeSync(category, callback) {
  if (syncListeners[category]) {
    syncListeners[category].push(callback);
  }
}

function broadcastSync(type, payload) {
  const message = {
    type,
    payload,
    sender: window.location.pathname,
    timestamp: new Date().toISOString()
  };

  // 1. BroadcastChannel (Instant 0ms across tabs)
  if (syncChannel) {
    try {
      syncChannel.postMessage(message);
    } catch (e) {
      console.warn('Failed to broadcast via channel:', e);
    }
  }

  // 2. Trigger storage event for tabs
  localStorage.setItem('SYMTRAFLOW_LAST_SYNC', JSON.stringify({ type, timestamp: Date.now() }));

  // 3. Log to Sync Audit Logs
  logSyncActivity(type, payload);
}

function logSyncActivity(type, detail) {
  try {
    let logs = JSON.parse(localStorage.getItem(STORAGE_SYNC_LOGS_KEY) || '[]');
    logs.unshift({
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      type,
      title: formatLogTitle(type, detail),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      date: new Date().toLocaleDateString('id-ID'),
      sender: window.location.pathname.includes('admin') ? 'Admin Portal' : 'Monitoring Produksi'
    });
    // Keep max 50 logs
    if (logs.length > 50) logs = logs.slice(0, 50);
    localStorage.setItem(STORAGE_SYNC_LOGS_KEY, JSON.stringify(logs));
  } catch (e) {}
}

function formatLogTitle(type, detail) {
  if (type === 'USERS_UPDATED') {
    return 'Pembaruan Data Akun Admin & Hak Akses Realtime';
  } else if (type === 'MASTER_DATA_UPDATED') {
    const mod = detail?.module || 'Semua Modul';
    return `Sinkronisasi Master Data: ${mod}`;
  } else if (type === 'PRODUCTION_DATA_UPDATED') {
    const desc = detail?.desc || detail?.action || 'Pembaruan Data Produksi';
    return `Sinkronisasi Monitoring: ${desc}`;
  } else if (type === 'STAGE_CHANGED') {
    return `Progress Produksi: Unit ${detail?.unitNo || ''} pindah ke ${detail?.stage || ''}`;
  }
  return `Sinkronisasi Sistem (${type})`;
}

/* ==========================================================================
   ADMIN & RBAC DATA MANAGEMENT
   ========================================================================== */

/**
 * Mengambil semua daftar admin dari LocalStorage (dengan fallback ke default)
 */
function getAllAdmins() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}

  // Migrate from legacy SYMTRAFLOW_USERS if exists
  try {
    const legacyRaw = localStorage.getItem(STORAGE_LEGACY_USERS_KEY);
    if (legacyRaw) {
      const leg = JSON.parse(legacyRaw);
      const migrated = [...DEFAULT_ADMINS];
      if (leg.superadmin) {
        migrated[0].username = leg.superadmin.username || migrated[0].username;
        migrated[0].name = leg.superadmin.name || migrated[0].name;
        migrated[0].pass = leg.superadmin.pass || migrated[0].pass;
        migrated[0].avatar = leg.superadmin.avatar || migrated[0].avatar;
      }
      if (leg.admin) {
        migrated[3].username = leg.admin.username || migrated[3].username;
        migrated[3].name = leg.admin.name || migrated[3].name;
        migrated[3].pass = leg.admin.pass || migrated[3].pass;
        migrated[3].avatar = leg.admin.avatar || migrated[3].avatar;
      }
      saveAllAdmins(migrated, false);
      return migrated;
    }
  } catch (e) {}

  // Save default
  saveAllAdmins(DEFAULT_ADMINS, false);
  return DEFAULT_ADMINS;
}

/**
 * Menyimpan seluruh daftar admin ke LocalStorage dan broadcast realtime
 */
function saveAllAdmins(admins, broadcast = true) {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(admins));

  // Also maintain backward compatibility for legacy app.js systemAccounts
  try {
    const su = admins.find(a => a.role === 'Super Admin' || a.rolePreset === 'superadmin') || admins[0];
    const ad = admins.find(a => a.id !== su.id) || admins[1] || su;
    const legacyObj = {
      superadmin: {
        username: su.username,
        name: su.name,
        pass: su.pass,
        role: su.role,
        avatar: su.avatar || ''
      },
      admin: {
        username: ad.username,
        name: ad.name,
        pass: ad.pass,
        role: ad.role,
        avatar: ad.avatar || ''
      }
    };
    localStorage.setItem(STORAGE_LEGACY_USERS_KEY, JSON.stringify(legacyObj));
  } catch (e) {}

  if (broadcast) {
    broadcastSync('USERS_UPDATED', admins);
  }
}

/**
 * Tambah atau Edit Admin
 */
function saveAdmin(adminData) {
  const admins = getAllAdmins();
  const existingIdx = admins.findIndex(a => a.id === adminData.id || a.username.toLowerCase() === adminData.username.toLowerCase());

  if (existingIdx >= 0) {
    // Preserve existing id if updating by username
    adminData.id = admins[existingIdx].id;
    adminData.updatedAt = new Date().toISOString();
    admins[existingIdx] = { ...admins[existingIdx], ...adminData };
  } else {
    // New Admin
    if (!adminData.id) {
      adminData.id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    }
    adminData.createdAt = new Date().toISOString();
    adminData.updatedAt = new Date().toISOString();
    admins.push(adminData);
  }

  saveAllAdmins(admins, true);
  return adminData;
}

/**
 * Hapus Admin
 */
function deleteAdmin(adminId) {
  let admins = getAllAdmins();
  const target = admins.find(a => a.id === adminId);
  if (!target) return false;

  // Protect Jodi Super Admin from complete deletion
  if (target.username.toLowerCase() === 'jodi') {
    throw new Error('Akun Super Admin Utama (Jodi) tidak boleh dihapus demi keamanan sistem!');
  }

  admins = admins.filter(a => a.id !== adminId);
  saveAllAdmins(admins, true);
  return true;
}

/**
 * Cek Otentikasi Login Pengguna
 */
function authenticateUser(username, password) {
  const admins = getAllAdmins();
  const user = admins.find(a => 
    a.username.toLowerCase() === (username || '').trim().toLowerCase() && 
    a.pass === (password || '').trim()
  );

  if (user) {
    const sessionData = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      rolePreset: user.rolePreset,
      avatar: user.avatar || '',
      permissions: user.permissions || { all: user.role === 'Super Admin' }
    };
    sessionStorage.setItem(STORAGE_AUTH_SESSION_KEY, JSON.stringify(sessionData));
    return sessionData;
  }
  return null;
}

/**
 * Mendapatkan akun yang sedang login saat ini
 */
function getCurrentAuthUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_AUTH_SESSION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}

  // Fallback to Super Admin Jodi for convenience if not strictly logged out
  return {
    username: 'Jodi',
    name: 'Super Administrator',
    role: 'Super Admin',
    rolePreset: 'superadmin',
    avatar: '',
    permissions: { all: true }
  };
}

/**
 * Cek apakah user memiliki izin untuk tindakan tertentu (RBAC)
 * Perms:
 * - 'proyek_edit' : Edit di Proyek (SO)
 * - 'produksi_edit' : Edit di Produksi & Tahapan Trafo
 * - 'pengiriman_edit' : Edit di Pengiriman / Logistik
 * - 'doc_edit' : Edit di Document Control & FAT
 * - 'master_edit' : Edit Master Data
 * - 'admin_edit' : Mengatur Admin & Hak Akses
 */
function userHasPermission(permKey) {
  const user = getCurrentAuthUser();
  if (!user) return false;
  if (user.role === 'Super Admin' || user.rolePreset === 'superadmin' || user.permissions?.all === true) {
    return true;
  }
  return !!(user.permissions && user.permissions[permKey]);
}

/* ==========================================================================
   MASTER DATA MANAGEMENT
   ========================================================================== */

/**
 * Mengambil semua Master Data
 */
function getAllMasterData() {
  try {
    const raw = localStorage.getItem(STORAGE_MASTER_DATA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        let proses = parsed.proses;
        // Auto-upgrade if less than 11 stages or missing Punchlist
        if (!Array.isArray(proses) || proses.length < 11 || !proses.some(p => (p.name || '').toLowerCase().includes('punchlist'))) {
          proses = DEFAULT_MASTER_DATA.proses;
          parsed.proses = proses;
          try {
            localStorage.setItem(STORAGE_MASTER_DATA_KEY, JSON.stringify(parsed));
          } catch (e) {}
        }
        return {
          pelanggan: parsed.pelanggan || DEFAULT_MASTER_DATA.pelanggan,
          trafo: parsed.trafo || DEFAULT_MASTER_DATA.trafo,
          proses: proses,
          material: parsed.material || DEFAULT_MASTER_DATA.material,
          pic: parsed.pic || DEFAULT_MASTER_DATA.pic
        };
      }
    }
  } catch (e) {}

  // Save default
  saveAllMasterData(DEFAULT_MASTER_DATA, false);
  return DEFAULT_MASTER_DATA;
}

/**
 * Menyimpan seluruh Master Data
 */
function saveAllMasterData(masterData, broadcast = true, moduleName = 'Semua Modul') {
  localStorage.setItem(STORAGE_MASTER_DATA_KEY, JSON.stringify(masterData));
  if (broadcast) {
    broadcastSync('MASTER_DATA_UPDATED', { module: moduleName, data: masterData });
  }
}

/**
 * Tambah / Update Item pada Modul Master Data
 */
function saveMasterItem(moduleKey, itemData, idField = 'code') {
  const master = getAllMasterData();
  if (!master[moduleKey]) master[moduleKey] = [];

  const list = master[moduleKey];
  const targetId = itemData[idField];
  const existingIdx = list.findIndex(item => item[idField] === targetId);

  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...itemData };
  } else {
    list.push(itemData);
  }

  saveAllMasterData(master, true, moduleKey);
  return list;
}

/**
 * Hapus Item dari Modul Master Data
 */
function deleteMasterItem(moduleKey, targetId, idField = 'code') {
  const master = getAllMasterData();
  if (!master[moduleKey]) return false;

  master[moduleKey] = master[moduleKey].filter(item => item[idField] !== targetId);
  saveAllMasterData(master, true, moduleKey);
  return true;
}

// Export to Global Scope
window.SymtraSync = {
  init: initRealtimeSync,
  subscribe: subscribeSync,
  broadcast: broadcastSync,
  getAllAdmins,
  saveAdmin,
  deleteAdmin,
  authenticateUser,
  getCurrentAuthUser,
  hasPermission: userHasPermission,
  getAllMasterData,
  saveAllMasterData,
  saveMasterItem,
  deleteMasterItem,
  DEFAULT_ADMINS,
  DEFAULT_MASTER_DATA
};

// Auto-run init
if (typeof window !== 'undefined') {
  initRealtimeSync();
}

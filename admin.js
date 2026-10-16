/* Symtraflow - Admin & Master Data Management Portal Engine */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Tab Switchers
  initTabs();
  
  // Render Data
  renderAdminsTable();
  renderMasterPelanggan();
  renderMasterTrafo();
  renderMasterProses();
  renderMasterMaterial();
  renderMasterPic();
  renderSyncLogs();
  updateStatsCounters();

  // Setup Realtime Sync Subscription
  window.SymtraSync.subscribe('users', (admins) => {
    renderAdminsTable(admins);
    updateStatsCounters();
    showAdminToast('⚡ Realtime: Data akun admin & hak akses diperbarui!');
  });

  window.SymtraSync.subscribe('master', (masterData) => {
    renderMasterPelanggan();
    renderMasterTrafo();
    renderMasterProses();
    renderMasterMaterial();
    renderMasterPic();
    updateStatsCounters();
    showAdminToast('⚡ Realtime: Master data diperbarui!');
  });

  // Current Auth User Display
  const currentAuth = window.SymtraSync.getCurrentAuthUser();
  if (currentAuth) {
    const nameEl = document.getElementById('currentAdminName');
    const roleEl = document.getElementById('currentAdminRole');
    const avatarEl = document.getElementById('currentAdminAvatar');
    if (nameEl) nameEl.innerText = currentAuth.name;
    if (roleEl) roleEl.innerText = currentAuth.role;
    if (avatarEl && currentAuth.avatar) avatarEl.src = currentAuth.avatar;
  }
});

/* ==========================================================================
   TAB NAVIGATION
   ========================================================================== */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      switchAdminTab(targetId);
    });
  });
}

function switchAdminTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(`tab-${tabId}`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.classList.add('active');
}

/* ==========================================================================
   STAT COUNTERS
   ========================================================================== */
function updateStatsCounters() {
  const admins = window.SymtraSync.getAllAdmins();
  const master = window.SymtraSync.getAllMasterData();

  const elAdmins = document.getElementById('statTotalAdmins');
  const elPelanggan = document.getElementById('statTotalPelanggan');
  const elTrafo = document.getElementById('statTotalTrafo');
  const elProses = document.getElementById('statTotalProses');

  if (elAdmins) elAdmins.innerText = admins.length;
  if (elPelanggan) elPelanggan.innerText = master.pelanggan ? master.pelanggan.length : 0;
  if (elTrafo) elTrafo.innerText = master.trafo ? master.trafo.length : 0;
  if (elProses) elProses.innerText = master.proses ? master.proses.length : 0;
}

/* ==========================================================================
   MANAJEMEN ADMIN & HAK AKSES (RBAC)
   ========================================================================== */
function renderAdminsTable(adminsList) {
  const admins = adminsList || window.SymtraSync.getAllAdmins();
  const tbody = document.getElementById('adminsTableBody');
  if (!tbody) return;

  const currentAuth = window.SymtraSync.getCurrentAuthUser();

  tbody.innerHTML = admins.map(u => {
    const isSuper = u.role === 'Super Admin' || u.rolePreset === 'superadmin';
    const isCurrentUser = currentAuth && currentAuth.id === u.id;

    // Badges based on role
    let badgeClass = 'badge-custom';
    if (isSuper) badgeClass = 'badge-super';
    else if (u.rolePreset === 'admin_so' || u.role?.toLowerCase().includes('so')) badgeClass = 'badge-so';
    else if (u.rolePreset === 'admin_produksi' || u.role?.toLowerCase().includes('produksi')) badgeClass = 'badge-prod';

    // Permissions tags
    const perms = u.permissions || {};
    let permBadgesHtml = '';
    if (isSuper || perms.all) {
      permBadgesHtml = `<span class="perm-tag active" style="background:rgba(225,29,72,0.15); color:#fb7185; border-color:rgba(225,29,72,0.3);"><i class="fa-solid fa-crown"></i> Full Access (Semua Modul)</span>`;
    } else {
      const activePerms = [];
      if (perms.proyek_edit) activePerms.push('<span class="perm-tag active"><i class="fa-solid fa-file-invoice"></i> Edit Proyek SO</span>');
      if (perms.produksi_edit) activePerms.push('<span class="perm-tag active" style="background:rgba(245,158,11,0.15); color:#fcd34d; border-color:rgba(245,158,11,0.3);"><i class="fa-solid fa-gears"></i> Edit Produksi</span>');
      if (perms.pengiriman_edit) activePerms.push('<span class="perm-tag active"><i class="fa-solid fa-truck"></i> Edit Pengiriman</span>');
      if (perms.doc_edit) activePerms.push('<span class="perm-tag active"><i class="fa-solid fa-file-shield"></i> Edit QC/Doc</span>');
      if (perms.master_edit) activePerms.push('<span class="perm-tag active"><i class="fa-solid fa-database"></i> Edit Master</span>');
      if (perms.admin_edit) activePerms.push('<span class="perm-tag active"><i class="fa-solid fa-user-shield"></i> Kelola Admin</span>');

      permBadgesHtml = activePerms.length > 0 ? activePerms.join(' ') : '<span class="perm-tag">Hanya Lihat (View Only)</span>';
    }

    const avatarUrl = u.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100';

    return `
      <tr>
        <td>
          <div class="user-cell">
            <img src="${avatarUrl}" alt="${u.name}" onerror="this.src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'">
            <div class="user-cell-meta">
              <div class="user-name">
                ${u.name} ${isCurrentUser ? '<span style="font-size:10px; background:#2563eb; color:#fff; padding:1px 6px; border-radius:4px; margin-left:4px;">Anda</span>' : ''}
              </div>
              <div class="user-username">@${u.username}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="badge-role ${badgeClass}">
            <i class="fa-solid ${isSuper ? 'fa-shield-halved' : 'fa-user-check'}"></i>
            ${u.role}
          </span>
        </td>
        <td>
          <div class="permission-tags-list">
            ${permBadgesHtml}
          </div>
        </td>
        <td>
          <span style="display:inline-flex; align-items:center; gap:6px; color:#34d399; font-size:12px; font-weight:600;">
            <span style="width:7px; height:7px; background:#10b981; border-radius:50%;"></span> Aktif
          </span>
        </td>
        <td>
          <div class="action-btns">
            <button class="btn-icon" title="Edit Admin & Izin" onclick="openEditAdminModal('${u.id}')">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-icon" title="Tes Login Cepat Sebagai User Ini" onclick="quickSwitchUser('${u.id}')" style="color:#60a5fa;">
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
            ${u.username.toLowerCase() !== 'jodi' ? `
              <button class="btn-icon btn-danger" title="Hapus Akun" onclick="confirmDeleteAdmin('${u.id}', '${u.name}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAdmins() {
  const query = (document.getElementById('searchAdminInput')?.value || '').toLowerCase();
  const admins = window.SymtraSync.getAllAdmins();
  const filtered = admins.filter(a => 
    a.name.toLowerCase().includes(query) || 
    a.username.toLowerCase().includes(query) || 
    a.role.toLowerCase().includes(query)
  );
  renderAdminsTable(filtered);
}

// Preset Role Template Selection
function selectRolePreset(preset) {
  document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('selected'));
  const targetCard = document.querySelector(`.preset-card[data-preset="${preset}"]`);
  if (targetCard) targetCard.classList.add('selected');

  document.getElementById('adminRolePreset').value = preset;

  const roleTitleInput = document.getElementById('adminRoleTitle');
  const chkAll = document.getElementById('perm_all');
  const chkProyek = document.getElementById('perm_proyek');
  const chkProduksi = document.getElementById('perm_produksi');
  const chkPengiriman = document.getElementById('perm_pengiriman');
  const chkDoc = document.getElementById('perm_doc');
  const chkMaster = document.getElementById('perm_master');
  const chkAdmin = document.getElementById('perm_admin');

  if (preset === 'superadmin') {
    if (roleTitleInput) roleTitleInput.value = 'Super Admin';
    if (chkAll) chkAll.checked = true;
    if (chkProyek) chkProyek.checked = true;
    if (chkProduksi) chkProduksi.checked = true;
    if (chkPengiriman) chkPengiriman.checked = true;
    if (chkDoc) chkDoc.checked = true;
    if (chkMaster) chkMaster.checked = true;
    if (chkAdmin) chkAdmin.checked = true;
  } else if (preset === 'admin_so') {
    if (roleTitleInput) roleTitleInput.value = 'Admin Proyek SO';
    if (chkAll) chkAll.checked = false;
    if (chkProyek) chkProyek.checked = true;
    if (chkProduksi) chkProduksi.checked = false;
    if (chkPengiriman) chkPengiriman.checked = false;
    if (chkDoc) chkDoc.checked = false;
    if (chkMaster) chkMaster.checked = false;
    if (chkAdmin) chkAdmin.checked = false;
  } else if (preset === 'admin_produksi') {
    if (roleTitleInput) roleTitleInput.value = 'Admin Produksi';
    if (chkAll) chkAll.checked = false;
    if (chkProyek) chkProyek.checked = false;
    if (chkProduksi) chkProduksi.checked = true;
    if (chkPengiriman) chkPengiriman.checked = false;
    if (chkDoc) chkDoc.checked = false;
    if (chkMaster) chkMaster.checked = false;
    if (chkAdmin) chkAdmin.checked = false;
  } else if (preset === 'admin_pengiriman') {
    if (roleTitleInput) roleTitleInput.value = 'Admin Pengiriman & Logistik';
    if (chkAll) chkAll.checked = false;
    if (chkProyek) chkProyek.checked = false;
    if (chkProduksi) chkProduksi.checked = false;
    if (chkPengiriman) chkPengiriman.checked = true;
    if (chkDoc) chkDoc.checked = false;
    if (chkMaster) chkMaster.checked = false;
    if (chkAdmin) chkAdmin.checked = false;
  } else if (preset === 'custom') {
    if (roleTitleInput && !roleTitleInput.value) roleTitleInput.value = 'Custom Admin';
    if (chkAll) chkAll.checked = false;
  }
}

function handlePermAllToggle(checked) {
  const chks = ['perm_proyek', 'perm_produksi', 'perm_pengiriman', 'perm_doc', 'perm_master', 'perm_admin'];
  chks.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = checked;
  });
}

function openAddAdminModal() {
  document.getElementById('modalAdminTitle').innerHTML = '<i class="fa-solid fa-user-plus" style="color:#2563eb;"></i> Tambah Admin Baru';
  document.getElementById('adminId').value = '';
  document.getElementById('adminFullName').value = '';
  document.getElementById('adminUsername').value = '';
  document.getElementById('adminPassword').value = '';
  document.getElementById('adminAvatar').value = '';
  document.getElementById('adminUsername').removeAttribute('readonly');

  selectRolePreset('superadmin');
  openModal('modalAdmin');
}

function openEditAdminModal(adminId) {
  const admins = window.SymtraSync.getAllAdmins();
  const user = admins.find(a => a.id === adminId);
  if (!user) return;

  document.getElementById('modalAdminTitle').innerHTML = '<i class="fa-solid fa-user-pen" style="color:#2563eb;"></i> Edit Akun Admin & Hak Akses';
  document.getElementById('adminId').value = user.id;
  document.getElementById('adminFullName').value = user.name;
  document.getElementById('adminUsername').value = user.username;
  document.getElementById('adminPassword').value = user.pass;
  document.getElementById('adminRoleTitle').value = user.role;
  document.getElementById('adminAvatar').value = user.avatar || '';

  // Select preset
  const preset = user.rolePreset || (user.role === 'Super Admin' ? 'superadmin' : 'custom');
  selectRolePreset(preset);

  // Set explicit permissions
  const p = user.permissions || {};
  document.getElementById('perm_all').checked = !!p.all;
  document.getElementById('perm_proyek').checked = !!p.proyek_edit;
  document.getElementById('perm_produksi').checked = !!p.produksi_edit;
  document.getElementById('perm_pengiriman').checked = !!p.pengiriman_edit;
  document.getElementById('perm_doc').checked = !!p.doc_edit;
  document.getElementById('perm_master').checked = !!p.master_edit;
  document.getElementById('perm_admin').checked = !!p.admin_edit;

  openModal('modalAdmin');
}

function handleSaveAdminSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('adminId').value;
  const name = document.getElementById('adminFullName').value.trim();
  const username = document.getElementById('adminUsername').value.trim();
  const pass = document.getElementById('adminPassword').value.trim();
  const role = document.getElementById('adminRoleTitle').value.trim() || 'Admin';
  const rolePreset = document.getElementById('adminRolePreset').value;
  const avatar = document.getElementById('adminAvatar').value.trim();

  const isSuper = document.getElementById('perm_all').checked;

  const permissions = {
    all: isSuper,
    proyek_edit: isSuper || document.getElementById('perm_proyek').checked,
    produksi_edit: isSuper || document.getElementById('perm_produksi').checked,
    pengiriman_edit: isSuper || document.getElementById('perm_pengiriman').checked,
    doc_edit: isSuper || document.getElementById('perm_doc').checked,
    master_edit: isSuper || document.getElementById('perm_master').checked,
    admin_edit: isSuper || document.getElementById('perm_admin').checked
  };

  const adminData = {
    id: id || undefined,
    name,
    username,
    pass,
    role,
    rolePreset,
    avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    permissions
  };

  try {
    window.SymtraSync.saveAdmin(adminData);
    closeModal('modalAdmin');
    renderAdminsTable();
    updateStatsCounters();
    showAdminToast(`✅ Akun "${name}" berhasil disimpan dan disinkronkan realtime!`);
  } catch (err) {
    alert(err.message);
  }
}

function confirmDeleteAdmin(adminId, name) {
  if (confirm(`Apakah Anda yakin ingin menghapus akun admin "${name}"? Tindakan ini akan disinkronkan ke seluruh sistem.`)) {
    try {
      window.SymtraSync.deleteAdmin(adminId);
      renderAdminsTable();
      updateStatsCounters();
      showAdminToast(`🗑️ Akun "${name}" berhasil dihapus.`);
    } catch (err) {
      alert(err.message);
    }
  }
}

function quickSwitchUser(adminId) {
  const admins = window.SymtraSync.getAllAdmins();
  const user = admins.find(a => a.id === adminId);
  if (!user) return;

  const sessionData = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
    rolePreset: user.rolePreset,
    avatar: user.avatar || '',
    permissions: user.permissions || { all: user.role === 'Super Admin' }
  };
  sessionStorage.setItem('SYMTRAFLOW_AUTH_USER', JSON.stringify(sessionData));

  // Update current UI
  const nameEl = document.getElementById('currentAdminName');
  const roleEl = document.getElementById('currentAdminRole');
  const avatarEl = document.getElementById('currentAdminAvatar');
  if (nameEl) nameEl.innerText = user.name;
  if (roleEl) roleEl.innerText = user.role;
  if (avatarEl && user.avatar) avatarEl.src = user.avatar;

  renderAdminsTable();
  showAdminToast(`👤 Anda sekarang login aktif sebagai: ${user.name} (${user.role})`);
}

/* ==========================================================================
   MASTER DATA: PELANGGAN (CUSTOMER)
   ========================================================================== */
function renderMasterPelanggan() {
  const master = window.SymtraSync.getAllMasterData();
  const list = master.pelanggan || [];
  const tbody = document.getElementById('pelangganTableBody');
  if (!tbody) return;

  tbody.innerHTML = list.map(p => `
    <tr>
      <td><strong style="color:#60a5fa; font-family:monospace;">${p.code}</strong></td>
      <td><strong>${p.name}</strong></td>
      <td>${p.sector}</td>
      <td>${p.city}</td>
      <td>${p.contact}</td>
      <td><span class="badge-role badge-so">${p.orders || '0 Unit'}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Edit" onclick="openEditPelangganModal('${p.code}')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon btn-danger" title="Hapus" onclick="confirmDeleteMaster('pelanggan', '${p.code}', '${p.name}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddPelangganModal() {
  document.getElementById('modalPelangganTitle').innerText = 'Tambah Pelanggan Baru';
  document.getElementById('pelangganOldCode').value = '';
  document.getElementById('pelangganCode').value = 'CUST-0' + (window.SymtraSync.getAllMasterData().pelanggan.length + 1);
  document.getElementById('pelangganName').value = '';
  document.getElementById('pelangganSector').value = '';
  document.getElementById('pelangganCity').value = '';
  document.getElementById('pelangganContact').value = '';
  document.getElementById('pelangganOrders').value = '0 Unit';
  openModal('modalPelanggan');
}

function openEditPelangganModal(code) {
  const list = window.SymtraSync.getAllMasterData().pelanggan || [];
  const item = list.find(p => p.code === code);
  if (!item) return;

  document.getElementById('modalPelangganTitle').innerText = 'Edit Data Pelanggan';
  document.getElementById('pelangganOldCode').value = item.code;
  document.getElementById('pelangganCode').value = item.code;
  document.getElementById('pelangganName').value = item.name;
  document.getElementById('pelangganSector').value = item.sector;
  document.getElementById('pelangganCity').value = item.city;
  document.getElementById('pelangganContact').value = item.contact;
  document.getElementById('pelangganOrders').value = item.orders || '0 Unit';
  openModal('modalPelanggan');
}

function handleSavePelangganSubmit(e) {
  e.preventDefault();
  const oldCode = document.getElementById('pelangganOldCode').value;
  const code = document.getElementById('pelangganCode').value.trim();
  const name = document.getElementById('pelangganName').value.trim();
  const sector = document.getElementById('pelangganSector').value.trim();
  const city = document.getElementById('pelangganCity').value.trim();
  const contact = document.getElementById('pelangganContact').value.trim();
  const orders = document.getElementById('pelangganOrders').value.trim() || '0 Unit';

  if (oldCode && oldCode !== code) {
    window.SymtraSync.deleteMasterItem('pelanggan', oldCode, 'code');
  }

  window.SymtraSync.saveMasterItem('pelanggan', { code, name, sector, city, contact, orders }, 'code');
  closeModal('modalPelanggan');
  renderMasterPelanggan();
  updateStatsCounters();
  showAdminToast(`✅ Pelanggan "${name}" tersimpan & disinkronkan realtime!`);
}

/* ==========================================================================
   MASTER DATA: TRAFO & VARIAN
   ========================================================================== */
function renderMasterTrafo() {
  const master = window.SymtraSync.getAllMasterData();
  const list = master.trafo || [];
  const tbody = document.getElementById('trafoTableBody');
  if (!tbody) return;

  tbody.innerHTML = list.map(t => `
    <tr>
      <td><strong style="color:#60a5fa; font-family:monospace;">${t.model}</strong></td>
      <td><strong>${t.type}</strong></td>
      <td><span class="badge-role badge-prod">${t.cap}</span></td>
      <td>${t.volt}</td>
      <td>${t.cooling}</td>
      <td><span style="font-size:11px; background:rgba(255,255,255,0.06); padding:2px 8px; border-radius:4px;">${t.standard}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Edit" onclick="openEditTrafoModal('${t.model}')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon btn-danger" title="Hapus" onclick="confirmDeleteMaster('trafo', '${t.model}', '${t.model}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddTrafoModal() {
  document.getElementById('modalTrafoTitle').innerText = 'Tambah Varian Trafo Baru';
  document.getElementById('trafoOldModel').value = '';
  document.getElementById('trafoModel').value = '';
  document.getElementById('trafoType').value = 'Trafo Distribusi';
  document.getElementById('trafoCap').value = '500 kVA';
  document.getElementById('trafoVolt').value = '20 kV / 400 V';
  document.getElementById('trafoCooling').value = 'ONAN (Minyak Mineral)';
  document.getElementById('trafoStandard').value = 'SPLN D3.002-1';
  openModal('modalTrafo');
}

function openEditTrafoModal(model) {
  const list = window.SymtraSync.getAllMasterData().trafo || [];
  const item = list.find(t => t.model === model);
  if (!item) return;

  document.getElementById('modalTrafoTitle').innerText = 'Edit Varian Trafo';
  document.getElementById('trafoOldModel').value = item.model;
  document.getElementById('trafoModel').value = item.model;
  document.getElementById('trafoType').value = item.type;
  document.getElementById('trafoCap').value = item.cap;
  document.getElementById('trafoVolt').value = item.volt;
  document.getElementById('trafoCooling').value = item.cooling;
  document.getElementById('trafoStandard').value = item.standard;
  openModal('modalTrafo');
}

function handleSaveTrafoSubmit(e) {
  e.preventDefault();
  const oldModel = document.getElementById('trafoOldModel').value;
  const model = document.getElementById('trafoModel').value.trim();
  const type = document.getElementById('trafoType').value.trim();
  const cap = document.getElementById('trafoCap').value.trim();
  const volt = document.getElementById('trafoVolt').value.trim();
  const cooling = document.getElementById('trafoCooling').value.trim();
  const standard = document.getElementById('trafoStandard').value.trim();

  if (oldModel && oldModel !== model) {
    window.SymtraSync.deleteMasterItem('trafo', oldModel, 'model');
  }

  window.SymtraSync.saveMasterItem('trafo', { model, type, cap, volt, cooling, standard }, 'model');
  closeModal('modalTrafo');
  renderMasterTrafo();
  updateStatsCounters();
  showAdminToast(`✅ Varian Trafo "${model}" tersimpan & disinkronkan realtime!`);
}

/* ==========================================================================
   MASTER DATA: TAHAPAN PROSES PRODUKSI
   ========================================================================== */
function renderMasterProses() {
  const master = window.SymtraSync.getAllMasterData();
  const list = master.proses || [];
  const tbody = document.getElementById('prosesTableBody');
  if (!tbody) return;

  tbody.innerHTML = list.map(pr => `
    <tr>
      <td><span style="display:inline-block; width:26px; height:26px; line-height:26px; text-align:center; background:#2563eb; color:#fff; border-radius:50%; font-weight:700; font-size:12px;">${pr.step}</span></td>
      <td><strong>${pr.name}</strong></td>
      <td><span class="badge-role badge-custom">${pr.dept}</span></td>
      <td style="max-width:350px; font-size:12px;">${pr.desc}</td>
      <td><span class="badge-role badge-so">${pr.cycle}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Edit" onclick="openEditProsesModal(${pr.step})"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon btn-danger" title="Hapus" onclick="confirmDeleteMaster('proses', ${pr.step}, '${pr.name}', 'step')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddProsesModal() {
  const list = window.SymtraSync.getAllMasterData().proses || [];
  document.getElementById('modalProsesTitle').innerText = 'Tambah Tahapan Proses Baru';
  document.getElementById('prosesOldStep').value = '';
  document.getElementById('prosesStep').value = list.length + 1;
  document.getElementById('prosesName').value = '';
  document.getElementById('prosesDept').value = 'Fabrikasi';
  document.getElementById('prosesDesc').value = '';
  document.getElementById('prosesCycle').value = '2 Hari';
  openModal('modalProses');
}

function openEditProsesModal(step) {
  const list = window.SymtraSync.getAllMasterData().proses || [];
  const item = list.find(pr => Number(pr.step) === Number(step));
  if (!item) return;

  document.getElementById('modalProsesTitle').innerText = 'Edit Tahapan Proses';
  document.getElementById('prosesOldStep').value = item.step;
  document.getElementById('prosesStep').value = item.step;
  document.getElementById('prosesName').value = item.name;
  document.getElementById('prosesDept').value = item.dept;
  document.getElementById('prosesDesc').value = item.desc;
  document.getElementById('prosesCycle').value = item.cycle;
  openModal('modalProses');
}

function handleSaveProsesSubmit(e) {
  e.preventDefault();
  const oldStep = document.getElementById('prosesOldStep').value;
  const step = Number(document.getElementById('prosesStep').value);
  const name = document.getElementById('prosesName').value.trim();
  const dept = document.getElementById('prosesDept').value.trim();
  const desc = document.getElementById('prosesDesc').value.trim();
  const cycle = document.getElementById('prosesCycle').value.trim();

  if (oldStep && Number(oldStep) !== step) {
    window.SymtraSync.deleteMasterItem('proses', Number(oldStep), 'step');
  }

  window.SymtraSync.saveMasterItem('proses', { step, name, dept, desc, cycle }, 'step');
  closeModal('modalProses');
  renderMasterProses();
  updateStatsCounters();
  showAdminToast(`✅ Tahap "${name}" tersimpan & disinkronkan realtime!`);
}

/* ==========================================================================
   MASTER DATA: MATERIAL
   ========================================================================== */
function renderMasterMaterial() {
  const master = window.SymtraSync.getAllMasterData();
  const list = master.material || [];
  const tbody = document.getElementById('materialTableBody');
  if (!tbody) return;

  tbody.innerHTML = list.map(m => `
    <tr>
      <td><strong style="color:#60a5fa; font-family:monospace;">${m.code}</strong></td>
      <td><strong>${m.name}</strong></td>
      <td style="font-size:12px;">${m.spec}</td>
      <td><strong>${m.stock}</strong></td>
      <td>${m.uom}</td>
      <td><span class="badge-role badge-prod">${m.status || 'Aman'}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon" title="Edit" onclick="openEditMaterialModal('${m.code}')"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon btn-danger" title="Hapus" onclick="confirmDeleteMaster('material', '${m.code}', '${m.name}')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddMaterialModal() {
  document.getElementById('modalMaterialTitle').innerText = 'Tambah Material Baru';
  document.getElementById('materialOldCode').value = '';
  document.getElementById('materialCode').value = 'MAT-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  document.getElementById('materialName').value = '';
  document.getElementById('materialSpec').value = '';
  document.getElementById('materialStock').value = '100';
  document.getElementById('materialUom').value = 'Kilogram';
  document.getElementById('materialStatus').value = 'Aman';
  openModal('modalMaterial');
}

function openEditMaterialModal(code) {
  const list = window.SymtraSync.getAllMasterData().material || [];
  const item = list.find(m => m.code === code);
  if (!item) return;

  document.getElementById('modalMaterialTitle').innerText = 'Edit Data Material';
  document.getElementById('materialOldCode').value = item.code;
  document.getElementById('materialCode').value = item.code;
  document.getElementById('materialName').value = item.name;
  document.getElementById('materialSpec').value = item.spec;
  document.getElementById('materialStock').value = item.stock;
  document.getElementById('materialUom').value = item.uom;
  document.getElementById('materialStatus').value = item.status;
  openModal('modalMaterial');
}

function handleSaveMaterialSubmit(e) {
  e.preventDefault();
  const oldCode = document.getElementById('materialOldCode').value;
  const code = document.getElementById('materialCode').value.trim();
  const name = document.getElementById('materialName').value.trim();
  const spec = document.getElementById('materialSpec').value.trim();
  const stock = document.getElementById('materialStock').value.trim();
  const uom = document.getElementById('materialUom').value.trim();
  const status = document.getElementById('materialStatus').value.trim();

  if (oldCode && oldCode !== code) {
    window.SymtraSync.deleteMasterItem('material', oldCode, 'code');
  }

  window.SymtraSync.saveMasterItem('material', { code, name, spec, stock, uom, status }, 'code');
  closeModal('modalMaterial');
  renderMasterMaterial();
  showAdminToast(`✅ Material "${name}" tersimpan & disinkronkan realtime!`);
}

/* ==========================================================================
   MASTER DATA: PIC & USER
   ========================================================================== */
function renderMasterPic() {
  const master = window.SymtraSync.getAllMasterData();
  const list = master.pic || [];
  const tbody = document.getElementById('picTableBody');
  if (!tbody) return;

  tbody.innerHTML = list.map(pc => `
    <tr>
      <td><strong style="color:#60a5fa; font-family:monospace;">${pc.id}</strong></td>
      <td><strong>${pc.name}</strong></td>
      <td>${pc.role}</td>
      <td><span class="badge-role badge-custom">${pc.dept}</span></td>
      <td><span style="color:#34d399; font-weight:600;"><i class="fa-solid fa-circle" style="font-size:8px;"></i> ${pc.status}</span></td>
      <td>
        <div class="action-btns">
          <button class="btn-icon btn-danger" title="Hapus" onclick="confirmDeleteMaster('pic', '${pc.id}', '${pc.name}', 'id')"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddPicModal() {
  document.getElementById('picId').value = 'EMP-' + Math.floor(100 + Math.random() * 900);
  document.getElementById('picName').value = '';
  document.getElementById('picRole').value = '';
  document.getElementById('picDept').value = 'Produksi';
  document.getElementById('picStatus').value = 'Aktif';
  openModal('modalPic');
}

function handleSavePicSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('picId').value.trim();
  const name = document.getElementById('picName').value.trim();
  const role = document.getElementById('picRole').value.trim();
  const dept = document.getElementById('picDept').value.trim();
  const status = document.getElementById('picStatus').value.trim();

  window.SymtraSync.saveMasterItem('pic', { id, name, role, dept, status }, 'id');
  closeModal('modalPic');
  renderMasterPic();
  showAdminToast(`✅ PIC "${name}" tersimpan & disinkronkan realtime!`);
}

function confirmDeleteMaster(moduleKey, targetId, itemName, idField = 'code') {
  if (confirm(`Apakah Anda yakin ingin menghapus "${itemName}" dari Master Data? Tindakan ini langsung disinkronkan ke monitoring.`)) {
    window.SymtraSync.deleteMasterItem(moduleKey, targetId, idField);
    if (moduleKey === 'pelanggan') renderMasterPelanggan();
    else if (moduleKey === 'trafo') renderMasterTrafo();
    else if (moduleKey === 'proses') renderMasterProses();
    else if (moduleKey === 'material') renderMasterMaterial();
    else if (moduleKey === 'pic') renderMasterPic();
    updateStatsCounters();
    showAdminToast(`🗑️ Data "${itemName}" berhasil dihapus.`);
  }
}

/* ==========================================================================
   REALTIME SYNC AUDIT & TESTER
   ========================================================================== */
function renderSyncLogs() {
  const container = document.getElementById('syncLogsList');
  if (!container) return;

  let logs = [];
  try {
    logs = JSON.parse(localStorage.getItem('SYMTRAFLOW_SYNC_LOGS') || '[]');
  } catch (e) {}

  if (logs.length === 0) {
    container.innerHTML = `
      <div style="padding:20px; text-align:center; color:#64748b;">
        <i class="fa-solid fa-clock-rotate-left" style="font-size:24px; margin-bottom:8px; display:block;"></i>
        Belum ada riwayat aktivitas sinkronisasi.
      </div>
    `;
    return;
  }

  container.innerHTML = logs.slice(0, 15).map(l => `
    <div class="log-item">
      <div class="log-left">
        <span class="log-indicator"></span>
        <div>
          <div class="log-title">${l.title}</div>
          <div class="log-time">${l.date} ${l.time} · Sumber: <span style="color:#60a5fa;">${l.sender}</span></div>
        </div>
      </div>
      <span class="badge-role badge-so" style="font-size:10px;">${l.type}</span>
    </div>
  `).join('');
}

function triggerManualSyncTest() {
  const start = performance.now();
  window.SymtraSync.broadcast('MANUAL_SYNC_TEST', { test: true });
  const latency = Math.round(performance.now() - start);

  const elStatus = document.getElementById('syncLatencyStatus');
  if (elStatus) {
    elStatus.innerHTML = `🟢 Sinyal broadcast terkirim ke semua tab terbuka! Latensi lokal: <strong>${latency} ms</strong>`;
  }
  showAdminToast(`⚡ Sinyal sinkronisasi berhasil dipancarkan (Latensi: ${latency} ms)`);
  renderSyncLogs();
}

/* ==========================================================================
   MODAL & TOAST HELPERS
   ========================================================================== */
function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('active');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

function showAdminToast(msg) {
  let container = document.getElementById('adminToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'adminToastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color:#38bdf8;"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

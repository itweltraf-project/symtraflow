/* Symtraflow - Trafo Production Monitoring System Logic */

// 11 Production Stages Definitions
const STAGES = [
  { id: 1, code: 'TANK MAKING', name: 'Tank Making', icon: 'fa-box-open' },
  { id: 2, code: 'CORE MAKING', name: 'Core Making', icon: 'fa-layer-group' },
  { id: 3, code: 'COIL MAKING', name: 'Coil Making', icon: 'fa-scroll' },
  { id: 4, code: 'ASSEMBLY', name: 'Assembly', icon: 'fa-wrench' },
  { id: 5, code: 'CONNECTION', name: 'Connection', icon: 'fa-diagram-project' },
  { id: 6, code: 'FINAL ASSEMBLY', name: 'Final Assembly', icon: 'fa-cubes' },
  { id: 7, code: 'INTERNAL TEST', name: 'Internal Test', icon: 'fa-file-signature' },
  { id: 8, code: 'FINISHING', name: 'Finishing', icon: 'fa-spray-can' },
  { id: 9, code: 'FAT', name: 'FAT', icon: 'fa-clipboard-check' },
  { id: 10, code: 'PUNCHLIST', name: 'Punchlist', icon: 'fa-list-check' },
  { id: 11, code: 'DELIVERY', name: 'Delivery', icon: 'fa-truck-fast' }
];

// Initial Orders Data (Matching Image 1)
let orders = [
  {
    id: 'TRF-240522-001',
    nama: 'Trafo Distribusi',
    kapasitas: '500 kVA',
    tegangan: '20 kV / 400 V',
    status: 'ASSEMBLY',
    currentStageIndex: 3, // 0-indexed (ASSEMBLY)
    progress: 60,
    mulai: '22/05/2024 07:30',
    deadline: '25/05/2024',
    operator: 'Ahmad Fauzi',
    operatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '22/05 08:15', operator: 'Budi Santoso' },
      { stage: 'CORE MAKING', status: 'finished', time: '22/05 08:45', operator: 'Joko Susilo' },
      { stage: 'COIL MAKING', status: 'finished', time: '22/05 09:30', operator: 'Rudi Hartono' },
      { stage: 'ASSEMBLY', status: 'process', time: 'Mulai: 22/05 10:10', operator: 'Ahmad Fauzi' },
      { stage: 'CONNECTION', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINAL ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'INTERNAL TEST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINISHING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FAT', status: 'waiting', time: '-', operator: '-' },
      { stage: 'PUNCHLIST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'DELIVERY', status: 'waiting', time: '-', operator: '-' }
    ]
  },
  {
    id: 'TRF-240522-002',
    nama: 'Trafo Distribusi',
    kapasitas: '1000 kVA',
    tegangan: '20 kV / 400 V',
    status: 'ASSEMBLY',
    currentStageIndex: 3,
    progress: 55,
    mulai: '22/05/2024 07:45',
    deadline: '26/05/2024',
    operator: 'Rudi Hartono',
    operatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '22/05 08:30', operator: 'Budi Santoso' },
      { stage: 'CORE MAKING', status: 'finished', time: '22/05 09:00', operator: 'Joko Susilo' },
      { stage: 'COIL MAKING', status: 'finished', time: '22/05 09:45', operator: 'Rudi Hartono' },
      { stage: 'ASSEMBLY', status: 'process', time: 'Mulai: 22/05 10:20', operator: 'Rudi Hartono' },
      { stage: 'CONNECTION', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINAL ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'INTERNAL TEST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINISHING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FAT', status: 'waiting', time: '-', operator: '-' },
      { stage: 'PUNCHLIST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'DELIVERY', status: 'waiting', time: '-', operator: '-' }
    ]
  },
  {
    id: 'TRF-240521-003',
    nama: 'Trafo Power',
    kapasitas: '1500 kVA',
    tegangan: '20 kV / 6300 V',
    status: 'CONNECTION',
    currentStageIndex: 4,
    progress: 20,
    mulai: '21/05/2024 08:10',
    deadline: '28/05/2024',
    operator: 'Joko Susilo',
    operatorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '21/05 09:00', operator: 'Budi Santoso' },
      { stage: 'CORE MAKING', status: 'finished', time: '21/05 11:30', operator: 'Rudi Hartono' },
      { stage: 'COIL MAKING', status: 'finished', time: '21/05 14:00', operator: 'Rudi Hartono' },
      { stage: 'ASSEMBLY', status: 'finished', time: '21/05 16:30', operator: 'Ahmad Fauzi' },
      { stage: 'CONNECTION', status: 'process', time: 'Mulai: 22/05 08:10', operator: 'Joko Susilo' },
      { stage: 'FINAL ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'INTERNAL TEST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINISHING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FAT', status: 'waiting', time: '-', operator: '-' },
      { stage: 'PUNCHLIST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'DELIVERY', status: 'waiting', time: '-', operator: '-' }
    ]
  },
  {
    id: 'TRF-240521-004',
    nama: 'Trafo Distribusi',
    kapasitas: '250 kVA',
    tegangan: '20 kV / 400 V',
    status: 'TANK MAKING',
    currentStageIndex: 0,
    progress: 100,
    mulai: '21/05/2024 07:50',
    deadline: '23/05/2024',
    operator: 'Budi Santoso',
    operatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '21/05 10:00', operator: 'Budi Santoso' },
      { stage: 'CORE MAKING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'COIL MAKING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'CONNECTION', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINAL ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'INTERNAL TEST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINISHING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FAT', status: 'waiting', time: '-', operator: '-' },
      { stage: 'PUNCHLIST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'DELIVERY', status: 'waiting', time: '-', operator: '-' }
    ]
  },
  {
    id: 'TRF-240520-005',
    nama: 'Trafo Power',
    kapasitas: '2000 kVA',
    tegangan: '30 kV / 6300 V',
    status: 'CORE MAKING',
    currentStageIndex: 1,
    progress: 100,
    mulai: '20/05/2024 07:40',
    deadline: '24/05/2024',
    operator: 'Rudi Hartono',
    operatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '20/05 09:30', operator: 'Budi Santoso' },
      { stage: 'CORE MAKING', status: 'finished', time: '20/05 11:45', operator: 'Rudi Hartono' },
      { stage: 'COIL MAKING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'CONNECTION', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINAL ASSEMBLY', status: 'waiting', time: '-', operator: '-' },
      { stage: 'INTERNAL TEST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FINISHING', status: 'waiting', time: '-', operator: '-' },
      { stage: 'FAT', status: 'waiting', time: '-', operator: '-' },
      { stage: 'PUNCHLIST', status: 'waiting', time: '-', operator: '-' },
      { stage: 'DELIVERY', status: 'waiting', time: '-', operator: '-' }
    ]
  }
];

// Project 1 Units Data (10 Units - Matching Image 2)
let prj1Units = [
  { no: 1, id: 'TRF-240522-001', cap: '500 kVA', volt: '20 kV / 400 V', status: 'ASSEMBLY', badge: 'badge-assembly', progress: 60, stageIdx: 3, startCol: 1, endCol: 4, operator: 'Ahmad Fauzi', dead: '28/05/2024' },
  { no: 2, id: 'TRF-240522-002', cap: '750 kVA', volt: '20 kV / 400 V', status: 'CORE MAKING', badge: 'badge-core', progress: 75, stageIdx: 1, startCol: 1, endCol: 2, operator: 'Joko Susilo', dead: '27/05/2024' },
  { no: 3, id: 'TRF-240522-003', cap: '1000 kVA', volt: '20 kV / 400 V', status: 'FINISHING', badge: 'badge-finishing', progress: 40, stageIdx: 7, startCol: 1, endCol: 8, operator: 'Rudi Hartono', dead: '25/05/2024' },
  { no: 4, id: 'TRF-240522-004', cap: '1000 kVA', volt: '20 kV / 400 V', status: 'INTERNAL TEST', badge: 'badge-internal', progress: 20, stageIdx: 6, startCol: 4, endCol: 7, operator: 'Budi Santoso', dead: '29/05/2024' },
  { no: 5, id: 'TRF-240522-005', cap: '1500 kVA', volt: '20 kV / 6300 V', status: 'SELESAI', badge: 'badge-selesai', progress: 100, stageIdx: 10, startCol: 5, endCol: 11, operator: 'Ahmad Fauzi', dead: '24/05/2024' },
  { no: 6, id: 'TRF-240522-006', cap: '1500 kVA', volt: '20 kV / 6300 V', status: 'SELESAI', badge: 'badge-selesai', progress: 100, stageIdx: 10, startCol: 1, endCol: 11, operator: 'Rudi Hartono', dead: '23/05/2024' },
  { no: 7, id: 'TRF-240522-007', cap: '2000 kVA', volt: '30 kV / 6300 V', status: 'PUNCHLIST', badge: 'badge-assembly', progress: 80, stageIdx: 9, startCol: 6, endCol: 10, operator: 'Joko Susilo', dead: '26/05/2024' },
  { no: 8, id: 'TRF-240522-008', cap: '2500 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI', badge: 'badge-belum', progress: 0, stageIdx: 0, startCol: 4, endCol: 10, operator: 'Budi Santoso', dead: '30/05/2024' },
  { no: 9, id: 'TRF-240522-009', cap: '2500 kVA', volt: '30 kV / 6300 V', status: 'PROSES', badge: 'badge-assembly', progress: 10, stageIdx: 0, startCol: 1, endCol: 1, operator: 'Ahmad Fauzi', dead: '31/05/2024' },
  { no: 10, id: 'TRF-240522-010', cap: '3000 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI', badge: 'badge-belum', progress: 0, stageIdx: 0, startCol: 1, endCol: 1, operator: 'Rudi Hartono', dead: '01/06/2024' }
];

// Project 2 Units Data (5 Units - Matching Image 2)
let prj2Units = [
  { no: 1, id: 'TRF-240522-A01', cap: '500 kVA', volt: '20 kV / 400 V', status: 'FINISHING', badge: 'badge-finishing', progress: 60, stageIdx: 7, startCol: 1, endCol: 8, operator: 'Budi Santoso', dead: '26/05/2024' },
  { no: 2, id: 'TRF-240522-A02', cap: '1000 kVA', volt: '20 kV / 400 V', status: 'INTERNAL TEST', badge: 'badge-internal', progress: 30, stageIdx: 6, startCol: 5, endCol: 7, operator: 'Rudi Hartono', dead: '26/05/2024' },
  { no: 3, id: 'TRF-240522-A03', cap: '1500 kVA', volt: '20 kV / 6300 V', status: 'SELESAI', badge: 'badge-selesai', progress: 100, stageIdx: 10, startCol: 1, endCol: 4, operator: 'Joko Susilo', dead: '24/05/2024' },
  { no: 4, id: 'TRF-240522-A04', cap: '2000 kVA', volt: '30 kV / 6300 V', status: 'CORE MAKING', badge: 'badge-core', progress: 70, stageIdx: 1, startCol: 4, endCol: 6, operator: 'Rudi Hartono', dead: '29/05/2024' },
  { no: 5, id: 'TRF-240522-A05', cap: '2500 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI', badge: 'badge-belum', progress: 0, stageIdx: 0, startCol: 4, endCol: 7, operator: 'Ahmad Fauzi', dead: '30/05/2024' }
];

// PT Project Data — Hierarchy: PT Company → Project → Trafo Units
let ptProjects = [
  {
    id: 'PT-PTM-01',
    pt: 'PT Pertamina Persero',
    ptShort: 'PTM',
    ptColor: '#16a34a',
    ptBg: '#dcfce7',
    project: 'TRAFO POWER 20kV',
    contract: 'SPK/PTM/2024/001',
    location: 'Refinery Unit IV Cilacap, Jawa Tengah',
    startDate: '01/05/2024',
    endDate: '30/06/2024',
    units: [
      { no: 1, id: 'TRF-PTM-001', nama: 'Trafo Power', cap: '500 kVA',  volt: '20 kV / 400 V',   status: 'ASSEMBLY',      badge: 'badge-assembly',  progress: 60,  stage: 'ASSEMBLY',      operator: 'Ahmad Fauzi',   dead: '20/06/2024' },
      { no: 2, id: 'TRF-PTM-002', nama: 'Trafo Power', cap: '1000 kVA', volt: '20 kV / 400 V',   status: 'FINISHING',     badge: 'badge-finishing', progress: 80,  stage: 'FINISHING',     operator: 'Rudi Hartono',  dead: '18/06/2024' },
      { no: 3, id: 'TRF-PTM-003', nama: 'Trafo Power', cap: '1500 kVA', volt: '20 kV / 6300 V',  status: 'INTERNAL TEST', badge: 'badge-internal',  progress: 40,  stage: 'INTERNAL TEST', operator: 'Joko Susilo',   dead: '22/06/2024' },
      { no: 4, id: 'TRF-PTM-004', nama: 'Trafo Power', cap: '2000 kVA', volt: '30 kV / 6300 V',  status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'Budi Santoso',  dead: '28/06/2024' },
      { no: 5, id: 'TRF-PTM-005', nama: 'Trafo Power', cap: '2500 kVA', volt: '30 kV / 6300 V',  status: 'SELESAI',      badge: 'badge-selesai',   progress: 100, stage: 'DELIVERY',      operator: 'Ahmad Fauzi',   dead: '15/06/2024' }
    ]
  },
  {
    id: 'PT-PLN-01',
    pt: 'PT PLN (Persero)',
    ptShort: 'PLN',
    ptColor: '#2563eb',
    ptBg: '#dbeafe',
    project: 'TRAFO DISTRIBUSI 20kV',
    contract: 'SPK/PLN/2024/007',
    location: 'GI Kembangan, Jakarta Barat',
    startDate: '10/05/2024',
    endDate: '25/07/2024',
    units: [
      { no: 1, id: 'TRF-PLN-001', nama: 'Trafo Distribusi', cap: '100 kVA',  volt: '20 kV / 400 V',  status: 'SELESAI',       badge: 'badge-selesai',   progress: 100, stage: 'DELIVERY',      operator: 'Budi Santoso',  dead: '02/06/2024' },
      { no: 2, id: 'TRF-PLN-002', nama: 'Trafo Distribusi', cap: '250 kVA',  volt: '20 kV / 400 V',  status: 'FAT',           badge: 'badge-assembly',  progress: 90,  stage: 'FAT',           operator: 'Rudi Hartono',  dead: '10/06/2024' },
      { no: 3, id: 'TRF-PLN-003', nama: 'Trafo Distribusi', cap: '500 kVA',  volt: '20 kV / 400 V',  status: 'ASSEMBLY',      badge: 'badge-assembly',  progress: 55,  stage: 'ASSEMBLY',      operator: 'Joko Susilo',   dead: '18/06/2024' },
      { no: 4, id: 'TRF-PLN-004', nama: 'Trafo Distribusi', cap: '630 kVA',  volt: '20 kV / 400 V',  status: 'CORE MAKING',   badge: 'badge-core',      progress: 30,  stage: 'CORE MAKING',   operator: 'Ahmad Fauzi',   dead: '25/06/2024' },
      { no: 5, id: 'TRF-PLN-005', nama: 'Trafo Distribusi', cap: '1000 kVA', volt: '20 kV / 400 V',  status: 'BELUM MULAI',   badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'Budi Santoso',  dead: '05/07/2024' }
    ]
  },
  {
    id: 'PT-PKT-01',
    pt: 'PT Pupuk Kaltim',
    ptShort: 'PKT',
    ptColor: '#d97706',
    ptBg: '#fef3c7',
    project: 'TRAFO POWER 30kV',
    contract: 'SPK/PKT/2024/003',
    location: 'Pabrik Bontang, Kalimantan Timur',
    startDate: '15/05/2024',
    endDate: '15/08/2024',
    units: [
      { no: 1, id: 'TRF-PKT-001', nama: 'Trafo Power', cap: '3000 kVA', volt: '30 kV / 6300 V', status: 'COIL MAKING',   badge: 'badge-core',      progress: 25,  stage: 'COIL MAKING',   operator: 'Rudi Hartono',  dead: '20/07/2024' },
      { no: 2, id: 'TRF-PKT-002', nama: 'Trafo Power', cap: '5000 kVA', volt: '30 kV / 6300 V', status: 'TANK MAKING',   badge: 'badge-tank',      progress: 10,  stage: 'TANK MAKING',   operator: 'Joko Susilo',   dead: '25/07/2024' },
      { no: 3, id: 'TRF-PKT-003', nama: 'Trafo Power', cap: '5000 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'Ahmad Fauzi',   dead: '30/07/2024' },
      { no: 4, id: 'TRF-PKT-004', nama: 'Trafo Power', cap: '7500 kVA', volt: '70 kV / 6300 V', status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'Budi Santoso',  dead: '05/08/2024' },
      { no: 5, id: 'TRF-PKT-005', nama: 'Trafo Power', cap: '10000 kVA',volt: '70 kV / 6300 V', status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'Rudi Hartono',  dead: '10/08/2024' }
    ]
  }
];

// Activity Feed Log Data
let activityLogs = [
  {
    icon: 'amber',
    iconClass: 'fa-solid fa-gears',
    boldText: 'Ahmad Fauzi memulai proses ASSEMBLY',
    subText: 'TRF-240522-001 • 10:10:24',
    time: '2 menit yang lalu'
  },
  {
    icon: 'green',
    iconClass: 'fa-solid fa-circle-check',
    boldText: 'Rudi Hartono menyelesaikan proses COIL MAKING',
    subText: 'TRF-240522-002 • 09:30:45',
    time: '52 menit yang lalu'
  },
  {
    icon: 'green',
    iconClass: 'fa-solid fa-circle-check',
    boldText: 'Budi Santoso menyelesaikan proses CORE MAKING',
    subText: 'TRF-240520-005 • 07:40:12',
    time: '2 jam yang lalu'
  },
  {
    icon: 'blue',
    iconClass: 'fa-solid fa-play',
    boldText: 'Joko Susilo memulai proses CONNECTION',
    subText: 'TRF-240521-003 • 08:10:33',
    time: '2 jam yang lalu'
  }
];

// Selected active state
let selectedOrder = orders[0];
let progressChartInstance = null;
let isSimulating = false;
let simulationTimer = null;

// ===== MOBILE SIDEBAR TOGGLE =====
function openMobileSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar)  sidebar.classList.add('mobile-open');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMobileSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar)  sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// Initialize Application on Page Load
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  renderStepper(selectedOrder);
  renderOrdersTable();
  updateDetailPanel(selectedOrder);
  initProgressChart();
  renderActivityLogs();
  
  // Render Multi-Project View components
  renderProjectView(prj1Units, 'prj1TableBody', 'prj1GanttBody', 'prj1');
  renderProjectView(prj2Units, 'prj2TableBody', 'prj2GanttBody', 'prj2');

  // Render PT Projects View
  renderPTProjects();

  // Force-clear login input fields to override browser autofill / saved credentials
  const clearLoginFields = () => {
    const u = document.getElementById('loginUsername');
    const p = document.getElementById('loginPassword');
    if (u) u.value = '';
    if (p) p.value = '';
  };
  clearLoginFields();
  setTimeout(clearLoginFields, 100);
  setTimeout(clearLoginFields, 300);

  // Auto-open Monitoring submenu on page load (default view is single-flow)
  const submenu = document.getElementById('submenuMonitoring');
  const menuBtn = document.getElementById('menuMonitoring');
  if (submenu) submenu.classList.add('open');
  if (menuBtn) menuBtn.classList.add('open');
});

window.addEventListener('load', () => {
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  if (u) u.value = '';
  if (p) p.value = '';
});

// Live Clock Updater
function initClock() {
  const clockEl = document.getElementById('liveClock');
  function updateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const timeStr = now.toTimeString().split(' ')[0];
    if (clockEl) {
      clockEl.innerText = `${day} ${month} ${year} ${timeStr}`;
    }
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// Render Horizontal 11-Stepper Pipeline (Image 1 top section)
function renderStepper(order) {
  const container = document.getElementById('flowStepperGrid');
  if (!container) return;
  
  container.innerHTML = '';

  STAGES.forEach((stage, idx) => {
    let cardStatusClass = 'waiting';
    let statusPillText = 'Menunggu';
    let metaHTML = `<span>-</span><span>-</span>`;

    if (idx < order.currentStageIndex) {
      cardStatusClass = 'finished';
      statusPillText = '<i class="fa-solid fa-circle-check"></i> Selesai';
      const stageLog = order.timeline[idx];
      metaHTML = `
        <span>${stageLog ? stageLog.time : '22/05'}</span>
        <span class="step-operator">Operator: ${stageLog ? stageLog.operator.split(' ')[0] : 'Operator'}</span>
      `;
    } else if (idx === order.currentStageIndex) {
      cardStatusClass = 'active-process';
      statusPillText = '<i class="fa-solid fa-spinner fa-spin"></i> Proses';
      const stageLog = order.timeline[idx];
      metaHTML = `
        <span>${stageLog ? stageLog.time : 'Mulai: 10:10'}</span>
        <span class="step-operator" style="color: var(--color-process-text);">Operator: ${order.operator}</span>
      `;
    } else {
      cardStatusClass = 'waiting';
      statusPillText = 'Menunggu';
      metaHTML = `<span>Menunggu</span><span>-</span>`;
    }

    const stepCard = document.createElement('div');
    stepCard.className = `step-card ${cardStatusClass}`;
    stepCard.innerHTML = `
      <div class="step-number">${idx + 1}.</div>
      <div class="step-icon-box">
        <i class="fa-solid ${stage.icon}"></i>
      </div>
      <div class="step-title">${stage.code}</div>
      <div class="step-status-pill">${statusPillText}</div>
      <div class="step-meta">
        ${metaHTML}
      </div>
    `;

    stepCard.addEventListener('click', () => {
      showToast(`Tahapan ${stage.code}: Operator ${order.operator}`);
    });

    container.appendChild(stepCard);
  });
}

// Render Orders Table
function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  orders.forEach((ord) => {
    const tr = document.createElement('tr');
    if (ord.id === selectedOrder.id) {
      tr.className = 'selected';
    }

    let badgeClass = 'badge-assembly';
    if (ord.status === 'SELESAI') badgeClass = 'badge-selesai';
    else if (ord.status === 'CONNECTION') badgeClass = 'badge-connection';
    else if (ord.status === 'TANK MAKING') badgeClass = 'badge-tank';
    else if (ord.status === 'CORE MAKING') badgeClass = 'badge-core';

    tr.innerHTML = `
      <td class="order-code">${ord.id}</td>
      <td style="font-weight: 600;">${ord.nama}</td>
      <td>${ord.kapasitas}</td>
      <td>${ord.tegangan}</td>
      <td><span class="badge-status ${badgeClass}">${ord.status}</span></td>
      <td>
        <div class="table-progress-cell">
          <span class="progress-pct-label">${ord.progress}%</span>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${ord.progress === 100 ? 'success' : ''}" style="width: ${ord.progress}%;"></div>
          </div>
        </div>
      </td>
      <td style="font-size: 11px; color: var(--text-secondary);">${ord.mulai}</td>
      <td class="deadline-alert">${ord.deadline}</td>
      <td>
        <div class="operator-cell">
          <img src="${ord.operatorAvatar}" class="operator-avatar">
          <span>${ord.operator}</span>
        </div>
      </td>
    `;

    tr.addEventListener('click', () => {
      selectedOrder = ord;
      renderOrdersTable();
      renderStepper(selectedOrder);
      updateDetailPanel(selectedOrder);
    });

    tbody.appendChild(tr);
  });
}

// Update Detail Order Side Panel
function updateDetailPanel(ord) {
  document.getElementById('detailOrderId').innerText = ord.id;
  
  const badgeEl = document.getElementById('detailStatusBadge');
  badgeEl.innerText = ord.status;
  badgeEl.className = `badge-status ${ord.status === 'SELESAI' ? 'badge-selesai' : ord.status === 'CONNECTION' ? 'badge-connection' : 'badge-assembly'}`;

  document.getElementById('detailNamaTrafo').innerText = `: ${ord.nama}`;
  document.getElementById('detailKapasitas').innerText = `: ${ord.kapasitas}`;
  document.getElementById('detailTegangan').innerText = `: ${ord.tegangan}`;
  document.getElementById('detailMulai').innerText = `: ${ord.mulai}`;
  document.getElementById('detailDeadline').innerText = `: ${ord.deadline}`;
  document.getElementById('detailStatusSaatIni').innerText = `: ${ord.status} (${ord.progress}%)`;
  
  document.getElementById('detailOperator').innerHTML = `
    <img src="${ord.operatorAvatar}" class="operator-avatar"> ${ord.operator}
  `;

  document.getElementById('detailProgressPct').innerText = `${ord.progress}%`;
  document.getElementById('detailProgressBar').style.width = `${ord.progress}%`;

  // Update Vertical Timeline
  const timelineContainer = document.getElementById('timelineProsesList');
  if (!timelineContainer) return;
  timelineContainer.innerHTML = '';

  ord.timeline.forEach((item) => {
    const timeRow = document.createElement('div');
    timeRow.className = `timeline-item ${item.status}`;
    
    let statusText = item.status === 'finished' ? 'Selesai' : item.status === 'process' ? 'Proses' : 'Menunggu';

    timeRow.innerHTML = `
      <span class="timeline-dot"></span>
      <span class="timeline-stage-name">${item.stage}</span>
      <span class="timeline-stage-status">${statusText}</span>
      <div class="timeline-meta">
        <div>${item.time}</div>
        <div style="font-size: 9px; font-weight: 600;">${item.operator}</div>
      </div>
    `;
    timelineContainer.appendChild(timeRow);
  });
}

// Initialize Chart.js Progress Graph
function initProgressChart() {
  const ctx = document.getElementById('progressChart');
  if (!ctx) return;

  progressChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'],
      datasets: [{
        label: 'Rata-rata Progress (%)',
        data: [20, 38, 40, 68, 67, 72, 75],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#2563eb',
        pointBorderColor: '#ffffff',
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0b132b',
          titleFont: { family: 'Plus Jakarta Sans', size: 12 },
          bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `Rata-rata Progress: ${context.raw}%`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            callback: value => value + '%',
            font: { family: 'Plus Jakarta Sans', size: 10 },
            color: '#94a3b8'
          },
          grid: { color: '#f1f5f9' }
        },
        x: {
          ticks: {
            font: { family: 'Plus Jakarta Sans', size: 10 },
            color: '#94a3b8'
          },
          grid: { display: false }
        }
      }
    }
  });
}

// Render Activity Log Feed
function renderActivityLogs() {
  const feed = document.getElementById('activityFeed');
  if (!feed) return;
  feed.innerHTML = '';

  activityLogs.forEach((log) => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-icon ${log.icon}">
        <i class="${log.iconClass}"></i>
      </div>
      <div class="activity-content">
        <div class="activity-text"><span class="activity-bold">${log.boldText}</span></div>
        <div class="activity-sub">${log.subText}</div>
      </div>
      <span class="activity-time">${log.time}</span>
    `;
    feed.appendChild(item);
  });

  // Render Horizontal Activity items for Multi-project view
  const horizRow = document.getElementById('activityHorizontalRow');
  if (horizRow) {
    horizRow.innerHTML = '';
    activityLogs.slice(0, 3).forEach((log) => {
      const card = document.createElement('div');
      card.style.cssText = 'background: #f8fafc; padding: 10px; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 11px;';
      card.innerHTML = `
        <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${log.boldText.split(' ')[0]} ${log.boldText.split(' ')[1]}</div>
        <div style="color: var(--text-muted); font-size: 10px;">${log.subText}</div>
        <div style="text-align: right; color: var(--color-primary); font-weight: 600; font-size: 9px; margin-top: 6px;">${log.time}</div>
      `;
      horizRow.appendChild(card);
    });
  }
}

// Render Multi-Project Matrix View (Image 2 Replica)
function renderProjectView(units, tableBodyId, ganttBodyId, prefix) {
  const tBody = document.getElementById(tableBodyId);
  const gBody = document.getElementById(ganttBodyId);
  if (!tBody || !gBody) return;

  tBody.innerHTML = '';
  gBody.innerHTML = '';

  units.forEach((unit) => {
    // Left Table row
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${unit.no}</td>
      <td class="order-code">${unit.id}</td>
      <td>${unit.cap}</td>
      <td>${unit.volt}</td>
      <td><span class="badge-status ${unit.badge}">${unit.status}</span></td>
      <td>
        <div class="table-progress-cell">
          <span class="progress-pct-label">${unit.progress}%</span>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${unit.progress === 100 ? 'success' : ''}" style="width: ${unit.progress}%;"></div>
          </div>
        </div>
      </td>
    `;
    
    tr.addEventListener('click', () => {
      document.getElementById(`${prefix}DetailId`).innerText = unit.id;
      document.getElementById(`${prefix}DetailStatus`).innerText = unit.status;
      document.getElementById(`${prefix}DetailStatus`).className = `badge-status ${unit.badge}`;
      document.getElementById(`${prefix}DetailCap`).innerText = `: ${unit.cap}`;
      document.getElementById(`${prefix}DetailVolt`).innerText = `: ${unit.volt}`;
      document.getElementById(`${prefix}DetailProg`).innerText = `: ${unit.progress}%`;
      document.getElementById(`${prefix}DetailStage`).innerText = `: ${unit.stageIdx + 1}. ${unit.status}`;
      document.getElementById(`${prefix}DetailOp`).innerHTML = `
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" class="operator-avatar"> ${unit.operator}
      `;
      showToast(`Selected Unit ${unit.id}`);
    });

    tBody.appendChild(tr);

    // Right Gantt Matrix row (11 Columns)
    const gRow = document.createElement('div');
    gRow.className = 'gantt-row';

    // Track line
    let dotsHTML = '';
    for (let c = 1; c <= 11; c++) {
      let nodeClass = '';
      if (c < unit.startCol) {
        nodeClass = '';
      } else if (c >= unit.startCol && c < unit.endCol) {
        nodeClass = 'finished-node';
      } else if (c === unit.endCol) {
        nodeClass = unit.progress === 100 ? 'finished-node' : 'process-node active-node';
      }
      dotsHTML += `<div class="gantt-node-dot ${nodeClass}"></div>`;
    }

    // Horizontal bar calculation (left offset % and width %)
    const colWidth = 100 / 11;
    const lineLeft = (unit.startCol - 1) * colWidth + (colWidth / 2);
    const lineWidth = (unit.endCol - unit.startCol) * colWidth;
    const lineColorClass = unit.progress === 100 ? 'finished' : (unit.status === 'INTERNAL TEST' ? 'blue' : 'process');

    gRow.innerHTML = `
      <div class="gantt-track-bg"></div>
      <div class="gantt-span-line ${lineColorClass}" style="left: ${lineLeft}%; width: ${lineWidth}%;"></div>
      ${dotsHTML}
    `;

    gBody.appendChild(gRow);
  });
}

// Switch between Main Views (Overview, Multi-Project, Pengaturan, Project PT)
// Toggle sidebar Monitoring sub-menu accordion
function toggleMonitoringMenu() {
  const submenu = document.getElementById('submenuMonitoring');
  const menuBtn = document.getElementById('menuMonitoring');
  if (!submenu) return;
  const isOpen = submenu.classList.contains('open');
  submenu.classList.toggle('open', !isOpen);
  if (menuBtn) menuBtn.classList.toggle('open', !isOpen);
}

function switchView(viewName) {
  const viewSingle     = document.getElementById('viewSingleFlow');
  const viewMulti      = document.getElementById('viewMultiProject');
  const viewPengaturan = document.getElementById('viewPengaturan');
  const viewProjectPT  = document.getElementById('viewProjectPT');
  
  const tabSingle    = document.getElementById('tabSingleFlow');
  const tabMulti     = document.getElementById('tabMultiProject');
  const tabProjectPT = document.getElementById('tabProjectPT');

  // Hide all sections first
  [viewSingle, viewMulti, viewPengaturan, viewProjectPT].forEach(v => v && v.classList.remove('active'));
  // Clear all submenu-item active states
  [tabSingle, tabMulti, tabProjectPT].forEach(t => t && t.classList.remove('active'));

  const monitoringViews = ['single-flow', 'multi-project', 'project-pt'];

  // Auto open the monitoring submenu when navigating to a monitoring view
  if (monitoringViews.includes(viewName)) {
    const submenu = document.getElementById('submenuMonitoring');
    const menuBtn = document.getElementById('menuMonitoring');
    if (submenu) submenu.classList.add('open');
    if (menuBtn) menuBtn.classList.add('open');
  }

  if (viewName === 'single-flow') {
    if (viewSingle) viewSingle.classList.add('active');
    if (tabSingle) tabSingle.classList.add('active');
  } else if (viewName === 'multi-project') {
    if (viewMulti) viewMulti.classList.add('active');
    if (tabMulti) tabMulti.classList.add('active');
  } else if (viewName === 'pengaturan') {
    if (viewPengaturan) viewPengaturan.classList.add('active');
    loadUserAccountsUI();
  } else if (viewName === 'project-pt') {
    if (viewProjectPT) viewProjectPT.classList.add('active');
    if (tabProjectPT) tabProjectPT.classList.add('active');
  }
}

// Filter Orders in Table
function filterOrders() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const rows = document.querySelectorAll('#ordersTableBody tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? '' : 'none';
  });
}

// Render PT Projects View
function renderPTProjects() {
  const container = document.getElementById('ptProjectsContainer');
  if (!container) return;
  container.innerHTML = '';

  ptProjects.forEach(pt => {
    const totalUnits = pt.units.length;
    const selesai    = pt.units.filter(u => u.status === 'SELESAI').length;
    const proses     = pt.units.filter(u => u.status !== 'SELESAI' && u.status !== 'BELUM MULAI' && u.progress > 0).length;
    const belumMulai = pt.units.filter(u => u.status === 'BELUM MULAI').length;
    const avgProgress = totalUnits > 0 ? Math.round(pt.units.reduce((s, u) => s + u.progress, 0) / totalUnits) : 0;

    // Rows for each trafo unit
    const unitRows = pt.units.map(u => {
      const pctColor = u.progress === 100 ? '#10b981' : u.progress >= 50 ? '#f59e0b' : '#3b82f6';
      return `
        <tr>
          <td style="font-weight:700; color:#64748b; text-align:center;">${u.no}</td>
          <td style="font-weight:700; font-size:11px;">
            <span style="background:${pt.ptBg}; color:${pt.ptColor}; padding:4px 8px; border-radius:6px; border:1px solid ${pt.ptColor}44; display:inline-flex; align-items:center; gap:5px; font-weight:800;" title="Klik untuk lihat progres detail trafo">
              <i class="fa-solid fa-up-right-from-square" style="font-size:9px;"></i> ${u.id}
            </span>
          </td>
          <td style="font-weight:600;">${u.nama}</td>
          <td><span style="font-size:12px; font-weight:700; color:#0f172a;">${u.cap}</span></td>
          <td style="font-size:11px; color:#64748b;">${u.volt}</td>
          <td><span class="badge-status ${u.badge}" style="font-size:10px;">${u.status}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:6px; min-width:110px;">
              <div style="flex:1; background:#f1f5f9; border-radius:999px; height:6px; overflow:hidden;">
                <div style="height:100%; width:${u.progress}%; background:${pctColor}; border-radius:999px; transition:width 0.4s;"></div>
              </div>
              <span style="font-size:11px; font-weight:700; color:${pctColor}; min-width:30px;">${u.progress}%</span>
            </div>
          </td>
          <td style="font-size:11px; color:#64748b;">${u.dead}</td>
          <td style="font-size:11px; color:#0f172a; font-weight:500;">${u.operator}</td>
          <td style="text-align:center; white-space:nowrap;">
            <button class="btn-secondary" onclick="event.stopPropagation(); openTrafoDetailModalById('${pt.id}', '${u.id}')" style="padding:3px 8px; font-size:10px; border-radius:6px; display:inline-flex; align-items:center; gap:4px; margin-right:4px;" title="Lihat Detail Trafo">
              <i class="fa-solid fa-eye"></i> Detail
            </button>
            <button class="btn-icon-danger" onclick="event.stopPropagation(); deleteTrafoUnit('${pt.id}', '${u.id}')" title="Hapus Trafo Unit">
              <i class="fa-solid fa-trash" style="font-size:10px;"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');

    const card = document.createElement('div');
    card.className = 'section-card';
    card.style.marginBottom = '0';
    card.innerHTML = `
      <!-- PT Header Bar -->
      <div style="background: linear-gradient(135deg, ${pt.ptColor} 0%, ${pt.ptColor}cc 100%); border-radius: var(--radius-lg) var(--radius-lg) 0 0; padding: 18px 22px; display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap;">
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="width:52px; height:52px; border-radius:12px; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:900; color:#fff; letter-spacing:-1px; flex-shrink:0;">
            ${pt.ptShort}
          </div>
          <div>
            <div style="font-size:18px; font-weight:800; color:#fff; letter-spacing:0.3px;">${pt.pt}</div>
            <div style="font-size:12px; color:rgba(255,255,255,0.8); margin-top:2px;">
              <i class="fa-solid fa-folder-open" style="margin-right:5px;"></i>${pt.project}
              <span style="margin:0 8px; opacity:0.5;">|</span>
              <i class="fa-solid fa-file-contract" style="margin-right:5px;"></i>${pt.contract}
            </div>
            <div style="font-size:11px; color:rgba(255,255,255,0.7); margin-top:2px;">
              <i class="fa-solid fa-location-dot" style="margin-right:4px;"></i>${pt.location}
            </div>
          </div>
        </div>

        <div style="display:flex; gap:10px; flex-shrink:0; align-items:center; flex-wrap:wrap;">
          <div style="background:rgba(255,255,255,0.15); border-radius:10px; padding:8px 14px; text-align:center; min-width:60px;">
            <div style="font-size:20px; font-weight:900; color:#fff;">${totalUnits}</div>
            <div style="font-size:9px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.5px;">Total Unit</div>
          </div>
          <div style="background:rgba(255,255,255,0.15); border-radius:10px; padding:8px 14px; text-align:center; min-width:60px;">
            <div style="font-size:20px; font-weight:900; color:#4ade80;">${selesai}</div>
            <div style="font-size:9px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.5px;">Selesai</div>
          </div>
          <div style="background:rgba(255,255,255,0.15); border-radius:10px; padding:8px 14px; text-align:center; min-width:60px;">
            <div style="font-size:20px; font-weight:900; color:#fbbf24;">${proses}</div>
            <div style="font-size:9px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.5px;">On Process</div>
          </div>
          <div style="background:rgba(255,255,255,0.15); border-radius:10px; padding:8px 14px; text-align:center; min-width:60px;">
            <div style="font-size:20px; font-weight:900; color:rgba(255,255,255,0.6);">${belumMulai}</div>
            <div style="font-size:9px; color:rgba(255,255,255,0.8); text-transform:uppercase; letter-spacing:0.5px;">Belum Mulai</div>
          </div>

          <button class="btn-add-trafo-pt" onclick="openAddTrafoModal('${pt.id}')" title="Tambah trafo baru di bawah ${pt.pt}">
            <i class="fa-solid fa-plus-circle"></i> Tambah Trafo
          </button>
        </div>
      </div>

      <!-- Progress Overall Bar -->
      <div style="background:${pt.ptBg}; padding:12px 22px; border-bottom:1px solid ${pt.ptColor}22; display:flex; align-items:center; gap:12px;">
        <div style="font-size:11px; font-weight:700; color:${pt.ptColor}; min-width:80px;">PROGRESS TOTAL</div>
        <div style="flex:1; background:#e2e8f0; border-radius:999px; height:10px; overflow:hidden;">
          <div style="height:100%; width:${avgProgress}%; background:${pt.ptColor}; border-radius:999px; transition:width 0.6s;"></div>
        </div>
        <div style="font-size:15px; font-weight:800; color:${pt.ptColor}; min-width:40px;">${avgProgress}%</div>
        <div style="font-size:10px; color:#64748b;">
          <i class="fa-regular fa-calendar" style="margin-right:3px;"></i>${pt.startDate} — ${pt.endDate}
        </div>
      </div>

      <!-- Toolbar Add Unit Button -->
      <div style="background:#f8fafc; padding:8px 16px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
        <span style="font-size:11px; font-weight:700; color:var(--text-muted);">
          <i class="fa-solid fa-boxes-stacked" style="color:${pt.ptColor};"></i> DAFTAR UNIT TRAFO (${totalUnits} UNIT)
        </span>
        <button class="btn-primary" onclick="openAddTrafoModal('${pt.id}')" style="padding:4px 10px; font-size:11px; background:${pt.ptColor};">
          <i class="fa-solid fa-plus"></i> Tambah Trafo ke ${pt.ptShort}
        </button>
      </div>

      <!-- Trafo Units Table -->
      <div style="padding:0; overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; font-size:12px;">
          <thead>
            <tr style="background:#ffffff; border-bottom:2px solid var(--border-color);">
              <th style="padding:10px 12px; text-align:center; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; width:40px;">No</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">ID Trafo</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Nama</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Kapasitas</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Tegangan</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Status / Stage</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Progress</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Deadline</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Operator</th>
              <th style="padding:10px 12px; text-align:center; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Aksi</th>
            </tr>
          </thead>
          <tbody id="ptTbody-${pt.id}" style="font-size:12px;">
            ${unitRows || '<tr><td colspan="10" style="text-align:center; padding:20px; color:#94a3b8;">Belum ada trafo dalam proyek ini. Klik <b>+ Tambah Trafo</b> di atas untuk menambahkan.</td></tr>'}
          </tbody>
        </table>
      </div>
    `;

    container.appendChild(card);

    // Striped rows effect & modal trigger on row click
    const rows = card.querySelectorAll('tbody tr');
    rows.forEach((row, i) => {
      if (pt.units[i]) {
        if (i % 2 === 0) row.style.background = '#fafafa';
        row.style.borderBottom = '1px solid #f1f5f9';
        row.style.cursor = 'pointer';
        row.addEventListener('mouseenter', () => row.style.background = pt.ptBg);
        row.addEventListener('mouseleave', () => row.style.background = i % 2 === 0 ? '#fafafa' : '#fff');
        row.addEventListener('click', () => {
          openTrafoDetailModal(pt.units[i], pt);
        });
      }
    });
  });
}

// Helper to populate project dropdown in modals
function populateProjectDropdowns() {
  const sel = document.getElementById('inpTrafoTargetProject');
  if (!sel) return;
  sel.innerHTML = '';

  // 1. PT Projects
  ptProjects.forEach(pt => {
    const opt = document.createElement('option');
    opt.value = pt.id;
    opt.innerText = `${pt.pt} — ${pt.project} (${pt.units.length} Unit)`;
    sel.appendChild(opt);
  });

  // 2. Multi-Projects
  const optPrj1 = document.createElement('option');
  optPrj1.value = 'PRJ-240522-01';
  optPrj1.innerText = `PRJ-240522-01 — PROYEK TRAFO 10 UNIT (${prj1Units.length} Unit)`;
  sel.appendChild(optPrj1);

  const optPrj2 = document.createElement('option');
  optPrj2.value = 'PRJ-240522-02';
  optPrj2.innerText = `PRJ-240522-02 — PROYEK TRAFO 5 UNIT (${prj2Units.length} Unit)`;
  sel.appendChild(optPrj2);
}

// Open Modal Add Trafo
function openAddTrafoModal(projectId) {
  populateProjectDropdowns();
  const sel = document.getElementById('inpTrafoTargetProject');
  if (projectId && sel) {
    sel.value = projectId;
  }
  onTargetProjectChange();

  // Set default deadline to +30 days from today
  const dInp = document.getElementById('inpTrafoDeadlinePT');
  if (dInp && !dInp.value) {
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    dInp.value = nextMonth.toISOString().split('T')[0];
  }

  document.getElementById('addTrafoModal').classList.add('active');
}

// Triggered on target project dropdown change in Add Trafo Modal
function onTargetProjectChange() {
  const targetId = document.getElementById('inpTrafoTargetProject').value;
  const codeInp = document.getElementById('inpTrafoCode');
  const nameInp = document.getElementById('inpTrafoNamePT');

  let defaultCode = '';
  let defaultName = 'Trafo Power';

  const ptObj = ptProjects.find(p => p.id === targetId);
  if (ptObj) {
    const count = ptObj.units.length + 1;
    const numStr = String(count).padStart(3, '0');
    defaultCode = `TRF-${ptObj.ptShort}-${numStr}`;
    defaultName = ptObj.project.includes('DISTRIBUSI') ? 'Trafo Distribusi' : 'Trafo Power';
  } else if (targetId === 'PRJ-240522-01') {
    const count = prj1Units.length + 1;
    const numStr = String(count).padStart(3, '0');
    defaultCode = `TRF-240522-${numStr}`;
  } else if (targetId === 'PRJ-240522-02') {
    const count = prj2Units.length + 1;
    const numStr = String(count).padStart(3, '0');
    defaultCode = `TRF-240522-A${numStr}`;
  }

  if (codeInp) codeInp.value = defaultCode;
  if (nameInp && !nameInp.value) nameInp.value = defaultName;
}

// Submit handler for adding a Trafo to a project
function handleAddTrafoSubmit(e) {
  e.preventDefault();
  const targetId = document.getElementById('inpTrafoTargetProject').value;
  const code     = document.getElementById('inpTrafoCode').value.trim();
  const name     = document.getElementById('inpTrafoNamePT').value.trim();
  const cap      = document.getElementById('inpTrafoCapPT').value;
  const volt     = document.getElementById('inpTrafoVoltPT').value;
  const status   = document.getElementById('inpTrafoStatusPT').value;
  const progress = parseInt(document.getElementById('inpTrafoProgressPT').value) || 0;
  const operator = document.getElementById('inpTrafoOperatorPT').value;
  const deadlineRaw = document.getElementById('inpTrafoDeadlinePT').value;
  const deadlineFormatted = formatDateDisplay(deadlineRaw);

  const badgeMap = {
    'SELESAI': 'badge-selesai',
    'BELUM MULAI': 'badge-belum',
    'FINISHING': 'badge-finishing',
    'INTERNAL TEST': 'badge-internal',
    'CORE MAKING': 'badge-core',
    'COIL MAKING': 'badge-core',
    'TANK MAKING': 'badge-tank'
  };
  const badge = badgeMap[status] || 'badge-assembly';
  const stageIdx = getStageIdxFromStatus(status);

  let projectTitle = 'Proyek';

  // Check if target is a PT project
  const targetPT = ptProjects.find(p => p.id === targetId);
  if (targetPT) {
    projectTitle = targetPT.pt;
    const newUnit = {
      no: targetPT.units.length + 1,
      id: code,
      nama: name,
      cap: cap,
      volt: volt,
      status: status,
      badge: badge,
      progress: progress,
      stage: status,
      operator: operator,
      dead: deadlineFormatted,
      stageIdx: stageIdx
    };
    targetPT.units.push(newUnit);
    renderPTProjects();
  } else if (targetId === 'PRJ-240522-01') {
    projectTitle = 'PROYEK TRAFO 10 UNIT';
    const newUnit = {
      no: prj1Units.length + 1,
      id: code,
      cap: cap,
      volt: volt,
      status: status,
      badge: badge,
      progress: progress,
      stageIdx: stageIdx,
      startCol: 1,
      endCol: Math.max(1, Math.min(11, Math.ceil((progress || 10) / 10))),
      operator: operator,
      dead: deadlineFormatted
    };
    prj1Units.push(newUnit);
    renderProjectView(prj1Units, 'prj1TableBody', 'prj1GanttBody', 'prj1');
  } else if (targetId === 'PRJ-240522-02') {
    projectTitle = 'PROYEK TRAFO 5 UNIT';
    const newUnit = {
      no: prj2Units.length + 1,
      id: code,
      cap: cap,
      volt: volt,
      status: status,
      badge: badge,
      progress: progress,
      stageIdx: stageIdx,
      startCol: 1,
      endCol: Math.max(1, Math.min(11, Math.ceil((progress || 10) / 10))),
      operator: operator,
      dead: deadlineFormatted
    };
    prj2Units.push(newUnit);
    renderProjectView(prj2Units, 'prj2TableBody', 'prj2GanttBody', 'prj2');
  }

  // Also add to global orders list for Single Flow view
  const newOrder = {
    id: code,
    nama: `${name} (${projectTitle})`,
    kapasitas: cap,
    tegangan: volt,
    status: status === 'BELUM MULAI' ? 'TANK MAKING' : status,
    currentStageIndex: stageIdx,
    progress: progress,
    mulai: new Date().toLocaleDateString('id-ID'),
    deadline: deadlineFormatted,
    operator: operator,
    operatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    timeline: STAGES.map((s, idx) => ({
      stage: s.code,
      status: idx < stageIdx ? 'finished' : (idx === stageIdx ? 'process' : 'waiting'),
      time: idx <= stageIdx ? 'Tercatat' : '-',
      operator: operator
    }))
  };
  orders.unshift(newOrder);

  // Sync to Supabase if active
  if (typeof createOrderInSupabase === 'function' && isSupabaseConfigured()) {
    createOrderInSupabase({
      id: newOrder.id,
      nama: newOrder.nama,
      kapasitas: newOrder.kapasitas,
      tegangan: newOrder.tegangan,
      status: newOrder.status,
      current_stage_index: newOrder.currentStageIndex,
      progress: newOrder.progress,
      deadline: newOrder.deadline,
      operator: newOrder.operator,
      operator_avatar: newOrder.operatorAvatar,
      timeline: newOrder.timeline
    });
  }

  // Update main tables & KPI
  document.getElementById('kpiTotalOrder').innerText = orders.length;
  renderOrdersTable();
  if (typeof initProgressChart === 'function') initProgressChart();

  closeModal('addTrafoModal');
  showToast(`✅ Trafo ${code} berhasil ditambahkan ke ${projectTitle}!`);
}

// Open Modal Add PT Project
function openAddPTProjectModal() {
  document.getElementById('addPTProjectModal').classList.add('active');
}

// Submit handler for creating a new PT Project
function handleAddPTProjectSubmit(e) {
  e.preventDefault();
  const ptName    = document.getElementById('inpPTName').value.trim();
  const ptShort   = document.getElementById('inpPTShort').value.trim().toUpperCase();
  const projTitle = document.getElementById('inpPTProjectTitle').value.trim();
  const colorVal  = document.getElementById('inpPTColor').value;
  const contract  = document.getElementById('inpPTContract').value.trim();
  const location  = document.getElementById('inpPTLocation').value.trim();
  const startDate = document.getElementById('inpPTStartDate').value;
  const endDate   = document.getElementById('inpPTEndDate').value;

  const colorParts = colorVal.split('|');
  const ptColor = colorParts[0] || '#2563eb';
  const ptBg    = colorParts[1] || '#dbeafe';

  const newPt = {
    id: `PT-${ptShort}-${String(ptProjects.length + 1).padStart(2, '0')}`,
    pt: ptName,
    ptShort: ptShort,
    ptColor: ptColor,
    ptBg: ptBg,
    project: projTitle,
    contract: contract,
    location: location,
    startDate: formatDateDisplay(startDate),
    endDate: formatDateDisplay(endDate),
    units: []
  };

  ptProjects.push(newPt);
  renderPTProjects();

  closeModal('addPTProjectModal');
  showToast(`✅ Proyek ${ptName} (${projTitle}) berhasil dibuat!`);
}

// Delete Trafo Unit from PT Project
function deleteTrafoUnit(ptId, trafoId) {
  const pt = ptProjects.find(p => p.id === ptId);
  if (!pt) return;

  if (confirm(`Apakah Anda yakin ingin menghapus unit trafo ${trafoId} dari ${pt.pt}?`)) {
    pt.units = pt.units.filter(u => u.id !== trafoId);
    // Recalculate 'no' indexing
    pt.units.forEach((u, i) => u.no = i + 1);
    renderPTProjects();
    showToast(`🗑️ Unit trafo ${trafoId} telah dihapus dari ${pt.ptShort}.`);
  }
}

// Open detail modal by PT ID & Trafo ID
function openTrafoDetailModalById(ptId, trafoId) {
  const pt = ptProjects.find(p => p.id === ptId);
  if (!pt) return;
  const unit = pt.units.find(u => u.id === trafoId);
  if (unit) openTrafoDetailModal(unit, pt);
}

// Helper to format YYYY-MM-DD to DD/MM/YYYY
function formatDateDisplay(dateStr) {
  if (!dateStr) return '-';
  if (dateStr.includes('/')) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

// Helper to get stage index from status text
function getStageIdxFromStatus(statusStr) {
  if (!statusStr) return 0;
  const upper = statusStr.toUpperCase();
  const idx = STAGES.findIndex(s => upper.includes(s.code));
  return idx !== -1 ? idx : 0;
}


// Live Simulation Engine Toggle
function toggleSimulation() {
  isSimulating = !isSimulating;
  const simBtn = document.getElementById('btnSimulate');
  const btnText = document.getElementById('simBtnText');

  if (isSimulating) {
    simBtn.style.backgroundColor = '#10b981';
    simBtn.style.color = '#ffffff';
    btnText.innerText = 'Simulation Active';
    showToast('⚡ Live Simulation Started! Real-time progress ticking...');

    simulationTimer = setInterval(() => {
      // Pick random order & increment progress
      const randomIdx = Math.floor(Math.random() * orders.length);
      const targetOrd = orders[randomIdx];
      
      if (targetOrd.progress < 100) {
        targetOrd.progress = Math.min(100, targetOrd.progress + 5);
        if (targetOrd.progress === 100 && targetOrd.currentStageIndex < 10) {
          targetOrd.currentStageIndex++;
          targetOrd.status = STAGES[targetOrd.currentStageIndex].code;
          
          // Add activity log
          activityLogs.unshift({
            icon: 'green',
            iconClass: 'fa-solid fa-circle-check',
            boldText: `${targetOrd.operator} menyelesaikan proses ${targetOrd.status}`,
            subText: `${targetOrd.id} • Baru saja`,
            time: 'Baru saja'
          });
          renderActivityLogs();
        }
      }

      // Refresh current views
      renderOrdersTable();
      if (selectedOrder.id === targetOrd.id) {
        renderStepper(selectedOrder);
        updateDetailPanel(selectedOrder);
      }

      // Update Chart randomly
      if (progressChartInstance) {
        const dataArr = progressChartInstance.data.datasets[0].data;
        const lastVal = dataArr[dataArr.length - 1];
        dataArr[dataArr.length - 1] = Math.min(100, lastVal + 1);
        progressChartInstance.update();
      }

    }, 3000);
  } else {
    clearInterval(simulationTimer);
    simBtn.style.backgroundColor = '#ffffff';
    simBtn.style.color = 'var(--text-secondary)';
    btnText.innerText = 'Live Simulation';
    showToast('Simulation Paused.');
  }
}

// Create New Order Form Handler
function handleCreateOrder(e) {
  e.preventDefault();
  const code = document.getElementById('inpOrderCode').value;
  const name = document.getElementById('inpTrafoName').value;
  const cap = document.getElementById('inpKapasitas').value;
  const volt = document.getElementById('inpTegangan').value;
  const op = document.getElementById('inpOperator').value;
  const deadline = document.getElementById('inpDeadline').value;

  const newOrd = {
    id: code,
    nama: name,
    kapasitas: cap,
    tegangan: volt,
    status: 'TANK MAKING',
    currentStageIndex: 0,
    progress: 10,
    mulai: '22/05/2024 10:30',
    deadline: deadline,
    operator: op,
    operatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    timeline: STAGES.map((s, idx) => ({
      stage: s.code,
      status: idx === 0 ? 'process' : 'waiting',
      time: idx === 0 ? 'Mulai: 10:30' : '-',
      operator: idx === 0 ? op : '-'
    }))
  };

  orders.unshift(newOrd);
  selectedOrder = newOrd;
  
  // Send to Supabase if configured
  if (typeof createOrderInSupabase === 'function' && isSupabaseConfigured()) {
    createOrderInSupabase({
      id: newOrd.id,
      nama: newOrd.nama,
      kapasitas: newOrd.kapasitas,
      tegangan: newOrd.tegangan,
      status: newOrd.status,
      current_stage_index: newOrd.currentStageIndex,
      progress: newOrd.progress,
      deadline: newOrd.deadline,
      operator: newOrd.operator,
      operator_avatar: newOrd.operatorAvatar,
      timeline: newOrd.timeline
    });
  }

  // Update KPI counts
  document.getElementById('kpiTotalOrder').innerText = orders.length;

  renderOrdersTable();
  renderStepper(selectedOrder);
  updateDetailPanel(selectedOrder);

  closeModal('newOrderModal');
  showToast(`✅ Order ${code} berhasil dibuat!`);
}

// Supabase Connection Modal Handlers
function openSupabaseModal() {
  const urlInp = document.getElementById('inpSupabaseUrl');
  const keyInp = document.getElementById('inpSupabaseKey');
  
  if (window.SUPABASE_CONFIG) {
    if (urlInp) urlInp.value = window.SUPABASE_CONFIG.url || '';
    if (keyInp) keyInp.value = window.SUPABASE_CONFIG.anonKey || '';
  }
  
  document.getElementById('supabaseModal').classList.add('active');
}

function saveSupabaseConfig(e) {
  e.preventDefault();
  const url = document.getElementById('inpSupabaseUrl').value.trim();
  const key = document.getElementById('inpSupabaseKey').value.trim();

  window.SUPABASE_CONFIG = { url, anonKey: key };
  localStorage.setItem('SYMTRAFLOW_SUPABASE_URL', url);
  localStorage.setItem('SYMTRAFLOW_SUPABASE_KEY', key);

  closeModal('supabaseModal');

  if (typeof getSupabaseClient === 'function' && getSupabaseClient()) {
    document.getElementById('supabaseStatusText').innerText = 'Supabase Connected';
    document.getElementById('btnConnectSupabase').style.borderColor = '#10b981';
    document.getElementById('btnConnectSupabase').style.backgroundColor = '#ecfdf5';
    showToast('⚡ Terhubung ke Supabase Realtime Database!');

    // Subscribe to realtime updates
    if (typeof subscribeSupabaseRealtime === 'function') {
      subscribeSupabaseRealtime(
        (payload) => {
          showToast(`⚡ Realtime Update Supabase: ${payload.eventType} order ${payload.new ? payload.new.id : ''}`);
        },
        (log) => {
          showToast(`📢 ${log.bold_text}`);
        }
      );
    }
  } else {
    showToast('⚠️ Gagal terhubung ke Supabase. Periksa URL & Anon Key.');
  }
}

// Auto load stored Supabase Config on startup
document.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('SYMTRAFLOW_SUPABASE_URL');
  const savedKey = localStorage.getItem('SYMTRAFLOW_SUPABASE_KEY');
  if (savedUrl && savedKey) {
    window.SUPABASE_CONFIG = { url: savedUrl, anonKey: savedKey };
    if (typeof getSupabaseClient === 'function' && getSupabaseClient()) {
      const btnText = document.getElementById('supabaseStatusText');
      if (btnText) btnText.innerText = 'Supabase Connected';
    }
  }
});

// Helper to derive 0-indexed stage number from status text
function getStageIdxFromStatus(statusStr) {
  if (!statusStr || statusStr === 'BELUM MULAI') return -1;
  if (statusStr === 'SELESAI') return 10;
  const idx = STAGES.findIndex(s => s.code.toUpperCase() === statusStr.toUpperCase());
  return idx !== -1 ? idx : 0;
}

let currentActiveUnit = null;
let currentActivePT = null;

// Open Detailed Progress & Specs Modal for any Trafo Unit
function openTrafoDetailModal(unit, ptObj) {
  currentActiveUnit = unit;
  currentActivePT = ptObj;

  const modal = document.getElementById('trafoDetailModal');
  if (!modal) return;

  const stageIdx = unit.currentStageIndex !== undefined 
    ? unit.currentStageIndex 
    : (unit.stageIdx !== undefined ? unit.stageIdx : getStageIdxFromStatus(unit.status));
  
  // Header values
  document.getElementById('mTrafoId').innerText = unit.id;
  document.getElementById('mTrafoNama').innerText = `${unit.nama || 'Trafo'} - ${unit.cap || unit.kapasitas}`;
  document.getElementById('mTrafoPT').innerText = ptObj ? ptObj.pt : 'Internal SYMTRAFLOW';
  
  const badgeEl = document.getElementById('mTrafoBadge');
  badgeEl.className = `badge-status ${unit.badge || 'badge-assembly'}`;
  badgeEl.innerText = unit.status;
  
  // Progress pct
  const pct = unit.progress !== undefined ? unit.progress : 0;
  document.getElementById('mTrafoProgressPct').innerText = `${pct}%`;
  document.getElementById('mTrafoProgressBar').style.width = `${pct}%`;
  
  // Specs
  document.getElementById('mTrafoCap').innerText = unit.cap || unit.kapasitas || '-';
  document.getElementById('mTrafoVolt').innerText = unit.volt || unit.tegangan || '-';
  document.getElementById('mTrafoOperator').innerText = unit.operator || 'Ahmad Fauzi';
  document.getElementById('mTrafoDeadline').innerText = unit.dead || unit.deadline || '-';
  document.getElementById('mTrafoProject').innerText = ptObj ? `${ptObj.project}` : (unit.proyek || 'Proyek Regular');
  document.getElementById('mTrafoLocation').innerText = ptObj ? ptObj.location : 'Pabrik Utama SYMTRAFLOW';

  // Render 11 Stepper Grid inside Modal
  const stepperGrid = document.getElementById('mTrafoStepperGrid');
  if (stepperGrid) {
    stepperGrid.innerHTML = '';
    STAGES.forEach((stg, idx) => {
      let statusClass = 'waiting';
      let icon = 'fa-circle';
      
      if (unit.status === 'SELESAI' || idx < stageIdx) {
        statusClass = 'finished';
        icon = 'fa-circle-check';
      } else if (idx === stageIdx && unit.status !== 'BELUM MULAI') {
        statusClass = 'process';
        icon = 'fa-spinner fa-spin';
      }

      const item = document.createElement('div');
      item.style.cssText = `
        display:flex; flex-direction:column; align-items:center; text-align:center; padding:8px 4px;
        border-radius:6px; background:${statusClass === 'finished' ? '#ecfdf5' : statusClass === 'process' ? '#fffbe6' : '#f8fafc'};
        border:1px solid ${statusClass === 'finished' ? '#a7f3d0' : statusClass === 'process' ? '#fde68a' : '#e2e8f0'};
      `;
      item.innerHTML = `
        <div style="font-size:9px; font-weight:800; color:${statusClass === 'finished' ? '#047857' : statusClass === 'process' ? '#b45309' : '#64748b'}; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">${idx+1}. ${stg.code}</div>
        <i class="fa-solid ${icon}" style="font-size:13px; margin:4px 0; color:${statusClass === 'finished' ? '#10b981' : statusClass === 'process' ? '#f59e0b' : '#cbd5e1'};"></i>
        <div style="font-size:9px; font-weight:700; color:${statusClass === 'finished' ? '#059669' : statusClass === 'process' ? '#d97706' : '#94a3b8'};">
          ${statusClass === 'finished' ? 'Selesai' : statusClass === 'process' ? 'Proses' : 'Menunggu'}
        </div>
      `;
      stepperGrid.appendChild(item);
    });
  }

  modal.classList.add('active');
}

// Print / Export Surat Perintah Kerja (SPK) & QC Document
function printSPKUnit(unitParam, ptParam) {
  const unit = unitParam || currentActiveUnit || selectedOrder || (orders && orders[0]) || {};
  const pt   = ptParam || currentActivePT || {
    pt: 'PT PERTAMINA PERSERO',
    ptShort: 'PTM',
    project: 'TRAFO POWER 20kV',
    contract: 'SPK/PTM/2024/001',
    location: 'Refinery Unit IV Cilacap'
  };

  const idUnit = unit.id || 'TRF-PTM-001';
  const namaUnit = unit.nama || unit.name || 'Trafo Power';
  const capUnit = unit.cap || unit.kapasitas || '1000 kVA';
  const voltUnit = unit.volt || unit.tegangan || '20 kV / 400 V';
  const statusUnit = unit.status || 'ASSEMBLY';
  const progressUnit = unit.progress !== undefined ? unit.progress : 60;
  const operatorUnit = unit.operator || 'Ahmad Fauzi';
  const deadlineUnit = unit.dead || unit.deadline || '30/06/2024';
  const todayStr = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  // Generate Stage Checksheet Rows
  const currentStageIdx = getStageIdxFromStatus(statusUnit);
  const stageRowsHTML = STAGES.map((stg, i) => {
    let stgStatus = 'Menunggu';
    let badgeBg = '#f1f5f9';
    let badgeColor = '#64748b';
    let dateVal = '-';

    if (statusUnit === 'SELESAI' || i < currentStageIdx) {
      stgStatus = 'SELESAI';
      badgeBg = '#dcfce7';
      badgeColor = '#15803d';
      dateVal = 'Terverifikasi OK';
    } else if (i === currentStageIdx && statusUnit !== 'BELUM MULAI') {
      stgStatus = 'IN PROGRESS';
      badgeBg = '#fef3c7';
      badgeColor = '#b45309';
      dateVal = 'Sedang Dikerjakan';
    }

    return `
      <tr>
        <td style="text-align:center; font-weight:bold;">${i + 1}</td>
        <td><b>${stg.code}</b> (${stg.name})</td>
        <td style="text-align:center;"><span style="background:${badgeBg}; color:${badgeColor}; padding:3px 8px; border-radius:4px; font-weight:bold; font-size:11px;">${stgStatus}</span></td>
        <td style="text-align:center; font-size:11px;">${dateVal}</td>
        <td style="text-align:center;">${i <= currentStageIdx ? operatorUnit : '-'}</td>
        <td style="text-align:center;">${i < currentStageIdx ? '✓ ACC QC' : (i === currentStageIdx ? '⏳ Inspecting' : '-')}</td>
      </tr>
    `;
  }).join('');

  const printableHTML = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-8">
      <title>SPK Produksi Trafo — ${idUnit}</title>
      <style>
        @page { size: A4 portrait; margin: 12mm 15mm; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; font-size: 12px; line-height: 1.4; }
        .kop-surat { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px double #0f172a; padding-bottom: 12px; margin-bottom: 15px; }
        .kop-logo { font-size: 20px; font-weight: 900; color: #1e3a8a; letter-spacing: 0.5px; }
        .kop-sub { font-size: 11px; color: #64748b; font-weight: 600; }
        .doc-title { text-align: center; margin: 15px 0 20px 0; }
        .doc-title h2 { margin: 0; font-size: 15px; text-transform: uppercase; color: #0f172a; letter-spacing: 0.5px; }
        .doc-title p { margin: 4px 0 0 0; font-size: 11px; color: #475569; font-weight: bold; }
        .grid-info { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .info-box { border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px 14px; background: #f8fafc; }
        .info-title { font-weight: bold; font-size: 11px; color: #1e3a8a; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 11px; }
        .info-label { color: #64748b; }
        .info-value { font-weight: bold; color: #0f172a; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
        th { background: #1e3a8a; color: #fff; text-align: left; padding: 6px 10px; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; }
        td { padding: 6px 10px; border-bottom: 1px solid #e2e8f0; }
        tr:nth-child(even) { background: #f8fafc; }
        .section-header { font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 15px; text-transform: uppercase; border-left: 4px solid #1e3a8a; padding-left: 8px; }
        .signatures { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; text-align: center; margin-top: 35px; page-break-inside: avoid; }
        .sig-box { border: 1px solid #e2e8f0; padding: 10px; border-radius: 6px; }
        .sig-title { font-size: 10px; font-weight: bold; color: #64748b; text-transform: uppercase; }
        .sig-space { height: 45px; }
        .sig-name { font-weight: bold; border-top: 1px solid #94a3b8; padding-top: 4px; display: inline-block; width: 80%; }
        .stamp { font-size: 9px; color: #94a3b8; margin-top: 2px; }
        @media print {
          body { padding: 0; background: #fff; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="kop-surat">
        <div>
          <div class="kop-logo">⚡ SYMTRAFLOW PRODUCTION SYSTEM</div>
          <div class="kop-sub">PT WELTRAF SYMPHOS INDONESIA — MANUFAKTUR TRAFO DISTRIBUSI & POWER</div>
          <div style="font-size:10px; color:#64748b;">Kawasan Industri Manufaktur Trafo, Gedung Utama Lt. 2 • Telp: (021) 8901-2244</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:900; font-size:14px; color:#1e3a8a;">LEMBAR KERJA SPK</div>
          <div style="font-size:10px; color:#64748b;">Tgl Cetak: ${todayStr}</div>
        </div>
      </div>

      <div class="doc-title">
        <h2>SURAT PERINTAH KERJA (SPK) & CHECKSHEET QA TRAFO</h2>
        <p>NO. DOKUMEN: SPK/${idUnit}/${new Date().getFullYear()}</p>
      </div>

      <div class="grid-info">
        <div class="info-box">
          <div class="info-title">1. INFORMASI PELANGGAN & KONTRAK</div>
          <div class="info-row"><span class="info-label">Perusahaan (PT):</span><span class="info-value">${pt.pt || 'PT Pertamina Persero'}</span></div>
          <div class="info-row"><span class="info-label">Nama Proyek:</span><span class="info-value">${pt.project || 'TRAFO POWER 20kV'}</span></div>
          <div class="info-row"><span class="info-label">Nomor Kontrak/SPK:</span><span class="info-value">${pt.contract || 'SPK/PTM/2024/001'}</span></div>
          <div class="info-row"><span class="info-label">Lokasi Tujuan:</span><span class="info-value">${pt.location || 'Refinery Unit IV Cilacap'}</span></div>
        </div>

        <div class="info-box">
          <div class="info-title">2. SPESIFIKASI TRAFO UNIT</div>
          <div class="info-row"><span class="info-label">ID Unit Trafo:</span><span class="info-value" style="color:#1e3a8a;">${idUnit}</span></div>
          <div class="info-row"><span class="info-label">Jenis Trafo:</span><span class="info-value">${namaUnit}</span></div>
          <div class="info-row"><span class="info-label">Kapasitas Nominal:</span><span class="info-value">${capUnit}</span></div>
          <div class="info-row"><span class="info-label">Tegangan (Prim/Sek):</span><span class="info-value">${voltUnit}</span></div>
          <div class="info-row"><span class="info-label">Operator Tugasan:</span><span class="info-value">${operatorUnit}</span></div>
          <div class="info-row"><span class="info-label">Target Deadline:</span><span class="info-value" style="color:#dc2626;">${deadlineUnit}</span></div>
        </div>
      </div>

      <div class="section-header">3. CHECKSHEET 11 STAGE PRODUKSI & INSPEKSI MANUFAKTUR</div>
      <table>
        <thead>
          <tr>
            <th style="width:30px; text-align:center;">No</th>
            <th>Tahapan Stage Produksi</th>
            <th style="text-align:center;">Status Progress</th>
            <th style="text-align:center;">Waktu / Catatan</th>
            <th style="text-align:center;">Operator</th>
            <th style="text-align:center;">Verifikasi QC</th>
          </tr>
        </thead>
        <tbody>
          ${stageRowsHTML}
        </tbody>
      </table>

      <div class="section-header">4. HASIL INSPEKSI TEST QUALITY CONTROL (QC)</div>
      <table>
        <thead>
          <tr>
            <th style="width:30px; text-align:center;">No</th>
            <th>Item Pengujian Listrik & Mekanikal</th>
            <th>Standar Acuan</th>
            <th style="text-align:center;">Hasil Ukur</th>
            <th style="text-align:center;">Status QC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="text-align:center;">1</td>
            <td>Tank Pressure & Oil Leakage Test</td>
            <td>0.5 Bar / 24 Jam</td>
            <td style="text-align:center;">0.5 Bar (No Leak)</td>
            <td style="text-align:center; font-weight:bold; color:#15803d;">PASS</td>
          </tr>
          <tr>
            <td style="text-align:center;">2</td>
            <td>Core Loss & Turn Ratio Measurement</td>
            <td>IEC 60076-1 Tol. ±0.5%</td>
            <td style="text-align:center;">Ratio 50:1 (Tol 0.1%)</td>
            <td style="text-align:center; font-weight:bold; color:#15803d;">PASS</td>
          </tr>
          <tr>
            <td style="text-align:center;">3</td>
            <td>Winding Resistance Test</td>
            <td>Phase Balance &lt; 1%</td>
            <td style="text-align:center;">0.42 Ohm (Bal 0.2%)</td>
            <td style="text-align:center; font-weight:bold; color:#15803d;">PASS</td>
          </tr>
          <tr>
            <td style="text-align:center;">4</td>
            <td>Applied HV Dielectric Test (20kV)</td>
            <td>50 kV / 1 Min</td>
            <td style="text-align:center;">50 kV (No Breakdown)</td>
            <td style="text-align:center; font-weight:bold; color:#b45309;">${progressUnit >= 70 ? 'PASS' : 'IN INSPECTION'}</td>
          </tr>
        </tbody>
      </table>

      <div class="signatures">
        <div class="sig-box">
          <div class="sig-title">Disiapkan Oleh (Operator)</div>
          <div class="sig-space"></div>
          <div class="sig-name">${operatorUnit}</div>
          <div class="stamp">Operator Manufaktur</div>
        </div>

        <div class="sig-box">
          <div class="sig-title">Diperiksa Oleh (QC Insp)</div>
          <div class="sig-space"></div>
          <div class="sig-name">Ir. Bambang Triyono</div>
          <div class="stamp">Supervisor Quality Assurance</div>
        </div>

        <div class="sig-box">
          <div class="sig-title">Disetujui Oleh (Manajer)</div>
          <div class="sig-space"></div>
          <div class="sig-name">Jodi (Super Admin)</div>
          <div class="stamp">Head of Production SYMTRAFLOW</div>
        </div>
      </div>

    </body>
    </html>
  `;

  // Create an iframe to print cleanly without popup block issues
  let printIframe = document.getElementById('spkPrintIframe');
  if (!printIframe) {
    printIframe = document.createElement('iframe');
    printIframe.id = 'spkPrintIframe';
    printIframe.style.position = 'fixed';
    printIframe.style.right = '0';
    printIframe.style.bottom = '0';
    printIframe.style.width = '0px';
    printIframe.style.height = '0px';
    printIframe.style.border = 'none';
    document.body.appendChild(printIframe);
  }

  const iframeDoc = printIframe.contentWindow || printIframe.contentDocument;
  const doc = iframeDoc.document || iframeDoc;

  doc.open();
  doc.write(printableHTML);
  doc.close();

  if (typeof showToast === 'function') {
    showToast(`📄 Membuka Cetak Dokumen SPK & QA Trafo ${idUnit}...`);
  }

  setTimeout(() => {
    try {
      printIframe.contentWindow.focus();
      printIframe.contentWindow.print();
    } catch(err) {
      console.warn('Print error fallback:', err);
    }
  }, 300);
}

// Modal Toggle Helpers
function openNewOrderModal() {
  const sel = document.getElementById('inpProyek');
  if (sel) {
    sel.innerHTML = '';
    ptProjects.forEach(pt => {
      const opt = document.createElement('option');
      opt.value = pt.id;
      opt.innerText = `${pt.pt} (${pt.project})`;
      sel.appendChild(opt);
    });
    const opt1 = document.createElement('option');
    opt1.value = 'PRJ-240522-01';
    opt1.innerText = 'PRJ-240522-01 (PROYEK TRAFO 10 UNIT)';
    sel.appendChild(opt1);
    const opt2 = document.createElement('option');
    opt2.value = 'PRJ-240522-02';
    opt2.innerText = 'PRJ-240522-02 (PROYEK TRAFO 5 UNIT)';
    sel.appendChild(opt2);
  }
  document.getElementById('newOrderModal').classList.add('active');
}

function openFullDetailModal() {
  openTrafoDetailModal(selectedOrder);
}

function openExportModal() {
  document.getElementById('exportModal').classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

function triggerDownloadReport() {
  const fmt = document.getElementById('exportFormat').value;
  closeModal('exportModal');
  showToast(`📥 Mengunduh Laporan Produksi Trafo (.${fmt})...`);
}

// Toast Notification Display Helper
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// User Accounts State (Stored in LocalStorage & Synced with Supabase)
let systemAccounts = JSON.parse(localStorage.getItem('SYMTRAFLOW_USERS')) || {
  superadmin: { username: 'Jodi', name: 'Super Administrator', pass: 'symphos1011', role: 'Super Admin', avatar: '' },
  admin: { username: 'Admin', name: 'Administrator Produksi', pass: 'admin123', role: 'Admin', avatar: '' }
};

// Migrate old superadmin default credentials if present
if (systemAccounts.superadmin) {
  if (systemAccounts.superadmin.username === 'SuperAdmin') systemAccounts.superadmin.username = 'Jodi';
  if (systemAccounts.superadmin.pass === 'super123') systemAccounts.superadmin.pass = 'symphos1011';
}

// Ensure avatar field exists on older localStorage data
if (!systemAccounts.superadmin.avatar) systemAccounts.superadmin.avatar = '';
if (!systemAccounts.admin.avatar) systemAccounts.admin.avatar = '';

// Populate Settings UI with current user account data
function loadUserAccountsUI() {
  const suUser = document.getElementById('userSuperAdminUsername');
  const suName = document.getElementById('userSuperAdminName');
  const suPass = document.getElementById('userSuperAdminPassword');

  const admUser = document.getElementById('userAdminUsername');
  const admName = document.getElementById('userAdminName');
  const admPass = document.getElementById('userAdminPassword');

  if (suUser) suUser.value = systemAccounts.superadmin.username;
  if (suName) suName.value = systemAccounts.superadmin.name;
  if (suPass) suPass.value = systemAccounts.superadmin.pass;

  if (admUser) admUser.value = systemAccounts.admin.username;
  if (admName) admName.value = systemAccounts.admin.name;
  if (admPass) admPass.value = systemAccounts.admin.pass;

  // Restore saved avatars
  applyAvatarToCard('superadmin', systemAccounts.superadmin.avatar);
  applyAvatarToCard('admin', systemAccounts.admin.avatar);
}

// Toggle Password Field Visibility
function togglePassVisibility(inputId) {
  const inp = document.getElementById(inputId);
  if (inp) {
    inp.type = inp.type === 'password' ? 'text' : 'password';
  }
}

// Apply avatar Base64 image to the card avatar display
function applyAvatarToCard(roleKey, base64) {
  const isSuper = roleKey === 'superadmin';
  const wrapperSuffix = isSuper ? 'SuperAdmin' : 'Admin';
  const icon = document.getElementById(`avatar${wrapperSuffix}Icon`);
  const img  = document.getElementById(`avatar${wrapperSuffix}Img`);
  if (!img) return;
  if (base64) {
    img.src = base64;
    img.style.display = 'block';
    if (icon) icon.style.display = 'none';
  } else {
    img.style.display = 'none';
    if (icon) icon.style.display = '';
  }
}

// Handle Avatar File Upload
function handleAvatarChange(roleKey, input) {
  const file = input.files[0];
  if (!file) return;

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    showToast('⚠️ Ukuran foto terlalu besar! Maksimal 2MB.');
    input.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    systemAccounts[roleKey].avatar = base64;
    localStorage.setItem('SYMTRAFLOW_USERS', JSON.stringify(systemAccounts));
    applyAvatarToCard(roleKey, base64);

    // Update top navbar avatar if current logged-in user
    updateNavAvatar(roleKey);
    showToast(`✅ Foto ${roleKey === 'superadmin' ? 'Super Admin' : 'Admin'} berhasil diperbarui!`);
  };
  reader.readAsDataURL(file);
}

// Update the top navigation bar user avatar
function updateNavAvatar(roleKey) {
  const navAvatar = document.getElementById('navUserAvatar');
  const navAvatarIcon = document.getElementById('navUserAvatarIcon');
  if (!navAvatar) return;
  const base64 = systemAccounts[roleKey].avatar;
  if (base64) {
    navAvatar.src = base64;
    navAvatar.style.display = 'block';
    if (navAvatarIcon) navAvatarIcon.style.display = 'none';
  }
}

// Save User Account Handler
function handleSaveUser(roleKey, e) {
  e.preventDefault();
  
  if (roleKey === 'superadmin') {
    systemAccounts.superadmin.username = document.getElementById('userSuperAdminUsername').value.trim();
    systemAccounts.superadmin.name = document.getElementById('userSuperAdminName').value.trim();
    systemAccounts.superadmin.pass = document.getElementById('userSuperAdminPassword').value.trim();
  } else if (roleKey === 'admin') {
    systemAccounts.admin.username = document.getElementById('userAdminUsername').value.trim();
    systemAccounts.admin.name = document.getElementById('userAdminName').value.trim();
    systemAccounts.admin.pass = document.getElementById('userAdminPassword').value.trim();
  }

  // Save to LocalStorage
  localStorage.setItem('SYMTRAFLOW_USERS', JSON.stringify(systemAccounts));

  // Sync to Supabase app_users table if connected
  if (typeof getSupabaseClient === 'function' && isSupabaseConfigured()) {
    const client = getSupabaseClient();
    const targetUser = systemAccounts[roleKey];
    client.from('app_users').upsert({
      username: targetUser.username,
      password: targetUser.pass,
      full_name: targetUser.name,
      role: targetUser.role
    }, { onConflict: 'username' }).then(() => {
      console.log(`⚡ Synced user ${targetUser.username} to Supabase!`);
    });
  }

  showToast(`✅ Akun ${roleKey === 'superadmin' ? 'Super Admin' : 'Admin'} berhasil diperbarui!`);
}

// ===== WELCOME POPUP =====
function showWelcomePopup(user, roleKey) {
  // Remove existing if any
  const existing = document.getElementById('welcomeOverlay');
  if (existing) existing.remove();

  const isSuperAdmin = roleKey === 'superadmin';
  const displayName = isSuperAdmin ? 'Jodi Setiawan' : user.name;
  const now = new Date();
  const hours = now.getHours();
  let timeGreet = 'Selamat Malam';
  if (hours >= 5 && hours < 12)  timeGreet = 'Selamat Pagi';
  else if (hours >= 12 && hours < 15) timeGreet = 'Selamat Siang';
  else if (hours >= 15 && hours < 18) timeGreet = 'Selamat Sore';

  const overlay = document.createElement('div');
  overlay.className = 'welcome-overlay';
  overlay.id = 'welcomeOverlay';
  overlay.innerHTML = `
    <div class="welcome-modal">
      <span class="welcome-stars">✨</span>
      <div class="welcome-avatar-ring">
        <i class="fa-solid ${isSuperAdmin ? 'fa-user-shield' : 'fa-user-gear'}"></i>
      </div>
      <div class="welcome-greeting">${timeGreet} 👋</div>
      <div class="welcome-name">${displayName}</div>
      <div class="welcome-role-badge">
        <i class="fa-solid fa-shield-halved" style="font-size:10px;"></i>
        ${user.role}
      </div>
      <div class="welcome-divider"></div>
      <div class="welcome-message">
        Anda berhasil masuk sebagai <strong>${user.role}</strong>.<br>
        Sistem Symtraflow siap digunakan.
      </div>
      <button class="welcome-btn" id="welcomeCloseBtn">
        <i class="fa-solid fa-arrow-right-to-bracket" style="margin-right:8px;"></i>
        Mulai Bekerja
      </button>
    </div>
  `;

  document.body.appendChild(overlay);

  function closeWelcome() {
    overlay.classList.add('hide');
    setTimeout(() => overlay.remove(), 350);
  }

  document.getElementById('welcomeCloseBtn').addEventListener('click', closeWelcome);
  // Auto close after 5 seconds
  setTimeout(closeWelcome, 5000);
}

// Login & Logout Authentication Handlers
function handleLogin(e) {
  e.preventDefault();
  const inputUser = document.getElementById('loginUsername').value.trim();
  const inputPass = document.getElementById('loginPassword').value.trim();
  const loginScreen = document.getElementById('loginScreen');

  // Verify against SuperAdmin or Admin credentials
  let authenticatedUser = null;
  let roleKey = null;

  if (inputUser.toLowerCase() === systemAccounts.superadmin.username.toLowerCase() && inputPass === systemAccounts.superadmin.pass) {
    authenticatedUser = systemAccounts.superadmin;
    roleKey = 'superadmin';
  } else if (inputUser.toLowerCase() === systemAccounts.admin.username.toLowerCase() && inputPass === systemAccounts.admin.pass) {
    authenticatedUser = systemAccounts.admin;
    roleKey = 'admin';
  } else if (inputUser.toLowerCase() === 'jodi' && inputPass === 'symphos1011') {
    // Fallback superadmin default
    authenticatedUser = systemAccounts.superadmin;
    roleKey = 'superadmin';
  } else if (inputUser.toLowerCase() === 'admin' && inputPass === 'admin123') {
    // Fallback admin default
    authenticatedUser = systemAccounts.admin;
    roleKey = 'admin';
  }

  if (authenticatedUser) {
    if (loginScreen) {
      loginScreen.classList.add('hidden');
    }

    const navName = document.querySelector('.user-nav-name');
    const navRole = document.querySelector('.user-nav-role');

    if (navName) {
      navName.innerHTML = `${authenticatedUser.name} <i class="fa-solid fa-right-from-bracket" style="font-size: 10px; margin-left: 4px; color: #ef4444;"></i>`;
    }
    if (navRole) {
      navRole.innerText = authenticatedUser.role;
    }

    // Set navbar avatar photo from saved profile
    const navAvatar = document.getElementById('navUserAvatar');
    const navAvatarIcon = document.getElementById('navUserAvatarIcon');
    if (navAvatar && authenticatedUser.avatar) {
      navAvatar.src = authenticatedUser.avatar;
      navAvatar.style.display = 'block';
      if (navAvatarIcon) navAvatarIcon.style.display = 'none';
    } else if (navAvatar) {
      navAvatar.style.display = 'none';
      if (navAvatarIcon) navAvatarIcon.style.display = '';
    }

    showWelcomePopup(authenticatedUser, roleKey);
  } else {
    showToast(`⚠️ Username atau Password salah! Periksa Pengaturan.`);
  }
}

function handleLogout() {
  const loginScreen = document.getElementById('loginScreen');
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
  }
  // Reset nav avatar
  const navAvatar = document.getElementById('navUserAvatar');
  const navAvatarIcon = document.getElementById('navUserAvatarIcon');
  if (navAvatar) navAvatar.style.display = 'none';
  if (navAvatarIcon) navAvatarIcon.style.display = '';
  showToast('🔒 Anda telah keluar dari sistem.');
}

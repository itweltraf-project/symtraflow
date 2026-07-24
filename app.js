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

// Switch between Main Views (Overview, Multi-Project, Pengaturan)
function switchView(viewName) {
  const viewSingle = document.getElementById('viewSingleFlow');
  const viewMulti = document.getElementById('viewMultiProject');
  const viewPengaturan = document.getElementById('viewPengaturan');
  
  const tabSingle = document.getElementById('tabSingleFlow');
  const tabMulti = document.getElementById('tabMultiProject');

  // Hide all sections first
  if (viewSingle) viewSingle.classList.remove('active');
  if (viewMulti) viewMulti.classList.remove('active');
  if (viewPengaturan) viewPengaturan.classList.remove('active');

  if (tabSingle) tabSingle.classList.remove('active');
  if (tabMulti) tabMulti.classList.remove('active');

  if (viewName === 'single-flow') {
    if (viewSingle) viewSingle.classList.add('active');
    if (tabSingle) tabSingle.classList.add('active');
  } else if (viewName === 'multi-project') {
    if (viewMulti) viewMulti.classList.add('active');
    if (tabMulti) tabMulti.classList.add('active');
  } else if (viewName === 'pengaturan') {
    if (viewPengaturan) viewPengaturan.classList.add('active');
    loadUserAccountsUI();
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

// Modal Toggle Helpers
function openNewOrderModal() {
  document.getElementById('newOrderModal').classList.add('active');
}

function openFullDetailModal() {
  document.getElementById('modalDetailOrderCode').innerText = selectedOrder.id;
  document.getElementById('modalDetailTrafoName').innerText = `${selectedOrder.nama} - ${selectedOrder.kapasitas}`;
  document.getElementById('modalDetailBadge').innerText = selectedOrder.status;
  document.getElementById('fullDetailModal').classList.add('active');
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
  superadmin: { username: 'SuperAdmin', name: 'Super Administrator', pass: 'super123', role: 'Super Admin' },
  admin: { username: 'Admin', name: 'Administrator Produksi', pass: 'admin123', role: 'Admin' }
};

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
}

// Toggle Password Field Visibility
function togglePassVisibility(inputId) {
  const inp = document.getElementById(inputId);
  if (inp) {
    inp.type = inp.type === 'password' ? 'text' : 'password';
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

// Login & Logout Authentication Handlers
function handleLogin(e) {
  e.preventDefault();
  const inputUser = document.getElementById('loginUsername').value.trim();
  const inputPass = document.getElementById('loginPassword').value.trim();
  const loginScreen = document.getElementById('loginScreen');

  // Verify against SuperAdmin or Admin credentials
  let authenticatedUser = null;

  if (inputUser.toLowerCase() === systemAccounts.superadmin.username.toLowerCase() && inputPass === systemAccounts.superadmin.pass) {
    authenticatedUser = systemAccounts.superadmin;
  } else if (inputUser.toLowerCase() === systemAccounts.admin.username.toLowerCase() && inputPass === systemAccounts.admin.pass) {
    authenticatedUser = systemAccounts.admin;
  } else if (inputUser.toLowerCase() === 'admin' && inputPass === 'admin123') {
    // Fallback default
    authenticatedUser = systemAccounts.admin;
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

    showToast(`👋 Selamat datang kembali, ${authenticatedUser.name}! Login sebagai ${authenticatedUser.role}.`);
  } else {
    showToast(`⚠️ Username atau Password salah! Periksa Pengaturan.`);
  }
}

function handleLogout() {
  const loginScreen = document.getElementById('loginScreen');
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
  }
  showToast('🔒 Anda telah keluar dari sistem.');
}


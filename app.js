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

// Sales Officers List & Avatars
const SALES_OFFICERS = [
  'I WAYAN EVA VERDIANA',
  'SHEVIRA INDRASWARI',
  'WILLI SYUKRAN',
  'CASSA VITA SARI',
  'KRESNA BUDI PRASETYA',
  'ELNIRA AINUNNISA',
  'AHMAD NURSEHA',
  'YOGI RAHMADANI SAPUTRA',
  'LUTHFAN ANDI PRADANA',
  'AURELLIA LAYLA MAHANI',
  'JHODY AIDO SAUT HUTAGALUNG',
  'KEYSHA ZARA ALIFA PANJAITAN'
];

const SALES_AVATARS = {
  'I WAYAN EVA VERDIANA': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  'SHEVIRA INDRASWARI': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  'WILLI SYUKRAN': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  'CASSA VITA SARI': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  'KRESNA BUDI PRASETYA': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  'ELNIRA AINUNNISA': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
  'AHMAD NURSEHA': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
  'YOGI RAHMADANI SAPUTRA': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
  'LUTHFAN ANDI PRADANA': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
  'AURELLIA LAYLA MAHANI': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
  'JHODY AIDO SAUT HUTAGALUNG': 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100',
  'KEYSHA ZARA ALIFA PANJAITAN': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100'
};

function getSalesAvatar(name) {
  return SALES_AVATARS[name] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100';
}

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
    operator: 'I WAYAN EVA VERDIANA',
    operatorAvatar: getSalesAvatar('I WAYAN EVA VERDIANA'),
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '22/05 08:15', operator: 'CASSA VITA SARI' },
      { stage: 'CORE MAKING', status: 'finished', time: '22/05 08:45', operator: 'WILLI SYUKRAN' },
      { stage: 'COIL MAKING', status: 'finished', time: '22/05 09:30', operator: 'SHEVIRA INDRASWARI' },
      { stage: 'ASSEMBLY', status: 'process', time: 'Mulai: 22/05 10:10', operator: 'I WAYAN EVA VERDIANA' },
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
    operator: 'SHEVIRA INDRASWARI',
    operatorAvatar: getSalesAvatar('SHEVIRA INDRASWARI'),
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '22/05 08:30', operator: 'CASSA VITA SARI' },
      { stage: 'CORE MAKING', status: 'finished', time: '22/05 09:00', operator: 'WILLI SYUKRAN' },
      { stage: 'COIL MAKING', status: 'finished', time: '22/05 09:45', operator: 'SHEVIRA INDRASWARI' },
      { stage: 'ASSEMBLY', status: 'process', time: 'Mulai: 22/05 10:20', operator: 'SHEVIRA INDRASWARI' },
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
    operator: 'WILLI SYUKRAN',
    operatorAvatar: getSalesAvatar('WILLI SYUKRAN'),
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '21/05 09:00', operator: 'CASSA VITA SARI' },
      { stage: 'CORE MAKING', status: 'finished', time: '21/05 11:30', operator: 'SHEVIRA INDRASWARI' },
      { stage: 'COIL MAKING', status: 'finished', time: '21/05 14:00', operator: 'SHEVIRA INDRASWARI' },
      { stage: 'ASSEMBLY', status: 'finished', time: '21/05 16:30', operator: 'I WAYAN EVA VERDIANA' },
      { stage: 'CONNECTION', status: 'process', time: 'Mulai: 22/05 08:10', operator: 'WILLI SYUKRAN' },
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
    operator: 'CASSA VITA SARI',
    operatorAvatar: getSalesAvatar('CASSA VITA SARI'),
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '21/05 10:00', operator: 'CASSA VITA SARI' },
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
    operator: 'KRESNA BUDI PRASETYA',
    operatorAvatar: getSalesAvatar('KRESNA BUDI PRASETYA'),
    timeline: [
      { stage: 'TANK MAKING', status: 'finished', time: '20/05 09:30', operator: 'CASSA VITA SARI' },
      { stage: 'CORE MAKING', status: 'finished', time: '20/05 11:45', operator: 'KRESNA BUDI PRASETYA' },
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
  { no: 1, id: 'TRF-240522-001', cap: '500 kVA', volt: '20 kV / 400 V', status: 'ASSEMBLY', badge: 'badge-assembly', progress: 60, stageIdx: 3, startCol: 1, endCol: 4, operator: 'I WAYAN EVA VERDIANA', dead: '28/05/2024' },
  { no: 2, id: 'TRF-240522-002', cap: '750 kVA', volt: '20 kV / 400 V', status: 'CORE MAKING', badge: 'badge-core', progress: 75, stageIdx: 1, startCol: 1, endCol: 2, operator: 'SHEVIRA INDRASWARI', dead: '27/05/2024' },
  { no: 3, id: 'TRF-240522-003', cap: '1000 kVA', volt: '20 kV / 400 V', status: 'FINISHING', badge: 'badge-finishing', progress: 40, stageIdx: 7, startCol: 1, endCol: 8, operator: 'WILLI SYUKRAN', dead: '25/05/2024' },
  { no: 4, id: 'TRF-240522-004', cap: '1000 kVA', volt: '20 kV / 400 V', status: 'INTERNAL TEST', badge: 'badge-internal', progress: 20, stageIdx: 6, startCol: 4, endCol: 7, operator: 'CASSA VITA SARI', dead: '29/05/2024' },
  { no: 5, id: 'TRF-240522-005', cap: '1500 kVA', volt: '20 kV / 6300 V', status: 'SELESAI', badge: 'badge-selesai', progress: 100, stageIdx: 10, startCol: 5, endCol: 11, operator: 'KRESNA BUDI PRASETYA', dead: '24/05/2024' },
  { no: 6, id: 'TRF-240522-006', cap: '1500 kVA', volt: '20 kV / 6300 V', status: 'SELESAI', badge: 'badge-selesai', progress: 100, stageIdx: 10, startCol: 1, endCol: 11, operator: 'ELNIRA AINUNNISA', dead: '23/05/2024' },
  { no: 7, id: 'TRF-240522-007', cap: '2000 kVA', volt: '30 kV / 6300 V', status: 'PUNCHLIST', badge: 'badge-assembly', progress: 80, stageIdx: 9, startCol: 6, endCol: 10, operator: 'AHMAD NURSEHA', dead: '26/05/2024' },
  { no: 8, id: 'TRF-240522-008', cap: '2500 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI', badge: 'badge-belum', progress: 0, stageIdx: 0, startCol: 4, endCol: 10, operator: 'YOGI RAHMADANI SAPUTRA', dead: '30/05/2024' },
  { no: 9, id: 'TRF-240522-009', cap: '2500 kVA', volt: '30 kV / 6300 V', status: 'PROSES', badge: 'badge-assembly', progress: 10, stageIdx: 0, startCol: 1, endCol: 1, operator: 'LUTHFAN ANDI PRADANA', dead: '31/05/2024' },
  { no: 10, id: 'TRF-240522-010', cap: '3000 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI', badge: 'badge-belum', progress: 0, stageIdx: 0, startCol: 1, endCol: 1, operator: 'AURELLIA LAYLA MAHANI', dead: '01/06/2024' }
];

// Project 2 Units Data (5 Units - Matching Image 2)
let prj2Units = [
  { no: 1, id: 'TRF-240522-A01', cap: '500 kVA', volt: '20 kV / 400 V', status: 'FINISHING', badge: 'badge-finishing', progress: 60, stageIdx: 7, startCol: 1, endCol: 8, operator: 'JHODY AIDO SAUT HUTAGALUNG', dead: '26/05/2024' },
  { no: 2, id: 'TRF-240522-A02', cap: '1000 kVA', volt: '20 kV / 400 V', status: 'INTERNAL TEST', badge: 'badge-internal', progress: 30, stageIdx: 6, startCol: 5, endCol: 7, operator: 'KEYSHA ZARA ALIFA PANJAITAN', dead: '26/05/2024' },
  { no: 3, id: 'TRF-240522-A03', cap: '1500 kVA', volt: '20 kV / 6300 V', status: 'SELESAI', badge: 'badge-selesai', progress: 100, stageIdx: 10, startCol: 1, endCol: 4, operator: 'I WAYAN EVA VERDIANA', dead: '24/05/2024' },
  { no: 4, id: 'TRF-240522-A04', cap: '2000 kVA', volt: '30 kV / 6300 V', status: 'CORE MAKING', badge: 'badge-core', progress: 70, stageIdx: 1, startCol: 4, endCol: 6, operator: 'SHEVIRA INDRASWARI', dead: '29/05/2024' },
  { no: 5, id: 'TRF-240522-A05', cap: '2500 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI', badge: 'badge-belum', progress: 0, stageIdx: 0, startCol: 4, endCol: 7, operator: 'WILLI SYUKRAN', dead: '30/05/2024' }
];

// PT Project Data — Hierarchy: PT Company → Project → Trafo Units
const defaultPTProjects = [
  {
    id: 'PT-PTM-01',
    pt: 'PT Pertamina Persero',
    ptShort: 'PTM',
    ptColor: '#16a34a',
    ptBg: '#dcfce7',
    project: 'TRAFO POWER 20kV',
    contract: 'SO/PTM/2024/001',
    location: 'Refinery Unit IV Cilacap, Jawa Tengah',
    startDate: '01/05/2024',
    endDate: '30/06/2024',
    units: [
      { no: 1, id: 'TRF-PTM-001', nama: 'Trafo Power', cap: '500 kVA',  volt: '20 kV / 400 V',   status: 'ASSEMBLY',      badge: 'badge-assembly',  progress: 60,  stage: 'ASSEMBLY',      operator: 'I WAYAN EVA VERDIANA',   dead: '20/06/2024', orderDate: '01/05/2024' },
      { no: 2, id: 'TRF-PTM-002', nama: 'Trafo Power', cap: '1000 kVA', volt: '20 kV / 400 V',   status: 'FINISHING',     badge: 'badge-finishing', progress: 80,  stage: 'FINISHING',     operator: 'SHEVIRA INDRASWARI',     dead: '18/06/2024', orderDate: '03/05/2024' },
      { no: 3, id: 'TRF-PTM-003', nama: 'Trafo Power', cap: '1500 kVA', volt: '20 kV / 6300 V',  status: 'INTERNAL TEST', badge: 'badge-internal',  progress: 40,  stage: 'INTERNAL TEST', operator: 'WILLI SYUKRAN',          dead: '22/06/2024', orderDate: '05/05/2024' },
      { no: 4, id: 'TRF-PTM-004', nama: 'Trafo Power', cap: '2000 kVA', volt: '30 kV / 6300 V',  status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'CASSA VITA SARI',        dead: '28/06/2024', orderDate: '08/05/2024' },
      { no: 5, id: 'TRF-PTM-005', nama: 'Trafo Power', cap: '2500 kVA', volt: '30 kV / 6300 V',  status: 'SELESAI',      badge: 'badge-selesai',   progress: 100, stage: 'DELIVERY',      operator: 'KRESNA BUDI PRASETYA',   dead: '15/06/2024', orderDate: '10/05/2024' }
    ]
  },
  {
    id: 'PT-PLN-01',
    pt: 'PT PLN (Persero)',
    ptShort: 'PLN',
    ptColor: '#2563eb',
    ptBg: '#dbeafe',
    project: 'TRAFO DISTRIBUSI 20kV',
    contract: 'SO/PLN/2024/007',
    location: 'GI Kembangan, Jakarta Barat',
    startDate: '10/05/2024',
    endDate: '25/07/2024',
    units: [
      { no: 1, id: 'TRF-PLN-001', nama: 'Trafo Distribusi', cap: '100 kVA',  volt: '20 kV / 400 V',  status: 'SELESAI',       badge: 'badge-selesai',   progress: 100, stage: 'DELIVERY',      operator: 'ELNIRA AINUNNISA',       dead: '02/06/2024', orderDate: '10/05/2024' },
      { no: 2, id: 'TRF-PLN-002', nama: 'Trafo Distribusi', cap: '250 kVA',  volt: '20 kV / 400 V',  status: 'FAT',           badge: 'badge-assembly',  progress: 90,  stage: 'FAT',           operator: 'AHMAD NURSEHA',          dead: '10/06/2024', orderDate: '12/05/2024' },
      { no: 3, id: 'TRF-PLN-003', nama: 'Trafo Distribusi', cap: '500 kVA',  volt: '20 kV / 400 V',  status: 'ASSEMBLY',      badge: 'badge-assembly',  progress: 55,  stage: 'ASSEMBLY',      operator: 'YOGI RAHMADANI SAPUTRA', dead: '18/06/2024', orderDate: '15/05/2024' },
      { no: 4, id: 'TRF-PLN-004', nama: 'Trafo Distribusi', cap: '630 kVA',  volt: '20 kV / 400 V',  status: 'CORE MAKING',   badge: 'badge-core',      progress: 30,  stage: 'CORE MAKING',   operator: 'LUTHFAN ANDI PRADANA',   dead: '25/06/2024', orderDate: '18/05/2024' },
      { no: 5, id: 'TRF-PLN-005', nama: 'Trafo Distribusi', cap: '1000 kVA', volt: '20 kV / 400 V',  status: 'BELUM MULAI',   badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'AURELLIA LAYLA MAHANI',  dead: '05/07/2024', orderDate: '20/05/2024' }
    ]
  },
  {
    id: 'PT-PKT-01',
    pt: 'PT Pupuk Kaltim',
    ptShort: 'PKT',
    ptColor: '#d97706',
    ptBg: '#fef3c7',
    project: 'TRAFO POWER 30kV',
    contract: 'SO/PKT/2024/003',
    location: 'Pabrik Bontang, Kalimantan Timur',
    startDate: '15/05/2024',
    endDate: '15/08/2024',
    units: [
      { no: 1, id: 'TRF-PKT-001', nama: 'Trafo Power', cap: '3000 kVA', volt: '30 kV / 6300 V', status: 'COIL MAKING',   badge: 'badge-core',      progress: 25,  stage: 'COIL MAKING',   operator: 'JHODY AIDO SAUT HUTAGALUNG', dead: '20/07/2024', orderDate: '15/05/2024' },
      { no: 2, id: 'TRF-PKT-002', nama: 'Trafo Power', cap: '5000 kVA', volt: '30 kV / 6300 V', status: 'TANK MAKING',   badge: 'badge-tank',      progress: 10,  stage: 'TANK MAKING',   operator: 'KEYSHA ZARA ALIFA PANJAITAN', dead: '25/07/2024', orderDate: '18/05/2024' },
      { no: 3, id: 'TRF-PKT-003', nama: 'Trafo Power', cap: '5000 kVA', volt: '30 kV / 6300 V', status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'I WAYAN EVA VERDIANA',       dead: '30/07/2024', orderDate: '20/05/2024' },
      { no: 4, id: 'TRF-PKT-004', nama: 'Trafo Power', cap: '7500 kVA', volt: '70 kV / 6300 V', status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'SHEVIRA INDRASWARI',         dead: '05/08/2024', orderDate: '22/05/2024' },
      { no: 5, id: 'TRF-PKT-005', nama: 'Trafo Power', cap: '10000 kVA',volt: '70 kV / 6300 V', status: 'BELUM MULAI',  badge: 'badge-belum',     progress: 0,   stage: '-',             operator: 'WILLI SYUKRAN',              dead: '10/08/2024', orderDate: '25/05/2024' }
    ]
  }
];

let ptProjects;
try {
  const savedPT = localStorage.getItem('SYMTRAFLOW_PT_PROJECTS');
  ptProjects = savedPT !== null ? JSON.parse(savedPT) : defaultPTProjects;
  if (Array.isArray(ptProjects)) {
    ptProjects.forEach(pt => {
      if (Array.isArray(pt.units)) {
        pt.units.forEach(u => {
          if (!u.orderDate) u.orderDate = u.tglPesan || pt.startDate || '01/05/2024';
        });
      }
    });
  }
} catch (e) {
  ptProjects = defaultPTProjects;
}

function savePTProjects() {
  try {
    localStorage.setItem('SYMTRAFLOW_PT_PROJECTS', JSON.stringify(ptProjects));
  } catch (err) {
    console.error('Gagal menyimpan PT Projects ke localStorage', err);
  }
}


// Activity Feed Log Data
let activityLogs = [
  {
    icon: 'amber',
    iconClass: 'fa-solid fa-gears',
    boldText: 'I WAYAN EVA VERDIANA memulai proses ASSEMBLY',
    subText: 'TRF-240522-001 • 10:10:24',
    time: '2 menit yang lalu'
  },
  {
    icon: 'green',
    iconClass: 'fa-solid fa-circle-check',
    boldText: 'SHEVIRA INDRASWARI menyelesaikan proses COIL MAKING',
    subText: 'TRF-240522-002 • 09:30:45',
    time: '52 menit yang lalu'
  },
  {
    icon: 'green',
    iconClass: 'fa-solid fa-circle-check',
    boldText: 'WILLI SYUKRAN menyelesaikan proses CORE MAKING',
    subText: 'TRF-240520-005 • 07:40:12',
    time: '2 jam yang lalu'
  },
  {
    icon: 'blue',
    iconClass: 'fa-solid fa-play',
    boldText: 'WILLI SYUKRAN memulai proses CONNECTION',
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
  populateStepperOrderSelector();
  renderStepper(selectedOrder);
  renderOrdersTable();
  updateDetailPanel(selectedOrder);
  initProgressChart();
  renderActivityLogs();
  startStepperSlideshow();
  
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

// Populate Stepper Order Selector Dropdown
function populateStepperOrderSelector() {
  const select = document.getElementById('stepperOrderSelector');
  if (!select) return;
  const currentVal = selectedOrder ? selectedOrder.id : (select.value || '');
  select.innerHTML = '';
  orders.forEach((ord) => {
    const opt = document.createElement('option');
    opt.value = ord.id;
    opt.innerText = `[${ord.id}] ${ord.nama} - ${ord.kapasitas} (${ord.progress}%)`;
    if (ord.id === currentVal) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });
}

// User selects an order from the dropdown
function onSelectStepperOrder(orderId) {
  const found = orders.find(o => o.id === orderId);
  if (found) {
    selectedOrder = found;
    renderStepper(selectedOrder, true);
    renderOrdersTable();
    updateDetailPanel(selectedOrder);
    resetStepperTimer();
    showToast(`🔍 Menampilkan flow: ${found.id} - ${found.nama}`);
  }
}

// Next & Previous Slide Handlers
function nextStepperSlide() {
  if (!orders || orders.length === 0) return;
  const currIdx = orders.findIndex(o => o.id === selectedOrder.id);
  const nextIdx = (currIdx + 1) % orders.length;
  selectedOrder = orders[nextIdx];
  renderStepper(selectedOrder, true);
  renderOrdersTable();
  updateDetailPanel(selectedOrder);
  resetStepperTimer();
}

function prevStepperSlide() {
  if (!orders || orders.length === 0) return;
  const currIdx = orders.findIndex(o => o.id === selectedOrder.id);
  const prevIdx = (currIdx - 1 + orders.length) % orders.length;
  selectedOrder = orders[prevIdx];
  renderStepper(selectedOrder, true);
  renderOrdersTable();
  updateDetailPanel(selectedOrder);
  resetStepperTimer();
}

// Slideshow Engine (5-Second Interval)
let isStepperSlideshowActive = true;
let stepperTimerTick = null;
let stepperTimerElapsedMs = 0;
const STEPPER_SLIDE_DURATION_MS = 5000;
const STEPPER_TICK_INTERVAL_MS = 100;

function startStepperSlideshow() {
  stopStepperSlideshow();
  if (!document.getElementById('flowStepperGrid')) return;
  isStepperSlideshowActive = true;
  updateSlideshowBtnUI();

  stepperTimerTick = setInterval(() => {
    if (!isStepperSlideshowActive) return;
    stepperTimerElapsedMs += STEPPER_TICK_INTERVAL_MS;
    const pct = Math.min(100, (stepperTimerElapsedMs / STEPPER_SLIDE_DURATION_MS) * 100);
    const bar = document.getElementById('slideshowTimerProgress');
    if (bar) bar.style.width = `${pct}%`;

    if (stepperTimerElapsedMs >= STEPPER_SLIDE_DURATION_MS) {
      stepperTimerElapsedMs = 0;
      nextStepperSlide();
    }
  }, STEPPER_TICK_INTERVAL_MS);
}

function stopStepperSlideshow() {
  if (stepperTimerTick) {
    clearInterval(stepperTimerTick);
    stepperTimerTick = null;
  }
}

function resetStepperTimer() {
  stepperTimerElapsedMs = 0;
  const bar = document.getElementById('slideshowTimerProgress');
  if (bar) bar.style.width = '0%';
}

function toggleStepperSlideshow() {
  isStepperSlideshowActive = !isStepperSlideshowActive;
  updateSlideshowBtnUI();
  if (isStepperSlideshowActive) {
    showToast('▶️ Slideshow Flow Trafo (5 detik) Aktif');
  } else {
    showToast('⏸️ Slideshow Flow Trafo Dijeda');
    const bar = document.getElementById('slideshowTimerProgress');
    if (bar) bar.style.width = '0%';
  }
}

function updateSlideshowBtnUI() {
  const btn = document.getElementById('btnToggleSlideshow');
  const icon = document.getElementById('slideshowIcon');
  const txt = document.getElementById('slideshowText');
  if (!btn) return;

  if (isStepperSlideshowActive) {
    btn.style.background = '#e0e7ff';
    btn.style.color = '#3730a3';
    if (icon) icon.className = 'fa-solid fa-pause';
    if (txt) txt.innerText = 'Slide (5s)';
    btn.title = 'Klik untuk Menjeda Slideshow Otomatis';
  } else {
    btn.style.background = '#f1f5f9';
    btn.style.color = '#64748b';
    if (icon) icon.className = 'fa-solid fa-play';
    if (txt) txt.innerText = 'Slide: Jeda';
    btn.title = 'Klik untuk Memutar Slideshow Otomatis (5s)';
  }
}

// Render Horizontal 11-Stepper Pipeline (Image 1 top section)
function renderStepper(order, animate = false) {
  if (!order) return;
  const container = document.getElementById('flowStepperGrid');
  if (!container) return;
  
  container.innerHTML = '';

  // Trigger smooth slide animation
  if (animate) {
    container.classList.remove('slide-anim');
    void container.offsetWidth; // trigger reflow
    container.classList.add('slide-anim');
  }

  // Update Stepper Header Badges & Info Strip
  const activeBadge = document.getElementById('stepperActiveBadge');
  if (activeBadge) {
    activeBadge.innerText = order.id;
    let badgeClass = 'badge-assembly';
    if (order.status === 'SELESAI') badgeClass = 'badge-selesai';
    else if (order.status === 'CONNECTION') badgeClass = 'badge-connection';
    else if (order.status === 'TANK MAKING') badgeClass = 'badge-tank';
    else if (order.status === 'CORE MAKING') badgeClass = 'badge-core';
    activeBadge.className = `badge-status ${badgeClass}`;
  }

  const stripName = document.getElementById('stripTrafoName');
  const stripCap = document.getElementById('stripKapasitas');
  const stripVolt = document.getElementById('stripTegangan');
  const stripOp = document.getElementById('stripOperator');
  const stripDead = document.getElementById('stripDeadline');
  const stripPct = document.getElementById('stripProgressPct');
  const stripBar = document.getElementById('stripProgressBar');

  if (stripName) stripName.innerText = `${order.nama} (${order.status})`;
  if (stripCap) stripCap.innerText = order.kapasitas;
  if (stripVolt) stripVolt.innerText = order.tegangan;
  if (stripOp) stripOp.innerText = order.operator;
  if (stripDead) stripDead.innerText = order.deadline;
  if (stripPct) stripPct.innerText = `${order.progress}%`;
  if (stripBar) {
    stripBar.style.width = `${order.progress}%`;
    stripBar.style.backgroundColor = order.progress === 100 ? '#10b981' : 'var(--color-primary)';
  }

  // Sync Dropdown selector
  const selector = document.getElementById('stepperOrderSelector');
  if (selector && selector.value !== order.id) {
    selector.value = order.id;
  }

  // Sync Slideshow Counter
  const counter = document.getElementById('slideshowCounter');
  if (counter && orders.length > 0) {
    const curIdx = orders.findIndex(o => o.id === order.id);
    counter.innerText = `${curIdx !== -1 ? curIdx + 1 : 1}/${orders.length}`;
  }

  STAGES.forEach((stage, idx) => {
    let cardStatusClass = 'waiting';
    let statusPillText = 'Menunggu';
    let metaHTML = `<span>-</span><span>-</span>`;

    if (idx < order.currentStageIndex) {
      cardStatusClass = 'finished';
      statusPillText = '<i class="fa-solid fa-circle-check"></i> Selesai';
      const stageLog = order.timeline && order.timeline[idx];
      metaHTML = `
        <span>${stageLog ? stageLog.time : '22/05'}</span>
        <span class="step-operator">Sales: ${stageLog ? stageLog.operator.split(' ')[0] : 'Sales'}</span>
      `;
    } else if (idx === order.currentStageIndex) {
      cardStatusClass = 'active-process';
      statusPillText = '<i class="fa-solid fa-spinner fa-spin"></i> Proses';
      const stageLog = order.timeline && order.timeline[idx];
      metaHTML = `
        <span>${stageLog ? stageLog.time : 'Mulai: 10:10'}</span>
        <span class="step-operator" style="color: var(--color-process-text);">Sales: ${order.operator}</span>
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
      showToast(`[${order.id}] Tahapan ${stage.code}: Sales Officer ${order.operator} (${order.progress}%)`);
    });

    container.appendChild(stepCard);
  });
}

// Render Orders Table in Monitoring Produksi (Synchronized with Unified Units Data)
function renderOrdersTable(filteredList = null) {
  const tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const units = filteredList || getUnitsData();
  if (units.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:#94a3b8;">Tidak ada data unit yang sesuai.</td></tr>`;
    return;
  }

  let activeUnit = units.find(u => u.unitId === activeMonitoringUnitId) || units[0];
  if (activeUnit) activeMonitoringUnitId = activeUnit.unitId;

  units.forEach((ord) => {
    recomputeUnitProgress(ord);
    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    if (ord.unitId === activeMonitoringUnitId) {
      tr.className = 'selected';
    }

    let badgeClass = 'badge-assembly';
    if (ord.status === 'Selesai') badgeClass = 'badge-selesai';
    else if (ord.status === 'Belum Mulai') badgeClass = 'badge-belum';
    else badgeClass = 'badge-assembly';

    tr.innerHTML = `
      <td class="order-code">${ord.soNumber}</td>
      <td style="font-weight: 800; color: #2563eb;">${ord.unitId}</td>
      <td style="font-weight: 700; color: #0f172a;">${ord.customer}</td>
      <td style="font-weight: 600;">${ord.capacity}</td>
      <td>${ord.voltage}</td>
      <td><span class="badge-status ${badgeClass}">${ord.status}</span></td>
      <td>
        <div class="table-progress-cell">
          <span class="progress-pct-label">${ord.progress}%</span>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${ord.progress === 100 ? 'success' : ''}" style="width: ${ord.progress}%;"></div>
          </div>
        </div>
      </td>
      <td class="deadline-alert">${ord.targetDate}</td>
      <td>
        <div class="operator-cell">
          <img src="${getSalesAvatar(ord.pic)}" class="operator-avatar">
          <span>${ord.pic}</span>
        </div>
      </td>
    `;

    tr.addEventListener('click', () => {
      activeMonitoringUnitId = ord.unitId;
      renderOrdersTable();
      updateDetailPanel(ord);
    });

    tbody.appendChild(tr);
  });

  updateMonitoringKPICards();
  if (activeUnit) updateDetailPanel(activeUnit);
}

// Update Detail Order Side Panel in Monitoring Produksi
function updateDetailPanel(ord) {
  if (!ord) return;
  recomputeUnitProgress(ord);

  const idEl = document.getElementById('detailOrderId');
  if (idEl) idEl.innerText = `${ord.unitId} (${ord.soNumber})`;
  
  const badgeEl = document.getElementById('detailStatusBadge');
  if (badgeEl) {
    badgeEl.innerText = ord.status;
    badgeEl.className = `badge-status ${ord.status === 'Selesai' ? 'badge-selesai' : ord.status === 'Belum Mulai' ? 'badge-belum' : 'badge-assembly'}`;
  }

  const namaEl = document.getElementById('detailNamaTrafo');
  if (namaEl) namaEl.innerText = `: ${ord.customer}`;
  const capEl = document.getElementById('detailKapasitas');
  if (capEl) capEl.innerText = `: ${ord.capacity}`;
  const voltEl = document.getElementById('detailTegangan');
  if (voltEl) voltEl.innerText = `: ${ord.voltage}`;
  const mulaiEl = document.getElementById('detailMulai');
  if (mulaiEl) mulaiEl.innerText = `: ${ord.orderDate}`;
  const deadEl = document.getElementById('detailDeadline');
  if (deadEl) deadEl.innerText = `: ${ord.targetDate}`;
  const statusEl = document.getElementById('detailStatusSaatIni');
  if (statusEl) statusEl.innerText = `: ${ord.status} (${ord.progress}%)`;
  
  const opEl = document.getElementById('detailOperator');
  if (opEl) {
    opEl.innerHTML = `
      <img src="${getSalesAvatar(ord.pic)}" class="operator-avatar"> ${ord.pic}
    `;
  }

  const pctEl = document.getElementById('detailProgressPct');
  if (pctEl) pctEl.innerText = `${ord.progress}%`;
  const barEl = document.getElementById('detailProgressBar');
  if (barEl) barEl.style.width = `${ord.progress}%`;

  // Update Vertical Timeline
  const timelineContainer = document.getElementById('timelineProsesList');
  if (!timelineContainer) return;
  timelineContainer.innerHTML = '';

  const allStages = [
    ...(ord.electricalStages || []).map(s => ({ ...s, cat: 'Elec' })),
    ...(ord.mechanicalStages || []).map(s => ({ ...s, cat: 'Mech' }))
  ];

  allStages.forEach((item) => {
    const timeRow = document.createElement('div');
    const isDone = item.status === 'Selesai';
    const isProcess = item.status === 'Proses';
    timeRow.className = `timeline-item ${isDone ? 'finished' : isProcess ? 'process' : 'waiting'}`;

    timeRow.innerHTML = `
      <span class="timeline-dot"></span>
      <span class="timeline-stage-name"><strong style="color:#2563eb; font-size:10px; margin-right:4px;">[${item.cat}]</strong>${item.name}</span>
      <span class="timeline-stage-status">${item.status}</span>
      <div class="timeline-meta">
        <div>${item.date || '-'}</div>
        <div style="font-size: 9px; font-weight: 600;">${item.pic || '-'}</div>
      </div>
    `;
    timelineContainer.appendChild(timeRow);
  });
}

function updateMonitoringKPICards() {
  const units = getUnitsData();
  const total = units.length;
  const selesai = units.filter(u => u.status === 'Selesai').length;
  const proses = units.filter(u => u.status === 'Dalam Proses' || u.status === 'Proses').length;
  const belum = units.filter(u => u.status === 'Belum Mulai').length;
  const avg = total > 0 ? Math.round(units.reduce((acc, u) => acc + (u.progress || 0), 0) / total) : 0;

  const elTotal = document.getElementById('kpiTotalOrder');
  const elSelesai = document.getElementById('kpiSelesai');
  const elSelesaiPct = document.getElementById('kpiSelesaiPct');
  const elProses = document.getElementById('kpiProses');
  const elProsesPct = document.getElementById('kpiProsesPct');
  const elBelum = document.getElementById('kpiBelum');
  const elBelumPct = document.getElementById('kpiBelumPct');
  const elAvg = document.getElementById('kpiAvgProgress');

  if (elTotal) elTotal.innerText = total;
  if (elSelesai) elSelesai.innerText = selesai;
  if (elSelesaiPct) elSelesaiPct.innerText = `Order (${total > 0 ? Math.round((selesai/total)*100) : 0}%)`;
  if (elProses) elProses.innerText = proses;
  if (elProsesPct) elProsesPct.innerText = `Order (${total > 0 ? Math.round((proses/total)*100) : 0}%)`;
  if (elBelum) elBelum.innerText = belum;
  if (elBelumPct) elBelumPct.innerText = `Order (${total > 0 ? Math.round((belum/total)*100) : 0}%)`;
  if (elAvg) elAvg.innerText = `${avg}%`;
}

function filterOrders() {
  const query = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const units = getUnitsData();
  if (!query) {
    renderOrdersTable(units);
    return;
  }
  const filtered = units.filter(u =>
    u.unitId.toLowerCase().includes(query) ||
    u.soNumber.toLowerCase().includes(query) ||
    u.customer.toLowerCase().includes(query) ||
    u.capacity.toLowerCase().includes(query) ||
    u.pic.toLowerCase().includes(query) ||
    u.status.toLowerCase().includes(query)
  );
  renderOrdersTable(filtered);
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
        <img src="${getSalesAvatar(unit.operator)}" class="operator-avatar"> ${unit.operator}
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

  const subMonitoring = document.getElementById('menuSubMonitoring');
  const subJadwal     = document.getElementById('menuSubJadwal');
  const subRiwayat    = document.getElementById('menuSubRiwayat');
  const subDetail     = document.getElementById('menuSubDetail');

  // Hide all sections first
  [viewSingle, viewMulti, viewPengaturan, viewProjectPT].forEach(v => v && v.classList.remove('active'));
  // Clear all submenu-item active states
  [tabSingle, tabMulti, tabProjectPT, subMonitoring, subJadwal, subRiwayat, subDetail].forEach(t => t && t.classList.remove('active'));

  const btnSingle = document.getElementById('btnSubSingleFlow');
  const btnMulti = document.getElementById('btnSubMultiGantt');
  const btnPT = document.getElementById('btnSubProjectPT');
  [btnSingle, btnMulti, btnPT].forEach(b => b && b.classList.remove('active'));

  const monitoringViews = ['single-flow', 'multi-project', 'project-pt'];

  // Auto open the produksi submenu when navigating to a monitoring/produksi view
  if (monitoringViews.includes(viewName)) {
    const submenu = document.getElementById('submenuProduksi') || document.getElementById('submenuMonitoring');
    const menuBtn = document.getElementById('menuProduksiParent') || document.getElementById('menuMonitoring');
    const arrow = document.getElementById('arrowProduksi') || document.getElementById('arrowMonitoring');
    if (submenu) submenu.classList.add('open');
    if (menuBtn) menuBtn.classList.add('open');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
  }

  if (viewName === 'single-flow') {
    if (viewSingle) viewSingle.classList.add('active');
    if (tabSingle) tabSingle.classList.add('active');
    if (subMonitoring) subMonitoring.classList.add('active');
    if (btnSingle) btnSingle.classList.add('active');
  } else if (viewName === 'multi-project') {
    if (viewMulti) viewMulti.classList.add('active');
    if (tabMulti) tabMulti.classList.add('active');
    if (subJadwal) subJadwal.classList.add('active');
    if (btnMulti) btnMulti.classList.add('active');
  } else if (viewName === 'pengaturan') {
    if (viewPengaturan) viewPengaturan.classList.add('active');
    loadUserAccountsUI();
    if (typeof updateSupabaseStatusDisplay === 'function') updateSupabaseStatusDisplay();
  } else if (viewName === 'project-pt') {
    if (viewProjectPT) viewProjectPT.classList.add('active');
    if (tabProjectPT) tabProjectPT.classList.add('active');
    if (subRiwayat) subRiwayat.classList.add('active');
    if (btnPT) btnPT.classList.add('active');
    if (typeof renderPTProjects === 'function') renderPTProjects();
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

  if (!ptProjects || ptProjects.length === 0) {
    container.innerHTML = `
      <div class="section-card" style="text-align:center; padding:45px 20px; color:#64748b; background:#ffffff; border-radius:var(--radius-lg); border:1px dashed var(--border-color);">
        <i class="fa-solid fa-building-circle-xmark" style="font-size:42px; color:#cbd5e1; margin-bottom:12px; display:block;"></i>
        <div style="font-weight:700; font-size:15px; color:#334155; margin-bottom:6px;">Belum Ada Proyek Perusahaan (PT)</div>
        <div style="font-size:12px; margin-bottom:16px;">Semua proyek telah dihapus atau belum ditambahkan. Klik tombol di bawah untuk membuat proyek baru.</div>
        <button class="btn-primary" onclick="openAddPTProjectModal()" style="display:inline-flex; align-items:center; gap:6px; margin:0 auto;">
          <i class="fa-solid fa-folder-plus"></i> + Tambah Proyek PT Baru
        </button>
      </div>
    `;
    return;
  }

  ptProjects.forEach(pt => {
    const totalUnits = pt.units.length;
    const selesai    = pt.units.filter(u => u.status === 'SELESAI').length;
    const proses     = pt.units.filter(u => u.status !== 'SELESAI' && u.status !== 'BELUM MULAI' && u.progress > 0).length;
    const belumMulai = pt.units.filter(u => u.status === 'BELUM MULAI').length;
    const avgProgress = totalUnits > 0 ? Math.round(pt.units.reduce((s, u) => s + u.progress, 0) / totalUnits) : 0;

    // Rows for each trafo unit
    const unitRows = pt.units.map(u => {
      const pctColor = u.progress === 100 ? '#10b981' : u.progress >= 50 ? '#f59e0b' : '#3b82f6';
      const orderDateVal = u.orderDate || u.tglPesan || pt.startDate || '-';
      return `
        <tr>
          <td style="font-weight:700; color:#64748b; text-align:center;">${u.no}</td>
          <td style="font-weight:700; font-size:11px;">
            <span style="background:${pt.ptBg}; color:${pt.ptColor}; padding:4px 8px; border-radius:6px; border:1px solid ${pt.ptColor}44; display:inline-flex; align-items:center; gap:5px; font-weight:800;" title="Klik untuk lihat progres detail trafo">
              <i class="fa-solid fa-up-right-from-square" style="font-size:9px;"></i> ${u.id}
            </span>
          </td>
          <td><span style="font-size:12px; font-weight:700; color:#0f172a;">${u.cap}</span></td>
          <td style="font-size:11px; color:#475569; white-space:nowrap;">
            <span style="background:#f1f5f9; padding:4px 8px; border-radius:6px; font-weight:600; color:#334155; display:inline-flex; align-items:center; gap:5px;">
              <i class="fa-regular fa-calendar-check" style="color:${pt.ptColor}; font-size:11px;"></i> ${orderDateVal}
            </span>
          </td>
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
          <button class="btn-delete-pt" onclick="deletePTProject('${pt.id}')" title="Hapus seluruh proyek ${pt.pt}">
            <i class="fa-solid fa-trash-can"></i> Hapus Proyek PT
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
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">No. SO</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Variant</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Tanggal Pesan</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Progress</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Deadline</th>
              <th style="padding:10px 12px; text-align:left; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Sales Officer</th>
              <th style="padding:10px 12px; text-align:center; font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.5px;">Aksi</th>
            </tr>
          </thead>
          <tbody id="ptTbody-${pt.id}" style="font-size:12px;">
            ${unitRows || '<tr><td colspan="8" style="text-align:center; padding:20px; color:#94a3b8;">Belum ada trafo dalam proyek ini. Klik <b>+ Tambah Trafo</b> di atas untuk menambahkan.</td></tr>'}
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
    opt.innerText = `${pt.pt} (${pt.ptShort}) — ${pt.units.length} Unit`;
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

  // Set default order date to today
  const oInp = document.getElementById('inpTrafoOrderDatePT');
  if (oInp && !oInp.value) {
    oInp.value = new Date().toISOString().split('T')[0];
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
    defaultName = ptObj.project && ptObj.project.includes('DISTRIBUSI') ? 'Trafo Distribusi' : 'Trafo Power';
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
  const name     = document.getElementById('inpTrafoNamePT') ? document.getElementById('inpTrafoNamePT').value.trim() : 'Trafo Power';
  const cap      = document.getElementById('inpTrafoCapPT').value;
  const volt     = document.getElementById('inpTrafoVoltPT') ? document.getElementById('inpTrafoVoltPT').value : '20 kV / 400 V';
  const status   = document.getElementById('inpTrafoStatusPT').value;
  const progress = parseInt(document.getElementById('inpTrafoProgressPT').value) || 0;
  const operator = document.getElementById('inpTrafoOperatorPT').value;
  const deadlineRaw = document.getElementById('inpTrafoDeadlinePT').value;
  const deadlineFormatted = formatDateDisplay(deadlineRaw);
  const orderDateRaw = document.getElementById('inpTrafoOrderDatePT') ? document.getElementById('inpTrafoOrderDatePT').value : '';
  const orderDateFormatted = formatDateDisplay(orderDateRaw) || formatDateDisplay(new Date().toISOString().split('T')[0]);

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
      nama: name || 'Trafo Power',
      cap: cap,
      volt: volt || '20 kV / 400 V',
      status: status,
      orderDate: orderDateFormatted,
      badge: badge,
      progress: progress,
      stage: status,
      operator: operator,
      dead: deadlineFormatted,
      stageIdx: stageIdx
    };
    targetPT.units.push(newUnit);
    savePTProjects();
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
    operatorAvatar: getSalesAvatar(operator),
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
  const projTitle = document.getElementById('inpPTProjectTitle') ? document.getElementById('inpPTProjectTitle').value.trim() : '';
  const colorVal  = document.getElementById('inpPTColor').value;
  const contract  = document.getElementById('inpPTContract') ? document.getElementById('inpPTContract').value.trim() : '';
  const location  = document.getElementById('inpPTLocation') ? document.getElementById('inpPTLocation').value.trim() : '';
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
    project: projTitle || 'PROYEK TRAFO',
    contract: contract || `SO/${ptShort}/${new Date().getFullYear()}/001`,
    location: location || '-',
    startDate: formatDateDisplay(startDate),
    endDate: formatDateDisplay(endDate),
    units: []
  };

  ptProjects.push(newPt);
  savePTProjects();
  renderPTProjects();
  populateProjectDropdowns();

  if (document.getElementById('addPTProjectForm')) {
    document.getElementById('addPTProjectForm').reset();
  }
  closeModal('addPTProjectModal');
  showToast(`✅ Proyek ${ptName} berhasil dibuat!`);
}

// Delete Entire PT Project
function deletePTProject(ptId) {
  const pt = ptProjects.find(p => p.id === ptId);
  if (!pt) return;

  const total = pt.units ? pt.units.length : 0;
  const unitInfo = total > 0 ? `\nSemua ${total} unit trafo di bawah proyek ini akan ikut terhapus permanen.` : '';
  const confirmMsg = `⚠️ Apakah Anda yakin ingin menghapus seluruh proyek "${pt.pt}"?${unitInfo}\n\nTindakan ini tidak dapat dibatalkan.`;
  
  if (confirm(confirmMsg)) {
    ptProjects = ptProjects.filter(p => p.id !== ptId);
    savePTProjects();
    renderPTProjects();
    populateProjectDropdowns();
    showToast(`🗑️ Proyek ${pt.pt} beserta seluruh unitnya telah dihapus.`);
  }
}

// Delete Trafo Unit from PT Project
function deleteTrafoUnit(ptId, trafoId) {
  const pt = ptProjects.find(p => p.id === ptId);
  if (!pt) return;

  if (confirm(`Apakah Anda yakin ingin menghapus unit trafo ${trafoId} dari ${pt.pt}?`)) {
    pt.units = pt.units.filter(u => u.id !== trafoId);
    // Recalculate 'no' indexing
    pt.units.forEach((u, i) => u.no = i + 1);
    savePTProjects();
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
  const simIcon = document.getElementById('simBtnIcon');
  const simBadge = document.getElementById('simStatusBadge');
  const simEngineLabel = document.getElementById('simEngineStatusLabel');
  const simIconBox = document.getElementById('simIconBox');

  if (isSimulating) {
    if (simBtn) {
      simBtn.style.backgroundColor = '#10b981';
      simBtn.style.color = '#ffffff';
      simBtn.style.borderColor = '#10b981';
    }
    if (btnText) btnText.innerText = 'Hentikan Live Simulation';
    if (simIcon) simIcon.className = 'fa-solid fa-pause';
    if (simBadge) {
      simBadge.style.background = '#d1fae5';
      simBadge.style.color = '#065f46';
      simBadge.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 7px; color: #10b981; margin-right: 4px;"></i> Berjalan Aktif';
    }
    if (simEngineLabel) {
      simEngineLabel.innerHTML = '<span style="color: #10b981; font-weight: 700;">⚡ Berjalan (Ticking...)</span>';
    }
    if (simIconBox) {
      simIconBox.style.background = '#ecfdf5';
      simIconBox.style.color = '#10b981';
      simIconBox.style.borderColor = '#a7f3d0';
    }
    showToast('⚡ Live Simulation Dimulai! Progres bergerak real-time...');

    simulationTimer = setInterval(() => {
      if (!orders || orders.length === 0) return;
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
      if (selectedOrder && selectedOrder.id === targetOrd.id) {
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
    if (simBtn) {
      simBtn.style.backgroundColor = '#ffffff';
      simBtn.style.color = 'var(--text-secondary)';
      simBtn.style.borderColor = 'var(--border-color)';
    }
    if (btnText) btnText.innerText = 'Live Simulation';
    if (simIcon) simIcon.className = 'fa-solid fa-play';
    if (simBadge) {
      simBadge.style.background = '#f1f5f9';
      simBadge.style.color = '#64748b';
      simBadge.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 7px; color: #94a3b8; margin-right: 4px;"></i> Nonaktif';
    }
    if (simEngineLabel) {
      simEngineLabel.innerHTML = '<span style="color: var(--text-secondary);">Standby / Idle</span>';
    }
    if (simIconBox) {
      simIconBox.style.background = '#eff6ff';
      simIconBox.style.color = '#2563eb';
      simIconBox.style.borderColor = '#bfdbfe';
    }
    showToast('Simulation Dihentikan.');
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
    operatorAvatar: getSalesAvatar(op),
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

  populateStepperOrderSelector();
  renderOrdersTable();
  renderStepper(selectedOrder, true);
  updateDetailPanel(selectedOrder);
  resetStepperTimer();

  closeModal('newOrderModal');
  showToast(`✅ Order ${code} berhasil dibuat!`);
}

// Supabase Connection Modal & Status Handlers
function openSupabaseModal() {
  const urlInp = document.getElementById('inpSupabaseUrl');
  const keyInp = document.getElementById('inpSupabaseKey');
  
  const savedUrl = localStorage.getItem('SYMTRAFLOW_SUPABASE_URL') || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || '';
  const savedKey = localStorage.getItem('SYMTRAFLOW_SUPABASE_KEY') || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || '';

  if (urlInp) urlInp.value = savedUrl;
  if (keyInp) keyInp.value = savedKey;
  
  document.getElementById('supabaseModal').classList.add('active');
}

function updateSupabaseStatusDisplay() {
  const url = localStorage.getItem('SYMTRAFLOW_SUPABASE_URL') || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) || '';
  const key = localStorage.getItem('SYMTRAFLOW_SUPABASE_KEY') || (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) || '';
  const isConnected = typeof isSupabaseConfigured === 'function' ? isSupabaseConfigured() : (typeof getSupabaseClient === 'function' && !!getSupabaseClient());

  const btnText = document.getElementById('supabaseStatusText');
  const btn = document.getElementById('btnConnectSupabase');
  const badge = document.getElementById('supabaseStatusBadge');
  const urlPreview = document.getElementById('supabaseUrlPreview');
  const keyPreview = document.getElementById('supabaseKeyPreview');

  if (urlPreview) {
    urlPreview.innerText = url ? url.replace(/^https?:\/\//, '') : 'Belum diatur';
    urlPreview.title = url || '';
  }
  if (keyPreview) {
    keyPreview.innerText = key ? (key.substring(0, 8) + '••••••••' + key.slice(-4)) : 'Belum ada key';
  }

  if (isConnected) {
    if (btnText) btnText.innerText = 'Supabase Connected';
    if (btn) {
      btn.style.borderColor = '#10b981';
      btn.style.backgroundColor = '#ecfdf5';
      btn.style.color = '#047857';
    }
    if (badge) {
      badge.style.background = '#d1fae5';
      badge.style.color = '#065f46';
      badge.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 7px; color: #10b981; margin-right: 4px;"></i> Terhubung';
    }
  } else {
    if (btnText) btnText.innerText = 'Supabase Config';
    if (btn) {
      btn.style.borderColor = 'var(--border-color)';
      btn.style.backgroundColor = '#ffffff';
      btn.style.color = 'var(--text-secondary)';
    }
    if (badge) {
      badge.style.background = '#f1f5f9';
      badge.style.color = '#64748b';
      badge.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 7px; color: #94a3b8; margin-right: 4px;"></i> Disconnected';
    }
  }
}

function disconnectSupabase() {
  localStorage.removeItem('SYMTRAFLOW_SUPABASE_URL');
  localStorage.removeItem('SYMTRAFLOW_SUPABASE_KEY');
  window.SUPABASE_CONFIG = { url: '', anonKey: '' };
  if (typeof supabaseClient !== 'undefined') {
    supabaseClient = null;
  }
  const urlInp = document.getElementById('inpSupabaseUrl');
  const keyInp = document.getElementById('inpSupabaseKey');
  if (urlInp) urlInp.value = '';
  if (keyInp) keyInp.value = '';

  closeModal('supabaseModal');
  updateSupabaseStatusDisplay();
  showToast('🔌 Koneksi Supabase telah diputus.');
}

function saveSupabaseConfig(e) {
  e.preventDefault();
  const url = document.getElementById('inpSupabaseUrl').value.trim();
  const key = document.getElementById('inpSupabaseKey').value.trim();

  window.SUPABASE_CONFIG = { url, anonKey: key };
  localStorage.setItem('SYMTRAFLOW_SUPABASE_URL', url);
  localStorage.setItem('SYMTRAFLOW_SUPABASE_KEY', key);

  closeModal('supabaseModal');

  if (typeof supabaseClient !== 'undefined') {
    supabaseClient = null;
  }

  if (typeof getSupabaseClient === 'function' && getSupabaseClient()) {
    updateSupabaseStatusDisplay();
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
    updateSupabaseStatusDisplay();
    showToast('⚠️ Gagal terhubung ke Supabase. Periksa URL & Anon Key.');
  }
}

// Auto load stored Supabase Config on startup
document.addEventListener('DOMContentLoaded', () => {
  const savedUrl = localStorage.getItem('SYMTRAFLOW_SUPABASE_URL');
  const savedKey = localStorage.getItem('SYMTRAFLOW_SUPABASE_KEY');
  if (savedUrl && savedKey) {
    window.SUPABASE_CONFIG = { url: savedUrl, anonKey: savedKey };
  }
  updateSupabaseStatusDisplay();
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

const STAGE_PROGRESS_MAP = {
  'BELUM MULAI': 0,
  'TANK MAKING': 10,
  'CORE MAKING': 20,
  'COIL MAKING': 30,
  'ASSEMBLY': 45,
  'CONNECTION': 55,
  'FINAL ASSEMBLY': 65,
  'INTERNAL TEST': 75,
  'FINISHING': 85,
  'FAT': 90,
  'PUNCHLIST': 95,
  'DELIVERY': 100,
  'SELESAI': 100
};

function getBadgeClassForStatus(status) {
  if (!status) return 'badge-assembly';
  const s = status.toUpperCase();
  if (s === 'SELESAI') return 'badge-selesai';
  if (s === 'CONNECTION') return 'badge-connection';
  if (s === 'TANK MAKING') return 'badge-tank';
  if (s === 'CORE MAKING') return 'badge-core';
  if (s === 'FINISHING') return 'badge-finishing';
  if (s === 'INTERNAL TEST') return 'badge-internal';
  if (s === 'BELUM MULAI') return 'badge-belum';
  return 'badge-assembly';
}

function updateQcRowDisplay(rowId, valId, status, label) {
  const row = document.getElementById(rowId);
  const val = document.getElementById(valId);
  if (!row || !val) return;

  val.innerText = status;
  if (status === 'PASS') {
    row.style.background = '#ecfdf5';
    row.style.color = '#065f46';
    const firstSpan = row.querySelector('span:first-child');
    if (firstSpan) firstSpan.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981; margin-right:4px;"></i> ${label}`;
    val.style.color = '#047857';
  } else if (status === 'IN PROGRESS') {
    row.style.background = '#fffbe6';
    row.style.color = '#92400e';
    const firstSpan = row.querySelector('span:first-child');
    if (firstSpan) firstSpan.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:#f59e0b; margin-right:4px;"></i> ${label}`;
    val.style.color = '#b45309';
  } else {
    row.style.background = '#fef2f2';
    row.style.color = '#991b1b';
    const firstSpan = row.querySelector('span:first-child');
    if (firstSpan) firstSpan.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color:#ef4444; margin-right:4px;"></i> ${label}`;
    val.style.color = '#b91c1c';
  }
}

// Open Detailed Progress & Specs Modal for any Trafo Unit
function openTrafoDetailModal(unit, ptObj) {
  currentActiveUnit = unit;
  currentActivePT = ptObj;

  const modal = document.getElementById('trafoDetailModal');
  if (!modal) return;

  // Always reset to View mode when opening
  exitTrafoEditMode(true);

  const stageIdx = unit.currentStageIndex !== undefined 
    ? unit.currentStageIndex 
    : (unit.stageIdx !== undefined ? unit.stageIdx : getStageIdxFromStatus(unit.status));
  
  // Header values
  document.getElementById('mTrafoId').innerText = unit.id;
  document.getElementById('mTrafoNama').innerText = `${unit.nama || 'Trafo'} - ${unit.cap || unit.kapasitas}`;
  document.getElementById('mTrafoPT').innerText = ptObj ? ptObj.pt : 'Internal SYMTRAFLOW';
  
  const badgeEl = document.getElementById('mTrafoBadge');
  badgeEl.className = `badge-status ${unit.badge || getBadgeClassForStatus(unit.status)}`;
  badgeEl.innerText = unit.status;
  
  // Progress pct
  const pct = unit.progress !== undefined ? unit.progress : 0;
  document.getElementById('mTrafoProgressPct').innerText = `${pct}%`;
  document.getElementById('mTrafoProgressBar').style.width = `${pct}%`;
  
  // Specs
  document.getElementById('mTrafoCap').innerText = unit.cap || unit.kapasitas || '-';
  document.getElementById('mTrafoVolt').innerText = unit.volt || unit.tegangan || '-';
  document.getElementById('mTrafoOperator').innerText = unit.operator || 'I WAYAN EVA VERDIANA';
  document.getElementById('mTrafoDeadline').innerText = unit.dead || unit.deadline || '-';
  document.getElementById('mTrafoProject').innerText = ptObj ? `${ptObj.project}` : (unit.proyek || 'Proyek Regular');
  document.getElementById('mTrafoLocation').innerText = ptObj ? ptObj.location : 'Pabrik Utama SYMTRAFLOW';

  // QC Display
  const qc = unit.qc || { tank: 'PASS', core: 'PASS', winding: 'IN PROGRESS' };
  updateQcRowDisplay('mQcTankRow', 'mQcTankVal', qc.tank || 'PASS', 'Tank Pressure & Leakage');
  updateQcRowDisplay('mQcCoreRow', 'mQcCoreVal', qc.core || 'PASS', 'Core Insulation & Ratio Test');
  updateQcRowDisplay('mQcWindingRow', 'mQcWindingVal', qc.winding || 'IN PROGRESS', 'Winding & Dielectric Insulation');

  // Render 11 Stepper Grid inside Modal (Clickable to switch stages quickly!)
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
      item.className = 'modal-stepper-item';
      item.style.cssText = `
        display:flex; flex-direction:column; align-items:center; text-align:center; padding:8px 4px;
        border-radius:6px; background:${statusClass === 'finished' ? '#ecfdf5' : statusClass === 'process' ? '#fffbe6' : '#f8fafc'};
        border:1.5px solid ${statusClass === 'finished' ? '#a7f3d0' : statusClass === 'process' ? '#fde68a' : '#e2e8f0'};
        cursor: pointer; transition: all 0.2s ease;
      `;
      item.title = `Klik untuk langsung ubah tahapan ke: ${idx + 1}. ${stg.code}`;
      item.innerHTML = `
        <div style="font-size:9px; font-weight:800; color:${statusClass === 'finished' ? '#047857' : statusClass === 'process' ? '#b45309' : '#64748b'}; text-transform:uppercase; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">${idx+1}. ${stg.code}</div>
        <i class="fa-solid ${icon}" style="font-size:13px; margin:4px 0; color:${statusClass === 'finished' ? '#10b981' : statusClass === 'process' ? '#f59e0b' : '#cbd5e1'};"></i>
        <div style="font-size:9px; font-weight:700; color:${statusClass === 'finished' ? '#059669' : statusClass === 'process' ? '#d97706' : '#94a3b8'};">
          ${statusClass === 'finished' ? 'Selesai' : statusClass === 'process' ? 'Proses' : 'Menunggu'}
        </div>
      `;

      item.onclick = () => quickSetUnitStage(idx, stg.code);
      stepperGrid.appendChild(item);
    });
  }

  modal.classList.add('active');
}

// Quick 1-click stage setter from modal stepper cards
function quickSetUnitStage(idx, stageCode) {
  if (!currentActiveUnit) return;
  const targetCode = stageCode || (STAGES[idx] ? STAGES[idx].code : 'ASSEMBLY');
  const newProgress = STAGE_PROGRESS_MAP[targetCode] !== undefined 
    ? STAGE_PROGRESS_MAP[targetCode] 
    : Math.round(((idx + 1) / 11) * 100);

  currentActiveUnit.status = targetCode;
  currentActiveUnit.currentStageIndex = idx;
  currentActiveUnit.stageIdx = idx;
  currentActiveUnit.stage = targetCode;
  currentActiveUnit.progress = newProgress;
  currentActiveUnit.badge = getBadgeClassForStatus(targetCode);

  // Sync with ptProjects
  ptProjects.forEach(pt => {
    const u = pt.units.find(item => item.id === currentActiveUnit.id);
    if (u) Object.assign(u, currentActiveUnit);
  });
  savePTProjects();
  renderPTProjects();

  // Sync with orders
  const ord = orders.find(o => o.id === currentActiveUnit.id);
  if (ord) {
    ord.status = targetCode;
    ord.currentStageIndex = idx;
    ord.progress = newProgress;
  }
  if (selectedOrder && selectedOrder.id === currentActiveUnit.id) {
    selectedOrder.status = targetCode;
    selectedOrder.currentStageIndex = idx;
    selectedOrder.progress = newProgress;
    renderStepper(selectedOrder, true);
    updateDetailPanel(selectedOrder);
  }
  renderOrdersTable();
  populateStepperOrderSelector();

  // Re-render modal to reflect changes
  openTrafoDetailModal(currentActiveUnit, currentActivePT);
  showToast(`⚡ Tahapan ${currentActiveUnit.id} beralih ke ${targetCode} (${newProgress}%)`);
}

// Enter Edit Mode in Trafo Detail Modal
function enterTrafoEditMode() {
  if (!currentActiveUnit) return;
  
  const viewMode = document.getElementById('trafoDetailViewMode');
  const editMode = document.getElementById('trafoDetailEditMode');
  const viewFooter = document.getElementById('trafoDetailViewFooter');
  const editFooter = document.getElementById('trafoDetailEditFooter');
  const modalTitle = document.getElementById('mModalTitle');

  if (viewMode) viewMode.style.display = 'none';
  if (editMode) editMode.style.display = 'flex';
  if (viewFooter) viewFooter.style.display = 'none';
  if (editFooter) editFooter.style.display = 'flex';
  if (modalTitle) modalTitle.innerText = `Edit Progres & Spesifikasi Unit: ${currentActiveUnit.id}`;

  // Populate form with current unit data
  document.getElementById('inpEditNama').value = currentActiveUnit.nama || 'Trafo Power';
  document.getElementById('inpEditCap').value = currentActiveUnit.cap || currentActiveUnit.kapasitas || '500 kVA';
  document.getElementById('inpEditVolt').value = currentActiveUnit.volt || currentActiveUnit.tegangan || '20 kV / 400 V';
  document.getElementById('inpEditOperator').value = currentActiveUnit.operator || 'I WAYAN EVA VERDIANA';
  document.getElementById('inpEditDeadline').value = currentActiveUnit.dead || currentActiveUnit.deadline || '20/06/2024';
  
  const locVal = currentActivePT ? currentActivePT.location : (currentActiveUnit.location || 'Refinery Unit IV Cilacap, Jawa Tengah');
  document.getElementById('inpEditLocation').value = locVal;

  const prjVal = currentActivePT ? currentActivePT.project : (currentActiveUnit.project || 'TRAFO POWER 20kV');
  document.getElementById('inpEditProject').value = prjVal;

  // Set Stage dropdown
  const stgSel = document.getElementById('inpEditStage');
  if (stgSel) {
    stgSel.value = currentActiveUnit.status || 'ASSEMBLY';
  }

  // Set Progress
  const prgVal = currentActiveUnit.progress !== undefined ? currentActiveUnit.progress : 60;
  document.getElementById('inpEditProgressRange').value = prgVal;
  document.getElementById('inpEditProgressNum').value = prgVal;
  document.getElementById('editProgressDisplay').innerText = `${prgVal}%`;

  // Set QC
  const qc = currentActiveUnit.qc || { tank: 'PASS', core: 'PASS', winding: 'IN PROGRESS' };
  document.getElementById('inpEditQcTank').value = qc.tank || 'PASS';
  document.getElementById('inpEditQcCore').value = qc.core || 'PASS';
  document.getElementById('inpEditQcWinding').value = qc.winding || 'IN PROGRESS';
}

// Exit Edit Mode back to View Mode
function exitTrafoEditMode(silent = false) {
  const viewMode = document.getElementById('trafoDetailViewMode');
  const editMode = document.getElementById('trafoDetailEditMode');
  const viewFooter = document.getElementById('trafoDetailViewFooter');
  const editFooter = document.getElementById('trafoDetailEditFooter');
  const modalTitle = document.getElementById('mModalTitle');

  if (viewMode) viewMode.style.display = 'flex';
  if (editMode) editMode.style.display = 'none';
  if (viewFooter) viewFooter.style.display = 'flex';
  if (editFooter) editFooter.style.display = 'none';
  if (modalTitle) modalTitle.innerText = 'Detail Progres & Spesifikasi Trafo Unit';
}

// Stage change listener in edit form
function onEditStageSelect(stageCode) {
  const recommendedProgress = STAGE_PROGRESS_MAP[stageCode] !== undefined ? STAGE_PROGRESS_MAP[stageCode] : 50;
  document.getElementById('inpEditProgressRange').value = recommendedProgress;
  document.getElementById('inpEditProgressNum').value = recommendedProgress;
  document.getElementById('editProgressDisplay').innerText = `${recommendedProgress}%`;
}

// Progress slider/input sync
function onEditProgressInput(val) {
  const num = Math.max(0, Math.min(100, parseInt(val, 10) || 0));
  document.getElementById('inpEditProgressRange').value = num;
  document.getElementById('inpEditProgressNum').value = num;
  document.getElementById('editProgressDisplay').innerText = `${num}%`;
}

// Save Changes from Edit Form
function handleSaveTrafoEdit(e) {
  e.preventDefault();
  if (!currentActiveUnit) return;

  const nama = document.getElementById('inpEditNama').value.trim();
  const cap = document.getElementById('inpEditCap').value.trim();
  const volt = document.getElementById('inpEditVolt').value.trim();
  const op = document.getElementById('inpEditOperator').value;
  const deadline = document.getElementById('inpEditDeadline').value.trim();
  const loc = document.getElementById('inpEditLocation').value.trim();
  const prj = document.getElementById('inpEditProject').value.trim();
  const stage = document.getElementById('inpEditStage').value;
  const progress = parseInt(document.getElementById('inpEditProgressNum').value, 10) || 0;
  const qcTank = document.getElementById('inpEditQcTank').value;
  const qcCore = document.getElementById('inpEditQcCore').value;
  const qcWinding = document.getElementById('inpEditQcWinding').value;

  const stageIdx = getStageIdxFromStatus(stage);
  const badgeClass = getBadgeClassForStatus(stage);

  // Update active unit in-memory
  currentActiveUnit.nama = nama;
  currentActiveUnit.cap = cap;
  currentActiveUnit.kapasitas = cap;
  currentActiveUnit.volt = volt;
  currentActiveUnit.tegangan = volt;
  currentActiveUnit.operator = op;
  currentActiveUnit.dead = deadline;
  currentActiveUnit.deadline = deadline;
  currentActiveUnit.status = stage;
  currentActiveUnit.progress = progress;
  currentActiveUnit.stage = stage;
  currentActiveUnit.stageIdx = stageIdx;
  currentActiveUnit.currentStageIndex = stageIdx;
  currentActiveUnit.badge = badgeClass;
  currentActiveUnit.qc = { tank: qcTank, core: qcCore, winding: qcWinding };

  if (currentActivePT) {
    currentActivePT.location = loc;
    currentActivePT.project = prj;
  }

  // 1. Sync across ptProjects
  ptProjects.forEach(pt => {
    const u = pt.units.find(item => item.id === currentActiveUnit.id);
    if (u) Object.assign(u, currentActiveUnit);
  });
  savePTProjects();
  renderPTProjects();

  // 2. Sync across orders array
  const ord = orders.find(o => o.id === currentActiveUnit.id);
  if (ord) {
    ord.nama = nama;
    ord.kapasitas = cap;
    ord.tegangan = volt;
    ord.operator = op;
    ord.deadline = deadline;
    ord.status = stage;
    ord.progress = progress;
    ord.currentStageIndex = stageIdx;
  }
  if (selectedOrder && selectedOrder.id === currentActiveUnit.id) {
    Object.assign(selectedOrder, currentActiveUnit);
    renderStepper(selectedOrder, true);
    updateDetailPanel(selectedOrder);
  }
  renderOrdersTable();
  populateStepperOrderSelector();

  // 3. Sync across prj1Units / prj2Units
  [prj1Units, prj2Units].forEach(list => {
    const u = list.find(item => item.id === currentActiveUnit.id);
    if (u) {
      u.cap = cap;
      u.volt = volt;
      u.status = stage;
      u.progress = progress;
      u.stageIdx = stageIdx;
      u.operator = op;
      u.dead = deadline;
      u.badge = badgeClass;
    }
  });
  renderProjectView(prj1Units, 'prj1TableBody', 'prj1GanttBody', 'prj1');
  renderProjectView(prj2Units, 'prj2TableBody', 'prj2GanttBody', 'prj2');

  // Add activity log
  activityLogs.unshift({
    icon: 'blue',
    iconClass: 'fa-solid fa-pen-to-square',
    boldText: `Data spesifikasi & tahapan ${currentActiveUnit.id} diperbarui`,
    subText: `${currentActiveUnit.id} • ${stage} (${progress}%)`,
    time: 'Baru saja'
  });
  renderActivityLogs();

  // Exit edit mode and refresh view modal
  exitTrafoEditMode(true);
  openTrafoDetailModal(currentActiveUnit, currentActivePT);
  showToast(`✅ Spesifikasi & tahapan ${currentActiveUnit.id} berhasil disimpan!`);
}

// Print / Export Sales Order (SO) & QC Document
function printSOUnit(unitParam, ptParam) {
  const unit = unitParam || currentActiveUnit || selectedOrder || (orders && orders[0]) || {};
  const pt   = ptParam || currentActivePT || {
    pt: 'PT PERTAMINA PERSERO',
    ptShort: 'PTM',
    project: 'TRAFO POWER 20kV',
    contract: 'SO/PTM/2024/001',
    location: 'Refinery Unit IV Cilacap'
  };

  const idUnit = unit.id || 'TRF-PTM-001';
  const namaUnit = unit.nama || unit.name || 'Trafo Power';
  const capUnit = unit.cap || unit.kapasitas || '1000 kVA';
  const voltUnit = unit.volt || unit.tegangan || '20 kV / 400 V';
  const statusUnit = unit.status || 'ASSEMBLY';
  const progressUnit = unit.progress !== undefined ? unit.progress : 60;
  const operatorUnit = unit.operator || 'I WAYAN EVA VERDIANA';
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
      <title>SO Produksi Trafo — ${idUnit}</title>
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
          <div style="font-weight:900; font-size:14px; color:#1e3a8a;">LEMBAR KERJA SO</div>
          <div style="font-size:10px; color:#64748b;">Tgl Cetak: ${todayStr}</div>
        </div>
      </div>

      <div class="doc-title">
        <h2>SALES ORDER (SO) & CHECKSHEET QA TRAFO</h2>
        <p>NO. DOKUMEN: SO/${idUnit}/${new Date().getFullYear()}</p>
      </div>

      <div class="grid-info">
        <div class="info-box">
          <div class="info-title">1. INFORMASI PELANGGAN & KONTRAK</div>
          <div class="info-row"><span class="info-label">Perusahaan (PT):</span><span class="info-value">${pt.pt || 'PT Pertamina Persero'}</span></div>
          <div class="info-row"><span class="info-label">Nama Proyek:</span><span class="info-value">${pt.project || 'TRAFO POWER 20kV'}</span></div>
          <div class="info-row"><span class="info-label">Nomor Kontrak / SO:</span><span class="info-value">${pt.contract || 'SO/PTM/2024/001'}</span></div>
          <div class="info-row"><span class="info-label">Lokasi Tujuan:</span><span class="info-value">${pt.location || 'Refinery Unit IV Cilacap'}</span></div>
        </div>

        <div class="info-box">
          <div class="info-title">2. SPESIFIKASI TRAFO UNIT</div>
          <div class="info-row"><span class="info-label">No. SO Unit:</span><span class="info-value" style="color:#1e3a8a;">${idUnit}</span></div>
          <div class="info-row"><span class="info-label">Jenis Trafo:</span><span class="info-value">${namaUnit}</span></div>
          <div class="info-row"><span class="info-label">Kapasitas Nominal:</span><span class="info-value">${capUnit}</span></div>
          <div class="info-row"><span class="info-label">Tegangan (Prim/Sek):</span><span class="info-value">${voltUnit}</span></div>
          <div class="info-row"><span class="info-label">Sales Officer:</span><span class="info-value">${operatorUnit}</span></div>
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
            <th style="text-align:center;">Sales Officer</th>
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
          <div class="sig-title">Sales Officer Penanggung Jawab</div>
          <div class="sig-space"></div>
          <div class="sig-name">${operatorUnit}</div>
          <div class="stamp">Sales & Marketing Dept.</div>
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
  let printIframe = document.getElementById('soPrintIframe');
  if (!printIframe) {
    printIframe = document.createElement('iframe');
    printIframe.id = 'soPrintIframe';
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
    showToast(`📄 Membuka Cetak Dokumen SO & QA Trafo ${idUnit}...`);
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

const printSPKUnit = printSOUnit;

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
    // Save authentication state to sessionStorage for the active session
    sessionStorage.setItem('SYMTRAFLOW_AUTH_USER', JSON.stringify({
      username: authenticatedUser.username,
      name: authenticatedUser.name,
      role: authenticatedUser.role,
      avatar: authenticatedUser.avatar || '',
      roleKey: roleKey
    }));

    if (loginScreen) {
      loginScreen.classList.add('hidden');
    }

    const navName = document.querySelector('.user-nav-name');
    const navRole = document.querySelector('.user-nav-role');

    if (navName) {
      navName.innerHTML = `${authenticatedUser.name} <i class="fa-solid fa-chevron-down" style="font-size: 10px; color: #64748b;"></i>`;
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

    // Default to Dashboard view
    switchMainTab('dashboard');
    showWelcomePopup(authenticatedUser, roleKey);
  } else {
    showToast(`⚠️ Username atau Password salah! Periksa Pengaturan.`);
  }
}

function handleLogout() {
  sessionStorage.removeItem('SYMTRAFLOW_AUTH_USER');
  localStorage.removeItem('SYMTRAFLOW_ACTIVE_SESSION');
  const loginScreen = document.getElementById('loginScreen');
  if (loginScreen) {
    loginScreen.classList.remove('hidden');
  }
  // Clear input fields
  const u = document.getElementById('loginUsername');
  const p = document.getElementById('loginPassword');
  if (u) u.value = '';
  if (p) p.value = '';

  // Reset nav avatar
  const navAvatar = document.getElementById('navUserAvatar');
  const navAvatarIcon = document.getElementById('navUserAvatarIcon');
  if (navAvatar) navAvatar.style.display = 'none';
  if (navAvatarIcon) navAvatarIcon.style.display = '';
  showToast('🔒 Anda telah keluar dari sistem.');
}

/* ==========================================================================
   SYMPHOS ELECTRIC - PRODUCTION ERP LOGIC
   Proyek (SO), Produksi, Pengiriman, & Master Data
   ========================================================================== */

// --- Global Data Stores for the ERP Modules ---
let erpSalesOrders = [
  {
    no: 1,
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    variant: 'Distribusi',
    kva: 500,
    qty: 10,
    orderDate: '01/05/2026',
    targetDate: '30/06/2026',
    status: 'Dalam Proses',
    value: 'Rp 14,5 M',
    pic: 'I Wayan Eva Verdiana',
    units: [
      { unitNo: 'TRF-001', kva: 500, stage: 'HV', progress: 60, targetDate: '20/06/2026', status: 'Dalam Proses' },
      { unitNo: 'TRF-002', kva: 500, stage: 'Susun Core', progress: 40, targetDate: '22/06/2026', status: 'Dalam Proses' }
    ]
  },
  {
    no: 2,
    soNumber: '25-0442D',
    customer: 'PT PLN Nusa Daya',
    variant: 'Distribusi',
    kva: 1000,
    qty: 5,
    orderDate: '03/05/2026',
    targetDate: '25/07/2026',
    status: 'Dalam Proses',
    value: 'Rp 21,3 M',
    pic: 'Shevira Indraswari',
    units: [
      { unitNo: 'TRF-003', kva: 1000, stage: 'CCA', progress: 30, targetDate: '10/07/2026', status: 'Dalam Proses' },
      { unitNo: 'TRF-004', kva: 1000, stage: 'LV', progress: 20, targetDate: '10/07/2026', status: 'Dalam Proses' }
    ]
  },
  {
    no: 3,
    soNumber: '25-0789',
    customer: 'PT PLN Jawa Tengah',
    variant: 'Distribusi',
    kva: 250,
    qty: 2,
    orderDate: '10/05/2026',
    targetDate: '15/08/2026',
    status: 'Belum Mulai',
    value: 'Rp 12,8 M',
    pic: 'Willi Syukran',
    units: [
      { unitNo: 'TRF-005', kva: 250, stage: 'Belum Mulai', progress: 0, targetDate: '15/08/2026', status: 'Belum Mulai' }
    ]
  }
];

let erpProduksiUnits = [
  {
    no: 1,
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    unitNo: 'TRF-001',
    kva: 500,
    stage: 'HV',
    progress: 60,
    targetDate: '20/06/2026',
    status: 'Dalam Proses',
    operator: 'Budi Santoso'
  },
  {
    no: 2,
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    unitNo: 'TRF-002',
    kva: 500,
    stage: 'Susun Core',
    progress: 40,
    targetDate: '22/06/2026',
    status: 'Dalam Proses',
    operator: 'Agus Pratama'
  },
  {
    no: 3,
    soNumber: '25-0442D',
    customer: 'PT PLN Nusa Daya',
    unitNo: 'TRF-003',
    kva: 1000,
    stage: 'CCA',
    progress: 30,
    targetDate: '10/07/2026',
    status: 'Dalam Proses',
    operator: 'Hendra Gunawan'
  },
  {
    no: 4,
    soNumber: '25-0442D',
    customer: 'PT PLN Nusa Daya',
    unitNo: 'TRF-004',
    kva: 1000,
    stage: 'LV',
    progress: 20,
    targetDate: '10/07/2026',
    status: 'Dalam Proses',
    operator: 'Dedi Kurniawan'
  },
  {
    no: 5,
    soNumber: '25-0789',
    customer: 'PT PLN Jawa Tengah',
    unitNo: 'TRF-005',
    kva: 250,
    stage: 'Belum Mulai',
    progress: 0,
    targetDate: '15/08/2026',
    status: 'Belum Mulai',
    operator: 'Eko Wahyudi'
  }
];

let erpShipments = [
  {
    no: 1,
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    unitNo: 'TRF-001',
    kva: 500,
    finishDate: '20/06/2026',
    shipDate: '22/06/2026',
    status: 'Siap Kirim',
    driver: 'Supardi (Truk B-9821-TF)',
    dest: 'Gardu Induk Jateng, Semarang',
    stepActive: 2,
    steps: [
      { name: 'Siap Kirim', date: '20 Jun 2026' },
      { name: 'Dalam Pengiriman', date: '22 Jun 2026' },
      { name: 'Tiba di Lokasi', date: '24 Jun 2026' },
      { name: 'Selesai', date: '25 Jun 2026' }
    ]
  },
  {
    no: 2,
    soNumber: '25-0442D',
    customer: 'PT PLN Nusa Daya',
    unitNo: 'TRF-003',
    kva: 1000,
    finishDate: '10/07/2026',
    shipDate: '12/07/2026',
    status: 'Dalam Pengiriman',
    driver: 'Bambang S. (Low-Bed Trailer L-8812-UX)',
    dest: 'GI Mataram, Lombok',
    stepActive: 2,
    steps: [
      { name: 'Siap Kirim', date: '10 Jul 2026' },
      { name: 'Dalam Pengiriman', date: '12 Jul 2026' },
      { name: 'Tiba di Lokasi', date: '15 Jul 2026' },
      { name: 'Selesai', date: '16 Jul 2026' }
    ]
  },
  {
    no: 3,
    soNumber: '25-0789',
    customer: 'PT PLN Jawa Tengah',
    unitNo: 'TRF-005',
    kva: 250,
    finishDate: '15/08/2026',
    shipDate: '18/08/2026',
    status: 'Selesai',
    driver: 'Joko Susilo (Flatbed H-9120-EA)',
    dest: 'PLN UID Jateng-DIY, Kudus',
    stepActive: 4,
    steps: [
      { name: 'Siap Kirim', date: '15 Agu 2026' },
      { name: 'Dalam Pengiriman', date: '18 Agu 2026' },
      { name: 'Tiba di Lokasi', date: '19 Agu 2026' },
      { name: 'Selesai', date: '20 Agu 2026' }
    ]
  }
];

let activeTrackingShipmentIndex = 0;

// --- Main Tab Switcher Function ---
function switchMainTab(tabName) {
  // Update sidebar active buttons
  const tabButtonMap = {
    'dashboard': 'menuDashboard',
    'proyek': 'menuProyek',
    'pengiriman': 'menuPengiriman',
    'master-data': 'menuMasterData',
    'monitoring': 'menuSubMonitoring',
    'single-flow': 'menuSubMonitoring',
    'produksi': 'menuSubDetail',
    'detail': 'menuSubDetail',
    'multi-project': 'menuSubJadwal',
    'jadwal': 'menuSubJadwal',
    'project-pt': 'menuSubRiwayat',
    'riwayat': 'menuSubRiwayat',
    'document-control': 'menuDocumentControl',
    'laporan': 'menuLaporan',
    'pengaturan': 'menuPengaturan'
  };

  document.querySelectorAll('.sidebar-menu .menu-item, .sidebar-menu .submenu-item').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeBtnId = tabButtonMap[tabName];
  if (activeBtnId) {
    const activeBtn = document.getElementById(activeBtnId);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Handle Produksi parent & submenu state
  const isProduksiView = ['monitoring', 'single-flow', 'produksi', 'detail', 'multi-project', 'jadwal', 'project-pt', 'riwayat'].includes(tabName);
  const parentProduksi = document.getElementById('menuProduksiParent');
  const submenuProduksi = document.getElementById('submenuProduksi');
  const arrowProduksi = document.getElementById('arrowProduksi');

  if (isProduksiView) {
    if (parentProduksi) parentProduksi.classList.add('open');
    if (submenuProduksi) submenuProduksi.classList.add('open');
    if (arrowProduksi) arrowProduksi.style.transform = 'rotate(180deg)';
  } else {
    if (parentProduksi) parentProduksi.classList.remove('open');
    if (submenuProduksi) submenuProduksi.classList.remove('open');
    if (arrowProduksi) arrowProduksi.style.transform = 'rotate(0deg)';
  }

  // All view containers
  const viewMap = {
    'dashboard': 'viewDashboardPortal',
    'monitoring': 'viewSingleFlow',
    'single-flow': 'viewSingleFlow',
    'produksi': 'viewProduksi',
    'detail': 'viewProduksi',
    'multi-project': 'viewMultiProject',
    'jadwal': 'viewMultiProject',
    'project-pt': 'viewProjectPT',
    'riwayat': 'viewProjectPT',
    'document-control': 'viewDocumentControl',
    'proyek': 'viewProyekSO',
    'pengiriman': 'viewPengiriman',
    'master-data': 'viewMasterData',
    'laporan': 'viewLaporan',
    'pengaturan': 'viewPengaturan'
  };

  const allViews = [
    'viewDashboardPortal',
    'viewSingleFlow',
    'viewMultiProject',
    'viewProjectPT',
    'viewPengaturan',
    'viewProyekSO',
    'viewProduksi',
    'viewPengiriman',
    'viewMasterData',
    'viewDocumentControl',
    'viewLaporan'
  ];

  allViews.forEach(vId => {
    const el = document.getElementById(vId);
    if (el) el.classList.remove('active');
  });

  const targetViewId = viewMap[tabName] || 'viewDashboardPortal';
  const targetView = document.getElementById(targetViewId);
  if (targetView) targetView.classList.add('active');

  // Toggle dashboard sub-action bar (visible for monitoring, gantt, project pt)
  const dashBar = document.getElementById('dashboardActionBar');
  if (dashBar) {
    dashBar.style.display = ['monitoring', 'single-flow', 'multi-project', 'jadwal', 'project-pt', 'riwayat'].includes(tabName) ? 'flex' : 'none';
  }

  // Sync sub-action bar buttons in monitoring overview
  const btnSingle = document.getElementById('btnSubSingleFlow');
  const btnMulti = document.getElementById('btnSubMultiGantt');
  const btnPT = document.getElementById('btnSubProjectPT');
  [btnSingle, btnMulti, btnPT].forEach(b => b && b.classList.remove('active'));
  if (['monitoring', 'single-flow'].includes(tabName) && btnSingle) btnSingle.classList.add('active');
  if (['multi-project', 'jadwal'].includes(tabName) && btnMulti) btnMulti.classList.add('active');
  if (['project-pt', 'riwayat'].includes(tabName) && btnPT) btnPT.classList.add('active');

  // Update navbar page title and subtitle
  const pageTitle = document.getElementById('pageTitle') || document.querySelector('.page-title');
  const pageSubtitle = document.getElementById('pageSubtitle');

  const titleMap = {
    'dashboard': 'Dashboard',
    'monitoring': 'Monitoring Produksi',
    'single-flow': 'Monitoring Produksi',
    'produksi': 'Detail Produksi',
    'detail': 'Detail Produksi',
    'multi-project': 'Jadwal Produksi (Gantt Chart)',
    'jadwal': 'Jadwal Produksi (Gantt Chart)',
    'project-pt': 'Riwayat Proyek PT',
    'riwayat': 'Riwayat Proyek PT',
    'document-control': 'Document Control',
    'proyek': 'Proyek (Sales Order)',
    'pengiriman': 'Pengiriman',
    'master-data': 'Master Data',
    'laporan': 'Laporan & Analitik',
    'pengaturan': 'Pengaturan Sistem'
  };

  const subtitleMap = {
    'dashboard': 'Pilih modul yang ingin diakses',
    'monitoring': 'Pantau alur dan status proses produksi trafo secara real-time',
    'single-flow': 'Pantau alur dan status proses produksi trafo secara real-time',
    'produksi': 'Alur dan tahapan lini fabrikasi transformator',
    'detail': 'Alur dan tahapan lini fabrikasi transformator',
    'multi-project': 'Linimasa jadwal multi-proyek transformator',
    'jadwal': 'Linimasa jadwal multi-proyek transformator',
    'project-pt': 'Hierarki dan riwayat pengerjaan proyek trafo perusahaan',
    'riwayat': 'Hierarki dan riwayat pengerjaan proyek trafo perusahaan',
    'document-control': 'Kelola dan akses dokumen proyek, gambar teknik, sertifikat, dan dokumen terkait.',
    'proyek': 'Daftar seluruh pesanan sales order dan status pengerjaan',
    'pengiriman': 'Pelacakan ekspedisi dan status pengiriman trafo ke pelanggan',
    'master-data': 'Database spesifikasi teknis, data customer, material, dan PIC',
    'laporan': 'Rekapitulasi performa lini fabrikasi trafo, efisiensi waktu pengerjaan, dan statistik pengujian',
    'pengaturan': 'Kelola user login, akun admin, dan preferensi aplikasi'
  };

  if (pageTitle && titleMap[tabName]) {
    pageTitle.innerText = titleMap[tabName];
  }
  if (pageSubtitle && subtitleMap[tabName]) {
    pageSubtitle.innerText = subtitleMap[tabName];
  }

  // Trigger relevant renders
  if (tabName === 'monitoring' || tabName === 'single-flow') {
    renderOrdersTable();
  } else if (tabName === 'document-control') {
    renderDocumentsTable();
  } else if (tabName === 'proyek') {
    renderProyekTable();
  } else if (tabName === 'produksi' || tabName === 'detail') {
    renderDetailProduksiView();
  } else if (tabName === 'project-pt' || tabName === 'riwayat') {
    renderPTProjects();
  } else if (tabName === 'pengiriman') {
    renderPengirimanTable();
    updateTrackingStepperUI();
  } else if (tabName === 'pengaturan') {
    loadUserAccountsUI();
    if (typeof updateSupabaseStatusDisplay === 'function') updateSupabaseStatusDisplay();
  }

  closeMobileSidebar();
}

// Toggle Produksi Dropdown Menu
function toggleProduksiMenu(e) {
  if (e) e.stopPropagation();
  const submenu = document.getElementById('submenuProduksi');
  const arrow = document.getElementById('arrowProduksi');
  const parentBtn = document.getElementById('menuProduksiParent');
  if (!submenu) return;

  const isOpen = submenu.classList.contains('open');
  if (isOpen) {
    submenu.classList.remove('open');
    if (arrow) arrow.style.transform = 'rotate(0deg)';
    if (parentBtn) parentBtn.classList.remove('open');
  } else {
    submenu.classList.add('open');
    if (arrow) arrow.style.transform = 'rotate(180deg)';
    if (parentBtn) parentBtn.classList.add('open');
    const activeSub = submenu.querySelector('.submenu-item.active');
    if (!activeSub) {
      switchProduksiSubView('detail');
    }
  }
}

// Switch between Produksi Sub-views
function switchProduksiSubView(subview) {
  const submenu = document.getElementById('submenuProduksi');
  const arrow = document.getElementById('arrowProduksi');
  const parentBtn = document.getElementById('menuProduksiParent');
  if (submenu) submenu.classList.add('open');
  if (arrow) arrow.style.transform = 'rotate(180deg)';
  if (parentBtn) parentBtn.classList.add('open');

  if (subview === 'monitoring' || subview === 'single-flow') {
    switchMainTab('monitoring');
  } else if (subview === 'detail' || subview === 'produksi') {
    switchMainTab('produksi');
  } else if (subview === 'jadwal' || subview === 'multi-project') {
    switchMainTab('multi-project');
  } else if (subview === 'riwayat' || subview === 'project-pt') {
    switchMainTab('project-pt');
  }
}

// Backward-compatibility aliases
function handleMonitoringMenuClick(e) {
  toggleProduksiMenu(e);
}

function switchMonitoringSubView(subview) {
  if (subview === 'single-flow') switchProduksiSubView('monitoring');
  else if (subview === 'multi-project') switchProduksiSubView('jadwal');
  else if (subview === 'project-pt') switchProduksiSubView('riwayat');
  else switchProduksiSubView(subview);
}

// Toggle Notification Dropdown in Navbar
function toggleNotificationDropdown() {
  const dd = document.getElementById('notificationDropdown');
  if (dd) {
    dd.classList.toggle('show');
  }
}

// Close notification dropdown when clicking outside
document.addEventListener('click', (e) => {
  const btn = document.getElementById('btnNotifications');
  const dd = document.getElementById('notificationDropdown');
  if (dd && btn && !btn.contains(e.target) && !dd.contains(e.target)) {
    dd.classList.remove('show');
  }
});

// --- PROYEK (SALES ORDER) FUNCTIONS ---
function renderProyekTable(filteredList = null) {
  const tbody = document.getElementById('proyekTableBody');
  if (!tbody) return;

  const data = filteredList || erpSalesOrders;
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:30px; color:#94a3b8;">Tidak ada data Sales Order yang sesuai.</td></tr>`;
    return;
  }

  data.forEach((so, idx) => {
    const badgeClass = so.status === 'Dalam Proses' ? 'erp-badge-orange' : (so.status === 'Selesai' ? 'erp-badge-green' : 'erp-badge-gray');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align: center; color: #64748b; font-weight: 700;">${idx + 1}</td>
      <td style="font-weight: 800; color: #0f172a;">${so.soNumber}</td>
      <td style="font-weight: 600;">${so.customer}</td>
      <td style="color: #64748b;">${so.variant}</td>
      <td style="font-weight: 700; color: #334155;">${so.kva}</td>
      <td style="font-weight: 700; text-align: center;">${so.qty}</td>
      <td style="color: #64748b;">${so.orderDate}</td>
      <td style="color: #64748b;">${so.targetDate}</td>
      <td><span class="erp-badge ${badgeClass}">${so.status}</span></td>
      <td style="text-align: center;">
        <button class="btn-erp-detail" onclick="openProyekDetail('${so.soNumber}')">Detail</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update Counters
  const statProyekTotal = document.getElementById('statProyekTotal');
  const statProyekTrafo = document.getElementById('statProyekTrafo');
  if (statProyekTotal) statProyekTotal.innerText = erpSalesOrders.length;
  if (statProyekTrafo) {
    const totalUnits = erpSalesOrders.reduce((sum, so) => sum + (parseInt(so.qty) || 0), 0);
    statProyekTrafo.innerText = totalUnits;
  }
}

function filterProyekTable() {
  const statusFilter = document.getElementById('filterProyekStatus') ? document.getElementById('filterProyekStatus').value : 'all';
  const tahunFilter = document.getElementById('filterProyekTahun') ? document.getElementById('filterProyekTahun').value : 'all';
  const searchInput = (document.getElementById('filterProyekSearch') ? document.getElementById('filterProyekSearch').value : '') ||
                      (document.getElementById('proyekHeaderSearch') ? document.getElementById('proyekHeaderSearch').value : '');
  const search = searchInput.toLowerCase().trim();

  const filtered = erpSalesOrders.filter(so => {
    const matchStatus = (statusFilter === 'all') || (so.status === statusFilter);
    const matchTahun = (tahunFilter === 'all') || (so.targetDate && so.targetDate.includes(tahunFilter)) || (so.orderDate && so.orderDate.includes(tahunFilter));
    const matchSearch = !search || so.customer.toLowerCase().includes(search) || so.soNumber.toLowerCase().includes(search);
    return matchStatus && matchTahun && matchSearch;
  });

  renderProyekTable(filtered);
}

function openAddSOModal() {
  const modal = document.getElementById('modalAddSO');
  if (modal) {
    modal.classList.add('active');
    const today = new Date().toISOString().split('T')[0];
    const inpOrder = document.getElementById('inpSOOrderDate');
    const inpTarget = document.getElementById('inpSOTargetDate');
    if (inpOrder) inpOrder.value = today;
    if (inpTarget) inpTarget.value = today;
  }
}

function handleSaveNewSO(e) {
  e.preventDefault();
  const soNumber = document.getElementById('inpSONumber').value.trim();
  const customer = document.getElementById('inpSOCustomer').value.trim();
  const variant = document.getElementById('inpSOVariant').value;
  const kva = parseInt(document.getElementById('inpSOKVA').value) || 500;
  const qty = parseInt(document.getElementById('inpSOQty').value) || 1;
  const value = document.getElementById('inpSOValue').value.trim() || 'Rp 10 M';
  const orderDate = document.getElementById('inpSOOrderDate').value.split('-').reverse().join('/');
  const targetDate = document.getElementById('inpSOTargetDate').value.split('-').reverse().join('/');
  const status = document.getElementById('inpSOStatus').value;

  const newSO = {
    no: erpSalesOrders.length + 1,
    soNumber,
    customer,
    variant,
    kva,
    qty,
    orderDate,
    targetDate,
    status,
    value,
    pic: 'Administrator Produksi',
    units: []
  };

  for (let i = 1; i <= qty; i++) {
    const unitNo = `TRF-${String(erpProduksiUnits.length + i).padStart(3, '0')}`;
    newSO.units.push({
      unitNo,
      kva,
      stage: status === 'Belum Mulai' ? 'Belum Mulai' : 'Core Making',
      progress: status === 'Belum Mulai' ? 0 : 15,
      targetDate,
      status
    });

    erpProduksiUnits.push({
      no: erpProduksiUnits.length + 1,
      soNumber,
      customer,
      unitNo,
      kva,
      stage: status === 'Belum Mulai' ? 'Belum Mulai' : 'Core Making',
      progress: status === 'Belum Mulai' ? 0 : 15,
      targetDate,
      status,
      operator: 'Tim Perakitan ' + i
    });
  }

  erpSalesOrders.unshift(newSO);
  renderProyekTable();
  renderProduksiTable();
  closeModal('modalAddSO');
  showToast(`✅ Sales Order ${soNumber} berhasil ditambahkan!`);
}

function openProyekDetail(soNumber) {
  const so = erpSalesOrders.find(item => item.soNumber === soNumber);
  if (!so) return;

  const modal = document.getElementById('modalDetailSO');
  const dtlCode = document.getElementById('dtlSOCode');
  const dtlBody = document.getElementById('modalDetailSOBody');

  if (dtlCode) dtlCode.innerText = so.soNumber;
  if (dtlBody) {
    let unitsTableHtml = '';
    if (so.units && so.units.length > 0) {
      unitsTableHtml = `
        <div style="margin-top:16px;">
          <div style="font-size:13px; font-weight:800; color:#0f172a; margin-bottom:8px;">Daftar Unit Trafo (${so.units.length} Unit)</div>
          <table class="erp-table" style="font-size:11px;">
            <thead>
              <tr>
                <th>No. Unit</th>
                <th>KVA</th>
                <th>Tahap Saat Ini</th>
                <th>Progress</th>
                <th>Target Selesai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${so.units.map(u => `
                <tr>
                  <td style="font-weight:800; color:#2563eb;">${u.unitNo}</td>
                  <td>${u.kva} kVA</td>
                  <td>${u.stage}</td>
                  <td>${u.progress}%</td>
                  <td>${u.targetDate}</td>
                  <td><span class="erp-badge ${u.status === 'Dalam Proses' ? 'erp-badge-orange' : 'erp-badge-gray'}">${u.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    dtlBody.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; background:#f8fafc; padding:16px; border-radius:10px; border:1px solid #e2e8f0; font-size:12px;">
        <div><span style="color:#64748b;">No. Sales Order:</span> <strong style="color:#0f172a;">${so.soNumber}</strong></div>
        <div><span style="color:#64748b;">Nama Pelanggan:</span> <strong style="color:#0f172a;">${so.customer}</strong></div>
        <div><span style="color:#64748b;">Varian Trafo:</span> <strong>${so.variant}</strong></div>
        <div><span style="color:#64748b;">Kapasitas:</span> <strong>${so.kva} kVA</strong></div>
        <div><span style="color:#64748b;">Total Kuantitas:</span> <strong>${so.qty} Unit</strong></div>
        <div><span style="color:#64748b;">Nilai Proyek:</span> <strong style="color:#d97706;">${so.value || 'Rp 10 M'}</strong></div>
        <div><span style="color:#64748b;">Tanggal Pesan:</span> <strong>${so.orderDate}</strong></div>
        <div><span style="color:#64748b;">Target Selesai:</span> <strong>${so.targetDate}</strong></div>
        <div><span style="color:#64748b;">Status Proyek:</span> <span class="erp-badge erp-badge-orange">${so.status}</span></div>
        <div><span style="color:#64748b;">PIC Officer:</span> <strong>${so.pic || 'I Wayan Eva Verdiana'}</strong></div>
      </div>
      ${unitsTableHtml}
    `;
  }

  if (modal) modal.classList.add('active');
}

// ================= UNIFIED UNITS DATA STORE (SINGLE SOURCE OF TRUTH) =================

const defaultUnitsData = [
  {
    unitId: 'TRF-001',
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    variant: 'Distribusi',
    capacity: '500 KVA',
    voltage: '20 kV / 400 V',
    winding: 'CU - CU',
    orderDate: '01/05/2026',
    targetDate: '30/06/2026',
    pic: 'Budi Santoso',
    location: 'UP3 Jateng',
    notes: 'Prioritas suplai gardu distribusi Jawa Tengah',
    lastUpdate: '29 Sep 2026 10:30',
    electricalStages: [
      { name: 'LV (Low Voltage)', status: 'Selesai', date: '2026-06-10', pic: 'Rizky', note: 'Winding LV tembaga selesai diuji', doc: 'Drawing-LV.pdf' },
      { name: 'HV (High Voltage)', status: 'Proses', date: '2026-06-12', pic: 'Rizky', note: 'Dalam pengerjaan layer isolasi', doc: '' },
      { name: 'Susun Core', status: 'Belum Mulai', date: '2026-06-15', pic: 'Andi Pratama', note: '-', doc: '' },
      { name: 'CCA', status: 'Belum Mulai', date: '2026-06-18', pic: 'Budi Santoso', note: '-', doc: '' },
      { name: 'Connect', status: 'Belum Mulai', date: '2026-06-24', pic: 'Wahyu Hidayat', note: '-', doc: '' },
      { name: 'Final', status: 'Belum Mulai', date: '2026-06-28', pic: 'Rizky', note: '-', doc: '' },
      { name: 'QC', status: 'Belum Mulai', date: '2026-06-30', pic: 'Shevira Indraswari', note: '-', doc: '' }
    ],
    mechanicalStages: [
      { name: 'Pemotongan & Bending Plat', status: 'Selesai', date: '2026-06-08', pic: 'Dedi Kurniawan', note: 'Plat baja tebal 4mm sesuai dimensi GA', doc: '' },
      { name: 'Pengelasan Tangki & Cover', status: 'Proses', date: '2026-06-11', pic: 'Dedi Kurniawan', note: 'Welding cover dan kupingan lifting lug', doc: '' },
      { name: 'Pemasangan Fin Radiator', status: 'Belum Mulai', date: '2026-06-14', pic: 'Wahyu Hidayat', note: '-', doc: '' },
      { name: 'Uji Tekan / Kebocoran (Leak Test)', status: 'Belum Mulai', date: '2026-06-17', pic: 'Andi Pratama', note: '-', doc: '' },
      { name: 'Sandblasting & Shot Peening', status: 'Belum Mulai', date: '2026-06-21', pic: 'Dedi Kurniawan', note: '-', doc: '' },
      { name: 'Pengecatan Dasar & Finishing', status: 'Belum Mulai', date: '2026-06-25', pic: 'Wahyu Hidayat', note: '-', doc: '' },
      { name: 'Asesoris & Final Tangki', status: 'Belum Mulai', date: '2026-06-29', pic: 'Budi Santoso', note: '-', doc: '' }
    ],
    activities: [
      { time: '29 Sep 2026 10:30', icon: 'gear', color: 'blue', title: 'Proses HV & Las Tangki Berjalan', desc: 'Pengerjaan HV dan pengelasan cover berjalan bersamaan' },
      { time: '29 Sep 2026 09:15', icon: 'check', color: 'green', title: 'LV & Potong Plat Selesai', desc: 'Proses LV dan bending plat telah rampung' }
    ],
    chatNotes: [
      { time: '29 Sep 2026 10:30', text: 'Proses HV dan tangki berjalan sesuai jadwal target.', author: 'Rizky' }
    ]
  },
  {
    unitId: 'TRF-002',
    soNumber: '25-0564',
    customer: 'PT PLN Distribusi Jatim',
    variant: 'Distribusi',
    capacity: '1000 KVA',
    voltage: '20 kV / 400 V',
    winding: 'CU - CU',
    orderDate: '05/05/2026',
    targetDate: '10/07/2026',
    pic: 'Rizky',
    location: 'Surabaya, Jatim',
    notes: 'Pesanan tier-2 low loss',
    lastUpdate: '30 Sep 2026 14:00',
    electricalStages: [
      { name: 'LV (Low Voltage)', status: 'Selesai', date: '2026-06-15', pic: 'Rizky', note: 'Coil LV selesai digulung', doc: '' },
      { name: 'HV (High Voltage)', status: 'Selesai', date: '2026-06-18', pic: 'Rizky', note: 'Coil HV lulus isolasi tegangan', doc: '' },
      { name: 'Susun Core', status: 'Proses', date: '2026-06-20', pic: 'Andi Pratama', note: 'Penyusunan laminasi silikon baja CRGO', doc: '' },
      { name: 'CCA', status: 'Belum Mulai', date: '2026-06-25', pic: 'Budi Santoso', note: '-', doc: '' },
      { name: 'Connect', status: 'Belum Mulai', date: '2026-06-28', pic: 'Wahyu Hidayat', note: '-', doc: '' },
      { name: 'Final', status: 'Belum Mulai', date: '2026-07-02', pic: 'Rizky', note: '-', doc: '' },
      { name: 'QC', status: 'Belum Mulai', date: '2026-07-05', pic: 'Shevira Indraswari', note: '-', doc: '' }
    ],
    mechanicalStages: [
      { name: 'Pemotongan & Bending Plat', status: 'Selesai', date: '2026-06-12', pic: 'Dedi Kurniawan', note: 'Plat tangki selesai potong', doc: '' },
      { name: 'Pengelasan Tangki & Cover', status: 'Selesai', date: '2026-06-16', pic: 'Dedi Kurniawan', note: 'Welding bodi tangki selesai', doc: '' },
      { name: 'Pemasangan Fin Radiator', status: 'Proses', date: '2026-06-19', pic: 'Wahyu Hidayat', note: 'Pemasangan 6 panel fin radiator', doc: '' },
      { name: 'Uji Tekan / Kebocoran (Leak Test)', status: 'Belum Mulai', date: '2026-06-23', pic: 'Andi Pratama', note: '-', doc: '' },
      { name: 'Sandblasting & Shot Peening', status: 'Belum Mulai', date: '2026-06-27', pic: 'Dedi Kurniawan', note: '-', doc: '' },
      { name: 'Pengecatan Dasar & Finishing', status: 'Belum Mulai', date: '2026-07-01', pic: 'Wahyu Hidayat', note: '-', doc: '' },
      { name: 'Asesoris & Final Tangki', status: 'Belum Mulai', date: '2026-07-06', pic: 'Budi Santoso', note: '-', doc: '' }
    ],
    activities: [
      { time: '30 Sep 2026 14:00', icon: 'gear', color: 'blue', title: 'Susun Core & Fin Radiator', desc: 'Perakitan inti & fin radiator tangki berlangsung' }
    ],
    chatNotes: []
  },
  {
    unitId: 'TRF-003',
    soNumber: '25-0565',
    customer: 'PT PLN UID Jawa Barat',
    variant: 'Power',
    capacity: '1500 KVA',
    voltage: '20 kV / 6300 V',
    winding: 'CU - CU',
    orderDate: '10/05/2026',
    targetDate: '20/07/2026',
    pic: 'Andi Pratama',
    location: 'Bandung, Jabar',
    notes: 'Spesifikasi gardu induk transmisi',
    lastUpdate: '01 Okt 2026 09:00',
    electricalStages: [
      { name: 'LV (Low Voltage)', status: 'Selesai', date: '2026-06-10', pic: 'Rizky', note: 'LV OK', doc: '' },
      { name: 'HV (High Voltage)', status: 'Selesai', date: '2026-06-15', pic: 'Rizky', note: 'HV OK', doc: '' },
      { name: 'Susun Core', status: 'Selesai', date: '2026-06-20', pic: 'Andi Pratama', note: 'Core OK', doc: '' },
      { name: 'CCA', status: 'Selesai', date: '2026-06-25', pic: 'Budi Santoso', note: 'Core Coil Assembly OK', doc: '' },
      { name: 'Connect', status: 'Proses', date: '2026-06-29', pic: 'Wahyu Hidayat', note: 'Wiring tap changer & terminal lead', doc: '' },
      { name: 'Final', status: 'Belum Mulai', date: '2026-07-05', pic: 'Rizky', note: '-', doc: '' },
      { name: 'QC', status: 'Belum Mulai', date: '2026-07-10', pic: 'Shevira Indraswari', note: '-', doc: '' }
    ],
    mechanicalStages: [
      { name: 'Pemotongan & Bending Plat', status: 'Selesai', date: '2026-06-08', pic: 'Dedi Kurniawan', note: 'Plat tangki selesai potong', doc: '' },
      { name: 'Pengelasan Tangki & Cover', status: 'Selesai', date: '2026-06-14', pic: 'Dedi Kurniawan', note: 'Welding selesai', doc: '' },
      { name: 'Pemasangan Fin Radiator', status: 'Selesai', date: '2026-06-19', pic: 'Wahyu Hidayat', note: 'Fin terpasang rapi', doc: '' },
      { name: 'Uji Tekan / Kebocoran (Leak Test)', status: 'Selesai', date: '2026-06-24', pic: 'Andi Pratama', note: 'Leak test 0.5 bar PASS', doc: '' },
      { name: 'Sandblasting & Shot Peening', status: 'Proses', date: '2026-06-28', pic: 'Dedi Kurniawan', note: 'Pembersihan profil permukaan baja', doc: '' },
      { name: 'Pengecatan Dasar & Finishing', status: 'Belum Mulai', date: '2026-07-03', pic: 'Wahyu Hidayat', note: '-', doc: '' },
      { name: 'Asesoris & Final Tangki', status: 'Belum Mulai', date: '2026-07-08', pic: 'Budi Santoso', note: '-', doc: '' }
    ],
    activities: [
      { time: '01 Okt 2026 09:00', icon: 'gear', color: 'blue', title: 'Connection & Sandblasting', desc: 'Wiring tap changer dan sandblasting tangki' }
    ],
    chatNotes: []
  },
  {
    unitId: 'TRF-004',
    soNumber: '25-0566',
    customer: 'PT Pertamina Persero',
    variant: 'Distribusi',
    capacity: '250 KVA',
    voltage: '20 kV / 400 V',
    winding: 'CU - AL',
    orderDate: '15/05/2026',
    targetDate: '25/06/2026',
    pic: 'Dedi Kurniawan',
    location: 'RU IV Cilacap',
    notes: 'Kilang Pertamina Cilacap - Siap kirim',
    lastUpdate: '02 Okt 2026 11:30',
    electricalStages: [
      { name: 'LV (Low Voltage)', status: 'Selesai', date: '2026-05-25', pic: 'Rizky', note: 'Selesai 100%', doc: '' },
      { name: 'HV (High Voltage)', status: 'Selesai', date: '2026-05-28', pic: 'Rizky', note: 'Selesai 100%', doc: '' },
      { name: 'Susun Core', status: 'Selesai', date: '2026-06-02', pic: 'Andi Pratama', note: 'Selesai 100%', doc: '' },
      { name: 'CCA', status: 'Selesai', date: '2026-06-06', pic: 'Budi Santoso', note: 'Selesai 100%', doc: '' },
      { name: 'Connect', status: 'Selesai', date: '2026-06-10', pic: 'Wahyu Hidayat', note: 'Selesai 100%', doc: '' },
      { name: 'Final', status: 'Selesai', date: '2026-06-15', pic: 'Rizky', note: 'Selesai tanking & oven vacuum', doc: '' },
      { name: 'QC', status: 'Selesai', date: '2026-06-18', pic: 'Shevira Indraswari', note: 'Sertifikat QC terbit - PASS', doc: '' }
    ],
    mechanicalStages: [
      { name: 'Pemotongan & Bending Plat', status: 'Selesai', date: '2026-05-22', pic: 'Dedi Kurniawan', note: 'Selesai', doc: '' },
      { name: 'Pengelasan Tangki & Cover', status: 'Selesai', date: '2026-05-26', pic: 'Dedi Kurniawan', note: 'Selesai', doc: '' },
      { name: 'Pemasangan Fin Radiator', status: 'Selesai', date: '2026-05-30', pic: 'Wahyu Hidayat', note: 'Selesai', doc: '' },
      { name: 'Uji Tekan / Kebocoran (Leak Test)', status: 'Selesai', date: '2026-06-04', pic: 'Andi Pratama', note: 'Selesai', doc: '' },
      { name: 'Sandblasting & Shot Peening', status: 'Selesai', date: '2026-06-08', pic: 'Dedi Kurniawan', note: 'Selesai', doc: '' },
      { name: 'Pengecatan Dasar & Finishing', status: 'Selesai', date: '2026-06-12', pic: 'Wahyu Hidayat', note: 'Selesai', doc: '' },
      { name: 'Asesoris & Final Tangki', status: 'Selesai', date: '2026-06-16', pic: 'Budi Santoso', note: 'Selesai', doc: '' }
    ],
    activities: [
      { time: '18 Jun 2026 15:30', icon: 'check', color: 'green', title: 'Semua Tahapan Selesai (100%)', desc: 'Unit TRF-004 lulus QC dan siap pengiriman' }
    ],
    chatNotes: []
  },
  {
    unitId: 'TRF-005',
    soNumber: '25-0567',
    customer: 'PT Indofood CBP',
    variant: 'Power',
    capacity: '2000 KVA',
    voltage: '30 kV / 6300 V',
    winding: 'CU - CU',
    orderDate: '20/05/2026',
    targetDate: '15/08/2026',
    pic: 'Wahyu Hidayat',
    location: 'Semarang, Jateng',
    notes: 'Industri consumer goods',
    lastUpdate: '25 Sep 2026 08:00',
    electricalStages: [
      { name: 'LV (Low Voltage)', status: 'Belum Mulai', date: '2026-06-25', pic: 'Rizky', note: '-' },
      { name: 'HV (High Voltage)', status: 'Belum Mulai', date: '2026-07-02', pic: 'Rizky', note: '-' },
      { name: 'Susun Core', status: 'Belum Mulai', date: '2026-07-10', pic: 'Andi Pratama', note: '-' },
      { name: 'CCA', status: 'Belum Mulai', date: '2026-07-18', pic: 'Budi Santoso', note: '-' },
      { name: 'Connect', status: 'Belum Mulai', date: '2026-07-28', pic: 'Wahyu Hidayat', note: '-' },
      { name: 'Final', status: 'Belum Mulai', date: '2026-08-05', pic: 'Rizky', note: '-' },
      { name: 'QC', status: 'Belum Mulai', date: '2026-08-10', pic: 'Shevira Indraswari', note: '-' }
    ],
    mechanicalStages: [
      { name: 'Pemotongan & Bending Plat', status: 'Belum Mulai', date: '2026-06-20', pic: 'Dedi Kurniawan', note: '-' },
      { name: 'Pengelasan Tangki & Cover', status: 'Belum Mulai', date: '2026-06-30', pic: 'Dedi Kurniawan', note: '-' },
      { name: 'Pemasangan Fin Radiator', status: 'Belum Mulai', date: '2026-07-08', pic: 'Wahyu Hidayat', note: '-' },
      { name: 'Uji Tekan / Kebocoran (Leak Test)', status: 'Belum Mulai', date: '2026-07-16', pic: 'Andi Pratama', note: '-' },
      { name: 'Sandblasting & Shot Peening', status: 'Belum Mulai', date: '2026-07-25', pic: 'Dedi Kurniawan', note: '-' },
      { name: 'Pengecatan Dasar & Finishing', status: 'Belum Mulai', date: '2026-08-02', pic: 'Wahyu Hidayat', note: '-' },
      { name: 'Asesoris & Final Tangki', status: 'Belum Mulai', date: '2026-08-08', pic: 'Budi Santoso', note: '-' }
    ],
    activities: [
      { time: '20 Mei 2026 10:00', icon: 'file', color: 'blue', title: 'Order Diterbitkan', desc: 'Antrian produksi disiapkan' }
    ],
    chatNotes: []
  }
];

let activeDPUnitId = 'TRF-001';
let activeMonitoringUnitId = 'TRF-001';
let activeEditingCategory = 'electrical';
let activeEditingStageIndex = 0;

function getUnitsData() {
  try {
    const raw = localStorage.getItem('SYMTRAFLOW_UNITS_DATA');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(u => recomputeUnitProgress(u));
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading units data from storage:', err);
  }
  const cloned = JSON.parse(JSON.stringify(defaultUnitsData));
  cloned.forEach(u => recomputeUnitProgress(u));
  return cloned;
}

function saveUnitsData(data) {
  try {
    localStorage.setItem('SYMTRAFLOW_UNITS_DATA', JSON.stringify(data));
  } catch (err) {
    console.error('Error saving units data to storage:', err);
  }
}

// Recompute progress % and status based on 14 stages (7 Electrical + 7 Mechanical)
function recomputeUnitProgress(unit) {
  if (!unit) return unit;
  if (!unit.electricalStages) unit.electricalStages = [];
  if (!unit.mechanicalStages) unit.mechanicalStages = [];

  let totalPoints = 0;
  let activeElec = null;
  let activeMech = null;

  unit.electricalStages.forEach(s => {
    if (s.status === 'Selesai') totalPoints += 100;
    else if (s.status === 'Proses') {
      totalPoints += 50;
      if (!activeElec) activeElec = s.name.split(' ')[0];
    }
  });

  unit.mechanicalStages.forEach(s => {
    if (s.status === 'Selesai') totalPoints += 100;
    else if (s.status === 'Proses') {
      totalPoints += 50;
      if (!activeMech) activeMech = s.name.split(' ')[0];
    }
  });

  const overallPct = Math.min(100, Math.round(totalPoints / 14));
  unit.progress = overallPct;

  if (overallPct === 100) {
    unit.status = 'Selesai';
    unit.currentStageName = 'Selesai (QC & Tangki OK)';
  } else if (overallPct === 0) {
    unit.status = 'Belum Mulai';
    unit.currentStageName = 'Belum Mulai';
  } else {
    unit.status = 'Dalam Proses';
    if (activeElec && activeMech) {
      unit.currentStageName = `${activeElec} / ${activeMech}`;
    } else if (activeElec) {
      unit.currentStageName = activeElec;
    } else if (activeMech) {
      unit.currentStageName = activeMech;
    } else {
      unit.currentStageName = 'Dalam Pengerjaan';
    }
  }

  return unit;
}

// Switch Active Unit in Detail Produksi view
function switchDPActiveUnit(unitId) {
  activeDPUnitId = unitId;
  renderDetailProduksiView();
}

// Render Detail Produksi View (Populates Header, Unit Selector, Electrical & Mechanical tables)
function renderDetailProduksiView() {
  const units = getUnitsData();
  let unit = units.find(u => u.unitId === activeDPUnitId);
  if (!unit) {
    unit = units[0];
    activeDPUnitId = unit ? unit.unitId : 'TRF-001';
  }
  if (!unit) return;

  recomputeUnitProgress(unit);

  // Populate Unit Selector Dropdown
  const selector = document.getElementById('dpUnitSelector');
  if (selector) {
    selector.innerHTML = '';
    units.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.unitId;
      opt.innerText = `[${u.unitId}] ${u.soNumber} - ${u.customer} (${u.progress}%)`;
      if (u.unitId === activeDPUnitId) opt.selected = true;
      selector.appendChild(opt);
    });
  }

  // Unit Header Card Elements
  const elCode = document.getElementById('dpUnitCode');
  const elBadge = document.getElementById('dpUnitStatusBadge');
  const elSO = document.getElementById('dpMetaSO');
  const elCust = document.getElementById('dpMetaCustomer');
  const elVar = document.getElementById('dpMetaVariant');
  const elCap = document.getElementById('dpMetaCapacity');
  const elWind = document.getElementById('dpMetaWinding');
  const elOrderDate = document.getElementById('dpMetaOrderDate');
  const elTargetDate = document.getElementById('dpMetaTargetDate');
  const elPIC = document.getElementById('dpMetaPIC');
  const elLoc = document.getElementById('dpMetaLocation');
  const elNotes = document.getElementById('dpMetaNotes');

  if (elCode) elCode.innerText = unit.unitId;
  if (elSO) elSO.innerText = unit.soNumber;
  if (elCust) elCust.innerText = unit.customer;
  if (elVar) elVar.innerText = unit.variant;
  if (elCap) elCap.innerText = unit.capacity;
  if (elWind) elWind.innerText = unit.winding;
  if (elOrderDate) elOrderDate.innerText = unit.orderDate;
  if (elTargetDate) elTargetDate.innerText = unit.targetDate;
  if (elPIC) elPIC.innerText = unit.pic;
  if (elLoc) elLoc.innerText = unit.location;
  if (elNotes) elNotes.innerText = unit.notes;

  // Progress UI
  const elPct = document.getElementById('dpProgressPercent');
  const elBar = document.getElementById('dpProgressFill');
  const elCurrentStage = document.getElementById('dpCurrentStageName');
  const elLastUpdate = document.getElementById('dpLastUpdatedTime');

  if (elPct) elPct.innerText = unit.progress + '%';
  if (elBar) elBar.style.width = unit.progress + '%';
  if (elCurrentStage) elCurrentStage.innerText = unit.currentStageName || 'Dalam Proses';
  if (elLastUpdate) elLastUpdate.innerText = unit.lastUpdate || 'Baru Saja';

  // Unit status badge
  if (elBadge) {
    if (unit.progress === 100) {
      elBadge.innerText = 'Selesai';
      elBadge.className = 'dp-badge-status selesai';
      elBadge.style.background = '#dcfce7';
      elBadge.style.color = '#15803d';
    } else if (unit.progress > 0) {
      elBadge.innerText = 'Dalam Proses';
      elBadge.className = 'dp-badge-status';
      elBadge.style.background = '#eff6ff';
      elBadge.style.color = '#2563eb';
    } else {
      elBadge.innerText = 'Belum Mulai';
      elBadge.className = 'dp-badge-status';
      elBadge.style.background = '#f1f5f9';
      elBadge.style.color = '#64748b';
    }
  }

  // 1. Render Progres Electrical Table Rows
  const elecBody = document.getElementById('dpElectricalTableBody');
  if (elecBody) {
    elecBody.innerHTML = '';
    (unit.electricalStages || []).forEach((stg, idx) => {
      let badgeHtml = '';
      if (stg.status === 'Selesai') {
        badgeHtml = `<span class="dp-badge selesai"><i class="fa-solid fa-check"></i> Selesai</span>`;
      } else if (stg.status === 'Proses') {
        badgeHtml = `<span class="dp-badge proses"><i class="fa-solid fa-circle" style="font-size:7px;"></i> Proses</span>`;
      } else {
        badgeHtml = `<span class="dp-badge belum"><i class="fa-solid fa-circle" style="font-size:7px;"></i> Belum Mulai</span>`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="color:#64748b; font-weight:600; text-align:center;">${idx + 1}</td>
        <td style="font-weight:600; color:#0f172a;">${stg.name}</td>
        <td>${badgeHtml}</td>
        <td style="color:#64748b;">${stg.note && stg.note !== '-' ? stg.note : '-'}</td>
        <td style="text-align: center;">
          <button class="dp-btn-lihat" onclick="openUpdateProgressModal(${idx}, 'electrical')">Lihat</button>
        </td>
      `;
      elecBody.appendChild(tr);
    });
  }

  // 2. Render Progres Mechanical Table Rows (Pembuatan Tangki Trafo)
  const mechBody = document.getElementById('dpMechanicalTableBody');
  if (mechBody) {
    mechBody.innerHTML = '';
    (unit.mechanicalStages || []).forEach((stg, idx) => {
      let badgeHtml = '';
      if (stg.status === 'Selesai') {
        badgeHtml = `<span class="dp-badge selesai"><i class="fa-solid fa-check"></i> Selesai</span>`;
      } else if (stg.status === 'Proses') {
        badgeHtml = `<span class="dp-badge proses"><i class="fa-solid fa-circle" style="font-size:7px;"></i> Proses</span>`;
      } else {
        badgeHtml = `<span class="dp-badge belum"><i class="fa-solid fa-circle" style="font-size:7px;"></i> Belum Mulai</span>`;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="color:#64748b; font-weight:600; text-align:center;">${idx + 1}</td>
        <td style="font-weight:600; color:#0f172a;">${stg.name}</td>
        <td>${badgeHtml}</td>
        <td style="color:#64748b;">${stg.note && stg.note !== '-' ? stg.note : '-'}</td>
        <td style="text-align: center;">
          <button class="dp-btn-lihat" onclick="openUpdateProgressModal(${idx}, 'mechanical')">Lihat</button>
        </td>
      `;
      mechBody.appendChild(tr);
    });
  }

  // Badges overall
  const elecBadge = document.getElementById('dpElectricalOverallBadge');
  const mechBadge = document.getElementById('dpMechanicalOverallBadge');
  if (elecBadge) {
    const elecDone = unit.electricalStages.filter(s => s.status === 'Selesai').length;
    elecBadge.innerText = `${elecDone}/7 Selesai`;
    elecBadge.className = elecDone === 7 ? 'dp-badge selesai' : (elecDone > 0 ? 'dp-badge proses' : 'dp-badge belum');
  }
  if (mechBadge) {
    const mechDone = unit.mechanicalStages.filter(s => s.status === 'Selesai').length;
    mechBadge.innerText = `${mechDone}/7 Selesai`;
    mechBadge.className = mechDone === 7 ? 'dp-badge selesai' : (mechDone > 0 ? 'dp-badge proses' : 'dp-badge belum');
  }

  // Render Notes list for quick note
  const notesEl = document.getElementById('dpNotesList');
  if (notesEl) {
    notesEl.innerHTML = '';
    (unit.chatNotes || []).forEach(n => {
      const noteItem = document.createElement('div');
      noteItem.className = 'dp-note-item';
      noteItem.innerHTML = `
        <div class="dp-note-dot"></div>
        <div class="dp-note-text">
          <span style="color:#64748b; font-size:11px; margin-right:6px;">${n.time}</span>
          ${n.text}
        </div>
        <div class="dp-note-author">${n.author || 'Admin'}</div>
      `;
      notesEl.appendChild(noteItem);
    });
  }

  // Render full notes list for tab Catatan
  const fullNotesEl = document.getElementById('dpFullNotesList');
  if (fullNotesEl) {
    fullNotesEl.innerHTML = '';
    (unit.chatNotes || []).forEach(n => {
      const noteItem = document.createElement('div');
      noteItem.className = 'dp-note-item';
      noteItem.innerHTML = `
        <div class="dp-note-dot"></div>
        <div class="dp-note-text">
          <div style="color:#64748b; font-size:11px; margin-bottom:2px;">${n.time} • <b>${n.author || 'Admin'}</b></div>
          <div>${n.text}</div>
        </div>
      `;
      fullNotesEl.appendChild(noteItem);
    });
  }

  // Render audit trail in Riwayat tab
  const auditEl = document.getElementById('dpAuditTrailTimeline');
  if (auditEl) {
    auditEl.innerHTML = '';
    (unit.activities || []).forEach(act => {
      const item = document.createElement('div');
      item.className = 'dp-timeline-item';
      const iconClass = act.icon === 'check' ? 'fa-solid fa-check' : (act.icon === 'gear' ? 'fa-solid fa-gear' : (act.icon === 'file' ? 'fa-solid fa-file-lines' : 'fa-solid fa-play'));
      item.innerHTML = `
        <div class="dp-timeline-time">${act.time}</div>
        <div class="dp-timeline-icon ${act.color || 'blue'}">
          <i class="${iconClass}"></i>
        </div>
        <div class="dp-timeline-body">
          <div class="dp-timeline-title">${act.title}</div>
          <div class="dp-timeline-desc">${act.desc}</div>
        </div>
      `;
      auditEl.appendChild(item);
    });
  }
}

// Switch Detail Produksi Tabs
function switchDPTab(tabKey) {
  const tabs = ['progress', 'detail-unit', 'material', 'dokumen', 'riwayat', 'catatan'];
  tabs.forEach(t => {
    const btn = document.getElementById(`dpTab${t.charAt(0).toUpperCase() + t.slice(1).replace('-', '')}`);
    if (btn) btn.classList.remove('active');
  });

  const tabContentMap = {
    'progress': 'dpContentProgress',
    'detail-unit': 'dpContentDetailUnit',
    'material': 'dpContentMaterial',
    'dokumen': 'dpContentDokumen',
    'riwayat': 'dpContentRiwayat',
    'catatan': 'dpContentCatatan'
  };

  const activeBtnMap = {
    'progress': 'dpTabProgress',
    'detail-unit': 'dpTabDetailUnit',
    'material': 'dpTabMaterial',
    'dokumen': 'dpTabDokumen',
    'riwayat': 'dpTabRiwayat',
    'catatan': 'dpTabCatatan'
  };

  Object.values(tabContentMap).forEach(cId => {
    const el = document.getElementById(cId);
    if (el) el.style.display = 'none';
  });

  const targetContent = document.getElementById(tabContentMap[tabKey]);
  if (targetContent) {
    targetContent.style.display = (tabKey === 'progress') ? 'grid' : 'block';
  }

  const targetBtn = document.getElementById(activeBtnMap[tabKey]);
  if (targetBtn) targetBtn.classList.add('active');
}

// Modal Handlers for Update Progress Produksi (Supports both Electrical and Mechanical)
function openUpdateProgressModal(stageIndex, category = 'electrical') {
  const units = getUnitsData();
  const unit = units.find(u => u.unitId === activeDPUnitId) || units[0];
  if (!unit) return;

  const stageList = category === 'electrical' ? unit.electricalStages : unit.mechanicalStages;
  const stage = stageList[stageIndex];
  if (!stage) return;

  activeEditingStageIndex = stageIndex;
  activeEditingCategory = category;

  const mUnit = document.getElementById('mUpdateUnitCode');
  const mCategory = document.getElementById('mUpdateCategoryName');
  const mStage = document.getElementById('mUpdateStageName');
  const mBadge = document.getElementById('mUpdateCurrentStatusBadge');
  const mInputStatus = document.getElementById('mInputStatus');
  const mInputDate = document.getElementById('mInputDate');
  const mInputPIC = document.getElementById('mInputPIC');
  const mInputNote = document.getElementById('mInputNote');

  if (mUnit) mUnit.innerText = unit.unitId;
  if (mCategory) {
    mCategory.innerText = category === 'electrical' ? 'Progres Electrical' : 'Progres Mechanical (Tangki)';
    mCategory.style.color = category === 'electrical' ? '#2563eb' : '#d97706';
  }
  if (mStage) mStage.innerText = stage.name;
  if (mBadge) {
    mBadge.innerText = (stage.status === 'Selesai' ? '✓ ' : '● ') + stage.status;
    mBadge.className = `dp-badge ${stage.status === 'Selesai' ? 'selesai' : (stage.status === 'Proses' ? 'proses' : 'belum')}`;
  }

  if (mInputStatus) mInputStatus.value = stage.status;
  if (mInputDate) mInputDate.value = stage.date || new Date().toISOString().split('T')[0];
  if (mInputPIC) mInputPIC.value = stage.pic || 'Rizky';
  if (mInputNote) mInputNote.value = (stage.note && stage.note !== '-') ? stage.note : '';

  updateNoteCharCount();

  const modal = document.getElementById('updateProgressModal');
  if (modal) modal.style.display = 'flex';
}

function closeUpdateProgressModal() {
  const modal = document.getElementById('updateProgressModal');
  if (modal) modal.style.display = 'none';
}

function handleModalStatusSelectChange() {
  const sel = document.getElementById('mInputStatus');
  const mBadge = document.getElementById('mUpdateCurrentStatusBadge');
  if (sel && mBadge) {
    const val = sel.value;
    mBadge.innerText = (val === 'Selesai' ? '✓ ' : '● ') + val;
    mBadge.className = `dp-badge ${val === 'Selesai' ? 'selesai' : (val === 'Proses' ? 'proses' : 'belum')}`;
  }
}

function updateNoteCharCount() {
  const input = document.getElementById('mInputNote');
  const count = document.getElementById('mNoteCharCount');
  if (input && count) {
    count.innerText = input.value.length;
  }
}

// Save Progress from Modal (Saves to unified store, recalculates, and syncs both views!)
function handleSaveStageProgress(e) {
  if (e) e.preventDefault();
  const units = getUnitsData();
  const unit = units.find(u => u.unitId === activeDPUnitId);
  if (!unit) return;

  const stageList = activeEditingCategory === 'electrical' ? unit.electricalStages : unit.mechanicalStages;
  const stage = stageList[activeEditingStageIndex];
  if (!stage) return;

  const status = document.getElementById('mInputStatus').value;
  const date = document.getElementById('mInputDate').value;
  const pic = document.getElementById('mInputPIC').value;
  const note = document.getElementById('mInputNote').value.trim();
  const fileInput = document.getElementById('mInputFile');

  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const formattedTime = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  stage.status = status;
  stage.date = date;
  stage.pic = pic;
  stage.note = note || '-';

  if (fileInput && fileInput.files && fileInput.files[0]) {
    stage.doc = fileInput.files[0].name;
  }

  // Prepend activity log
  if (!unit.activities) unit.activities = [];
  unit.activities.unshift({
    time: formattedTime,
    icon: (status === 'Selesai' ? 'check' : (status === 'Proses' ? 'gear' : 'play')),
    color: (status === 'Selesai' ? 'green' : 'blue'),
    title: `[${activeEditingCategory === 'electrical' ? 'Electrical' : 'Mechanical'}] ${stage.name} → ${status}`,
    desc: note ? note : `Status diperbarui oleh ${pic}`
  });

  // If note provided, append to chat notes
  if (note && note !== '-') {
    if (!unit.chatNotes) unit.chatNotes = [];
    unit.chatNotes.unshift({
      time: formattedTime,
      text: `[${stage.name}] ${note}`,
      author: pic
    });
  }

  unit.lastUpdate = formattedTime;
  recomputeUnitProgress(unit);

  // Save to unified local storage
  saveUnitsData(units);

  closeUpdateProgressModal();

  // Re-render Detail Produksi & Monitoring Produksi
  renderDetailProduksiView();
  renderOrdersTable();
  updateMonitoringKPICards();

  showToast(`✅ Progress ${stage.name} (${activeEditingCategory}) berhasil diperbarui!`);
}

function saveNewProductionNote(isFull = false) {
  const inputId = isFull ? 'dpFullNoteInput' : 'dpQuickNoteInput';
  const input = document.getElementById(inputId);
  if (!input || !input.value.trim()) {
    showToast('⚠️ Silakan tulis catatan terlebih dahulu');
    return;
  }

  const text = input.value.trim();
  const units = getUnitsData();
  const unit = units.find(u => u.unitId === activeDPUnitId);
  if (!unit) return;

  const now = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  const formattedTime = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const authUser = JSON.parse(sessionStorage.getItem('SYMTRAFLOW_AUTH_USER') || '{}');
  const author = authUser.name || 'Administrator';

  if (!unit.chatNotes) unit.chatNotes = [];
  unit.chatNotes.unshift({
    time: formattedTime,
    text: text,
    author: author
  });

  if (!unit.activities) unit.activities = [];
  unit.activities.unshift({
    time: formattedTime,
    icon: 'file',
    color: 'blue',
    title: 'Catatan Ditambahkan',
    desc: `${author}: ${text}`
  });

  saveUnitsData(units);
  input.value = '';
  renderDetailProduksiView();

  showToast('📝 Catatan berhasil disimpan!');
}

function handleDPSearch(e) {
  const val = (e.target.value || '').toLowerCase();
  const rows = document.querySelectorAll('#dpElectricalTableBody tr, #dpMechanicalTableBody tr');
  rows.forEach(r => {
    const txt = r.innerText.toLowerCase();
    r.style.display = txt.includes(val) ? '' : 'none';
  });
}

// ================= MONITORING PRODUKSI READ-ONLY MODAL & DETAIL NAVIGATION =================

// Open Full Detail Modal in Monitoring Produksi (Read-Only: Electrical & Mechanical)
function openFullDetailModal(unitId) {
  const targetId = unitId || activeMonitoringUnitId || 'TRF-001';
  const units = getUnitsData();
  const unit = units.find(u => u.unitId === targetId) || units[0];
  if (!unit) return;

  recomputeUnitProgress(unit);

  const modal = document.getElementById('fullDetailModal');
  if (!modal) return;

  // Header info
  const codeEl = document.getElementById('modalDetailOrderCode');
  const soEl = document.getElementById('mReadonlySOCode');
  const badgeEl = document.getElementById('modalDetailBadge');
  const nameEl = document.getElementById('modalDetailTrafoName');
  const specsEl = document.getElementById('mReadonlySpecsMeta');
  const pctEl = document.getElementById('mReadonlyProgressPct');
  const barEl = document.getElementById('mReadonlyProgressBar');
  const orderDateEl = document.getElementById('mReadonlyOrderDate');
  const targetDateEl = document.getElementById('mReadonlyTargetDate');
  const picEl = document.getElementById('mReadonlyPIC');
  const locEl = document.getElementById('mReadonlyLocation');

  if (codeEl) codeEl.innerText = unit.unitId;
  if (soEl) soEl.innerText = `SO: ${unit.soNumber}`;
  if (nameEl) nameEl.innerText = unit.customer;
  if (specsEl) specsEl.innerText = `${unit.capacity} • ${unit.voltage} • ${unit.variant} (${unit.winding})`;
  if (pctEl) pctEl.innerText = `${unit.progress}%`;
  if (barEl) barEl.style.width = `${unit.progress}%`;
  if (orderDateEl) orderDateEl.innerText = unit.orderDate;
  if (targetDateEl) targetDateEl.innerText = unit.targetDate;
  if (picEl) picEl.innerText = unit.pic;
  if (locEl) locEl.innerText = unit.location;

  if (badgeEl) {
    if (unit.progress === 100) {
      badgeEl.innerText = '✓ Selesai';
      badgeEl.className = 'dp-badge selesai';
    } else if (unit.progress > 0) {
      badgeEl.innerText = '● Proses';
      badgeEl.className = 'dp-badge proses';
    } else {
      badgeEl.innerText = '● Belum Mulai';
      badgeEl.className = 'dp-badge belum';
    }
  }

  // Populate Read-Only Electrical Body
  const elecBody = document.getElementById('mReadonlyElectricalBody');
  if (elecBody) {
    elecBody.innerHTML = '';
    (unit.electricalStages || []).forEach((stg, i) => {
      let badgeHtml = '';
      if (stg.status === 'Selesai') badgeHtml = `<span class="dp-badge selesai">✓ Selesai</span>`;
      else if (stg.status === 'Proses') badgeHtml = `<span class="dp-badge proses">● Proses</span>`;
      else badgeHtml = `<span class="dp-badge belum">● Belum Mulai</span>`;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:center; color:#64748b; font-weight:600;">${i + 1}</td>
        <td style="font-weight:700; color:#0f172a;">${stg.name}</td>
        <td>${badgeHtml}</td>
        <td style="color:#64748b; font-size:11px;">${stg.date || '-'}</td>
        <td style="font-weight:600; color:#334155;">${stg.pic || '-'}</td>
        <td style="color:#64748b; font-size:11px;">${stg.note && stg.note !== '-' ? stg.note : '-'}</td>
      `;
      elecBody.appendChild(tr);
    });
  }

  // Populate Read-Only Mechanical Body (Pembuatan Tangki)
  const mechBody = document.getElementById('mReadonlyMechanicalBody');
  if (mechBody) {
    mechBody.innerHTML = '';
    (unit.mechanicalStages || []).forEach((stg, i) => {
      let badgeHtml = '';
      if (stg.status === 'Selesai') badgeHtml = `<span class="dp-badge selesai">✓ Selesai</span>`;
      else if (stg.status === 'Proses') badgeHtml = `<span class="dp-badge proses">● Proses</span>`;
      else badgeHtml = `<span class="dp-badge belum">● Belum Mulai</span>`;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align:center; color:#64748b; font-weight:600;">${i + 1}</td>
        <td style="font-weight:700; color:#0f172a;">${stg.name}</td>
        <td>${badgeHtml}</td>
        <td style="color:#64748b; font-size:11px;">${stg.date || '-'}</td>
        <td style="font-weight:600; color:#334155;">${stg.pic || '-'}</td>
        <td style="color:#64748b; font-size:11px;">${stg.note && stg.note !== '-' ? stg.note : '-'}</td>
      `;
      mechBody.appendChild(tr);
    });
  }

  modal.classList.add('active');
}

// Jump from Monitoring Read-Only modal to Detail Produksi (where changes can be managed)
function goToDetailProduksiFromModal(unitId) {
  closeModal('fullDetailModal');
  const targetId = unitId || activeMonitoringUnitId || 'TRF-001';
  activeDPUnitId = targetId;
  switchMainTab('produksi');
  switchDPTab('progress');
  renderDetailProduksiView();
  showToast(`📋 Membuka Detail Produksi untuk unit ${targetId}...`);
}

// --- PRODUKSI FUNCTIONS ---
function renderProduksiTable(filteredList = null) {
  const tbody = document.getElementById('produksiTableBody');
  if (!tbody) return;

  const data = filteredList || erpProduksiUnits;
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:30px; color:#94a3b8;">Tidak ada unit produksi yang sesuai filter.</td></tr>`;
    return;
  }

  data.forEach((item, idx) => {
    const badgeClass = item.status === 'Dalam Proses' ? 'erp-badge-orange' : (item.status === 'Selesai' ? 'erp-badge-green' : 'erp-badge-gray');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align:center; color:#64748b; font-weight:700;">${idx + 1}</td>
      <td style="font-weight:700; color:#334155;">${item.soNumber}</td>
      <td style="font-weight:600;">${item.customer}</td>
      <td style="font-weight:800; color:#2563eb;">${item.unitNo}</td>
      <td style="font-weight:700;">${item.kva}</td>
      <td><span style="background:#f1f5f9; padding:3px 8px; border-radius:5px; font-weight:600; font-size:11px;">${item.stage}</span></td>
      <td>
        <div class="erp-progress-wrapper">
          <div class="erp-progress-track">
            <div class="erp-progress-fill" style="width: ${item.progress}%;"></div>
          </div>
          <span class="erp-progress-pct">${item.progress}%</span>
        </div>
      </td>
      <td style="color:#64748b;">${item.targetDate}</td>
      <td><span class="erp-badge ${badgeClass}">${item.status}</span></td>
      <td style="text-align: center;">
        <button class="btn-erp-detail" onclick="openProduksiDetail('${item.unitNo}')">Detail</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update Counters
  const statTotal = document.getElementById('statProduksiTotal');
  const statSelesai = document.getElementById('statProduksiSelesai');
  const statProses = document.getElementById('statProduksiProses');
  const statBelum = document.getElementById('statProduksiBelum');

  if (statTotal) statTotal.innerText = erpProduksiUnits.length;
  if (statSelesai) statSelesai.innerText = erpProduksiUnits.filter(u => u.status === 'Selesai').length;
  if (statProses) statProses.innerText = erpProduksiUnits.filter(u => u.status === 'Dalam Proses').length;
  if (statBelum) statBelum.innerText = erpProduksiUnits.filter(u => u.status === 'Belum Mulai').length;
}

function filterProduksiTable() {
  const proyekFilter = document.getElementById('filterProduksiProyek') ? document.getElementById('filterProduksiProyek').value : 'all';
  const tahapFilter = document.getElementById('filterProduksiTahap') ? document.getElementById('filterProduksiTahap').value : 'all';
  const statusFilter = document.getElementById('filterProduksiStatus') ? document.getElementById('filterProduksiStatus').value : 'all';
  const searchInput = (document.getElementById('produksiHeaderSearch') ? document.getElementById('produksiHeaderSearch').value : '').toLowerCase().trim();

  const filtered = erpProduksiUnits.filter(u => {
    const matchPrj = (proyekFilter === 'all') || (u.customer === proyekFilter);
    const matchTahap = (tahapFilter === 'all') || (u.stage === tahapFilter);
    const matchStatus = (statusFilter === 'all') || (u.status === statusFilter);
    const matchSearch = !searchInput || u.unitNo.toLowerCase().includes(searchInput) || u.soNumber.toLowerCase().includes(searchInput) || u.customer.toLowerCase().includes(searchInput);
    return matchPrj && matchTahap && matchStatus && matchSearch;
  });

  renderProduksiTable(filtered);
}

function openProduksiDetail(unitNo) {
  const unit = erpProduksiUnits.find(u => u.unitNo === unitNo);
  if (!unit) return;

  const modal = document.getElementById('modalDetailProduksi');
  const dtlUnit = document.getElementById('dtlProduksiUnit');
  const dtlBody = document.getElementById('modalDetailProduksiBody');

  if (dtlUnit) dtlUnit.innerText = unit.unitNo;
  if (dtlBody) {
    dtlBody.innerHTML = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; font-size:12px; display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:16px;">
        <div><span style="color:#64748b;">Nomor Unit:</span> <strong style="color:#2563eb; font-size:13px;">${unit.unitNo}</strong></div>
        <div><span style="color:#64748b;">No. Sales Order:</span> <strong>${unit.soNumber}</strong></div>
        <div><span style="color:#64748b;">Nama Pelanggan:</span> <strong>${unit.customer}</strong></div>
        <div><span style="color:#64748b;">Kapasitas:</span> <strong>${unit.kva} kVA</strong></div>
        <div><span style="color:#64748b;">Tahap Saat Ini:</span> <strong style="color:#d97706;">${unit.stage}</strong></div>
        <div><span style="color:#64748b;">Status Produksi:</span> <span class="erp-badge erp-badge-orange">${unit.status}</span></div>
        <div><span style="color:#64748b;">Target Selesai:</span> <strong>${unit.targetDate}</strong></div>
        <div><span style="color:#64748b;">Operator Penanggung Jawab:</span> <strong>${unit.operator || 'Budi Santoso'}</strong></div>
      </div>

      <div style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:12px; font-weight:700;">
          <span>Progress Produksi</span>
          <span style="color:#2563eb;">${unit.progress}%</span>
        </div>
        <div class="erp-progress-track" style="height:10px;">
          <div class="erp-progress-fill" style="width:${unit.progress}%;"></div>
        </div>
      </div>

      <div style="border-top:1px solid #e2e8f0; padding-top:14px; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:12px; color:#64748b;">Tingkatkan progres unit ini:</span>
        <button class="btn-erp-primary" onclick="updateUnitProgressStep('${unit.unitNo}')">
          <i class="fa-solid fa-arrow-up"></i> Majukan Tahap (+20%)
        </button>
      </div>
    `;
  }

  if (modal) modal.classList.add('active');
}

function updateUnitProgressStep(unitNo) {
  const unit = erpProduksiUnits.find(u => u.unitNo === unitNo);
  if (!unit) return;

  unit.progress = Math.min(100, unit.progress + 20);
  if (unit.progress >= 100) {
    unit.status = 'Selesai';
    unit.stage = 'Selesai FAT';
  } else if (unit.progress >= 70) {
    unit.stage = 'Assembly';
  } else if (unit.progress >= 50) {
    unit.stage = 'HV';
  }

  renderProduksiTable();
  openProduksiDetail(unitNo);
  showToast(`📈 Progress ${unitNo} kini ${unit.progress}%!`);
}

// --- PENGIRIMAN FUNCTIONS ---
function renderPengirimanTable(filteredList = null) {
  const tbody = document.getElementById('pengirimanTableBody');
  if (!tbody) return;

  const data = filteredList || erpShipments;
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:#94a3b8;">Tidak ada data pengiriman yang sesuai filter.</td></tr>`;
    return;
  }

  data.forEach((item, idx) => {
    let badgeClass = 'erp-badge-blue';
    if (item.status === 'Siap Kirim') badgeClass = 'erp-badge-green';
    if (item.status === 'Selesai') badgeClass = 'erp-badge-green';

    const tr = document.createElement('tr');
    tr.style.cursor = 'pointer';
    tr.onclick = () => selectShipmentForTracking(idx);
    tr.innerHTML = `
      <td style="text-align:center; color:#64748b; font-weight:700;">${idx + 1}</td>
      <td style="font-weight:700; color:#334155;">${item.soNumber}</td>
      <td style="font-weight:600;">${item.customer}</td>
      <td style="font-weight:800; color:#2563eb;">${item.unitNo}</td>
      <td style="font-weight:700;">${item.kva}</td>
      <td style="color:#64748b;">${item.finishDate}</td>
      <td style="color:#64748b;">${item.shipDate}</td>
      <td><span class="erp-badge ${badgeClass}">${item.status}</span></td>
      <td style="text-align:center;">
        <button class="btn-erp-detail" onclick="event.stopPropagation(); openPengirimanDetail('${item.unitNo}')">Detail</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Counters
  const statKirimSiap = document.getElementById('statKirimSiap');
  const statKirimProses = document.getElementById('statKirimProses');
  const statKirimSelesai = document.getElementById('statKirimSelesai');
  if (statKirimSiap) statKirimSiap.innerText = erpShipments.filter(s => s.status === 'Siap Kirim').length;
  if (statKirimProses) statKirimProses.innerText = erpShipments.filter(s => s.status === 'Dalam Pengiriman').length;
  if (statKirimSelesai) statKirimSelesai.innerText = erpShipments.filter(s => s.status === 'Selesai').length;
}

function filterPengirimanTable() {
  const statusFilter = document.getElementById('filterPengirimanStatus') ? document.getElementById('filterPengirimanStatus').value : 'all';
  const tahunFilter = document.getElementById('filterPengirimanTahun') ? document.getElementById('filterPengirimanTahun').value : 'all';
  const searchInput = (document.getElementById('filterPengirimanSearch') ? document.getElementById('filterPengirimanSearch').value : '') ||
                      (document.getElementById('pengirimanHeaderSearch') ? document.getElementById('pengirimanHeaderSearch').value : '');
  const search = searchInput.toLowerCase().trim();

  const filtered = erpShipments.filter(item => {
    const matchStatus = (statusFilter === 'all') || (item.status === statusFilter);
    const matchTahun = (tahunFilter === 'all') || (item.shipDate && item.shipDate.includes(tahunFilter));
    const matchSearch = !search || item.customer.toLowerCase().includes(search) || item.unitNo.toLowerCase().includes(search) || item.soNumber.toLowerCase().includes(search);
    return matchStatus && matchTahun && matchSearch;
  });

  renderPengirimanTable(filtered);
}

function selectShipmentForTracking(idx) {
  if (!erpShipments[idx]) return;
  activeTrackingShipmentIndex = idx;
  updateTrackingStepperUI();
}

function updateTrackingStepperUI() {
  const item = erpShipments[activeTrackingShipmentIndex];
  if (!item) return;

  const label = document.getElementById('activeTrackingUnitLabel');
  if (label) label.innerText = `Unit: ${item.unitNo} (${item.customer})`;

  const stepDate1 = document.getElementById('stepDate1');
  const stepDate2 = document.getElementById('stepDate2');
  const stepDate3 = document.getElementById('stepDate3');
  const stepDate4 = document.getElementById('stepDate4');

  if (item.steps) {
    if (stepDate1 && item.steps[0]) stepDate1.innerText = item.steps[0].date;
    if (stepDate2 && item.steps[1]) stepDate2.innerText = item.steps[1].date;
    if (stepDate3 && item.steps[2]) stepDate3.innerText = item.steps[2].date;
    if (stepDate4 && item.steps[3]) stepDate4.innerText = item.steps[3].date;
  }

  const stepItems = document.querySelectorAll('#pengirimanStepperContainer .erp-stepper-item');
  const activeStep = item.stepActive || 2;

  stepItems.forEach((el, i) => {
    const stepNum = i + 1;
    el.classList.remove('completed', 'active');
    if (stepNum < activeStep) {
      el.classList.add('completed');
    } else if (stepNum === activeStep) {
      el.classList.add('active');
    }
  });

  const progressLine = document.getElementById('stepperLineProgress');
  if (progressLine) {
    const pct = ((activeStep - 1) / 3) * 100;
    progressLine.style.width = `${pct}%`;
  }
}

function setTrackingActiveStep(stepNum) {
  const item = erpShipments[activeTrackingShipmentIndex];
  if (!item) return;

  item.stepActive = stepNum;
  if (stepNum === 1) item.status = 'Siap Kirim';
  else if (stepNum === 2 || stepNum === 3) item.status = 'Dalam Pengiriman';
  else if (stepNum === 4) item.status = 'Selesai';

  updateTrackingStepperUI();
  renderPengirimanTable();
  showToast(`📍 Status pengiriman ${item.unitNo} diperbarui ke Step ${stepNum}!`);
}

function openPengirimanDetail(unitNo) {
  const ship = erpShipments.find(s => s.unitNo === unitNo);
  if (!ship) return;

  const modal = document.getElementById('modalDetailPengiriman');
  const dtlUnit = document.getElementById('dtlKirimUnit');
  const dtlBody = document.getElementById('modalDetailPengirimanBody');

  if (dtlUnit) dtlUnit.innerText = ship.unitNo;
  if (dtlBody) {
    dtlBody.innerHTML = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:16px; font-size:12px; display:grid; grid-template-columns:repeat(2, 1fr); gap:12px; margin-bottom:16px;">
        <div><span style="color:#64748b;">Nomor Unit:</span> <strong style="color:#2563eb; font-size:13px;">${ship.unitNo}</strong></div>
        <div><span style="color:#64748b;">No. Sales Order:</span> <strong>${ship.soNumber}</strong></div>
        <div><span style="color:#64748b;">Pelanggan Penerima:</span> <strong>${ship.customer}</strong></div>
        <div><span style="color:#64748b;">Kapasitas Trafo:</span> <strong>${ship.kva} kVA</strong></div>
        <div><span style="color:#64748b;">Tanggal Selesai:</span> <strong>${ship.finishDate}</strong></div>
        <div><span style="color:#64748b;">Tanggal Kirim:</span> <strong>${ship.shipDate}</strong></div>
        <div><span style="color:#64748b;">Driver & Armada:</span> <strong style="color:#0f172a;">${ship.driver || 'Tim Ekspedisi'}</strong></div>
        <div><span style="color:#64748b;">Status Logistik:</span> <span class="erp-badge erp-badge-blue">${ship.status}</span></div>
        <div style="grid-column: span 2;"><span style="color:#64748b;">Alamat Tujuan:</span> <strong>${ship.dest || 'Gardu Induk PLN Jawa'}</strong></div>
      </div>

      <div style="font-size:12px; font-weight:700; margin-bottom:10px; color:#0f172a;">Ubah Status Tracking Cepat:</div>
      <div style="display:flex; gap:8px; flex-wrap:wrap;">
        <button class="btn-secondary" onclick="setTrackingActiveStep(1); closeModal('modalDetailPengiriman');">1. Siap Kirim</button>
        <button class="btn-secondary" onclick="setTrackingActiveStep(2); closeModal('modalDetailPengiriman');">2. Dalam Pengiriman</button>
        <button class="btn-secondary" onclick="setTrackingActiveStep(3); closeModal('modalDetailPengiriman');">3. Tiba di Lokasi</button>
        <button class="btn-primary" onclick="setTrackingActiveStep(4); closeModal('modalDetailPengiriman');">4. Selesai Terkirim</button>
      </div>
    `;
  }

  if (modal) modal.classList.add('active');
}

// --- MASTER DATA FUNCTIONS ---
const erpMasterDataStore = {
  pelanggan: [
    { code: 'CUST-01', name: 'PT PLN UP3 Jateng', sector: 'BUMN Distribusi Listrik', city: 'Semarang', contact: 'Ir. Hendra (024-8412345)', orders: '10 Unit' },
    { code: 'CUST-02', name: 'PT PLN Nusa Daya', sector: 'BUMN Pembangkitan', city: 'Mataram', contact: 'Ibu Ratna (0370-621980)', orders: '5 Unit' },
    { code: 'CUST-03', name: 'PT PLN Jawa Tengah', sector: 'Transmisi & Gardu Induk', city: 'Kudus', contact: 'Bpk. Tri Wahyudi (0274-512990)', orders: '2 Unit' },
    { code: 'CUST-04', name: 'PT Pertamina Persero', sector: 'Oil & Gas Refinery', city: 'Cilacap', contact: 'Dimas Anggara (021-3815111)', orders: '4 Unit' },
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
    { step: 1, name: 'Tank Making', dept: 'Fabrikasi', desc: 'Pemotongan, pembentukan plat, pengelasan & uji kebocoran tangki trafo', cycle: '3 Hari' },
    { step: 2, name: 'Core Making', dept: 'Core Stacking', desc: 'Pemotongan & penyusunan plat silikon baja CRGO dengan presisi tinggi', cycle: '2 Hari' },
    { step: 3, name: 'Coil Making (LV & HV)', dept: 'Winding', desc: 'Penggulungan kawat tembaga enamel lapis isolasi paper/nomex', cycle: '4 Hari' },
    { step: 4, name: 'Assembly', dept: 'Perakitan', desc: 'Pemasangan kumparan ke inti besi & insulasi fasa', cycle: '2 Hari' },
    { step: 5, name: 'Connection', dept: 'Wiring & Tap', desc: 'Penyambungan tap changer, terminal lead, dan bushing', cycle: '1 Hari' },
    { step: 6, name: 'Final Assembly', dept: 'Oven & Tanking', desc: 'Pengeringan ruang vakum dan pemasangan trafo ke dalam tangki', cycle: '2 Hari' },
    { step: 7, name: 'Internal Test', dept: 'Testing Lab', desc: 'Pengujian rasio tegangan, polaritas, dan tahanan isolasi Megger', cycle: '1 Hari' },
    { step: 8, name: 'Finishing', dept: 'Painting', desc: 'Sandblasting, pelapisan primer epoxy, dan pengecatan polyurethane', cycle: '2 Hari' },
    { step: 9, name: 'FAT (Factory Acceptance Test)', dept: 'Quality Control', desc: 'Pengujian saksi langsung bersama pihak pelanggan/PLN', cycle: '1 Hari' },
    { step: 10, name: 'Packaging & Delivery', dept: 'Logistik', desc: 'Pengisian oli trafo, sealing, pemasangan proteksi pengiriman', cycle: '1 Hari' }
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

function openMasterModal(type) {
  if (type === 'pengaturan') {
    switchView('pengaturan');
    return;
  }

  const modal = document.getElementById('modalMasterData');
  const title = document.getElementById('masterModalTitle');
  const body = document.getElementById('masterModalBody');
  if (!modal || !title || !body) return;

  const titles = {
    pelanggan: '<i class="fa-solid fa-users" style="color:#2563eb;"></i> Data Pelanggan / Perusahaan',
    trafo: '<i class="fa-solid fa-bolt-lightning" style="color:#2563eb;"></i> Data Trafo & Varian',
    proses: '<i class="fa-solid fa-gear" style="color:#2563eb;"></i> Data Tahapan Proses Produksi',
    material: '<i class="fa-solid fa-cubes-stacked" style="color:#2563eb;"></i> Data Material Utama & Pendukung',
    pic: '<i class="fa-solid fa-user-tie" style="color:#2563eb;"></i> Data PIC & Pengguna Sistem'
  };

  title.innerHTML = titles[type] || 'Data Master';

  if (type === 'pelanggan') {
    const list = erpMasterDataStore.pelanggan;
    body.innerHTML = `
      <table class="erp-master-modal-table">
        <thead>
          <tr>
            <th>Kode</th>
            <th>Nama Customer</th>
            <th>Sektor</th>
            <th>Kota</th>
            <th>Kontak Person</th>
            <th>Order Aktif</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(p => `
            <tr>
              <td><strong style="color:#2563eb;">${p.code}</strong></td>
              <td><strong>${p.name}</strong></td>
              <td>${p.sector}</td>
              <td>${p.city}</td>
              <td>${p.contact}</td>
              <td><span class="erp-badge erp-badge-blue">${p.orders}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (type === 'trafo') {
    const list = erpMasterDataStore.trafo;
    body.innerHTML = `
      <table class="erp-master-modal-table">
        <thead>
          <tr>
            <th>Model Code</th>
            <th>Tipe Trafo</th>
            <th>Kapasitas</th>
            <th>Tegangan</th>
            <th>Pendingin</th>
            <th>Standar</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(t => `
            <tr>
              <td><strong style="color:#2563eb;">${t.model}</strong></td>
              <td><strong>${t.type}</strong></td>
              <td><span class="erp-badge erp-badge-orange">${t.cap}</span></td>
              <td>${t.volt}</td>
              <td>${t.cooling}</td>
              <td>${t.standard}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (type === 'proses') {
    const list = erpMasterDataStore.proses;
    body.innerHTML = `
      <table class="erp-master-modal-table">
        <thead>
          <tr>
            <th>Tahap</th>
            <th>Nama Proses</th>
            <th>Departemen</th>
            <th>Keterangan Aktivitas</th>
            <th>Standar Waktu</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(p => `
            <tr>
              <td style="text-align:center;"><strong style="background:#2563eb; color:#ffffff; padding:2px 8px; border-radius:50%; font-size:11px;">${p.step}</strong></td>
              <td><strong>${p.name}</strong></td>
              <td>${p.dept}</td>
              <td style="color:#64748b;">${p.desc}</td>
              <td><span class="erp-badge erp-badge-gray">${p.cycle}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (type === 'material') {
    const list = erpMasterDataStore.material;
    body.innerHTML = `
      <table class="erp-master-modal-table">
        <thead>
          <tr>
            <th>Kode Material</th>
            <th>Nama Bahan Baku</th>
            <th>Spesifikasi</th>
            <th>Stok Gudang</th>
            <th>Satuan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(m => `
            <tr>
              <td><strong style="color:#2563eb;">${m.code}</strong></td>
              <td><strong>${m.name}</strong></td>
              <td>${m.spec}</td>
              <td><strong>${m.stock}</strong></td>
              <td>${m.uom}</td>
              <td><span class="erp-badge erp-badge-green">${m.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } else if (type === 'pic') {
    const list = erpMasterDataStore.pic;
    body.innerHTML = `
      <table class="erp-master-modal-table">
        <thead>
          <tr>
            <th>ID User</th>
            <th>Nama Lengkap</th>
            <th>Jabatan / Role</th>
            <th>Departemen</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${list.map(u => `
            <tr>
              <td><strong style="color:#2563eb;">${u.id}</strong></td>
              <td><strong>${u.name}</strong></td>
              <td>${u.role}</td>
              <td>${u.dept}</td>
              <td><span class="erp-badge erp-badge-green">${u.status}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  modal.classList.add('active');
}

function filterMasterDataCards() {
  const input = document.getElementById('masterDataSearch');
  if (!input) return;
  const q = input.value.toLowerCase().trim();
  const cards = document.querySelectorAll('#masterDataGrid .erp-master-card');

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
  });
}

// Auto-initialize ERP tables on DOM load
document.addEventListener('DOMContentLoaded', () => {
  // Session authentication check: MUST log in with username & password first!
  const authUser = JSON.parse(sessionStorage.getItem('SYMTRAFLOW_AUTH_USER') || 'null');
  const loginScreen = document.getElementById('loginScreen');

  if (authUser) {
    if (loginScreen) loginScreen.classList.add('hidden');
    const navName = document.querySelector('.user-nav-name');
    const navRole = document.querySelector('.user-nav-role');
    if (navName) {
      navName.innerHTML = `${authUser.name} <i class="fa-solid fa-chevron-down" style="font-size: 10px; color: #64748b;"></i>`;
    }
    if (navRole) navRole.innerText = authUser.role;

    const navAvatar = document.getElementById('navUserAvatar');
    const navAvatarIcon = document.getElementById('navUserAvatarIcon');
    if (navAvatar && authUser.avatar) {
      navAvatar.src = authUser.avatar;
      navAvatar.style.display = 'block';
      if (navAvatarIcon) navAvatarIcon.style.display = 'none';
    }
  } else {
    // Show login screen overlay by default
    if (loginScreen) loginScreen.classList.remove('hidden');
    const u = document.getElementById('loginUsername');
    const p = document.getElementById('loginPassword');
    if (u) u.value = '';
    if (p) p.value = '';
  }

  renderProyekTable();
  renderProduksiTable();
  renderDetailProduksiView();
  renderPengirimanTable();
  updateTrackingStepperUI();
  renderDocumentsTable();
});

/* ==========================================================================
   DOCUMENT CONTROL MODULE LOGIC & DATA
   ========================================================================== */

let erpDocuments = [
  {
    id: 'DOC-2026-001',
    format: 'DWG',
    title: 'General Arrangement (GA) Drawing Trafo 500 kVA Step-Down',
    desc: 'Gambar teknis dimensi luar, posisi bushing HV/LV, conservator tank, dan lubang pondasi.',
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    category: 'Gambar Teknik',
    categoryKey: 'drawing',
    revision: 'Rev 2',
    author: 'Eng. Dimas Prasetya',
    size: '12.4 MB',
    date: '28 Sep 2026',
    status: 'Approved',
    statusClass: 'erp-badge-green'
  },
  {
    id: 'DOC-2026-002',
    format: 'PDF',
    title: 'Factory Acceptance Test (FAT) Routine Test Certificate',
    desc: 'Sertifikat pengujian komprehensif: rasio tegangan, rugi-rugi tembaga/besi, dan polaritas kumparan.',
    soNumber: '25-0563',
    customer: 'PT PLN UP3 Jateng',
    category: 'FAT & Uji Lab',
    categoryKey: 'fat',
    revision: 'Rev 0',
    author: 'QC Lead - Hendra Kurniawan',
    size: '4.8 MB',
    date: '30 Sep 2026',
    status: 'Verified',
    statusClass: 'erp-badge-blue'
  },
  {
    id: 'DOC-2026-003',
    format: 'DWG',
    title: 'Core & Coil Assembly Detail Drawing 1000 kVA',
    desc: 'Skema penumpukan laminasi silikon CRGO dan isolasi winding kertas Kraft densitas tinggi.',
    soNumber: '25-0564',
    customer: 'PT PLN Distribusi Jatim',
    category: 'Gambar Teknik',
    categoryKey: 'drawing',
    revision: 'Rev 1',
    author: 'Eng. Rian Sugianto',
    size: '18.1 MB',
    date: '25 Sep 2026',
    status: 'Approved',
    statusClass: 'erp-badge-green'
  },
  {
    id: 'DOC-2026-004',
    format: 'XLS',
    title: 'Dielectric Breakdown Voltage (BDV) Oil Test Report',
    desc: 'Hasil uji tegangan tembus minyak Shell DialaS 60 kV/2.5mm dan analisa kadar kelembaban (Karl Fischer).',
    soNumber: '25-0564',
    customer: 'PT PLN Distribusi Jatim',
    category: 'FAT & Uji Lab',
    categoryKey: 'fat',
    revision: 'Rev 0',
    author: 'Lab Analyst - Maya Safitri',
    size: '1.2 MB',
    date: '29 Sep 2026',
    status: 'Approved',
    statusClass: 'erp-badge-green'
  },
  {
    id: 'DOC-2026-005',
    format: 'PDF',
    title: 'Marshalling Box Wiring & Alarm Schematic 1500 kVA',
    desc: 'Diagram pengkabelan sensor suhu winding (WTI), oil temperature (OTI), dan relay Buchholz.',
    soNumber: '25-0565',
    customer: 'PT PLN UID Jawa Barat',
    category: 'Gambar Teknik',
    categoryKey: 'drawing',
    revision: 'Rev 0',
    author: 'Elec. Eng - Fajar Hidayat',
    size: '6.5 MB',
    date: '27 Sep 2026',
    status: 'Under Review',
    statusClass: 'erp-badge-orange'
  },
  {
    id: 'DOC-2026-006',
    format: 'DOC',
    title: 'Manual Pengoperasian, Pemeliharaan & Katalog Suku Cadang Trafo',
    desc: 'Petunjuk teknis O&M operasional berkala, jadwal filtrasi minyak trafo, dan penggantian silikagel.',
    soNumber: 'UMUM / STANDARD',
    customer: 'Symphos Electric Technical',
    category: 'Manual Book',
    categoryKey: 'manual',
    revision: 'Rev 3',
    author: 'QA Dept Symphos',
    size: '8.9 MB',
    date: '15 Sep 2026',
    status: 'Approved',
    statusClass: 'erp-badge-green'
  },
  {
    id: 'DOC-2026-007',
    format: 'PDF',
    title: 'Berita Acara Serah Terima (BAST) & Surat Jalan Ekspedisi',
    desc: 'Dokumen legal serah terima pengiriman trafo 250 kVA ke site PT Indofood CBP Sukses Makmur.',
    soNumber: '25-0566',
    customer: 'PT Indofood CBP',
    category: 'Kontrak & BAST',
    categoryKey: 'legal',
    revision: 'Rev 0',
    author: 'Logistics - Budi Santoso',
    size: '2.4 MB',
    date: '22 Sep 2026',
    status: 'Approved',
    statusClass: 'erp-badge-green'
  },
  {
    id: 'DOC-2026-008',
    format: 'PDF',
    title: 'Temperature Rise & Impulse Withstand Test Certificate',
    desc: 'Laporan pengujian kenaikan suhu kontinu dan uji impuls petir 125 kV BIL standar IEC 60076.',
    soNumber: '25-0565',
    customer: 'PT PLN UID Jawa Barat',
    category: 'FAT & Uji Lab',
    categoryKey: 'fat',
    revision: 'Rev 1',
    author: 'Chief Testing - Ir. Suryanto',
    size: '5.2 MB',
    date: '24 Sep 2026',
    status: 'Under Review',
    statusClass: 'erp-badge-orange'
  }
];

let activeDocFilterCategory = 'all';

function renderDocumentsTable(filteredList = null) {
  const tbody = document.getElementById('documentControlTableBody');
  if (!tbody) return;

  const data = filteredList || erpDocuments;
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:35px; color:#94a3b8;">Tidak ada berkas dokumen yang sesuai dengan pencarian.</td></tr>`;
    return;
  }

  data.forEach(doc => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #f1f5f9';

    const fmtLower = doc.format.toLowerCase();
    const badgeFmt = `<span class="doc-file-tag ${fmtLower}"><i class="fa-solid fa-file"></i> ${doc.format}</span>`;
    
    tr.innerHTML = `
      <td style="padding: 14px 16px;">${badgeFmt}</td>
      <td style="padding: 14px 16px;">
        <div style="font-weight: 700; color: #0f172a; font-size: 13px; margin-bottom: 2px;">${doc.title}</div>
        <div style="font-size: 11px; color: #64748b; max-width: 420px; line-height: 1.4;">${doc.desc}</div>
      </td>
      <td style="padding: 14px 16px;">
        <strong style="color: #2563eb;">${doc.soNumber}</strong>
        <div style="font-size: 10px; color: #94a3b8;">${doc.customer}</div>
      </td>
      <td style="padding: 14px 16px; font-size: 12px; color: #475569;">
        ${doc.category}
      </td>
      <td style="padding: 14px 16px; text-align: center;">
        <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 4px;">${doc.revision}</span>
      </td>
      <td style="padding: 14px 16px; font-size: 11px; color: #64748b;">
        <div>${doc.date}</div>
        <div style="font-size: 10px; color: #94a3b8;">${doc.size} · ${doc.author}</div>
      </td>
      <td style="padding: 14px 16px; text-align: center;">
        <span class="erp-badge ${doc.statusClass}">${doc.status}</span>
      </td>
      <td style="padding: 14px 16px; text-align: center;">
        <div style="display: flex; gap: 6px; justify-content: center;">
          <button class="btn-action-icon" title="Pratinjau Dokumen" onclick="openPreviewDocModal('${doc.id}')" style="background:#eff6ff; color:#2563eb; width:28px; height:28px; border-radius:6px; border:none; cursor:pointer;">
            <i class="fa-regular fa-eye"></i>
          </button>
          <button class="btn-action-icon" title="Unduh Berkas" onclick="simulateDocDownload('${doc.id}')" style="background:#f5f3ff; color:#7c3aed; width:28px; height:28px; border-radius:6px; border:none; cursor:pointer;">
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Update KPI counters
  updateDocKpiStats();
}

function updateDocKpiStats() {
  const totalEl = document.getElementById('docKpiTotal');
  const cadEl = document.getElementById('docKpiCAD');
  const fatEl = document.getElementById('docKpiFAT');
  const reviewEl = document.getElementById('docKpiReview');

  if (totalEl) totalEl.innerText = erpDocuments.length;
  if (cadEl) cadEl.innerText = erpDocuments.filter(d => d.categoryKey === 'drawing').length;
  if (fatEl) fatEl.innerText = erpDocuments.filter(d => d.categoryKey === 'fat').length;
  if (reviewEl) reviewEl.innerText = erpDocuments.filter(d => d.status === 'Under Review').length;
}

function filterDocsCategory(catKey, btnEl) {
  activeDocFilterCategory = catKey;
  document.querySelectorAll('.doc-filter-pills .doc-pill-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const q = (document.getElementById('docSearchInput')?.value || '').toLowerCase().trim();
  applyDocFilters(catKey, q);
}

function filterDocsTable() {
  const q = (document.getElementById('docSearchInput')?.value || '').toLowerCase().trim();
  applyDocFilters(activeDocFilterCategory, q);
}

function applyDocFilters(catKey, q) {
  let filtered = erpDocuments;
  if (catKey !== 'all') {
    filtered = filtered.filter(d => d.categoryKey === catKey);
  }
  if (q) {
    filtered = filtered.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q) ||
      d.soNumber.toLowerCase().includes(q) ||
      d.format.toLowerCase().includes(q) ||
      d.author.toLowerCase().includes(q)
    );
  }
  renderDocumentsTable(filtered);
}

function openUploadDocModal() {
  const modal = document.getElementById('uploadDocModal');
  if (modal) modal.classList.add('active');
}

function handleDocFileSelection(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const lbl = document.getElementById('docFileLabelText');
    if (lbl) {
      lbl.innerText = `📄 ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
      lbl.style.color = '#7c3aed';
    }
  }
}

function handleDocUpload(e) {
  e.preventDefault();
  const title = document.getElementById('docUploadTitle').value.trim();
  const soNumber = document.getElementById('docUploadSO').value;
  const category = document.getElementById('docUploadCategory').value;
  const format = document.getElementById('docUploadFormat').value;
  const revision = document.getElementById('docUploadRev').value.trim() || 'Rev 0';
  const notes = document.getElementById('docUploadNotes').value.trim();

  const catKeyMap = {
    'Gambar Teknik': 'drawing',
    'FAT & Uji Lab': 'fat',
    'Manual Book': 'manual',
    'Kontrak & BAST': 'legal'
  };

  const newDoc = {
    id: `DOC-2026-${String(erpDocuments.length + 1).padStart(3, '0')}`,
    format: format,
    title: title,
    desc: notes || `Dokumen resmi proyek untuk ${soNumber} kategori ${category}.`,
    soNumber: soNumber,
    customer: 'PT PLN (Persero)',
    category: category,
    categoryKey: catKeyMap[category] || 'drawing',
    revision: revision,
    author: 'Administrator Produksi',
    size: '3.6 MB',
    date: 'Hari ini',
    status: 'Approved',
    statusClass: 'erp-badge-green'
  };

  erpDocuments.unshift(newDoc);
  renderDocumentsTable();
  closeModal('uploadDocModal');
  showToast(`✅ Dokumen "${title}" berhasil diunggah ke Document Control!`);
  e.target.reset();
}

let activePreviewDoc = null;

function openPreviewDocModal(docId) {
  const doc = erpDocuments.find(d => d.id === docId);
  if (!doc) return;
  activePreviewDoc = doc;

  const modal = document.getElementById('previewDocModal');
  const titleEl = document.getElementById('previewDocModalTitle');
  const body = document.getElementById('previewDocModalBody');
  if (!modal || !body) return;

  if (titleEl) {
    titleEl.innerHTML = `<i class="fa-solid fa-file-contract" style="color: #7c3aed;"></i> Pratinjau: ${doc.title}`;
  }

  body.innerHTML = `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="font-size:11px; color:#64748b; text-transform:uppercase; font-weight:700;">PROYEK & PELANGGAN</div>
        <div style="font-size:15px; font-weight:800; color:#0f172a;">${doc.soNumber} · ${doc.customer}</div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <span class="doc-file-tag ${doc.format.toLowerCase()}">${doc.format}</span>
        <span style="background:#f1f5f9; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; color:#334155;">${doc.revision}</span>
        <span class="erp-badge ${doc.statusClass}">${doc.status}</span>
      </div>
    </div>

    <!-- Simulated Document Sheet Preview -->
    <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:24px; box-shadow:0 4px 14px rgba(0,0,0,0.06); min-height:300px; position:relative;">
      <!-- Watermark / Stamp -->
      <div style="position:absolute; top:20px; right:20px; border:3px solid #10b981; border-radius:8px; padding:6px 14px; color:#10b981; font-weight:900; font-size:13px; transform:rotate(-8deg); letter-spacing:1px; text-transform:uppercase;">
        ✓ VERIFIED & APPROVED<br><span style="font-size:9px; font-weight:600;">SYMPHOS QUALITY CONTROL</span>
      </div>

      <div style="display:flex; align-items:center; gap:10px; border-bottom:2px solid #0f172a; padding-bottom:14px; margin-bottom:18px;">
        <div style="width:34px; height:34px; background:#f97316; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:16px;">
          <i class="fa-solid fa-bolt"></i>
        </div>
        <div>
          <div style="font-weight:800; font-size:14px; color:#0f172a; line-height:1.2;">PT SYMPHOS ELECTRIC INDONESIA</div>
          <div style="font-size:10px; color:#64748b; letter-spacing:0.5px;">POWER & DISTRIBUTION TRANSFORMER MANUFACTURER</div>
        </div>
      </div>

      <h3 style="font-size:16px; font-weight:800; color:#0f172a; margin-bottom:6px;">${doc.title}</h3>
      <p style="font-size:12px; color:#475569; line-height:1.5; margin-bottom:16px;">${doc.desc}</p>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:16px; font-size:11px; display:grid; grid-template-columns:repeat(2, 1fr); gap:8px;">
        <div>• Nomor Dokumen: <b>${doc.id}</b></div>
        <div>• Nomor SO / Kontrak: <b>${doc.soNumber}</b></div>
        <div>• Departemen: <b>${doc.category}</b></div>
        <div>• Revisi: <b>${doc.revision}</b></div>
        <div>• Tanggal Terbit: <b>${doc.date}</b></div>
        <div>• Disetujui Oleh: <b>${doc.author}</b></div>
      </div>

      <div style="border-top:1px dashed #cbd5e1; padding-top:14px; display:flex; justify-content:space-between; align-items:flex-end;">
        <div style="font-size:10px; color:#94a3b8;">
          Digital Signature Hash: <code>${Math.random().toString(36).substring(2, 15).toUpperCase()}</code><br>
          ISO 9001:2015 Quality Management System Compliant
        </div>
        <div style="text-align:right;">
          <div style="font-size:10px; color:#64748b;">Chief Engineering Approval</div>
          <div style="font-weight:800; font-size:12px; color:#0f172a; margin-top:2px;">Ir. Bambang Triwahyudi</div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function simulateDocDownload(docId = null) {
  const doc = docId ? erpDocuments.find(d => d.id === docId) : activePreviewDoc;
  const filename = doc ? `${doc.title}.${doc.format.toLowerCase()}` : 'Dokumen_Proyek.pdf';
  showToast(`📥 Mengunduh "${filename}" (${doc ? doc.size : 'File'})...`);
}

function printDocPreview() {
  window.print();
}

function exportDocumentsList() {
  const csvRows = [
    ['ID', 'Format', 'Judul Dokumen', 'No SO', 'Kategori', 'Revisi', 'Ukuran', 'Tanggal', 'Status']
  ];
  erpDocuments.forEach(d => {
    csvRows.push([`"${d.id}"`, `"${d.format}"`, `"${d.title}"`, `"${d.soNumber}"`, `"${d.category}"`, `"${d.revision}"`, `"${d.size}"`, `"${d.date}"`, `"${d.status}"`]);
  });
  const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'Rekap_Document_Control_Symphos_Electric.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📊 Berhasil mengekspor daftar Document Control ke CSV!');
}

function triggerQuickReportDownload(type) {
  const names = {
    'harian': 'Laporan_Harian_Produksi_Trafo.pdf',
    'bulanan': 'Laporan_Bulanan_Fabrikasi_Trafo.xlsx',
    'fat': 'Rekapitulasi_FAT_Test_PLN.pdf'
  };
  const fileName = names[type] || 'Laporan_Produksi.pdf';
  showToast(`📄 Mempersiapkan unduhan "${fileName}"...`);
  setTimeout(() => {
    showToast(`✅ Berhasil mengunduh "${fileName}"!`);
  }, 1000);
}


import React, { useState, useEffect, useRef } from 'react';
import { 
  ConfigProvider, 
  Button, 
  Tabs, 
  Form, 
  Input, 
  Select, 
  Modal, 
  DatePicker, 
  Row, 
  Col, 
  Card, 
  Badge, 
  Tag, 
  Collapse, 
  Progress,
  message, 
  notification 
} from 'antd';
import { 
  FileTextOutlined, 
  InfoCircleOutlined, 
  WhatsAppOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  DownloadOutlined, 
  AuditOutlined, 
  CheckCircleOutlined, 
  EnvironmentOutlined,
  CalendarOutlined,
  DashboardOutlined,
  SafetyOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  CheckOutlined
} from '@ant-design/icons';
import { 
  ShieldCheck, 
  Cpu, 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  ArrowUpRight, 
  Check as CheckIcon, 
  Disc, 
  Droplets, 
  Pill, 
  RefreshCw, 
  Truck, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

import logoImg from '../public_html/assets/images/PPPLOGO.webp';
import banner3Img from '../public_html/assets/images/Banner3.webp';
import machine1Img from '../public_html/assets/images/machine1.webp';
import advanceImg from '../public_html/assets/images/advance.webp';
import storgesImg from '../public_html/assets/images/storges.webp';
import whiteBlackJarsImg from '../public_html/assets/images/white_black_jars.png';
import amberJarsImg from '../public_html/assets/images/amber_jars.png';
import bhutaniTubesImg from '../public_html/assets/images/bhutani_tubes.png';

const mockProducts = [
  { id: 1, title: 'Securipack Tamper-Evident Closures', category: 'caps', material: 'PP (Polypropylene)', sizes: '28mm, 33mm, 38mm', features: 'Push-turn mechanism, tamper-evident security band', color: 'from-amber-100/60 to-yellow-50/60', icon: Disc, dmf: 'PP-DMF #034471', weight: '3.2g', barrier: 'Oxygen: High | Moisture: Medium' },
  { id: 2, title: 'Pharma Grade PET Amber Bottles', category: 'liquid', material: 'PET (Polyethylene Terephthalate)', sizes: '30ml - 250ml', features: 'High UV barrier protection, pharmaceutical grade raw material', color: 'from-blue-100/50 to-amber-50/50', icon: Droplets, image: amberJarsImg, dmf: 'PET-DMF #028914', weight: '14.5g (for 100ml)', barrier: 'Oxygen: Ultra-High | Moisture: Excellent' },
  { id: 3, title: 'HDPE Wide-Mouth Container Jars', category: 'jars', material: 'HDPE (High Density Polyethylene)', sizes: '30cc - 500cc', features: 'Optimal moisture vapor barrier, airtight threaded neck', color: 'from-amber-100/50 to-orange-50/50', icon: Pill, image: whiteBlackJarsImg, dmf: 'HDPE-DMF #015948', weight: '19.8g (for 120cc)', barrier: 'Oxygen: Medium | Moisture: Outstanding' },
  { id: 4, title: 'Effervescent Tablet Tubes', category: 'tubes', material: 'PP Tube with Desiccant Cap', sizes: '10 - 20 tablet capacity', features: 'Desiccant silica gel stopper, shock-absorbing spiral spring', color: 'from-red-100/40 to-amber-50/40', icon: RefreshCw, image: bhutaniTubesImg, dmf: 'TUBE-DMF #045233', weight: '8.4g', barrier: 'Oxygen: High | Moisture: Critical Shield (<10% RH)' },
  { id: 5, title: 'Child-Resistant CRC Caps', category: 'caps', material: 'Double-Wall PP (Outer/Inner)', sizes: '22mm, 28mm, 33mm', features: 'Strict child safety lock compliance, smooth squeeze-and-turn mechanics', color: 'from-amber-100/50 to-yellow-50/50', icon: Disc, dmf: 'CRC-DMF #039218', weight: '4.8g', barrier: 'Oxygen: High | Moisture: High' },
  { id: 6, title: 'LDPE Squeeze Dropper Bottles', category: 'liquid', material: 'LDPE (Low Density Polyethylene)', sizes: '5ml - 50ml', features: 'Ultra-controlled dispensing droplet tip, soft squeezable body', color: 'from-blue-100/40 to-amber-50/40', icon: Droplets, dmf: 'LDPE-DMF #011409', weight: '5.2g (for 15ml)', barrier: 'Oxygen: Medium | Moisture: Good' },
];

const categoryLabels = { all: 'All Products', caps: 'Caps & Closures', liquid: 'Liquid Bottles', jars: 'Tablet Jars', tubes: 'Effervescent Tubes' };

const compatibilityData = {
  tablet: { resin: 'HDPE Virgin Granules', safety: 'USP Class VI, Heavy Metal Free', status: '100% COMPATIBLE', barrier: 'Outstanding Moisture Shield (MVTR < 0.05g/100 sq.in/day)', dmf: 'Active DMF #015948' },
  liquid: { resin: 'PET Amber UV-Block Resins', safety: 'EP 3.1.15 Light transmission compliant', status: '100% COMPATIBLE', barrier: 'Superior UV barrier protection (<10% transmission at 290-450nm)', dmf: 'Active DMF #028914' },
  sterile: { resin: 'LDPE Medical Grade (Autoclavable)', safety: 'ISO 10993 Bio-compatibility approved', status: '100% COMPATIBLE', barrier: 'Flexible squeeze profile with low leachables & extractables profile', dmf: 'Active DMF #011409' },
  effervescent: { resin: 'PP Tube + Active Silica Gel Stopper', safety: 'FDA 21 CFR 177.1520 compliance', status: '100% COMPATIBLE', barrier: 'RH maintained < 10% continuously inside airtight cavity', dmf: 'Active DMF #045233' }
};

export default function App() {
  const canvasRef = useRef(null);
  const [activeTab, setActiveTab] = useState('polymer');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [intendedFilling, setIntendedFilling] = useState('tablet');
  const [isCalculating, setIsCalculating] = useState(false);
  const [rfqForm] = Form.useForm();
  const [auditForm] = Form.useForm();

  // Canvas particles — golden & crimson on dark hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const resizeCanvas = () => { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const particles = [];
    const colors = ['rgba(212, 168, 67, ', 'rgba(172, 48, 36, '];
    for (let i = 0; i < 45; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.3 + 0.15, vy: (Math.random() - 0.5) * 0.3, radius: Math.random() * 2 + 1, colorPrefix: colors[Math.floor(Math.random() * colors.length)], opacity: Math.random() * 0.3 + 0.1 });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(212, 168, 67, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = `${p.colorPrefix}${p.opacity})`; ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animationFrameId); window.removeEventListener('resize', resizeCanvas); };
  }, []);

  const handleDownloadDeck = () => {
    setIsDownloadOpen(true); setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setTimeout(() => { setIsDownloadOpen(false); notification.success({ message: 'Plant Capacity Deck Downloaded', description: 'The technical specifications and cleanroom layouts (PDF) have been saved.', placement: 'topRight', icon: <CheckCircleOutlined style={{ color: '#D4A843' }} /> }); }, 600); return 100; }
        return prev + 10;
      });
    }, 180);
  };

  const onRfqSubmit = (values) => {
    Modal.success({ title: 'B2B RFQ Submitted Successfully', content: (
      <div className="space-y-2 mt-2 text-xs md:text-sm text-neutral-600 animate-fade-in-up">
        <p>Thank you, <b>{values.companyName}</b>. Our lead procurement engineer will analyze your request for <b>{values.volume} units</b> of <b>{values.polymer}</b> and respond within 4 working hours.</p>
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-50 to-red-50 rounded-lg border border-amber-200">
          <span className="text-[10px] text-[#AC3024] font-bold uppercase tracking-wider block">Priority Line Assigned</span>
          <span className="text-xs text-neutral-700">Ticket ID: PPPL-RFQ-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
        </div>
      </div>
    ), okText: 'Return to Hub', className: 'dark-modal-confirm' });
    rfqForm.resetFields();
  };

  const onAuditSubmit = (values) => {
    setIsAuditModalOpen(false);
    Modal.success({ title: 'Audit Schedule Registered', content: (
      <div className="space-y-2 mt-2 text-xs md:text-sm text-neutral-600 animate-fade-in-up">
        <p>Your cleanroom audit request has been logged.</p>
        <p><b>Audit Agency:</b> {values.agencyName}</p>
        <p><b>Representative:</b> {values.auditorName}</p>
        <p><b>Preferred Date:</b> {values.auditDate.format('YYYY-MM-DD')}</p>
      </div>
    ), okText: 'Acknowledge', className: 'dark-modal-confirm' });
    auditForm.resetFields();
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || product.material.toLowerCase().includes(searchQuery.toLowerCase()) || product.sizes.toLowerCase().includes(searchQuery.toLowerCase()) || product.features.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
  const handleIntendedFillingChange = (value) => { setIsCalculating(true); setTimeout(() => { setIntendedFilling(value); setIsCalculating(false); }, 450); };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#D4A843', colorBgContainer: '#FFFFFF', colorText: '#1A1D20', colorTextDescription: '#6C757D', fontFamily: 'Montserrat, Inter, system-ui, -apple-system, sans-serif', borderRadius: 6 },
        components: {
          Button: { colorPrimaryHover: '#C09A3A', fontWeight: 700, borderRadius: 6 },
          Input: { colorBgContainer: '#FAFAF7', colorBorder: '#E8E0D4', colorText: '#1A1D20', colorTextPlaceholder: '#ADB5BD', borderRadius: 6 },
          Select: { colorBgContainer: '#FAFAF7', colorBorder: '#E8E0D4', colorText: '#1A1D20', borderRadius: 6 },
          Form: { labelColor: '#1A1D20' },
          Tabs: { itemColor: '#6C757D', itemHoverColor: '#D4A843', itemSelectedColor: '#D4A843', inkBarColor: '#D4A843' },
          Collapse: { colorBgHeader: 'transparent', colorTextHeading: '#1A1D20' }
        },
      }}
    >
      <div className="min-h-screen bg-white text-neutral-900 antialiased font-sans flex flex-col justify-between selection:bg-amber-200 selection:text-neutral-900">
        
        {/* ===== HEADER ===== */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-100/80 px-4 md:px-8 py-3 transition-all duration-300 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img src={logoImg} alt="Parth Plasto Pack" className="h-7 md:h-8 object-contain" />
              <div className="hidden sm:block h-5 w-[1px] bg-amber-200"></div>
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-red-50 px-2.5 py-1 rounded-md border border-amber-200/60 hover-scale-102">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] uppercase font-bold text-neutral-600 tracking-wider">Mfg. Plant: Ahmedabad</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8 text-neutral-500">
              <span onClick={() => scrollToSection('b2b-catalog')} className="cursor-pointer text-xs md:text-sm font-semibold tracking-wider uppercase hover:text-[#D4A843] transition-colors duration-250 hover-underline-custom">B2B Catalog</span>
              <span onClick={() => scrollToSection('capabilities')} className="cursor-pointer text-xs md:text-sm font-semibold tracking-wider uppercase hover:text-[#D4A843] transition-colors duration-250 hover-underline-custom">Infrastructure</span>
              <span onClick={() => scrollToSection('spec-matrix')} className="cursor-pointer text-xs md:text-sm font-semibold tracking-wider uppercase hover:text-[#D4A843] transition-colors duration-250 hover-underline-custom">Materials</span>
              <span onClick={() => scrollToSection('rfq-center')} className="cursor-pointer text-xs md:text-sm font-semibold tracking-wider uppercase hover:text-[#D4A843] transition-colors duration-250 hover-underline-custom">Request Quote</span>
            </nav>

            <Button type="primary" onClick={() => setIsAuditModalOpen(true)} className="animate-pulse-glow h-9 md:h-10 px-4 text-xs md:text-sm font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 hover:scale-105 transition-transform">
              <AuditOutlined /><span>Request Factory Audit</span>
            </Button>
          </div>
        </header>

        {/* ===== HERO (Keeps dark dramatic look with golden particles) ===== */}
        <section className="h-screen w-full relative overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(160deg, #1A1D20 0%, #2B3035 35%, #3D3529 65%, #5C4A2A 100%)' }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_90%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4A843]/8 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#AC3024]/6 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-[-40px]">
            <div className="animate-fade-in-up">
              <Tag className="border-none font-bold uppercase tracking-widest text-[10px] md:text-xs px-3.5 py-1 mb-8 animate-bounce" style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.25), rgba(172,48,36,0.2))', color: '#FFF' }}>
                ISO 15378 & GMP Certified Cleanroom Production
              </Tag>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-none max-w-4xl mx-auto font-montserrat animate-fade-in-up animation-delay-100">
              High-Volume, <span className="text-[#D4A843]">Zero-Defect</span> Plastic Packaging Solutions
            </h1>
            <p className="text-base md:text-xl text-neutral-300 max-w-2xl mx-auto mt-6 mb-10 leading-relaxed font-medium animate-fade-in-up animation-delay-200">
              Supplying precision-molded, medical-grade containers and advanced closure systems at global scale from our Ahmedabad mega-facility.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
              <Button type="primary" size="large" icon={<DownloadOutlined />} onClick={handleDownloadDeck} className="w-full sm:w-auto h-12 md:h-14 px-8 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover-scale-102">Download Plant Capacity Deck</Button>
              <Button type="default" size="large" onClick={() => scrollToSection('b2b-catalog')} className="w-full sm:w-auto h-12 md:h-14 px-8 text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center hover-scale-102" style={{ borderColor: 'rgba(212,168,67,0.5)', color: '#D4A843' }}>Explore Production Capabilities</Button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-neutral-400 cursor-pointer animate-pulse" onClick={() => scrollToSection('metrics')}>
            <span className="text-[10px] font-bold tracking-widest uppercase">Scroll to infrastructure</span>
            <div className="w-5 h-8 border border-neutral-600 rounded-full flex justify-center p-1"><div className="w-1.5 h-1.5 bg-[#D4A843] rounded-full animate-bounce"></div></div>
          </div>
        </section>

        {/* ===== METRICS ===== */}
        <section id="metrics" className="py-20 px-4 md:px-8 bg-gradient-to-br from-white via-amber-50/30 to-white border-t border-amber-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 select-none animate-fade-in-up">
              <span className="text-[#D4A843] font-extrabold text-xs tracking-wider uppercase block mb-2">Operational Excellence</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight uppercase">Enterprise Logistics & Inspection Capacity</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#D4A843] to-[#AC3024] mx-auto mt-4 rounded"></div>
            </div>
            <Row gutter={[24, 24]}>
              {[
                { icon: Cpu, value: 'Class 100k', label: 'Cleanroom Facility', desc: 'Pristine dust-free manufacturing zone adhering strictly to global ISO 14644-1 parameters.', accent: 'blue' },
                { icon: ShieldCheck, value: '100%', label: 'Virgin US-FDA Polymers', desc: 'Strict zero-regrind production guaranteeing chemical compatibility and sterility.', accent: 'red' },
                { icon: Truck, value: 'By Road', label: 'National Logistics Fleet', desc: 'Direct connection via major express highway networks ensuring robust domestic lead-times.', accent: 'blue' },
                { icon: Clock, value: '24/7', label: 'Continuous Audits & QA', desc: 'Automated high-speed visual inspection and continuous quality control sampling checks.', accent: 'red' },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                const accentColor = metric.accent === 'blue' ? '#D4A843' : '#AC3024';
                return (
                  <Col xs={24} sm={12} lg={6} key={idx} className={`card-3d-container animate-fade-in-up animation-delay-${(idx + 1) * 100}`}>
                    <div className="card-3d-inner bg-white border border-amber-100 rounded-xl p-8 text-center h-full flex flex-col justify-between shadow-sm hover-scale-102">
                      <div className="flex justify-center mb-4">
                        <div className="card-3d-icon-wrap w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}35`, color: accentColor }}><Icon size={24} /></div>
                      </div>
                      <div>
                        <h3 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight leading-none mb-3 font-montserrat">{metric.value}</h3>
                        <h4 className="text-sm font-bold text-neutral-600 uppercase tracking-wide mb-2">{metric.label}</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed font-medium">{metric.desc}</p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </section>

        {/* ===== B2B PRODUCT CATALOG ===== */}
        <section id="b2b-catalog" className="py-24 px-4 md:px-8 bg-gradient-to-b from-white to-amber-50/40 border-b border-amber-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 animate-fade-in-up">
              <div className="select-none">
                <span className="text-[#D4A843] font-extrabold text-xs tracking-wider uppercase block mb-2">Inventory Catalog</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 uppercase">Engineered Container Inventory</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-[#D4A843] to-[#AC3024] mt-4 rounded"></div>
              </div>
              <span className="text-neutral-400 text-xs md:text-sm font-semibold mt-4 md:mt-0">Filtered: <span className="text-neutral-900 font-bold">{filteredProducts.length}</span> solutions</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10 animate-fade-in-up animation-delay-100">
              <div className="lg:col-span-3 flex flex-wrap gap-2.5">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button key={key} onClick={() => setActiveCategory(key)} className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 border hover-scale-102 ${activeCategory === key ? 'bg-gradient-to-r from-[#D4A843] to-[#AC3024] border-[#D4A843] text-white shadow-md' : 'bg-white border-amber-200 text-neutral-500 hover:border-[#D4A843] hover:text-[#D4A843]'}`}>{label}</button>
                ))}
              </div>
              <Input placeholder="Filter by keyword, size, HDPE..." allowClear value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full font-medium text-xs" />
            </div>

            {filteredProducts.length > 0 ? (
              <Row gutter={[24, 24]}>
                {filteredProducts.map((product) => {
                  const Icon = product.icon;
                  return (
                    <Col xs={24} sm={12} lg={8} key={product.id} className="product-fade-in">
                      <div className="card-3d-container cursor-pointer h-full transition-transform hover:scale-[1.03] duration-300" onClick={() => { setSelectedProduct(product); setIsProductDetailsOpen(true); }}>
                        <Card hoverable className="card-3d-inner bg-white border-amber-100/80 h-full flex flex-col justify-between shadow-sm" bodyStyle={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
                          cover={
                            <div className="h-56 w-full bg-gradient-to-br from-amber-50/60 to-white flex items-center justify-center relative select-none overflow-hidden rounded-t-xl">
                              <div className="absolute top-3 right-3 z-10"><Badge count={categoryLabels[product.category]} style={{ background: 'linear-gradient(135deg, #D4A843, #AC3024)', color: '#FFF', fontWeight: '800', fontSize: '9px', border: 'none', padding: '0 8px', borderRadius: '4px' }} /></div>
                              {product.image ? <img src={product.image} alt={product.title} className="card-3d-image-float w-full h-full object-contain p-4 transition-transform duration-500" /> : <div className={`card-3d-icon-wrap w-16 h-16 rounded-xl bg-gradient-to-br ${product.color} shadow-md flex items-center justify-center text-[#D4A843]`}><Icon size={30} className="stroke-[1.5]" /></div>}
                            </div>
                          }>
                          <div className="flex-grow flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-1 mb-3">
                                <h3 className="text-base font-black text-neutral-900 font-montserrat uppercase leading-tight hover:text-[#D4A843] transition-colors duration-200">{product.title}</h3>
                                <InfoCircleOutlined className="text-neutral-300 hover:text-[#D4A843] mt-1 text-sm flex-shrink-0" />
                              </div>
                              <div className="space-y-2 mb-6">
                                <div className="flex items-start text-xs"><span className="font-bold w-20 flex-shrink-0 text-neutral-400 uppercase tracking-widest text-[9px]">Material</span><span className="text-neutral-700 font-semibold">{product.material}</span></div>
                                <div className="flex items-start text-xs"><span className="font-bold w-20 flex-shrink-0 text-neutral-400 uppercase tracking-widest text-[9px]">Sizes</span><span className="text-neutral-700 font-semibold">{product.sizes}</span></div>
                                <div className="flex items-start text-xs"><span className="font-bold w-20 flex-shrink-0 text-neutral-400 uppercase tracking-widest text-[9px]">Benefits</span><span className="text-neutral-500 font-medium leading-relaxed">{product.features}</span></div>
                              </div>
                            </div>
                            <Button type="primary" block onClick={(e) => { e.stopPropagation(); rfqForm.setFieldsValue({ polymer: product.material.split(' ')[0], message: `Requesting specs for: ${product.title} (${product.sizes}).` }); scrollToSection('rfq-center'); message.info(`Selected ${product.title} in RFQ Center.`); }} className="h-10 text-xs font-bold uppercase tracking-wider mt-auto flex items-center justify-center gap-1.5 hover-scale-102"><FileTextOutlined /><span>Select For Custom RFQ</span></Button>
                          </div>
                        </Card>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <div className="py-20 text-center bg-white border border-amber-100 rounded-xl animate-fade-in-up shadow-sm">
                <span className="text-neutral-400 font-bold text-sm block">No matching B2B pharma containers found.</span>
                <Button className="mt-4" size="small" onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>Reset Search</Button>
              </div>
            )}
          </div>
        </section>

        {/* ===== FACILITY PHOTO EXPERIENCE ===== */}
        <section id="capabilities" className="py-24 px-4 md:px-8 bg-gradient-to-br from-white via-blue-50/20 to-amber-50/30 border-t border-b border-amber-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 select-none animate-fade-in-up">
              <div>
                <span className="text-[#D4A843] font-extrabold text-xs tracking-wider uppercase block mb-2">Mega Infrastructure</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight uppercase">State-Of-The-Art Ahmedabad Facility</h2>
              </div>
              <p className="text-xs md:text-sm text-neutral-500 mt-4 md:mt-0 max-w-md leading-relaxed font-medium">Engineered for continuous production output. Discover our production machinery, storage capacities, and sterile cleanrooms.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up animation-delay-150">
              {[
                { img: banner3Img, alt: 'Modern Manufacturing Facility', span: 'md:col-span-2', h: 'h-96', tag: 'Ahmedabad Mega Hub', title: 'Modern Manufacturing Facility', desc: 'High-output floor utilizing injection blow molding machines (IBM) and extrusion blow molding (EBM) machinery.' },
                { img: advanceImg, alt: 'Advanced Production Lines', span: '', h: 'h-96', tag: 'Precision Cleanrooms', title: 'Advanced Production Lines', desc: 'Class 100,000 environment equipped with online static eliminators and robotic de-molding mechanisms.' },
                { img: storgesImg, alt: 'Storage & Distribution Hub', span: 'md:col-span-3', h: 'h-80', tag: 'B2B Scaled Distribution', title: 'Storage & Distribution Hub', desc: 'Climate-controlled warehouse measuring over 50,000 sq.ft. featuring instant loading docks and strict FIFO procedures.' },
              ].map((card, idx) => (
                <div key={idx} className={`${card.span} group overflow-hidden rounded-xl border border-amber-100 relative ${card.h} select-none cursor-pointer shadow-sm hover:shadow-lg transition-shadow`}>
                  <img src={card.img} alt={card.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-2"><span className="h-2 w-2 rounded-full bg-[#D4A843]"></span><span className="text-[10px] text-[#D4A843] font-bold tracking-widest uppercase">{card.tag}</span></div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase font-montserrat">{card.title}</h3>
                    <p className="text-neutral-200 text-xs md:text-sm font-medium mt-2 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SPEC MATRIX ===== */}
        <section id="spec-matrix" className="py-24 bg-white px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 select-none animate-fade-in-up">
              <span className="text-[#D4A843] font-extrabold text-xs tracking-wider uppercase block mb-2">Auditor Spec Library</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight uppercase font-montserrat">Chemical & Closure Engineering Matrix</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-[#D4A843] to-[#AC3024] mx-auto mt-4 rounded"></div>
            </div>

            <div className="border border-amber-100 rounded-xl bg-gradient-to-b from-white to-amber-50/20 p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow">
              <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)} tabPosition="top" centered items={[
                { key: 'polymer', label: <div className="flex items-center gap-2 px-3 py-1 font-bold text-xs md:text-sm uppercase tracking-wider"><SafetyOutlined className="text-[#D4A843] text-base animate-pulse" /><span>Polymer Selection</span></div>,
                  children: (
                    <div className="mt-6 animate-fade-in-up">
                      <h3 className="text-lg font-black text-neutral-800 uppercase mb-4 flex items-center gap-2"><span>US-FDA Compliant Polymer Materials</span><Tag style={{ background: 'linear-gradient(135deg, #D4A843, #AC3024)', color: '#fff', border: 'none' }} className="font-bold uppercase text-[9px]">100% Virgin Resins</Tag></h3>
                      <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-6 font-medium">Our production lines exclusively inject premium resins supplied with comprehensive drug master files (DMF).</p>
                      <Row gutter={[20, 20]}>
                        {[
                          { name: 'HDPE (High Density Polyethylene)', desc: 'Optimal moisture vapor barrier. Ideal for pharmaceutical tablet bottles and dry capsules packaging.', tags: ['Density: 0.95 g/cm³', 'USP Class VI', 'Rigid Structure'] },
                          { name: 'LDPE (Low Density Polyethylene)', desc: 'Excellent flexibility and elastic recovery. Ideal for ophthalmic dropper bottles and liquid dispensers.', tags: ['Highly Flexible', 'USP Class VI', 'Density: 0.92 g/cm³'] },
                          { name: 'PP (Polypropylene)', desc: 'Outstanding fatigue resistance and thermal threshold. Excellent for autoclavable closures and rigid tubes.', tags: ['Autoclavable', 'High-Heat Limit', 'Screw Caps'] },
                          { name: 'PET (Polyethylene Terephthalate)', desc: 'Superior glass-like clarity with exceptional gas/oxygen barrier protection for amber oral syrup bottles.', tags: ['Gas Barrier', 'UV Protection', 'Glass Clarity'] },
                        ].map((mat, idx) => (
                          <Col xs={24} md={12} key={idx}>
                            <div className="p-4 bg-white rounded-lg border border-amber-100 shadow-xs hover:border-[#D4A843]/50 transition-all hover:scale-[1.01] duration-250 hover:shadow-sm">
                              <span className="text-xs font-black text-neutral-800 block uppercase mb-1">{mat.name}</span>
                              <p className="text-[11px] text-neutral-500 leading-relaxed mb-3">{mat.desc}</p>
                              <div className="flex flex-wrap gap-1.5">{mat.tags.map((t, i) => <Tag key={i} color="default" className="text-[9px] font-bold uppercase">{t}</Tag>)}</div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )
                },
                { key: 'closure', label: <div className="flex items-center gap-2 px-3 py-1 font-bold text-xs md:text-sm uppercase tracking-wider"><SettingOutlined className="text-[#D4A843] text-base animate-spin" style={{ animationDuration: '4s' }} /><span>Closure Engineering</span></div>,
                  children: (
                    <div className="mt-6 animate-fade-in-up">
                      <h3 className="text-lg font-black text-neutral-800 uppercase mb-4 flex items-center gap-2"><span>Precision Leak-Proof Closure Systems</span><Tag color="red" className="font-bold border-none uppercase text-[9px]">ISO 8317 Compliant</Tag></h3>
                      <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-6 font-medium">Airtight seals, safety locks, and moisture absorption stoppers for advanced pharmaceutical filling requirements.</p>
                      <Row gutter={[20, 20]}>
                        {[
                          { name: 'Child-Resistant Caps (CRC)', desc: 'Double-wall squeeze-and-turn safety closures protecting pediatric populations.', tags: [{ t: 'Child Safety Lock', c: '#AC3024' }, { t: 'Squeeze-Turn', c: '' }] },
                          { name: 'Pilfer-Proof Seals', desc: 'Tamper-evident tear-off drop bands that break cleanly upon initial unscrewing.', tags: [{ t: 'Tamper Evident', c: '#D4A843' }, { t: 'Drop-Band', c: '' }] },
                          { name: 'Dehumidifier Stopper Caps', desc: 'Stopper caps packed with active silica gel or molecular sieve desiccant beads.', tags: [{ t: 'RH < 10%', c: '#D4A843' }, { t: 'Active Desiccant', c: '' }] },
                        ].map((cap, idx) => (
                          <Col xs={24} md={12} lg={8} key={idx}>
                            <div className="p-4 bg-white rounded-lg border border-amber-100 shadow-xs hover:border-[#D4A843]/50 transition-all h-full flex flex-col justify-between hover:scale-[1.01] duration-250 hover:shadow-sm">
                              <div><span className="text-xs font-black text-neutral-800 block uppercase mb-1">{cap.name}</span><p className="text-[11px] text-neutral-500 leading-relaxed mb-3">{cap.desc}</p></div>
                              <div className="flex flex-wrap gap-1.5 mt-2">{cap.tags.map((tg, i) => tg.c ? <Tag key={i} style={{ background: tg.c, color: '#fff', border: 'none' }} className="text-[9px] font-bold uppercase">{tg.t}</Tag> : <Tag key={i} color="default" className="text-[9px] font-bold uppercase">{tg.t}</Tag>)}</div>
                            </div>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )
                }
              ]} />
            </div>
          </div>
        </section>

        {/* ===== RFQ CENTER ===== */}
        <section id="rfq-center" className="py-24 px-4 md:px-8 bg-gradient-to-br from-amber-50/40 via-white to-blue-50/20 border-t border-amber-100">
          <div className="max-w-7xl mx-auto">
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={10} className="space-y-8 animate-fade-in-up">
                <div className="select-none">
                  <span className="text-[#D4A843] font-extrabold text-xs tracking-wider uppercase block mb-2">Procurement Direct Line</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 uppercase font-montserrat">Connect With Our Ahmedabad Office</h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#D4A843] to-[#AC3024] mt-4 rounded"></div>
                </div>
                <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-medium">We supply critical global distributors and pharmaceutical brands. Chat with us on WhatsApp or email our estimators directly.</p>
                <div className="space-y-4 pt-4">
                  {[
                    { href: 'https://wa.me/919876543210', icon: <WhatsAppOutlined style={{ fontSize: '20px' }} />, label: 'Encrypted WhatsApp Chat', value: '+91 98765 43210', hoverColor: 'green-500', iconBg: 'green-500' },
                    { href: 'mailto:sales@parthplastopack.com', icon: <MailOutlined style={{ fontSize: '18px' }} />, label: 'Estimations & Samples', value: 'sales@parthplastopack.com', hoverColor: '[#D4A843]', iconBg: '[#D4A843]' },
                    { href: 'tel:+919876543210', icon: <PhoneOutlined style={{ fontSize: '18px' }} />, label: 'Corporate Hotline', value: '+91 98765 43210', hoverColor: '[#D4A843]', iconBg: '[#D4A843]' },
                  ].map((contact, idx) => (
                    <a key={idx} href={contact.href} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-between p-4 bg-white border border-amber-100 rounded-xl hover:border-${contact.hoverColor}/50 transition-all duration-300 group hover-scale-102 shadow-sm`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${contact.iconBg}/10 flex items-center justify-center text-${contact.iconBg}`}>{contact.icon}</div>
                        <div>
                          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block leading-none mb-1">{contact.label}</span>
                          <span className={`text-sm font-bold text-neutral-800 group-hover:text-${contact.hoverColor} transition-colors`}>{contact.value}</span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                    </a>
                  ))}
                </div>
              </Col>

              <Col xs={24} lg={14} className="animate-fade-in-up animation-delay-100">
                <div className="bg-white border border-amber-200/60 rounded-2xl p-6 md:p-10 shadow-lg relative overflow-hidden animate-border-glow-pulse">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/30 to-transparent rounded-full blur-2xl"></div>
                  <div className="mb-8 select-none">
                    <Tag style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.15), rgba(172,48,36,0.1))', color: '#D4A843', border: 'none' }} className="font-bold uppercase tracking-widest text-[9px] px-2.5 py-0.5 mb-3">RFQ Center</Tag>
                    <h3 className="text-xl md:text-2xl font-black text-neutral-900 uppercase font-montserrat leading-none">Request B2B Technical Quotation</h3>
                    <p className="text-neutral-500 text-xs mt-2 font-medium">Receive a formal engineering response in 4 hours.</p>
                  </div>
                  <Form form={rfqForm} layout="vertical" onFinish={onRfqSubmit} requiredMark={false} className="space-y-4">
                    <Row gutter={16}>
                      <Col xs={24} md={12}><Form.Item name="companyName" label="Company Name" rules={[{ required: true, message: 'Required' }]}><Input placeholder="e.g. Novartis AG" className="h-10 text-xs md:text-sm font-medium" /></Form.Item></Col>
                      <Col xs={24} md={12}><Form.Item name="contactPerson" label="Contact Email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}><Input placeholder="e.g. procurement@novartis.com" className="h-10 text-xs md:text-sm font-medium" /></Form.Item></Col>
                    </Row>
                    <Row gutter={16}>
                      <Col xs={24} md={12}><Form.Item name="volume" label="Target Production Volume" rules={[{ required: true }]}><Select placeholder="Select batch volume" className="h-10 text-xs font-semibold"><Select.Option value="50k">50k–100k units</Select.Option><Select.Option value="250k">100k–500k units</Select.Option><Select.Option value="1m">500k–1M units</Select.Option><Select.Option value="5m">1M+ units (Mega)</Select.Option></Select></Form.Item></Col>
                      <Col xs={24} md={12}><Form.Item name="polymer" label="Primary Polymer" rules={[{ required: true }]}><Select placeholder="Select polymer" className="h-10 text-xs font-semibold"><Select.Option value="HDPE">HDPE</Select.Option><Select.Option value="LDPE">LDPE</Select.Option><Select.Option value="PP">PP</Select.Option><Select.Option value="PET">PET</Select.Option></Select></Form.Item></Col>
                    </Row>
                    <Form.Item name="message" label="Engineering Notes" rules={[{ required: true }]}><Input.TextArea rows={4} placeholder="Detail cap sizes, neck sizes, tolerances, desiccant demands, or DMF requirements." className="text-xs md:text-sm font-medium" /></Form.Item>
                    <Button type="primary" htmlType="submit" block className="h-12 text-xs md:text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 mt-2"><ThunderboltOutlined /><span>Transmit Factory RFQ</span></Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="bg-neutral-900 text-neutral-400 py-16 px-4 md:px-8 border-t border-neutral-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 animate-fade-in-up">
            <div className="space-y-4">
              <img src={logoImg} alt="Parth Plasto Pack" className="h-7 object-contain" />
              <p className="text-xs text-neutral-400 leading-relaxed font-semibold">High-output medical-grade primary container manufacturers inside pristine Class 100,000 cleanroom hubs.</p>
              <div className="flex items-start gap-3 mt-4 text-xs">
                <MapPin size={16} className="text-[#D4A843] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block leading-relaxed text-neutral-300">11, Swagat Ind. Park-2, Indore - Ahmedabad Highway, Kuha, Ahmedabad, Gujarat, India.</span>
                  <a href="https://maps.google.com/?q=11,+Swagat+Ind.+Park-2,+Kuha,+Ahmedabad" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] text-[#D4A843] hover:text-white font-bold uppercase tracking-wider transition-colors mt-2"><span>Open Satellite Maps</span><ArrowUpRight size={12} /></a>
                </div>
              </div>
            </div>
            <div className="space-y-4 md:pl-12">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest select-none">Compliance Files</h3>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#spec-matrix" className="hover:text-white hover:underline transition-all text-neutral-400 font-medium">Drug Master File (DMF) Resins</a></li>
                <li><a href="#spec-matrix" className="hover:text-white hover:underline transition-all text-neutral-400 font-medium">ISO 15378 Compliance Log</a></li>
                <li><a href="#capabilities" className="hover:text-white hover:underline transition-all text-neutral-400 font-medium">Plant Validation Protocol</a></li>
                <li><a onClick={handleDownloadDeck} className="cursor-pointer hover:text-white hover:underline transition-all text-neutral-400 font-medium">Cleanroom Air Quality Report</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-widest select-none">B2B Communications</h3>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed">Connect with our Ahmedabad sales division directly.</p>
              <div className="space-y-3 pt-1 text-xs">
                <a href="mailto:sales@parthplastopack.com" className="flex items-center gap-2 hover:text-white transition-colors duration-200 font-semibold group text-neutral-300"><Mail size={14} className="text-[#D4A843] group-hover:text-white transition-colors" /><span>sales@parthplastopack.com</span></a>
                <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors duration-200 font-semibold group text-neutral-300"><Phone size={14} className="text-[#D4A843] group-hover:text-white transition-colors" /><span>+91 98765 43210</span></a>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-neutral-800 text-center text-[10px] text-neutral-600 font-bold uppercase tracking-widest select-none">
            <p>© 2026 Parth Plasto Pack Pvt. Ltd. Engineered for Scale. Made in India.</p>
          </div>
        </footer>

        {/* ===== MODALS ===== */}
        <Modal title={<div className="flex items-center gap-2 border-b border-amber-100 pb-3 select-none"><AuditOutlined className="text-[#D4A843]" /><span className="font-extrabold uppercase text-xs md:text-sm tracking-wider text-neutral-900 font-montserrat">Schedule Sterile Plant Audit</span></div>} open={isAuditModalOpen} onCancel={() => setIsAuditModalOpen(false)} footer={null} width={500} className="dark-antd-modal" bodyStyle={{ padding: '20px 0 0 0' }}>
          <Form form={auditForm} layout="vertical" onFinish={onAuditSubmit} requiredMark={false} className="space-y-4">
            <Form.Item name="auditorName" label="Lead Auditor Name" rules={[{ required: true }]}><Input placeholder="e.g. Dr. Arthur Pendelton" className="h-10 text-xs md:text-sm" /></Form.Item>
            <Form.Item name="agencyName" label="Audit Agency / Pharma Company" rules={[{ required: true }]}><Input placeholder="e.g. Novartis AG Quality Assurance" className="h-10 text-xs md:text-sm" /></Form.Item>
            <Row gutter={16}>
              <Col xs={24} md={12}><Form.Item name="auditDate" label="Target Audit Date" rules={[{ required: true }]}><DatePicker className="h-10 w-full text-xs font-semibold" /></Form.Item></Col>
              <Col xs={24} md={12}><Form.Item name="auditScope" label="Audit Scope" rules={[{ required: true }]}><Select placeholder="Select scope" className="h-10 text-xs font-semibold"><Select.Option value="iso15378">ISO 15378</Select.Option><Select.Option value="gmp">GMP / Cleanroom</Select.Option><Select.Option value="stability">Stability Compatibility</Select.Option><Select.Option value="custom">Vendor Qualification</Select.Option></Select></Form.Item></Col>
            </Row>
            <div className="p-3 bg-gradient-to-r from-amber-50 to-red-50 rounded-lg border border-amber-200 text-[10px] md:text-xs text-neutral-600 leading-relaxed">
              <span className="font-bold text-[#AC3024] uppercase tracking-wider block mb-1">Important Safety Directive</span>
              Visitors must comply with gowning, hairnets, and sanitization protocols prior to cleanroom floor ingress.
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-amber-100">
              <Button type="default" onClick={() => setIsAuditModalOpen(false)} className="text-xs uppercase tracking-wider font-bold" style={{ color: '#6C757D', borderColor: '#E8E0D4' }}>Cancel</Button>
              <Button type="primary" htmlType="submit" className="text-xs uppercase tracking-wider font-bold">Request Audit Slot</Button>
            </div>
          </Form>
        </Modal>

        <Modal title={null} open={isDownloadOpen} closable={false} footer={null} width={400} className="dark-antd-modal text-center">
          <div className="py-6 space-y-4">
            <DownloadOutlined style={{ fontSize: '32px', color: '#D4A843' }} className="animate-bounce" />
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider font-montserrat">Fetching Plant Capacities & DMF files...</h3>
            <p className="text-xs text-neutral-500">Generating secure compilation of cleanroom layouts, machine specs, and batch capacity indexes.</p>
            <Progress percent={downloadProgress} strokeColor={{ from: '#D4A843', to: '#AC3024' }} trailColor="#F0EBE0" showInfo={false} status="active" />
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest block">{downloadProgress}% Compiled</span>
          </div>
        </Modal>

        <Modal title={selectedProduct && (<div className="flex items-center gap-2 border-b border-amber-100 pb-3 select-none"><ExperimentOutlined className="text-[#D4A843] animate-pulse" /><span className="font-extrabold uppercase text-xs md:text-sm tracking-wider text-neutral-900 font-montserrat">Technical Spec Sheet: {selectedProduct.title}</span></div>)} open={isProductDetailsOpen} onCancel={() => setIsProductDetailsOpen(false)} footer={null} width={700} className="dark-antd-modal" bodyStyle={{ padding: '24px 0 0 0' }}>
          {selectedProduct && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-60 bg-gradient-to-br from-amber-50/60 to-white rounded-xl flex items-center justify-center p-6 border border-amber-100 card-3d-container hover:shadow-lg transition-shadow relative overflow-hidden group">
                    {selectedProduct.image ? <img src={selectedProduct.image} alt={selectedProduct.title} className="max-h-full object-contain card-3d-image-float p-2 transform duration-500 group-hover:scale-105" /> : <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-[#D4A843] card-3d-icon-wrap">{React.createElement(selectedProduct.icon || Disc, { size: 36 })}</div>}
                  </div>
                  <div className="p-3.5 bg-gradient-to-r from-amber-50/60 to-white border border-amber-100 rounded-lg">
                    <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest block mb-2">Quality Standards</span>
                    <div className="grid grid-cols-2 gap-2 text-[9px] text-neutral-600 font-semibold">
                      <div className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> USP Class VI</div>
                      <div className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> ISO 15378</div>
                      <div className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> DMF Registered</div>
                      <div className="flex items-center gap-1"><CheckCircleOutlined className="text-green-500" /> Sterile Class 100k</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between"><span className="text-xs font-black text-[#D4A843] uppercase tracking-wider">Solution Specifications</span><Tag style={{ background: 'linear-gradient(135deg, #D4A843, #AC3024)', color: '#fff', border: 'none' }} className="font-bold uppercase text-[8px] tracking-widest">Stability Certified</Tag></div>
                    <div className="space-y-2 text-xs">
                      {[{ k: 'DMF Registry', v: selectedProduct.dmf || 'DMF Filed' }, { k: 'Material Resins', v: selectedProduct.material }, { k: 'Neck Sizes', v: selectedProduct.sizes }, { k: 'Tare Weight', v: selectedProduct.weight || '3.5g' }, { k: 'Barrier Level', v: selectedProduct.barrier || 'High' }].map((row, i) => (
                        <div key={i} className="flex justify-between py-1.5 border-b border-amber-100/60"><span className="font-bold text-neutral-400 uppercase tracking-widest text-[9px]">{row.k}</span><span className="font-semibold text-neutral-700">{row.v}</span></div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-amber-50/60 to-white border border-amber-100 rounded-xl relative overflow-hidden">
                    <span className="text-[10px] text-[#D4A843] font-extrabold uppercase tracking-widest block mb-2">Interactive B2B Compatibility Check</span>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Intended Filling Material:</label>
                      <Select value={intendedFilling} onChange={handleIntendedFillingChange} className="w-full text-xs font-semibold" style={{ height: '36px' }}>
                        <Select.Option value="tablet">Solid Dry Tablets & Jars</Select.Option>
                        <Select.Option value="liquid">Active Oral Liquid Syrup</Select.Option>
                        <Select.Option value="sterile">Ophthalmic / Sterile solutions</Select.Option>
                        <Select.Option value="effervescent">Effervescent Sensitive Tablets</Select.Option>
                      </Select>
                      {isCalculating ? (
                        <div className="py-2.5 text-center flex items-center justify-center gap-2"><Clock size={14} className="text-[#D4A843] animate-spin" /><span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Analyzing resin compliance...</span></div>
                      ) : (
                        <div className="p-3 bg-white rounded-lg border border-amber-100 animate-fade-in-up">
                          <div className="flex items-center gap-1.5 text-green-600 text-xs font-black uppercase tracking-wider leading-none mb-2"><CheckOutlined style={{ fontSize: '12px' }} /><span>{compatibilityData[intendedFilling].status}</span></div>
                          <div className="space-y-1.5 text-[10px] text-neutral-600 font-medium">
                            <div><span className="text-neutral-400 font-bold">Resin Grade:</span> {compatibilityData[intendedFilling].resin}</div>
                            <div><span className="text-neutral-400 font-bold">Barrier:</span> {compatibilityData[intendedFilling].barrier}</div>
                            <div><span className="text-neutral-400 font-bold">Audit Code:</span> {compatibilityData[intendedFilling].dmf}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-amber-100">
                <Button type="default" onClick={() => setIsProductDetailsOpen(false)} className="text-xs uppercase tracking-wider font-bold" style={{ color: '#6C757D', borderColor: '#E8E0D4' }}>Close Spec Sheet</Button>
                <Button type="primary" onClick={() => { setIsProductDetailsOpen(false); rfqForm.setFieldsValue({ polymer: selectedProduct.material.split(' ')[0], message: `Inquiring on: ${selectedProduct.title} (DMF: ${selectedProduct.dmf || 'NA'}, Sizes: ${selectedProduct.sizes}). Intended filling: ${intendedFilling.toUpperCase()}.` }); scrollToSection('rfq-center'); message.success(`Transferred specs for ${selectedProduct.title} to RFQ.`); }} className="text-xs uppercase tracking-wider font-bold hover:scale-102 flex items-center gap-1.5"><ThunderboltOutlined /><span>Request Physical Samples</span></Button>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </ConfigProvider>
  );
}

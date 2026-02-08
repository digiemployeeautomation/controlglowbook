import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';

// ============================================
// GLOWBOOK ADMIN - FULL PLATFORM CONTROL
// ============================================

const Icons = {
  Dashboard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Branch: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Users: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Calendar: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Star: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Alert: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Ticket: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 0 0-2 2v3a2 2 0 1 1 0 4v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 1 1 0-4V7a2 2 0 0 0-2-2H5z"/></svg>,
  Dollar: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  Gift: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>,
  Bell: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Flag: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
  Megaphone: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Settings: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2m-9-11h2m18 0h2m-4.22-5.78 1.42-1.42m-15.56 0 1.42 1.42m0 11.31-1.42 1.42m15.56 0-1.42-1.42"/></svg>,
  Search: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  X: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Check: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  Eye: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Edit: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Plus: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Save: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Sparkles: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z"/></svg>,
  TrendUp: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Refresh: () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  Menu: () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Activity: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  WalkIn: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 21l3-8 2.5 2v6M15.5 13L18 21M10 13L6 8l4-1 3 3"/></svg>,
  NoShow: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>,
  Key: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 0-7.778 7.778 5.5 5.5 0 0 0 7.777 0L15.5 15.5m0 0l2.5 2.5m-2.5-2.5L18 12.5m-2.5 2.5l-5-5"/></svg>,
  FileText: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  MessageSquare: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Clock: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Phone: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  CreditCard: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
};

const FP = (a) => `K${(Number(a)||0).toLocaleString()}`;


const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'DM Sans',-apple-system,sans-serif;background:#faf7f5;color:#2c1810;line-height:1.5}
.admin{display:flex;min-height:100vh}
.sidebar{width:260px;background:#1a1215;border-right:1px solid #2a1f23;display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50;transition:transform 0.3s}
.sidebar-header{padding:20px 24px;border-bottom:1px solid #2a1f23;display:flex;align-items:center;gap:12px}
.sidebar-logo{width:36px;height:36px;background:linear-gradient(135deg,#c47d5a,#a35e3c);border-radius:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px}
.sidebar-brand{font-size:18px;font-weight:700;color:#fff;font-family:'Fraunces',serif}.sidebar-brand span{color:#c47d5a}
.sidebar-nav{flex:1;padding:12px;overflow-y:auto}
.sidebar-section{margin-bottom:8px}
.sidebar-section-title{font-size:11px;font-weight:600;text-transform:uppercase;color:rgba(255,255,255,0.4);padding:8px 12px;letter-spacing:0.5px}
.nav-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:10px;cursor:pointer;color:rgba(255,255,255,0.55);font-size:14px;font-weight:500;transition:all 0.15s;margin-bottom:2px}
.nav-item:hover{background:#2a1f23;color:rgba(255,255,255,0.9)}.nav-item.active{background:rgba(196,125,90,0.15);color:#c47d5a}
.nav-item .badge{margin-left:auto;background:#c94c4c;color:#fff;font-size:11px;font-weight:600;padding:2px 8px;border-radius:10px}
.sidebar-footer{padding:16px;border-top:1px solid #2a1f23}
.admin-profile{display:flex;align-items:center;gap:10px;padding:8px}
.admin-avatar{width:36px;height:36px;background:#c47d5a;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:14px}
.admin-name{font-size:13px;font-weight:600;color:#fff}.admin-role{font-size:11px;color:rgba(255,255,255,0.5)}
.main{flex:1;margin-left:260px;min-height:100vh}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:16px 32px;background:#ffffff;border-bottom:1px solid #ede5df;position:sticky;top:0;z-index:40}
.topbar-title{font-size:22px;font-weight:700;color:#2c1810;font-family:'Fraunces',serif}
.topbar-actions{display:flex;align-items:center;gap:12px}
.topbar-search{display:flex;align-items:center;gap:8px;background:#f0ebe7;border-radius:10px;padding:8px 14px}
.topbar-search input{background:transparent;border:none;outline:none;color:#2c1810;font-size:14px;width:200px}
.topbar-search input::placeholder{color:#8a7068}
.mobile-menu{display:none;cursor:pointer;color:#8a7068}
.content{padding:24px 32px}
.stats-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-bottom:24px}
.stat-card{background:#ffffff;border:1px solid #ede5df;border-radius:14px;padding:20px}
.stat-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.stat-label{font-size:13px;color:#8a7068;font-weight:500}
.stat-icon{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center}
.stat-icon.gold{background:#f0d9cc;color:#c47d5a}.stat-icon.blue{background:#e8eef5;color:#6b8ec4}
.stat-icon.green{background:#e8f5ec;color:#4a9d6e}.stat-icon.red{background:#fce8e8;color:#c94c4c}
.stat-icon.purple{background:#fce8ee;color:#d4728c}
.stat-value{font-size:28px;font-weight:700;color:#2c1810;margin-bottom:4px;font-family:'Fraunces',serif}
.stat-change{font-size:12px;display:flex;align-items:center;gap:4px}
.stat-change.up{color:#4a9d6e}.stat-change.down{color:#c94c4c}
.tc{background:#ffffff;border:1px solid #ede5df;border-radius:14px;overflow:hidden;margin-bottom:24px}
.th{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #ede5df;flex-wrap:wrap;gap:8px}
.tt{font-size:16px;font-weight:600;color:#2c1810;font-family:'Fraunces',serif}
.tf{display:flex;align-items:center;gap:8px;background:#faf7f5;border-radius:8px;padding:6px 12px}
.tf input{background:transparent;border:none;outline:none;color:#2c1810;font-size:13px;width:160px}
.tf input::placeholder{color:#8a7068}
table{width:100%;border-collapse:collapse}
thead{background:#faf7f5}
th{text-align:left;padding:12px 20px;font-size:12px;font-weight:600;color:#8a7068;text-transform:uppercase;letter-spacing:0.5px}
td{padding:14px 20px;border-top:1px solid #ede5df;font-size:14px}
tr:hover{background:rgba(196,125,90,0.04)}
.bs{padding:4px 10px;border-radius:20px;font-size:12px;font-weight:500;display:inline-block}
.bs.active,.bs.approved,.bs.completed,.bs.resolved{background:#e8f5ec;color:#2e7d32}
.bs.pending,.bs.under_review,.bs.open,.bs.assigned{background:#fdf6e3;color:#b8860b}
.bs.suspended,.bs.cancelled,.bs.rejected,.bs.banned{background:#fce8e8;color:#c94c4c}
.bs.in_progress,.bs.confirmed,.bs.processing{background:#e8eef5;color:#1565c0}
.bs.arrived{background:#e0f7fa;color:#00695c}
.bs.no_show{background:#fce4ec;color:#880e4f}
.bs.closed,.bs.waiting_on_user{background:#f0ebe7;color:#8a7068}
.btn{padding:8px 16px;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.15s}
.btn-primary{background:#c47d5a;color:#fff}.btn-primary:hover{background:#a35e3c}
.btn-secondary{background:#fff;color:#2c1810;border:1px solid #ede5df}.btn-secondary:hover{background:#faf7f5}
.btn-danger{background:#fce8e8;color:#c94c4c}.btn-danger:hover{background:#f5d0d0}
.btn-success{background:#e8f5ec;color:#4a9d6e}.btn-success:hover{background:#d0eadb}
.btn-sm{padding:6px 10px;font-size:12px}
.btn-icon{width:32px;height:32px;padding:0;display:flex;align-items:center;justify-content:center;background:#f0ebe7;border-radius:8px;border:none;color:#8a7068;cursor:pointer}
.btn-icon:hover{background:#e8e0db;color:#2c1810}
.card{background:#ffffff;border:1px solid #ede5df;border-radius:14px;padding:20px;margin-bottom:16px}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}
.card-title{font-size:16px;font-weight:600;color:#2c1810;font-family:'Fraunces',serif}
.fg{margin-bottom:16px}.fl{display:block;font-size:13px;font-weight:500;color:#8a7068;margin-bottom:6px}
.fi,.fs,.fta{width:100%;padding:10px 14px;background:#faf7f5;border:1px solid #ede5df;border-radius:8px;color:#2c1810;font-size:14px;font-family:inherit}
.fi:focus,.fs:focus,.fta:focus{outline:none;border-color:#c47d5a}
.fta{min-height:80px;resize:vertical}.fs{cursor:pointer}
.fr{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.dg{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.di{margin-bottom:12px}.dl{font-size:12px;color:#8a7068;margin-bottom:4px}.dv{font-size:14px;color:#2c1810;font-weight:500}
.mo{position:fixed;inset:0;background:rgba(0,0,0,0.35);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px}
.modal{background:#ffffff;border:1px solid #ede5df;border-radius:16px;width:100%;max-width:600px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column}
.mh{display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid #ede5df}
.mt{font-size:18px;font-weight:700;color:#2c1810;font-family:'Fraunces',serif}
.mb{padding:20px;overflow-y:auto;flex:1}
.mf{padding:16px 20px;border-top:1px solid #ede5df;display:flex;justify-content:flex-end;gap:8px}
.toggle{position:relative;width:44px;height:24px;background:#f0ebe7;border-radius:12px;cursor:pointer;transition:background 0.2s;flex-shrink:0}
.toggle.on{background:#c47d5a}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform 0.2s}
.toggle.on::after{transform:translateX(20px)}
.tabs{display:flex;gap:4px;margin-bottom:20px;background:#faf7f5;border-radius:10px;padding:4px;flex-wrap:wrap}
.tab{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;color:#8a7068}
.tab:hover{color:#2c1810}.tab.active{background:#fff;color:#c47d5a;box-shadow:0 1px 3px rgba(0,0,0,0.06)}
.es{text-align:center;padding:40px;color:#8a7068}
.toast{position:fixed;bottom:24px;right:24px;padding:14px 20px;border-radius:10px;font-size:14px;font-weight:500;z-index:200;animation:si 0.3s}
.toast.success{background:#4a9d6e;color:#fff}.toast.error{background:#c94c4c;color:#fff}
@keyframes si{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.ri{padding:12px 0;border-bottom:1px solid #ede5df}.ri:last-child{border-bottom:none}
.ri.internal{background:rgba(107,142,196,0.06);border-left:3px solid #6b8ec4;padding-left:12px;margin:4px 0;border-radius:0 8px 8px 0}
@media(max-width:768px){.sidebar{transform:translateX(-100%)}.sidebar.open{transform:translateX(0)}.main{margin-left:0}.mobile-menu{display:block}.stats-grid{grid-template-columns:1fr 1fr}.dg,.fr{grid-template-columns:1fr}.topbar-search{display:none}}
`;

// ─── IMAGE UPLOAD UTILITY ─────────────────────────────────────────
async function uploadImageAdmin(bucket, folder, file) {
  const ext = file.name.split('.').pop();
  const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

function AdminImageUpload({ currentUrl, onUpload, bucket, folder, size = 64, round = false, label, onRemove }) {
  const [uploading, setUploading] = React.useState(false);
  const [preview, setPreview] = React.useState(currentUrl || null);
  const uid = `aiu-${bucket}-${folder}-${Math.random().toString(36).slice(2)}`;

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { alert('File too large (max 10MB)'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
    setUploading(true);
    try {
      const url = await uploadImageAdmin(bucket, folder, file);
      setPreview(url);
      onUpload(url);
    } catch (err) {
      console.error('Upload error:', err);
      setPreview(currentUrl || null);
      alert('Upload failed. Create "' + bucket + '" bucket in Supabase Storage.\n\n' + (err.message || err));
    }
    setUploading(false);
  };

  return (
    <div style={{marginBottom:14}}>
      {label && <label className="fl">{label}</label>}
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div onClick={() => document.getElementById(uid).click()}
          style={{width:size,height:size,borderRadius:round?'50%':10,overflow:'hidden',background:'#faf7f5',border:`2px dashed ${preview?'transparent':'#ede5df'}`,display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,position:'relative'}}>
          {preview ? <img src={preview} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            : <span style={{fontSize:size>50?20:14,color:'#8a7068'}}>+</span>}
          {uploading && <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,.5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:18,height:18,border:'2px solid #fff',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 0.8s linear infinite'}} />
          </div>}
        </div>
        <div>
          <button className="btn btn-secondary btn-sm" onClick={() => document.getElementById(uid).click()}>{preview ? 'Change' : 'Upload'}</button>
          {preview && onRemove && <button className="btn btn-danger btn-sm" style={{marginLeft:6}} onClick={() => {setPreview(null);onRemove();}}>Remove</button>}
        </div>
        <input id={uid} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
      </div>
    </div>
  );
}

function AdminGalleryUpload({ images = [], onUpdate, bucket, folder }) {
  const [uploading, setUploading] = React.useState(false);
  const [list, setList] = React.useState(images);
  const uid = `agu-${folder}`;

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    const newUrls = [];
    for (const file of files) {
      try { newUrls.push(await uploadImageAdmin(bucket, folder, file)); }
      catch (err) { alert('Upload failed for ' + file.name); }
    }
    if (newUrls.length) { const updated = [...list, ...newUrls]; setList(updated); onUpdate(updated); }
    setUploading(false);
  };

  const remove = (idx) => { const updated = list.filter((_,i) => i !== idx); setList(updated); onUpdate(updated); };

  return (
    <div style={{marginBottom:14}}>
      <label className="fl">Gallery Photos</label>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        {list.map((img,i) => (
          <div key={i} style={{width:90,height:64,borderRadius:8,overflow:'hidden',position:'relative',flexShrink:0}}>
            <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
            <button onClick={() => remove(i)} style={{position:'absolute',top:3,right:3,width:18,height:18,borderRadius:'50%',background:'rgba(0,0,0,.7)',border:'none',color:'#2c1810',fontSize:11,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
          </div>
        ))}
        <div onClick={() => document.getElementById(uid).click()}
          style={{width:90,height:64,borderRadius:8,border:'2px dashed #ede5df',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0}}>
          {uploading ? <div style={{width:16,height:16,border:'2px solid #c47d5a',borderTopColor:'transparent',borderRadius:'50%',animation:'spin 0.8s linear infinite'}} />
            : <><span style={{fontSize:16,color:'#8a7068'}}>+</span><span style={{fontSize:9,color:'#8a7068'}}>Add</span></>}
        </div>
      </div>
      <input id={uid} type="file" accept="image/*" multiple onChange={handleFiles} style={{display:'none'}} />
    </div>
  );
}

export default function AdminDashboard() {
  // ── AUTH STATE ──
  const [authUser, setAuthUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState('login'); // login | forgot | reset_sent

  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [tSearch, setTSearch] = useState('');
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [sel, setSel] = useState(null);
  const [form, setForm] = useState({});
  const [settingsTab, setSettingsTab] = useState('general');
  const [editSettings, setEditSettings] = useState(null);

  // Data stores
  const [D, setD] = useState({ branches:[], clients:[], staff:[], services:[], bookings:[], reviews:[], disputes:[], tickets:[], ticketReplies:[], reports:[], refunds:[], flags:[], promos:[], templates:[], announcements:[], pages:[], admins:[], settings:null, points:[], applications:[], log:[], waitlist:[], referrals:[], invoices:[], smsLogs:[], subscriptions:[], withdrawals:[], wallets:[] });
  const [adminUser, setAdminUser] = useState(null);

  // ── AUTH CHECK ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user || null);
      setAuthChecked(true);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    setAdminUser(null);
    setPage('dashboard');
  };

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(() => setToast(null), 3000); };
  const uf = (k,v) => setForm(p => ({...p,[k]:v}));
  const openModal = (m, item=null, f={}) => { setModal(m); setSel(item); setForm(f); };
  const closeModal = () => { setModal(null); setSel(null); setForm({}); };

  useEffect(() => {
    if (authChecked && authUser) fetchAll();
  }, [authChecked, authUser]);

  const fetchAll = async () => {
    setLoading(true);
    const q = (t) => supabase.from(t).select('*');
    const [br,cl,st,sv,bk,rv,di,tk,tr,rc,rf,ff,pr,nt,an,pp,au,bs,pt,ap,al,wl,ref,inv,sms,sub,wd,wa] = await Promise.all([
      q('branches').order('created_at',{ascending:false}),
      q('clients').order('created_at',{ascending:false}),
      q('staff').order('created_at',{ascending:false}),
      q('services').order('name'),
      q('bookings').order('created_at',{ascending:false}),
      q('reviews').order('created_at',{ascending:false}),
      q('disputes').order('created_at',{ascending:false}),
      q('support_tickets').order('created_at',{ascending:false}),
      q('support_responses').order('created_at'),
      q('reported_content').order('created_at',{ascending:false}),
      q('refunds').order('created_at',{ascending:false}),
      q('feature_flags').order('name'),
      q('promotions').order('created_at',{ascending:false}),
      q('notification_templates').order('name'),
      q('platform_announcements').order('created_at',{ascending:false}),
      q('platform_pages').order('slug'),
      q('admin_users').order('created_at'),
      supabase.from('business_settings').select('*').limit(1).single(),
      q('glow_points_transactions').order('created_at',{ascending:false}).limit(100),
      q('branch_applications').order('created_at',{ascending:false}),
      q('admin_activity_log').order('created_at',{ascending:false}).limit(50),
      q('waitlist').order('created_at',{ascending:false}),
      q('referrals').order('created_at',{ascending:false}),
      q('invoices').order('created_at',{ascending:false}),
      q('sms_logs').order('created_at',{ascending:false}).limit(100),
      q('salon_subscriptions').order('created_at',{ascending:false}),
      q('withdrawals').order('created_at',{ascending:false}),
      q('wallets'),
    ]);
    const d = { branches:br.data||[], clients:cl.data||[], staff:st.data||[], services:sv.data||[], bookings:bk.data||[], reviews:rv.data||[], disputes:di.data||[], tickets:tk.data||[], ticketReplies:tr.data||[], reports:rc.data||[], refunds:rf.data||[], flags:ff.data||[], promos:pr.data||[], templates:nt.data||[], announcements:an.data||[], pages:pp.data||[], admins:au.data||[], settings:bs.data||null, points:pt.data||[], applications:ap.data||[], log:al.data||[], waitlist:wl.data||[], referrals:ref.data||[], invoices:inv.data||[], smsLogs:sms.data||[], subscriptions:sub.data||[], withdrawals:wd.data||[], wallets:wa.data||[] };
    setD(d);
    // Match admin user by auth email, or fall back to first admin
    if (authUser) {
      const matched = d.admins.find(a => a.email === authUser.email);
      setAdminUser(matched || d.admins[0] || { name: authUser.email, role: 'admin' });
    } else if (d.admins.length) {
      setAdminUser(d.admins[0]);
    }
    setLoading(false);
  };

  // Helpers
  const getName = (arr,id) => arr.find(x=>x.id===id)?.name||'Unknown';
  const brName = id => getName(D.branches,id);
  const clName = id => getName(D.clients,id);
  const svName = id => getName(D.services,id);
  const stName = id => getName(D.staff,id);
  const adName = id => getName(D.admins,id);
  const fmtD = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '-';
  const fmtDT = d => d ? new Date(d).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}) : '-';

  const filter = (items, fields) => {
    const q = (tSearch||searchQ).toLowerCase();
    if (!q) return items;
    return items.filter(item => fields.some(f => {
      const v = typeof f === 'function' ? f(item) : item[f];
      return v && String(v).toLowerCase().includes(q);
    }));
  };

  // Activity logging
  const log = async (action, entityType, entityId=null, details={}) => {
    if (!adminUser) return;
    await supabase.from('admin_activity_log').insert({ admin_id:adminUser.id, action, entity_type:entityType, entity_id:entityId, details });
  };

  // Stats
  const stats = useMemo(() => ({
    totalBranches: D.branches.length,
    activeBranches: D.branches.filter(b=>b.is_active).length,
    totalClients: D.clients.length,
    totalBookings: D.bookings.length,
    confirmed: D.bookings.filter(b=>b.status==='confirmed').length,
    completed: D.bookings.filter(b=>b.status==='completed').length,
    cancelled: D.bookings.filter(b=>b.status==='cancelled').length,
    noShows: D.bookings.filter(b=>b.status==='no_show').length,
    walkIns: D.bookings.filter(b=>b.is_walk_in).length,
    revenue: D.bookings.filter(b=>b.status==='completed').reduce((s,b)=>s+(b.total_amount||0),0),
    totalReviews: D.reviews.length,
    avgRating: D.reviews.length ? (D.reviews.reduce((s,r)=>s+(r.rating_average||r.rating_overall||0),0)/D.reviews.length).toFixed(1) : '0.0',
    openDisputes: D.disputes.filter(d=>d.status==='open'||d.status==='pending').length,
    openTickets: D.tickets.filter(t=>t.status==='open'||t.status==='assigned'||t.status==='in_progress').length,
    pendingReports: D.reports.filter(r=>r.status==='pending').length,
    pendingApps: D.applications.filter(a=>a.status==='pending').length,
    pendingWithdrawals: D.withdrawals.filter(w=>w.status==='pending'||w.status==='processing').length,
  }), [D]);

  // ============ ALL ACTIONS ============
  const updateBranch = async (id,status,reason='') => {
    await supabase.from('branches').update({approval_status:status,is_active:status==='approved',suspension_reason:reason}).eq('id',id);
    await log(`Branch ${status}`,'branch',id,{reason}); showToast(`Branch ${status}`); fetchAll();
  };
  const saveBranchDetails = async () => {
    if (!sel?.id) return;
    const { error } = await supabase.from('branches').update({
      name:form.name, location:form.location, phone:form.phone, email:form.email,
      description:form.description, open_time:form.open_time, close_time:form.close_time,
      slot_interval:form.slot_interval||30, images:form.images, updated_at:new Date().toISOString()
    }).eq('id',sel.id);
    if (error) { showToast(error.message,'error'); return; }
    await log('Branch updated','branch',sel.id); showToast('Branch updated'); closeModal(); fetchAll();
  };
  const updateClient = async (id,status,reason='') => {
    await supabase.from('clients').update({account_status:status,suspension_reason:reason}).eq('id',id);
    await log(`Client ${status}`,'client',id,{reason}); showToast(`Client ${status}`); fetchAll();
  };
  const updateBooking = async (id,status) => {
    await supabase.from('bookings').update({status,admin_override:true,override_by:adminUser?.id}).eq('id',id);
    await log(`Booking ${status}`,'booking',id); showToast(`Booking ${status}`); fetchAll();
  };
  const updateReview = async (id,status,reason='') => {
    await supabase.from('reviews').update({moderation_status:status,moderation_reason:reason,moderated_by:adminUser?.id,is_visible:status==='approved'}).eq('id',id);
    await log(`Review ${status}`,'review',id); showToast(`Review ${status}`); fetchAll();
  };
  const updateDispute = async (id,status,notes='',resType='') => {
    const u = {status,admin_notes:notes,assigned_to:adminUser?.id};
    if (resType) u.resolution_type=resType;
    if (status==='resolved') { u.resolved_at=new Date().toISOString(); u.resolved_by=adminUser?.id; }
    await supabase.from('disputes').update(u).eq('id',id);
    await log(`Dispute ${status}`,'dispute',id,{resType,notes}); showToast(`Dispute ${status}`); fetchAll();
  };
  const updateTicket = async (id,status) => {
    const u = {status};
    if (status==='assigned'||status==='in_progress') u.assigned_to=adminUser?.id;
    if (status==='resolved') u.resolved_at=new Date().toISOString();
    if (status==='closed') u.closed_at=new Date().toISOString();
    await supabase.from('support_tickets').update(u).eq('id',id);
    await log(`Ticket ${status}`,'ticket',id); showToast(`Ticket ${status}`); fetchAll();
  };
  const replyTicket = async (ticketId,message,isInternal=false) => {
    if (!message?.trim()) return;
    await supabase.from('support_responses').insert({
      ticket_id:ticketId, responder_type:'admin', responder_id:adminUser?.id,
      message, is_internal_note:isInternal
    });
    if (!isInternal) await supabase.from('support_tickets').update({status:'in_progress'}).eq('id',ticketId);
    await log('Replied to ticket','ticket',ticketId); showToast('Reply sent'); fetchAll();
  };
  const toggleFlag = async (id,enabled) => {
    await supabase.from('feature_flags').update({is_enabled:enabled}).eq('id',id);
    setD(p=>({...p,flags:p.flags.map(f=>f.id===id?{...f,is_enabled:enabled}:f)}));
    await log(`Feature ${enabled?'enabled':'disabled'}`,'feature_flag',id); showToast(`Feature ${enabled?'enabled':'disabled'}`);
  };
  const updateApp = async (id,status,notes='') => {
    await supabase.from('branch_applications').update({status,review_notes:notes,reviewed_by:adminUser?.id,reviewed_at:new Date().toISOString()}).eq('id',id);
    await log(`Application ${status}`,'application',id); showToast(`Application ${status}`); fetchAll();
  };
  const handleReport = async (id,status,action='',notes='') => {
    await supabase.from('reported_content').update({status,action_taken:action,review_notes:notes,reviewed_by:adminUser?.id,reviewed_at:new Date().toISOString()}).eq('id',id);
    await log(`Report ${status}`,'report',id); showToast(`Report ${status}`); fetchAll();
  };
  const adjustPoints = async (clientId,amount,reason) => {
    const c = D.clients.find(x=>x.id===clientId);
    if (!c||!amount) return;
    const amt = parseInt(amount);
    const np = Math.max(0,(c.glow_points||0)+amt);
    await supabase.from('clients').update({glow_points:np,total_points_earned:amt>0?(c.total_points_earned||0)+amt:c.total_points_earned}).eq('id',clientId);
    await supabase.from('glow_points_transactions').insert({client_id:clientId,type:amt>0?'admin_award':'admin_deduct',points:Math.abs(amt),description:reason||'Admin adjustment'});
    await log(`Points ${amt>0?'awarded':'deducted'}: ${Math.abs(amt)}`,'client',clientId); showToast(`${Math.abs(amt)} points ${amt>0?'awarded':'deducted'}`); fetchAll();
  };
  const createRefund = async () => {
    const {booking_id,amount,reason,refund_type} = form;
    if (!booking_id||!amount||!reason) { showToast('Fill all fields','error'); return; }
    const bk = D.bookings.find(b=>b.id===booking_id);
    await supabase.from('refunds').insert({booking_id,client_id:bk?.client_id,branch_id:bk?.branch_id,amount:parseFloat(amount),reason,refund_type:refund_type||'full',approved_by:adminUser?.id,status:'processing'});
    await log('Refund created','refund',booking_id,{amount,reason}); showToast('Refund created'); closeModal(); fetchAll();
  };
  const createAnnouncement = async () => {
    const {title,message,target,priority} = form;
    if (!title||!message) { showToast('Title and message required','error'); return; }
    await supabase.from('platform_announcements').insert({admin_id:adminUser?.id,title,message,target:target||'all',priority:priority||'normal',is_active:true});
    await log('Announcement created','announcement',null,{title}); showToast('Announcement published'); closeModal(); fetchAll();
  };
  const createPromo = async () => {
    const {name,description,type,value,code,target,max_uses,starts_at,ends_at} = form;
    if (!name||!type||!value||!starts_at||!ends_at) { showToast('Fill required fields','error'); return; }
    await supabase.from('promotions').insert({name,description,type,value:parseFloat(value),code:code||null,target:target||'all',max_uses:max_uses?parseInt(max_uses):null,starts_at,ends_at,is_active:true,created_by:adminUser?.id});
    await log('Promotion created','promotion',null,{name}); showToast('Promotion created'); closeModal(); fetchAll();
  };
  const createAdmin = async () => {
    const {name,email,role,phone} = form;
    if (!name||!email) { showToast('Name and email required','error'); return; }
    await supabase.from('admin_users').insert({name,email,role:role||'admin',phone});
    await log('Admin created','admin',null,{name,email}); showToast('Admin user created'); closeModal(); fetchAll();
  };
  const saveSettings = async () => {
    if (!editSettings||!D.settings) return;
    await supabase.from('business_settings').update(editSettings).eq('id',D.settings.id);
    await log('Settings updated','settings',D.settings.id);
    setD(p=>({...p,settings:{...p.settings,...editSettings}}));
    setEditSettings(null); showToast('Settings saved');
  };
  const savePage = async () => {
    await supabase.from('platform_pages').update({title:form.title,content:form.content,is_published:form.is_published!==false}).eq('id',form.id);
    await log('Page updated','page',form.id); showToast('Page saved'); closeModal(); fetchAll();
  };
  const saveTemplate = async () => {
    await supabase.from('notification_templates').update({body:form.body,subject:form.subject,is_active:form.is_active}).eq('id',form.id);
    await log('Template updated','template',form.id); showToast('Template saved'); closeModal(); fetchAll();
  };
  const deleteItem = async (table,id,label) => {
    await supabase.from(table).delete().eq('id',id);
    await log(`${label} deleted`,label,id); showToast(`${label} deleted`); fetchAll();
  };

  // Navigation
  const navItems = [
    {s:'Overview',items:[{id:'dashboard',l:'Dashboard',i:Icons.Dashboard},{id:'activity',l:'Activity Log',i:Icons.Activity}]},
    {s:'Management',items:[{id:'branches',l:'Branches',i:Icons.Branch,b:stats.pendingApps||null},{id:'services',l:'Services',i:Icons.Star},{id:'clients',l:'Clients',i:Icons.Users},{id:'bookings',l:'Bookings',i:Icons.Calendar},{id:'staff',l:'Staff',i:Icons.Users},{id:'waitlist',l:'Waitlist',i:Icons.Calendar},{id:'referrals',l:'Referrals',i:Icons.Gift}]},
    {s:'Moderation',items:[{id:'reviews',l:'Reviews',i:Icons.Star},{id:'disputes',l:'Disputes',i:Icons.Alert,b:stats.openDisputes||null},{id:'tickets',l:'Support Tickets',i:Icons.Ticket,b:stats.openTickets||null},{id:'reports',l:'Reported Content',i:Icons.Flag,b:stats.pendingReports||null}]},
    {s:'Finance & Growth',items:[{id:'financials',l:'Financials',i:Icons.Dollar},{id:'withdrawals',l:'Withdrawals',i:Icons.CreditCard,b:stats.pendingWithdrawals||null},{id:'invoices',l:'Invoices',i:Icons.FileText},{id:'subscriptions',l:'Subscriptions',i:Icons.CreditCard},{id:'points',l:'GlowPoints',i:Icons.Sparkles},{id:'promotions',l:'Promotions',i:Icons.Gift}]},
    {s:'Communications',items:[{id:'announcements',l:'Announcements',i:Icons.Megaphone},{id:'notifications',l:'Templates',i:Icons.Bell},{id:'sms',l:'SMS Logs',i:Icons.Phone}]},
    {s:'System',items:[{id:'settings',l:'Settings',i:Icons.Settings}]},
  ];
  const titles = {dashboard:'Dashboard',activity:'Activity Log',branches:'Branch Management',services:'Service Management',clients:'Client Management',bookings:'Booking Management',staff:'Staff Directory',reviews:'Review Moderation',disputes:'Dispute Resolution',tickets:'Support Tickets',reports:'Reported Content',financials:'Financial Overview',invoices:'Invoice Management',subscriptions:'Salon Subscriptions',points:'GlowPoints Management',promotions:'Promotions',announcements:'Announcements',notifications:'Notification Templates',sms:'SMS Logs',settings:'Platform Settings',waitlist:'Waitlist Management',referrals:'Referral Program'};

  // Shared components
  const TF = ({ph}) => <div className="tf"><Icons.Search /><input placeholder={ph||'Filter...'} value={tSearch} onChange={e=>setTSearch(e.target.value)} /></div>;
  const Badge = ({s}) => <span className={`bs ${s}`}>{s}</span>;
  const ActionBtns = ({children}) => <div style={{display:'flex',gap:4}}>{children}</div>;

  // ========== SIDEBAR ==========
  const Sidebar = () => (
    <div className={`sidebar ${sidebarOpen?'open':''}`}>
      <div className="sidebar-header"><div className="sidebar-logo">G</div><div className="sidebar-brand">Glow<span>Book</span> Admin</div></div>
      <nav className="sidebar-nav">
        {navItems.map(sec => <div key={sec.s} className="sidebar-section">
          <div className="sidebar-section-title">{sec.s}</div>
          {sec.items.map(n => <div key={n.id} className={`nav-item ${page===n.id?'active':''}`} onClick={()=>{setPage(n.id);setSidebarOpen(false);setTSearch('');}}>
            <n.i />{n.l}{n.b && <span className="badge">{n.b}</span>}
          </div>)}
        </div>)}
      </nav>
      <div className="sidebar-footer">
        <div className="admin-profile"><div className="admin-avatar">{adminUser?.name?.[0]||'A'}</div><div><div className="admin-name">{adminUser?.name||'Admin'}</div><div className="admin-role">{adminUser?.role?.replace('_',' ')}</div></div></div>
        {authUser && <div style={{fontSize:11,color:'rgba(255,255,255,0.4)',padding:'4px 8px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{authUser.email}</div>}
        <button onClick={handleLogout} style={{width:'100%',marginTop:8,padding:'8px 12px',borderRadius:8,border:'1px solid #2a1f23',background:'transparent',color:'rgba(255,255,255,0.55)',fontSize:12,fontWeight:500,cursor:'pointer',fontFamily:'DM Sans',textAlign:'left'}}>
          ← Sign Out
        </button>
      </div>
    </div>
  );

  // ========== DASHBOARD ==========
  const Dashboard = () => (
    <div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Branches</span><div className="stat-icon gold"><Icons.Branch /></div></div><div className="stat-value">{stats.totalBranches}</div><div className="stat-change up">{stats.activeBranches} active</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Clients</span><div className="stat-icon blue"><Icons.Users /></div></div><div className="stat-value">{stats.totalClients}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Bookings</span><div className="stat-icon green"><Icons.Calendar /></div></div><div className="stat-value">{stats.totalBookings}</div><div className="stat-change up">{stats.confirmed} upcoming</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Revenue</span><div className="stat-icon gold"><Icons.Dollar /></div></div><div className="stat-value">{FP(stats.revenue)}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Reviews</span><div className="stat-icon purple"><Icons.Star /></div></div><div className="stat-value">{stats.totalReviews}</div><div className="stat-change up">Avg: {stats.avgRating} ★</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Open Issues</span><div className="stat-icon red"><Icons.Alert /></div></div><div className="stat-value">{stats.openDisputes+stats.openTickets}</div><div className="stat-change down">{stats.openDisputes} disputes, {stats.openTickets} tickets</div></div>
      </div>
      {stats.pendingWithdrawals > 0 && (
        <div style={{background:'#fff8e1',border:'1.5px solid #ffe082',borderRadius:12,padding:'14px 20px',marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}} onClick={()=>setPage('withdrawals')}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:18}}>💸</span>
            <div><span style={{fontWeight:700,fontSize:14,color:'#6d5600'}}>{stats.pendingWithdrawals} pending payout{stats.pendingWithdrawals!==1?'s':''}</span><span style={{fontSize:13,color:'#8a6d00',marginLeft:8}}>require manual payment</span></div>
          </div>
          <button className="btn btn-sm" style={{background:'#e65100',color:'#fff'}}>Review Now →</button>
        </div>
      )}
      <div className="tc"><div className="th"><span className="tt">Recent Bookings</span><button className="btn btn-secondary btn-sm" onClick={()=>setPage('bookings')}>View All</button></div>
        <table><thead><tr><th>Client</th><th>Service</th><th>Branch</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead><tbody>
          {D.bookings.slice(0,5).map(b=><tr key={b.id}><td>{clName(b.client_id)}</td><td>{svName(b.service_id)}</td><td>{brName(b.branch_id)}</td><td>{b.booking_date} {b.booking_time}</td><td>{FP(b.total_amount)}</td><td><Badge s={b.status}/></td></tr>)}
          {!D.bookings.length && <tr><td colSpan="6" className="es">No bookings yet</td></tr>}
        </tbody></table>
      </div>
    </div>
  );

  // ========== ACTIVITY LOG ==========
  const ActivityLog = () => (
    <div className="tc"><div className="th"><span className="tt">Recent Activity</span><button className="btn btn-secondary btn-sm" onClick={fetchAll}><Icons.Refresh /> Refresh</button></div>
      <table><thead><tr><th>Admin</th><th>Action</th><th>Entity</th><th>Time</th></tr></thead><tbody>
        {D.log.map(a=><tr key={a.id}><td>{adName(a.admin_id)}</td><td style={{fontWeight:600,color:'#2c1810'}}>{a.action}</td><td>{a.entity_type}</td><td>{fmtDT(a.created_at)}</td></tr>)}
        {!D.log.length && <tr><td colSpan="4" className="es">No activity logged yet. Actions you take will appear here.</td></tr>}
      </tbody></table>
    </div>
  );

  // ========== BRANCHES ==========
  const Branches = () => {
    const f = filter(D.branches,['name','location','email']);
    const pending = D.applications.filter(a=>a.status==='pending');
    return (<div>
      {pending.length>0 && <div className="card" style={{borderColor:'#c9a84c'}}>
        <div className="card-header"><span className="card-title" style={{color:'#c9a84c'}}>Pending Applications ({pending.length})</span></div>
        {pending.map(a=><div key={a.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:'1px solid #ede5df'}}>
          <div><div style={{fontWeight:600,color:'#2c1810'}}>{a.business_name}</div><div style={{fontSize:13,color:'#8a7068'}}>{a.owner_name} · {a.location} · {fmtD(a.created_at)}</div></div>
          <ActionBtns><button className="btn btn-success btn-sm" onClick={()=>updateApp(a.id,'approved')}>Approve</button><button className="btn btn-danger btn-sm" onClick={()=>updateApp(a.id,'rejected')}>Reject</button></ActionBtns>
        </div>)}
      </div>}
      <div className="tc"><div className="th"><span className="tt">All Branches ({f.length})</span><TF ph="Search branches..."/></div>
        <table><thead><tr><th>Name</th><th>Location</th><th>Rating</th><th>Reviews</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {f.map(b=><tr key={b.id}><td><div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:28,borderRadius:6,overflow:'hidden',background:'#f0ebe7',flexShrink:0}}>
              {b.images?.[0] ? <img src={b.images[0]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,color:'#8a7068'}}>⌂</div>}
            </div>
            <span style={{fontWeight:600,color:'#2c1810'}}>{b.name}</span>
          </div></td><td>{b.location}</td><td style={{color:'#c9a84c'}}>{b.rating?.toFixed(1)||'0.0'} ★</td><td>{b.review_count||0}</td><td><Badge s={b.approval_status||'approved'}/></td>
            <td><ActionBtns><button className="btn-icon" onClick={()=>openModal('branch-detail',b)}><Icons.Eye /></button>
              {b.approval_status!=='suspended'?<button className="btn-icon" onClick={()=>updateBranch(b.id,'suspended')}><Icons.X /></button>:<button className="btn-icon" onClick={()=>updateBranch(b.id,'approved')}><Icons.Check /></button>}
            </ActionBtns></td></tr>)}
        </tbody></table>
      </div>
    </div>);
  };

  // ========== CLIENTS ==========
  const Clients = () => {
    const f = filter(D.clients,['name','phone','email']);
    return (<div className="tc"><div className="th"><span className="tt">All Clients ({f.length})</span><TF ph="Search clients..."/></div>
      <table><thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Bookings</th><th>GlowPoints</th><th>Spent</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {f.map(c=><tr key={c.id}><td style={{fontWeight:600,color:'#2c1810'}}>{c.name}</td><td>{c.phone}</td><td>{c.email||'-'}</td><td>{c.total_bookings||0}</td><td style={{color:'#c47d5a',fontWeight:600}}>{c.glow_points||0}</td><td>{FP(c.total_spent||0)}</td><td><Badge s={c.account_status||'active'}/></td>
          <td><ActionBtns>
            <button className="btn-icon" onClick={()=>openModal('client-detail',c)}><Icons.Eye /></button>
            <button className="btn-icon" title="Adjust Points" onClick={()=>openModal('adjust-points',c,{points:'',reason:''})}><Icons.Sparkles /></button>
            {(c.account_status||'active')!=='banned'?<button className="btn-icon" onClick={()=>updateClient(c.id,'suspended')}><Icons.X /></button>:<button className="btn-icon" onClick={()=>updateClient(c.id,'active')}><Icons.Check /></button>}
          </ActionBtns></td></tr>)}
        {!f.length && <tr><td colSpan="8" className="es">No clients found</td></tr>}
      </tbody></table>
    </div>);
  };

  // ========== BOOKINGS ==========
  const Bookings = () => {
    const f = filter(D.bookings,[b=>clName(b.client_id),b=>svName(b.service_id),b=>brName(b.branch_id),'status']);
    return (<div>
      <div style={{marginBottom:16}}><button className="btn btn-primary btn-sm" onClick={()=>openModal('create-refund')}><Icons.Plus /> Issue Refund</button></div>
      <div className="tc"><div className="th"><span className="tt">All Bookings ({f.length})</span><TF ph="Search bookings..."/></div>
        <table><thead><tr><th>Client</th><th>Service</th><th>Branch</th><th>Staff</th><th>Date</th><th>Amount</th><th>Deposit</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {f.map(b=><tr key={b.id}><td>{clName(b.client_id)}{b.is_walk_in&&<span style={{fontSize:10,color:'#c9a84c',marginLeft:4}}>WALK-IN</span>}</td><td>{svName(b.service_id)}</td><td>{brName(b.branch_id)}</td><td>{stName(b.staff_id)}</td><td>{b.booking_date} {b.booking_time}</td><td>{FP(b.total_amount)}{b.discount_amount>0&&<div style={{fontSize:10,color:'#c9a84c'}}>-{FP(b.discount_amount)}</div>}</td><td>{b.deposit_paid?<span style={{color:'#4a9d6e'}}>Paid</span>:<span style={{color:'#c94c4c'}}>No</span>}</td><td><Badge s={b.status}/></td>
            <td><ActionBtns>
              <button className="btn-icon" onClick={()=>openModal('booking-detail',b)}><Icons.Eye /></button>
              {b.status==='pending'&&<button className="btn-icon" onClick={()=>updateBooking(b.id,'confirmed')}><Icons.Check /></button>}
              {b.status==='confirmed'&&<button className="btn-icon" title="Mark Arrived" onClick={()=>updateBooking(b.id,'arrived')} style={{color:'#00695c'}}><Icons.Check /></button>}
              {(b.status==='arrived'||b.status==='in_progress')&&<button className="btn-icon" title="Complete" onClick={()=>updateBooking(b.id,'completed')} style={{color:'#4a9d6e'}}><Icons.Check /></button>}
              {(b.status==='confirmed'||b.status==='pending')&&<><button className="btn-icon" onClick={()=>updateBooking(b.id,'cancelled')}><Icons.X /></button><button className="btn-icon" title="No-show" onClick={()=>updateBooking(b.id,'no_show')} style={{color:'#880e4f'}}><Icons.NoShow /></button></>}
            </ActionBtns></td></tr>)}
          {!f.length && <tr><td colSpan="9" className="es">No bookings found</td></tr>}
        </tbody></table>
      </div>
      {D.refunds.length>0 && <div className="tc"><div className="th"><span className="tt">Refunds ({D.refunds.length})</span></div>
        <table><thead><tr><th>Client</th><th>Branch</th><th>Amount</th><th>Type</th><th>Reason</th><th>Status</th><th>Date</th></tr></thead><tbody>
          {D.refunds.map(r=><tr key={r.id}><td>{clName(r.client_id)}</td><td>{brName(r.branch_id)}</td><td style={{color:'#c94c4c',fontWeight:600}}>{FP(r.amount)}</td><td>{r.refund_type}</td><td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.reason}</td><td><Badge s={r.status}/></td><td>{fmtD(r.created_at)}</td></tr>)}
        </tbody></table>
      </div>}
    </div>);
  };

  // ========== STAFF ==========
  const Staff = () => {
    const f = filter(D.staff,['name','role',s=>brName(s.branch_id)]);
    return (<div className="tc"><div className="th"><span className="tt">All Staff ({f.length})</span><TF ph="Search staff..."/></div>
      <table><thead><tr><th>Name</th><th>Role</th><th>Branch</th><th>Rating</th><th>Bookings</th><th>Status</th></tr></thead><tbody>
        {f.map(s=><tr key={s.id}><td><div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:'50%',overflow:'hidden',background:'#f0ebe7',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            {s.profile_photo ? <img src={s.profile_photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{color:'#8a7068',fontSize:12,fontWeight:600}}>{s.name?.[0]}</span>}
          </div>
          <span style={{fontWeight:600,color:'#2c1810'}}>{s.name}</span>
        </div></td><td>{s.role}</td><td>{brName(s.branch_id)}</td><td style={{color:'#c9a84c'}}>{s.rating?.toFixed(1)||'0.0'} ★</td><td>{s.bookings_completed||0}</td><td><Badge s={s.is_active?'active':'suspended'}/></td></tr>)}
        {!f.length && <tr><td colSpan="6" className="es">No staff found</td></tr>}
      </tbody></table>
    </div>);
  };

  // ========== REVIEWS ==========
  const Reviews = () => {
    const f = filter(D.reviews,[r=>clName(r.client_id),r=>brName(r.branch_id),'review_text']);
    return (<div className="tc"><div className="th"><span className="tt">All Reviews ({f.length})</span><TF ph="Search reviews..."/></div>
      <table><thead><tr><th>Client</th><th>Branch</th><th>Rating</th><th>Review</th><th>Moderation</th><th>Date</th><th>Actions</th></tr></thead><tbody>
        {f.map(r=><tr key={r.id}><td>{clName(r.client_id)}</td><td>{brName(r.branch_id)}</td><td style={{color:'#c9a84c',fontWeight:600}}>{(r.rating_average||r.rating_overall||0).toFixed(1)} ★</td><td style={{maxWidth:250,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.review_text||'-'}</td><td><Badge s={r.moderation_status||'approved'}/></td><td>{fmtD(r.created_at)}</td>
          <td><ActionBtns><button className="btn-icon" onClick={()=>openModal('review-detail',r)}><Icons.Eye /></button>
            {(r.moderation_status||'approved')==='approved'?<button className="btn-icon" onClick={()=>updateReview(r.id,'hidden')}><Icons.X /></button>:<button className="btn-icon" onClick={()=>updateReview(r.id,'approved')}><Icons.Check /></button>}
          </ActionBtns></td></tr>)}
        {!f.length && <tr><td colSpan="7" className="es">No reviews found</td></tr>}
      </tbody></table>
    </div>);
  };

  // ========== DISPUTES ==========
  const Disputes = () => {
    const f = filter(D.disputes,[d=>clName(d.client_id),d=>brName(d.branch_id),'dispute_type','description','status']);
    return (<div className="tc"><div className="th"><span className="tt">Disputes ({f.length})</span><TF ph="Search disputes..."/></div>
      <table><thead><tr><th>Client</th><th>Branch</th><th>Type</th><th>Description</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>
        {f.map(d=><tr key={d.id}><td>{clName(d.client_id)}</td><td>{brName(d.branch_id)}</td><td>{d.dispute_type||d.type||'-'}</td><td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{d.description||'-'}</td><td><Badge s={d.status||'pending'}/></td><td>{fmtD(d.created_at)}</td>
          <td><button className="btn-icon" onClick={()=>openModal('dispute-detail',d,{notes:'',resolution:''})}><Icons.Eye /></button></td></tr>)}
        {!f.length && <tr><td colSpan="7" className="es">No disputes</td></tr>}
      </tbody></table>
    </div>);
  };

  // ========== TICKETS (with reply count) ==========
  const Tickets = () => {
    const f = filter(D.tickets,['ticket_number','subject','category','status']);
    const replyCount = id => D.ticketReplies.filter(r=>r.ticket_id===id).length;
    return (<div className="tc"><div className="th"><span className="tt">Support Tickets ({f.length})</span><TF ph="Search tickets..."/></div>
      <table><thead><tr><th>Ticket #</th><th>Subject</th><th>Category</th><th>From</th><th>Priority</th><th>Status</th><th>Replies</th><th>Date</th><th>Actions</th></tr></thead><tbody>
        {f.map(t=><tr key={t.id}><td style={{fontWeight:600,color:'#c47d5a'}}>{t.ticket_number}</td><td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.subject}</td><td>{t.category}</td><td>{t.submitted_by_type}</td><td><Badge s={t.priority==='urgent'?'cancelled':t.priority==='high'?'pending':'active'}/></td><td><Badge s={t.status}/></td><td>{replyCount(t.id)}</td><td>{fmtD(t.created_at)}</td>
          <td><ActionBtns>
            <button className="btn-icon" onClick={()=>openModal('ticket-detail',t,{reply:'',isInternal:false})}><Icons.Eye /></button>
            {t.status==='open'&&<button className="btn-icon" title="Assign" onClick={()=>updateTicket(t.id,'assigned')}><Icons.Check /></button>}
          </ActionBtns></td></tr>)}
        {!f.length && <tr><td colSpan="9" className="es">No tickets found</td></tr>}
      </tbody></table>
    </div>);
  };

  // ========== REPORTS ==========
  const Reports = () => (
    <div className="tc"><div className="th"><span className="tt">Reported Content ({D.reports.length})</span></div>
      <table><thead><tr><th>Type</th><th>Reason</th><th>Description</th><th>Reporter</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>
        {D.reports.map(r=><tr key={r.id}><td>{r.content_type}</td><td>{r.reason}</td><td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.description||'-'}</td><td>{r.reporter_type}</td><td><Badge s={r.status}/></td><td>{fmtD(r.created_at)}</td>
          <td>{r.status==='pending'&&<ActionBtns><button className="btn btn-danger btn-sm" onClick={()=>handleReport(r.id,'action_taken','content_removed')}>Remove</button><button className="btn btn-secondary btn-sm" onClick={()=>handleReport(r.id,'dismissed')}>Dismiss</button></ActionBtns>}</td></tr>)}
        {!D.reports.length && <tr><td colSpan="7" className="es">No reports</td></tr>}
      </tbody></table>
    </div>
  );

  // ========== FINANCIALS ==========
  const Financials = () => (
    <div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Revenue</span><div className="stat-icon gold"><Icons.Dollar /></div></div><div className="stat-value">{FP(stats.revenue)}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Platform Fees ({D.settings?.platform_fee||5}%)</span><div className="stat-icon green"><Icons.TrendUp /></div></div><div className="stat-value">{FP(stats.revenue*(D.settings?.platform_fee||5)/100)}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Refunds</span><div className="stat-icon red"><Icons.Alert /></div></div><div className="stat-value">{FP(D.refunds.reduce((s,r)=>s+(r.amount||0),0))}</div><div className="stat-change down">{D.refunds.length} issued</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Cancelled</span><div className="stat-icon red"><Icons.X /></div></div><div className="stat-value">{stats.cancelled}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">No-shows</span><div className="stat-icon red"><Icons.NoShow /></div></div><div className="stat-value">{stats.noShows}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Walk-ins</span><div className="stat-icon blue"><Icons.WalkIn /></div></div><div className="stat-value">{stats.walkIns}</div></div>
      </div>
      <div className="tc"><div className="th"><span className="tt">Revenue by Branch</span></div>
        <table><thead><tr><th>Branch</th><th>Completed</th><th>Revenue</th><th>Platform Fee</th></tr></thead><tbody>
          {D.branches.map(b=>{const bk=D.bookings.filter(x=>x.branch_id===b.id&&x.status==='completed');const rev=bk.reduce((s,x)=>s+(x.total_amount||0),0);
            return <tr key={b.id}><td style={{fontWeight:600,color:'#2c1810'}}>{b.name}</td><td>{bk.length}</td><td>{FP(rev)}</td><td>{FP(rev*(D.settings?.platform_fee||5)/100)}</td></tr>;})}
        </tbody></table>
      </div>
    </div>
  );

  // ========== WITHDRAWALS (Manual Payout Management) ==========
  const Withdrawals = () => {
    const [confirmAction, setConfirmAction] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [wdFilter, setWdFilter] = useState('pending');

    const pending = D.withdrawals.filter(w=>w.status==='pending'||w.status==='processing');
    const completed = D.withdrawals.filter(w=>w.status==='completed');
    const rejected = D.withdrawals.filter(w=>w.status==='rejected'||w.status==='failed');
    const totalPaidOut = completed.reduce((s,w)=>s+(parseFloat(w.amount)||0),0);
    const totalPending = pending.reduce((s,w)=>s+(parseFloat(w.amount)||0),0);

    const filteredWds = wdFilter==='pending' ? pending : wdFilter==='completed' ? completed : wdFilter==='rejected' ? rejected : D.withdrawals;
    const searchedWds = filter(filteredWds, [w=>brName(w.branch_id), 'withdraw_to_phone', 'withdraw_to_name', 'network', 'status']);

    const processWithdrawal = async (id, action) => {
      setProcessing(id);
      try {
        if (action === 'mark_paid') {
          await supabase.from('withdrawals').update({status:'completed', processed_at:new Date().toISOString(), processed_by:adminUser?.id}).eq('id',id);
          const wd = D.withdrawals.find(w=>w.id===id);
          if (wd) {
            await supabase.from('wallets').update({total_withdrawn: (D.wallets.find(w=>w.branch_id===wd.branch_id)?.total_withdrawn||0) + parseFloat(wd.amount)}).eq('branch_id',wd.branch_id);
          }
          await log('Withdrawal marked as paid','withdrawal',id,{amount:wd?.amount,phone:wd?.withdraw_to_phone});
          showToast('Withdrawal marked as paid ✓');
        } else {
          const wd = D.withdrawals.find(w=>w.id===id);
          await supabase.from('withdrawals').update({status:'rejected', processed_at:new Date().toISOString(), processed_by:adminUser?.id}).eq('id',id);
          if (wd) {
            const wallet = D.wallets.find(w=>w.branch_id===wd.branch_id);
            if (wallet) {
              await supabase.from('wallets').update({balance: (parseFloat(wallet.balance)||0) + parseFloat(wd.amount)}).eq('branch_id',wd.branch_id);
            }
          }
          await log('Withdrawal rejected','withdrawal',id,{amount:wd?.amount,phone:wd?.withdraw_to_phone});
          showToast('Withdrawal rejected — funds returned to wallet');
        }
        fetchAll();
      } catch(e) { showToast('Error: '+e.message,'error'); }
      setProcessing(null);
      setConfirmAction(null);
    };

    return (<div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Pending Payouts</span><div className="stat-icon" style={{background:'#fff3e0',color:'#e65100'}}><Icons.Clock /></div></div><div className="stat-value">{pending.length}</div><div className="stat-change">{FP(totalPending)} awaiting payment</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Paid Out</span><div className="stat-icon green"><Icons.Check /></div></div><div className="stat-value">{FP(totalPaidOut)}</div><div className="stat-change up">{completed.length} completed</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Rejected</span><div className="stat-icon red"><Icons.X /></div></div><div className="stat-value">{rejected.length}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">All Time</span><div className="stat-icon gold"><Icons.Dollar /></div></div><div className="stat-value">{D.withdrawals.length}</div></div>
      </div>

      {/* Pending payouts requiring action */}
      {pending.length > 0 && (
        <div style={{background:'#fff8e1',border:'1.5px solid #ffe082',borderRadius:12,padding:'16px 20px',marginBottom:20,display:'flex',alignItems:'flex-start',gap:10}}>
          <span style={{fontSize:18,flexShrink:0}}>⚠️</span>
          <div>
            <div style={{fontWeight:700,fontSize:14,color:'#6d5600',marginBottom:2}}>Manual Payouts Required</div>
            <div style={{fontSize:13,color:'#8a6d00',lineHeight:1.5}}>There are <strong>{pending.length}</strong> pending withdrawal requests totalling <strong>{FP(totalPending)}</strong>. Send the funds via mobile money to each recipient, then click <strong>"Mark as Paid"</strong> to confirm. Click "Reject" to return funds to the salon's wallet.</div>
          </div>
        </div>
      )}

      <div className="tc">
        <div className="th">
          <span className="tt">Withdrawal Requests ({searchedWds.length})</span>
          <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
            {[{k:'pending',l:'Pending',c:'#e65100'},{k:'completed',l:'Paid',c:'#2e7d32'},{k:'rejected',l:'Rejected',c:'#c94c4c'},{k:'all',l:'All',c:'#8a7068'}].map(f=>
              <button key={f.k} onClick={()=>setWdFilter(f.k)} style={{padding:'5px 12px',borderRadius:8,border:wdFilter===f.k?'none':`1.5px solid #ede5df`,background:wdFilter===f.k?f.c:'transparent',color:wdFilter===f.k?'#fff':f.c,fontSize:12,fontWeight:600,cursor:'pointer'}}>{f.l}</button>
            )}
            <TF ph="Search withdrawals..."/>
          </div>
        </div>
        <table>
          <thead><tr><th>Branch</th><th>Amount</th><th>Phone</th><th>Name</th><th>Network</th><th>Status</th><th>Requested</th><th style={{minWidth:200}}>Actions</th></tr></thead>
          <tbody>
            {searchedWds.map(wd=>(
              <tr key={wd.id} style={{background: (wd.status==='pending'||wd.status==='processing') ? '#fffdf5' : 'transparent'}}>
                <td style={{fontWeight:600,color:'#2c1810'}}>{brName(wd.branch_id)}</td>
                <td style={{fontWeight:700,color:'#2c1810',fontSize:15}}>{FP(wd.amount)}</td>
                <td style={{fontWeight:600,color:'#c47d5a'}}>{wd.withdraw_to_phone||'-'}</td>
                <td>{wd.withdraw_to_name||'-'}</td>
                <td style={{textTransform:'uppercase',fontSize:12,fontWeight:600}}>{wd.network||'-'}</td>
                <td><span className={`bs ${wd.status==='completed'?'completed':wd.status==='rejected'||wd.status==='failed'?'rejected':'pending'}`}>{wd.status==='completed'?'Paid ✓':wd.status}</span></td>
                <td style={{fontSize:12}}>{fmtDT(wd.created_at)}</td>
                <td>
                  {(wd.status==='pending'||wd.status==='processing') ? (
                    confirmAction?.id===wd.id ? (
                      <div style={{background:'#fff',border:`1.5px solid ${confirmAction.type==='mark_paid'?'#4a9d6e':'#c94c4c'}`,borderRadius:10,padding:12,minWidth:220}}>
                        <div style={{fontSize:12,fontWeight:700,marginBottom:6,color:'#2c1810'}}>
                          {confirmAction.type==='mark_paid'?'✅ Confirm Payment Sent':'❌ Confirm Rejection'}
                        </div>
                        <div style={{fontSize:11,color:'#8a7068',marginBottom:10,lineHeight:1.5}}>
                          {confirmAction.type==='mark_paid'
                            ? `Have you sent ${FP(wd.amount)} to ${wd.withdraw_to_phone} (${(wd.network||'mobile').toUpperCase()})?`
                            : `Reject this payout of ${FP(wd.amount)}? Funds will be returned to ${brName(wd.branch_id)}'s wallet.`}
                        </div>
                        <div style={{display:'flex',gap:6}}>
                          <button disabled={processing===wd.id} className={`btn btn-sm ${confirmAction.type==='mark_paid'?'btn-success':'btn-danger'}`}
                            onClick={()=>processWithdrawal(wd.id,confirmAction.type)}
                            style={{opacity:processing===wd.id?0.5:1}}
                          >{processing===wd.id?'Processing...':confirmAction.type==='mark_paid'?"Yes, I've Paid":'Yes, Reject'}</button>
                          <button className="btn btn-secondary btn-sm" onClick={()=>setConfirmAction(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <ActionBtns>
                        <button className="btn btn-success btn-sm" onClick={()=>setConfirmAction({id:wd.id,type:'mark_paid'})}>✓ Mark as Paid</button>
                        <button className="btn btn-danger btn-sm" onClick={()=>setConfirmAction({id:wd.id,type:'reject'})}>Reject</button>
                      </ActionBtns>
                    )
                  ) : (
                    <span style={{fontSize:11,color:'#8a7068'}}>{wd.processed_at ? `Processed ${fmtDT(wd.processed_at)}` : '—'}</span>
                  )}
                </td>
              </tr>
            ))}
            {!searchedWds.length && <tr><td colSpan="8" className="es">No withdrawals found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>);
  };

  // ========== GLOWPOINTS ==========
  const Points = () => {
    const circ = D.clients.reduce((s,c)=>s+(c.glow_points||0),0);
    const earned = D.clients.reduce((s,c)=>s+(c.total_points_earned||0),0);
    return (<div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">In Circulation</span><div className="stat-icon gold"><Icons.Sparkles /></div></div><div className="stat-value">{circ.toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Earned</span><div className="stat-icon blue"><Icons.TrendUp /></div></div><div className="stat-value">{earned.toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Spent</span><div className="stat-icon green"><Icons.Gift /></div></div><div className="stat-value">{(earned-circ).toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Rate</span><div className="stat-icon purple"><Icons.Dollar /></div></div><div className="stat-value">{D.settings?.points_to_currency_rate||0.1} K/pt</div></div>
      </div>
      <div className="tc"><div className="th"><span className="tt">Client Points</span><TF ph="Search clients..."/></div>
        <table><thead><tr><th>Client</th><th>Current</th><th>Earned</th><th>Spent</th><th>Actions</th></tr></thead><tbody>
          {filter(D.clients,['name']).sort((a,b)=>(b.glow_points||0)-(a.glow_points||0)).map(c=><tr key={c.id}><td style={{fontWeight:600,color:'#2c1810'}}>{c.name}</td><td style={{color:'#c47d5a',fontWeight:600}}>{c.glow_points||0}</td><td>{c.total_points_earned||0}</td><td>{(c.total_points_earned||0)-(c.glow_points||0)}</td>
            <td><button className="btn btn-secondary btn-sm" onClick={()=>openModal('adjust-points',c,{points:'',reason:''})}><Icons.Sparkles /> Adjust</button></td></tr>)}
        </tbody></table>
      </div>
    </div>);
  };

  // ========== PROMOTIONS ==========
  const Promotions = () => (
    <div>
      <div style={{marginBottom:16}}><button className="btn btn-primary" onClick={()=>openModal('create-promo')}><Icons.Plus /> Create Promotion</button></div>
      <div className="tc"><div className="th"><span className="tt">Promotions ({D.promos.length})</span></div>
        <table><thead><tr><th>Name</th><th>Type</th><th>Code</th><th>Value</th><th>Uses</th><th>Active</th><th>Period</th><th>Actions</th></tr></thead><tbody>
          {D.promos.map(p=><tr key={p.id}><td style={{fontWeight:600,color:'#2c1810'}}>{p.name}</td><td>{p.type?.replace(/_/g,' ')}</td><td style={{color:'#c47d5a',fontWeight:600}}>{p.code||'-'}</td><td>{p.value}</td><td>{p.uses_count||0}/{p.max_uses||'∞'}</td><td>{p.is_active?'✅':'❌'}</td><td style={{fontSize:12}}>{fmtD(p.starts_at)} - {fmtD(p.ends_at)}</td>
            <td><button className="btn-icon" onClick={()=>deleteItem('promotions',p.id,'Promotion')}><Icons.Trash /></button></td></tr>)}
          {!D.promos.length && <tr><td colSpan="8" className="es">No promotions</td></tr>}
        </tbody></table>
      </div>
    </div>
  );

  // ========== ANNOUNCEMENTS ==========
  const Announcements = () => (
    <div>
      <div style={{marginBottom:16}}><button className="btn btn-primary" onClick={()=>openModal('create-announcement')}><Icons.Plus /> Create Announcement</button></div>
      <div className="tc"><div className="th"><span className="tt">Announcements ({D.announcements.length})</span></div>
        <table><thead><tr><th>Title</th><th>Message</th><th>Target</th><th>Priority</th><th>Active</th><th>Created</th><th>Actions</th></tr></thead><tbody>
          {D.announcements.map(a=><tr key={a.id}><td style={{fontWeight:600,color:'#2c1810'}}>{a.title}</td><td style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.message}</td><td>{a.target}</td><td><Badge s={a.priority==='urgent'?'cancelled':a.priority==='high'?'pending':'active'}/></td><td>{a.is_active?'✅':'❌'}</td><td>{fmtD(a.created_at)}</td>
            <td><button className="btn-icon" onClick={()=>deleteItem('platform_announcements',a.id,'Announcement')}><Icons.Trash /></button></td></tr>)}
          {!D.announcements.length && <tr><td colSpan="7" className="es">No announcements</td></tr>}
        </tbody></table>
      </div>
    </div>
  );

  // ========== NOTIFICATION TEMPLATES ==========
  const Templates = () => (
    <div className="tc"><div className="th"><span className="tt">Notification Templates ({D.templates.length})</span></div>
      <table><thead><tr><th>Name</th><th>Type</th><th>Event</th><th>Active</th><th>Actions</th></tr></thead><tbody>
        {D.templates.map(n=><tr key={n.id}><td style={{fontWeight:600,color:'#2c1810'}}>{n.name.replace(/_/g,' ')}</td><td><Badge s={n.type==='sms'?'confirmed':'active'}/></td><td>{n.event?.replace(/_/g,' ')}</td><td>{n.is_active?'✅':'❌'}</td>
          <td><button className="btn-icon" onClick={()=>openModal('edit-template',n,{id:n.id,body:n.body,subject:n.subject||'',is_active:n.is_active})}><Icons.Edit /></button></td></tr>)}
      </tbody></table>
    </div>
  );

  // ========== SETTINGS ==========
  const settingsFields = {'Business Name':'business_name','Support Email':'support_email','Support Phone':'support_phone','Platform Fee (%)':'platform_fee','Late Payment Penalty (K)':'late_payment_penalty','Payment Due Days':'payment_due_days','Points per Booking':'points_per_booking','Points per Review':'points_per_review','Points per Referral':'points_per_referral','First Booking Bonus':'points_first_booking','Points to Currency Rate':'points_to_currency_rate','Inactivity Expiry (months)':'points_inactivity_expiry_months','Dispute Cash Comp. (K)':'dispute_cash_compensation','Dispute Points Comp.':'dispute_points_compensation','Review Edit Days':'review_edit_days'};

  // ========== SERVICES MANAGEMENT ==========
  const Services = () => {
    const f = filter(D.services,['name','category']);
    return (<div>
      <div className="card">
        <div className="card-header"><span className="card-title">All Services ({f.length})</span>
          <button className="btn btn-primary btn-sm" onClick={()=>openModal('create-service',null,{name:'',category:'',description:'',price:0,price_max:0,duration:30,duration_max:60,deposit:0,image:'',branch_id:''})}><Icons.Plus /> Add Service</button>
        </div>
        <TF ph="Search services..." />
        <table><thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Duration</th><th>Branch</th><th>Status</th><th>Actions</th></tr></thead><tbody>
          {f.map(s=><tr key={s.id}>
            <td>{s.image ? <img src={s.image} alt="" style={{width:40,height:40,borderRadius:8,objectFit:'cover'}} /> : <div style={{width:40,height:40,borderRadius:8,background:'#f0ebe7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>✨</div>}</td>
            <td style={{fontWeight:600,color:'#2c1810'}}>{s.name}</td><td>{s.category||'-'}</td>
            <td>{FP(s.price)}{s.price_max>s.price?` – ${FP(s.price_max)}`:''}</td>
            <td>{s.duration}{s.duration_max>s.duration?`–${s.duration_max}`:''} min</td>
            <td>{s.branch_id ? brName(s.branch_id) : 'All'}</td>
            <td><Badge s={s.is_active?'active':'suspended'}/></td>
            <td><ActionBtns><button className="btn-icon" onClick={()=>openModal('edit-service',s,{name:s.name,category:s.category||'',description:s.description||'',price:s.price||0,price_max:s.price_max||0,duration:s.duration||30,duration_max:s.duration_max||60,deposit:s.deposit||0,image:s.image||'',branch_id:s.branch_id||'',is_active:s.is_active})}><Icons.Edit /></button></ActionBtns></td>
          </tr>)}
        </tbody></table>
      </div>
    </div>);
  };

  // ========== WAITLIST ==========
  const Waitlist = () => {
    const f = filter(D.waitlist||[],[w=>clName(w.client_id),w=>brName(w.branch_id),'status']);
    return (<div>
      <div className="card">
        <div className="card-header"><span className="card-title">Waitlist Entries ({f.length})</span></div>
        <TF ph="Search waitlist..." />
        {f.length===0 ? <div style={{padding:40,textAlign:'center',color:'#8a7068'}}>No waitlist entries</div> :
        <table><thead><tr><th>Client</th><th>Branch</th><th>Service</th><th>Preferred Date</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead><tbody>
          {f.map(w=><tr key={w.id}>
            <td style={{fontWeight:600,color:'#2c1810'}}>{clName(w.client_id)}</td>
            <td>{brName(w.branch_id)}</td>
            <td>{svName(w.service_id)}</td>
            <td>{w.preferred_date}{w.preferred_time ? ` ${w.preferred_time}` : ''}</td>
            <td><Badge s={w.status==='waiting'?'pending':w.status==='booked'?'completed':w.status}/></td>
            <td>{fmtD(w.created_at)}</td>
            <td><ActionBtns>
              {w.status==='waiting'&&<><button className="btn btn-primary btn-sm" onClick={async()=>{await supabase.from('waitlist').update({status:'notified',notified_at:new Date().toISOString()}).eq('id',w.id);showToast('Client notified');fetchAll();}}>Notify</button>
              <button className="btn btn-secondary btn-sm" onClick={async()=>{await supabase.from('waitlist').update({status:'cancelled'}).eq('id',w.id);showToast('Removed');fetchAll();}}>Remove</button></>}
            </ActionBtns></td>
          </tr>)}
        </tbody></table>}
      </div>
    </div>);
  };

  // ========== REFERRALS ==========
  const Referrals = () => {
    const f = filter(D.referrals||[],[r=>clName(r.referrer_id),r=>clName(r.referred_id),'status','referral_code']);
    return (<div>
      <div className="card">
        <div className="card-header"><span className="card-title">Referral Program ({f.length})</span></div>
        <TF ph="Search referrals..." />
        {f.length===0 ? <div style={{padding:40,textAlign:'center',color:'#8a7068'}}>No referrals yet</div> :
        <table><thead><tr><th>Referrer</th><th>Referred</th><th>Code</th><th>Status</th><th>Points Awarded</th><th>Date</th></tr></thead><tbody>
          {f.map(r=><tr key={r.id}>
            <td style={{fontWeight:600,color:'#2c1810'}}>{clName(r.referrer_id)}</td>
            <td>{clName(r.referred_id)}</td>
            <td><code style={{background:'#f0ebe7',padding:'2px 8px',borderRadius:6,fontSize:12,color:'#c47d5a'}}>{r.referral_code}</code></td>
            <td><Badge s={r.status==='rewarded'?'completed':r.status==='first_booking'?'confirmed':'pending'}/></td>
            <td style={{color:'#c47d5a',fontWeight:600}}>{r.points_awarded||0}</td>
            <td>{fmtD(r.created_at)}</td>
          </tr>)}
        </tbody></table>}
      </div>
    </div>);
  };

  // ========== INVOICES ==========
  const Invoices = () => {
    const f = filter(D.invoices,[i=>brName(i.branch_id),'status','invoice_number']);
    const totalOwed = D.invoices.filter(i=>i.status==='pending'||i.status==='overdue').reduce((s,i)=>s+(i.total_amount||i.subtotal||0),0);
    const totalPaid = D.invoices.filter(i=>i.status==='paid'||i.status==='verified').reduce((s,i)=>s+(i.total_amount||i.subtotal||0),0);
    return (<div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Invoices</span><div className="stat-icon gold"><Icons.FileText /></div></div><div className="stat-value">{D.invoices.length}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Outstanding</span><div className="stat-icon red"><Icons.Alert /></div></div><div className="stat-value">{FP(totalOwed)}</div><div className="stat-change down">{D.invoices.filter(i=>i.status==='overdue').length} overdue</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Collected</span><div className="stat-icon green"><Icons.Check /></div></div><div className="stat-value">{FP(totalPaid)}</div></div>
      </div>
      <div className="tc"><div className="th"><span className="tt">All Invoices ({f.length})</span><TF ph="Search invoices..."/></div>
        <table><thead><tr><th>Invoice #</th><th>Branch</th><th>Period</th><th>Subtotal</th><th>Penalty</th><th>Total</th><th>Status</th><th>Proof</th><th>Date</th><th>Actions</th></tr></thead><tbody>
          {f.map(inv=><tr key={inv.id}>
            <td style={{fontWeight:600,color:'#c47d5a'}}>{inv.invoice_number||inv.id?.slice(0,8)}</td>
            <td>{brName(inv.branch_id)}</td>
            <td>{inv.period_start ? `${fmtD(inv.period_start)} – ${fmtD(inv.period_end)}` : inv.period||'-'}</td>
            <td>{FP(inv.subtotal||0)}</td>
            <td style={{color:inv.penalty>0?'#c94c4c':'inherit'}}>{inv.penalty>0?FP(inv.penalty):'-'}</td>
            <td style={{fontWeight:600,color:'#2c1810'}}>{FP(inv.total_amount||inv.subtotal||0)}</td>
            <td><Badge s={inv.status||'pending'}/></td>
            <td>{inv.payment_proof ? <a href={inv.payment_proof} target="_blank" rel="noreferrer" style={{color:'#6b8ec4',fontSize:12}}>View</a> : '-'}</td>
            <td>{fmtD(inv.created_at)}</td>
            <td><ActionBtns>
              {(inv.status==='pending'||inv.status==='payment_submitted')&&<button className="btn btn-success btn-sm" onClick={async()=>{
                await supabase.from('invoices').update({status:'verified',verified_by:adminUser?.id,verified_at:new Date().toISOString()}).eq('id',inv.id);
                await log('Invoice verified','invoice',inv.id); showToast('Invoice verified'); fetchAll();
              }}>Verify</button>}
              {inv.status==='pending'&&<button className="btn btn-danger btn-sm" onClick={async()=>{
                await supabase.from('invoices').update({status:'overdue'}).eq('id',inv.id);
                showToast('Marked overdue'); fetchAll();
              }}>Overdue</button>}
            </ActionBtns></td>
          </tr>)}
          {!f.length && <tr><td colSpan="10" className="es">No invoices found</td></tr>}
        </tbody></table>
      </div>
    </div>);
  };

  // ========== SUBSCRIPTIONS ==========
  const Subscriptions = () => {
    const f = filter(D.subscriptions,[s=>brName(s.branch_id),'plan','status']);
    return (<div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Active Plans</span><div className="stat-icon green"><Icons.CreditCard /></div></div><div className="stat-value">{D.subscriptions.filter(s=>s.status==='active').length}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total Subscriptions</span><div className="stat-icon blue"><Icons.Branch /></div></div><div className="stat-value">{D.subscriptions.length}</div></div>
      </div>
      <div className="tc"><div className="th"><span className="tt">Salon Subscriptions ({f.length})</span><TF ph="Search subscriptions..."/></div>
        <table><thead><tr><th>Branch</th><th>Plan</th><th>Amount</th><th>Billing Cycle</th><th>Start Date</th><th>End Date</th><th>Status</th></tr></thead><tbody>
          {f.map(s=><tr key={s.id}>
            <td style={{fontWeight:600,color:'#2c1810'}}>{brName(s.branch_id)}</td>
            <td>{s.plan||s.plan_name||'-'}</td>
            <td>{FP(s.amount||0)}</td>
            <td>{s.billing_cycle||'monthly'}</td>
            <td>{fmtD(s.start_date||s.created_at)}</td>
            <td>{fmtD(s.end_date)}</td>
            <td><Badge s={s.status||'active'}/></td>
          </tr>)}
          {!f.length && <tr><td colSpan="7" className="es">No subscriptions found</td></tr>}
        </tbody></table>
      </div>
    </div>);
  };

  // ========== SMS LOGS ==========
  const SmsLogs = () => {
    const f = filter(D.smsLogs,['recipient','message','status','message_type']);
    const delivered = D.smsLogs.filter(s=>s.status==='delivered'||s.status==='sent').length;
    const failed = D.smsLogs.filter(s=>s.status==='failed').length;
    return (<div>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Total SMS Sent</span><div className="stat-icon blue"><Icons.Phone /></div></div><div className="stat-value">{D.smsLogs.length}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Delivered</span><div className="stat-icon green"><Icons.Check /></div></div><div className="stat-value">{delivered}</div></div>
        <div className="stat-card"><div className="stat-header"><span className="stat-label">Failed</span><div className="stat-icon red"><Icons.X /></div></div><div className="stat-value">{failed}</div></div>
      </div>
      <div className="tc"><div className="th"><span className="tt">SMS Delivery Log ({f.length})</span><TF ph="Search SMS logs..."/></div>
        <table><thead><tr><th>Recipient</th><th>Type</th><th>Message</th><th>Branch</th><th>Status</th><th>Sent At</th></tr></thead><tbody>
          {f.map(s=><tr key={s.id}>
            <td>{s.recipient||s.phone||'-'}</td>
            <td>{s.message_type||s.type||'-'}</td>
            <td style={{maxWidth:250,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{s.message||'-'}</td>
            <td>{s.branch_id?brName(s.branch_id):'-'}</td>
            <td><Badge s={s.status||'pending'}/></td>
            <td>{fmtDT(s.sent_at||s.created_at)}</td>
          </tr>)}
          {!f.length && <tr><td colSpan="6" className="es">No SMS logs found</td></tr>}
        </tbody></table>
      </div>
    </div>);
  };

  const Settings = () => (
    <div>
      <div className="tabs">{['general','features','pages','admins'].map(t=><div key={t} className={`tab ${settingsTab===t?'active':''}`} onClick={()=>setSettingsTab(t)}>{t.charAt(0).toUpperCase()+t.slice(1)}</div>)}</div>

      {settingsTab==='general' && D.settings && <div className="card">
        <div className="card-header"><span className="card-title">Business Settings</span>
          {!editSettings ? <button className="btn btn-secondary btn-sm" onClick={()=>setEditSettings({...D.settings})}><Icons.Edit /> Edit</button>
            : <div style={{display:'flex',gap:8}}><button className="btn btn-primary btn-sm" onClick={saveSettings}><Icons.Save /> Save</button><button className="btn btn-secondary btn-sm" onClick={()=>setEditSettings(null)}>Cancel</button></div>}
        </div>
        {!editSettings ? <div className="dg">{Object.entries(settingsFields).map(([l,k])=><div key={k} className="di"><div className="dl">{l}</div><div className="dv">{D.settings[k]}{k==='platform_fee'?'%':''}</div></div>)}</div>
          : <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>{Object.entries(settingsFields).map(([l,k])=><div key={k} className="fg"><label className="fl">{l}</label><input className="fi" value={editSettings[k]??''} onChange={e=>setEditSettings(p=>({...p,[k]:e.target.value}))}/></div>)}</div>}
      </div>}

      {settingsTab==='features' && <div className="card"><div className="card-title" style={{marginBottom:20}}>Feature Flags</div>
        {D.flags.map(f=><div key={f.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid #ede5df'}}>
          <div><div style={{fontWeight:600,color:'#2c1810',fontSize:14}}>{f.name.replace(/_/g,' ')}</div><div style={{fontSize:12,color:'#8a7068'}}>{f.description} · {f.applies_to}</div></div>
          <div className={`toggle ${f.is_enabled?'on':''}`} onClick={()=>toggleFlag(f.id,!f.is_enabled)}/>
        </div>)}
      </div>}

      {settingsTab==='pages' && <div className="card"><div className="card-title" style={{marginBottom:20}}>Platform Pages</div>
        {D.pages.map(p=><div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px 0',borderBottom:'1px solid #ede5df'}}>
          <div><div style={{fontWeight:600,color:'#2c1810'}}>{p.title}</div><div style={{fontSize:12,color:'#8a7068'}}>/{p.slug} · {p.is_published?'Published':'Draft'}</div></div>
          <button className="btn-icon" onClick={()=>openModal('edit-page',p,{id:p.id,title:p.title,content:p.content,slug:p.slug,is_published:p.is_published})}><Icons.Edit /></button>
        </div>)}
      </div>}

      {settingsTab==='admins' && <div className="card">
        <div className="card-header"><span className="card-title">Admin Users</span><button className="btn btn-primary btn-sm" onClick={()=>openModal('create-admin')}><Icons.Plus /> Add Admin</button></div>
        <table style={{width:'100%'}}><thead><tr><th style={{textAlign:'left',padding:'8px 0',color:'#8a7068',fontSize:12}}>Name</th><th style={{textAlign:'left',padding:'8px 0',color:'#8a7068',fontSize:12}}>Email</th><th style={{textAlign:'left',padding:'8px 0',color:'#8a7068',fontSize:12}}>Role</th><th style={{textAlign:'left',padding:'8px 0',color:'#8a7068',fontSize:12}}>Status</th></tr></thead><tbody>
          {D.admins.map(a=><tr key={a.id}><td style={{padding:'10px 0',fontWeight:600,color:'#2c1810'}}>{a.name}</td><td style={{padding:'10px 0'}}>{a.email}</td><td style={{padding:'10px 0'}}><Badge s={a.role==='super_admin'?'active':'confirmed'}/></td><td style={{padding:'10px 0'}}><Badge s={a.is_active?'active':'suspended'}/></td></tr>)}
        </tbody></table>
      </div>}
    </div>
  );

  // ========== MODALS ==========
  const Modal = () => {
    if (!modal) return null;
    const replies = sel ? D.ticketReplies.filter(r=>r.ticket_id===sel.id) : [];
    const modalTitles = {'branch-detail':`Branch: ${sel?.name}`,'edit-branch':`Edit Branch: ${sel?.name}`,'create-service':'Create Service','edit-service':`Edit: ${sel?.name}`,'client-detail':`Client: ${sel?.name}`,'booking-detail':'Booking Details','review-detail':'Review Details','dispute-detail':'Dispute — Resolve','ticket-detail':`Ticket: ${sel?.ticket_number}`,'adjust-points':`Adjust Points: ${sel?.name}`,'create-refund':'Issue Refund','create-announcement':'Create Announcement','create-promo':'Create Promotion','create-admin':'Add Admin User','edit-page':`Edit Page: ${form.title||''}`,'edit-template':`Edit Template: ${sel?.name?.replace(/_/g,' ')||''}`};

    return (
      <div className="mo" onClick={closeModal}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="mh"><span className="mt">{modalTitles[modal]||''}</span><div style={{cursor:'pointer',color:'#8a7068'}} onClick={closeModal}><Icons.X /></div></div>
        <div className="mb">

          {/* BRANCH DETAIL */}
          {modal==='branch-detail'&&sel&&<div>
            {sel.images?.length > 0 && <div style={{display:'flex',gap:8,marginBottom:16,overflowX:'auto'}}>
              {sel.images.map((img,i) => <img key={i} src={img} alt="" style={{width:140,height:90,borderRadius:10,objectFit:'cover',flexShrink:0}} />)}
            </div>}
            <div className="dg">
            {[['Name',sel.name],['Location',sel.location],['Phone',sel.phone],['Email',sel.email],['Rating',`${sel.rating} ★ (${sel.review_count} reviews)`],['Hours',`${sel.open_time} - ${sel.close_time}`],['Slot Interval',`${sel.slot_interval||30} min`]].map(([l,v],i)=><div key={i} className="di"><div className="dl">{l}</div><div className="dv">{v||'-'}</div></div>)}
            <div className="di"><div className="dl">Status</div><div className="dv"><Badge s={sel.approval_status||'approved'}/></div></div>
            <div className="di"><div className="dl">Created</div><div className="dv">{fmtD(sel.created_at)}</div></div>
            <div className="di" style={{gridColumn:'span 2'}}><div className="dl">Description</div><div className="dv">{sel.description||'-'}</div></div>
            </div>
            <div style={{marginTop:12}}><button className="btn btn-primary btn-sm" onClick={()=>openModal('edit-branch',sel,{name:sel.name,location:sel.location,phone:sel.phone,email:sel.email,description:sel.description||'',open_time:sel.open_time,close_time:sel.close_time,slot_interval:sel.slot_interval||30,images:sel.images||[]})}>Edit Branch</button></div>
          </div>}

          {/* EDIT BRANCH */}
          {modal==='edit-branch'&&sel&&<div>
            <AdminGalleryUpload images={form.images||[]} bucket="branches" folder={sel.id} onUpdate={urls=>uf('images',urls)} />
            <div className="fr">
              <div className="fg"><label className="fl">Name</label><input className="fi" value={form.name||''} onChange={e=>uf('name',e.target.value)}/></div>
              <div className="fg"><label className="fl">Location</label><input className="fi" value={form.location||''} onChange={e=>uf('location',e.target.value)}/></div>
              <div className="fg"><label className="fl">Phone</label><input className="fi" value={form.phone||''} onChange={e=>uf('phone',e.target.value)}/></div>
              <div className="fg"><label className="fl">Email</label><input className="fi" value={form.email||''} onChange={e=>uf('email',e.target.value)}/></div>
              <div className="fg"><label className="fl">Opens At</label><input className="fi" type="time" value={form.open_time||''} onChange={e=>uf('open_time',e.target.value)}/></div>
              <div className="fg"><label className="fl">Closes At</label><input className="fi" type="time" value={form.close_time||''} onChange={e=>uf('close_time',e.target.value)}/></div>
              <div className="fg"><label className="fl">Slot Interval</label><select className="fs" value={form.slot_interval||30} onChange={e=>uf('slot_interval',parseInt(e.target.value))}><option value={15}>15 min</option><option value={20}>20 min</option><option value={30}>30 min</option><option value={45}>45 min</option><option value={60}>60 min</option></select></div>
            </div>
            <div className="fg"><label className="fl">Description</label><textarea className="fta" value={form.description||''} onChange={e=>uf('description',e.target.value)}/></div>
          </div>}

          {/* SERVICE CREATE/EDIT */}
          {(modal==='create-service'||modal==='edit-service')&&<div>
            {form.image && <div style={{marginBottom:12,textAlign:'center'}}><img src={form.image} alt="" style={{width:120,height:80,borderRadius:10,objectFit:'cover'}} /></div>}
            <div className="fg" style={{marginBottom:12}}>
              <label className="fl">Service Image</label>
              <input type="file" accept="image/*" onChange={async(e)=>{
                const file=e.target.files?.[0]; if(!file)return;
                try{const url=await uploadImageAdmin('services',form.name?.replace(/\s/g,'-')||'misc',file); uf('image',url);}catch(err){showToast('Upload failed','error');}
              }} style={{fontSize:12,color:'#8a7068'}} />
            </div>
            <div className="fr">
              <div className="fg"><label className="fl">Name *</label><input className="fi" value={form.name||''} onChange={e=>uf('name',e.target.value)}/></div>
              <div className="fg"><label className="fl">Category</label><select className="fs" value={form.category||''} onChange={e=>uf('category',e.target.value)}><option value="">Select...</option>{['Hair','Braids','Nails','Skincare','Spa','Makeup','Lashes','Barber'].map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div className="fg"><label className="fl">Min Price (K)</label><input className="fi" type="number" value={form.price||0} onChange={e=>uf('price',parseFloat(e.target.value)||0)}/></div>
              <div className="fg"><label className="fl">Max Price (K)</label><input className="fi" type="number" value={form.price_max||0} onChange={e=>uf('price_max',parseFloat(e.target.value)||0)}/></div>
              <div className="fg"><label className="fl">Min Duration (min)</label><input className="fi" type="number" value={form.duration||30} onChange={e=>uf('duration',parseInt(e.target.value)||30)}/></div>
              <div className="fg"><label className="fl">Max Duration (min)</label><input className="fi" type="number" value={form.duration_max||60} onChange={e=>uf('duration_max',parseInt(e.target.value)||60)}/></div>
              <div className="fg"><label className="fl">Deposit (K)</label><input className="fi" type="number" value={form.deposit||0} onChange={e=>uf('deposit',parseFloat(e.target.value)||0)}/></div>
              <div className="fg"><label className="fl">Branch</label><select className="fs" value={form.branch_id||''} onChange={e=>uf('branch_id',e.target.value)}><option value="">All Branches</option>{D.branches.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
            </div>
            <div className="fg"><label className="fl">Description</label><textarea className="fta" value={form.description||''} onChange={e=>uf('description',e.target.value)}/></div>
          </div>}

          {/* CLIENT DETAIL */}
          {modal==='client-detail'&&sel&&<div className="dg">
            {[['Name',sel.name],['Phone',sel.phone],['Email',sel.email||'-'],['Bookings',sel.total_bookings||0],['Spent',FP(sel.total_spent||0)],['Joined',fmtD(sel.created_at)]].map(([l,v],i)=><div key={i} className="di"><div className="dl">{l}</div><div className="dv">{v}</div></div>)}
            <div className="di"><div className="dl">GlowPoints</div><div className="dv" style={{color:'#c47d5a',fontSize:18,fontWeight:700}}>{sel.glow_points||0}</div></div>
            <div className="di"><div className="dl">Status</div><div className="dv"><Badge s={sel.account_status||'active'}/></div></div>
          </div>}

          {/* BOOKING DETAIL */}
          {modal==='booking-detail'&&sel&&<div className="dg">
            {[['Client',clName(sel.client_id)+(sel.is_walk_in?' (Walk-in)':'')],['Branch',brName(sel.branch_id)],['Service',svName(sel.service_id)],['Staff',stName(sel.staff_id)],['Date & Time',`${sel.booking_date} at ${sel.booking_time}`],['Duration',`${sel.duration} mins`],['Total',FP(sel.total_amount)],['Discount',sel.discount_amount>0?`${FP(sel.discount_amount)} (${sel.points_used} pts)`:'-'],['Deposit',`${FP(sel.deposit_amount||0)} ${sel.deposit_paid?'✅':'❌'}`]].map(([l,v],i)=><div key={i} className="di"><div className="dl">{l}</div><div className="dv">{v}</div></div>)}
            <div className="di"><div className="dl">Status</div><div className="dv"><Badge s={sel.status}/></div></div>
            <div className="di"><div className="dl">Notes</div><div className="dv">{sel.client_notes||'-'}</div></div>
            {sel.cancellation_reason&&<div className="di"><div className="dl">Cancel Reason</div><div className="dv" style={{color:'#c94c4c'}}>{sel.cancellation_reason}</div></div>}
          </div>}

          {/* REVIEW DETAIL */}
          {modal==='review-detail'&&sel&&<div>
            <div className="dg">
              {[['Client',clName(sel.client_id)],['Branch',brName(sel.branch_id)]].map(([l,v],i)=><div key={i} className="di"><div className="dl">{l}</div><div className="dv">{v}</div></div>)}
              <div className="di"><div className="dl">Overall</div><div className="dv" style={{color:'#c9a84c'}}>{sel.rating_overall} ★</div></div>
              <div className="di"><div className="dl">Average</div><div className="dv" style={{color:'#c9a84c'}}>{sel.rating_average?.toFixed(1)} ★</div></div>
            </div>
            <div style={{marginTop:16,padding:16,background:'#faf7f5',borderRadius:10}}><div className="dl">Review</div><div style={{color:'#2c1810',lineHeight:1.7}}>{sel.review_text||'No text'}</div></div>
            {sel.response_text && <div style={{marginTop:12,padding:16,background:'#f0d9cc',borderRadius:10}}><div className="dl" style={{color:'#c47d5a'}}>Salon Response</div><div style={{color:'#2c1810'}}>{sel.response_text}</div></div>}
          </div>}

          {/* DISPUTE DETAIL + RESOLVE */}
          {modal==='dispute-detail'&&sel&&<div>
            <div className="dg">
              {[['Client',clName(sel.client_id)],['Branch',brName(sel.branch_id)],['Type',sel.dispute_type||sel.type||'-']].map(([l,v],i)=><div key={i} className="di"><div className="dl">{l}</div><div className="dv">{v}</div></div>)}
              <div className="di"><div className="dl">Status</div><div className="dv"><Badge s={sel.status||'pending'}/></div></div>
            </div>
            <div style={{marginTop:16,padding:16,background:'#faf7f5',borderRadius:10}}><div className="dl">Description</div><div style={{color:'#2c1810',lineHeight:1.7}}>{sel.description||'-'}</div></div>
            {sel.status!=='resolved'&&<div style={{marginTop:16}}>
              <div className="fg"><label className="fl">Resolution Type</label><select className="fs" value={form.resolution||''} onChange={e=>uf('resolution',e.target.value)}>
                <option value="">Select...</option><option value="refund">Refund</option><option value="points_compensation">Points Compensation</option><option value="apology">Apology</option><option value="warning_to_branch">Warning to Branch</option><option value="dismissed">Dismissed</option><option value="other">Other</option>
              </select></div>
              <div className="fg"><label className="fl">Admin Notes</label><textarea className="fta" value={form.notes||''} onChange={e=>uf('notes',e.target.value)} placeholder="Resolution notes..."/></div>
            </div>}
          </div>}

          {/* TICKET DETAIL + REPLY */}
          {modal==='ticket-detail'&&sel&&<div>
            <div className="dg">
              {[['Ticket #',sel.ticket_number],['Category',sel.category],['From',sel.submitted_by_type],['Priority',sel.priority]].map(([l,v],i)=><div key={i} className="di"><div className="dl">{l}</div><div className="dv">{l==='Ticket #'?<span style={{color:'#c47d5a'}}>{v}</span>:v}</div></div>)}
              <div className="di"><div className="dl">Status</div><div className="dv"><Badge s={sel.status}/></div></div>
              <div className="di"><div className="dl">Created</div><div className="dv">{fmtDT(sel.created_at)}</div></div>
            </div>
            <div style={{marginTop:16}}><div className="dl">Subject</div><div style={{color:'#2c1810',fontWeight:600,marginBottom:8}}>{sel.subject}</div>
              <div style={{padding:16,background:'#faf7f5',borderRadius:10,color:'#2c1810',lineHeight:1.7}}>{sel.description}</div>
            </div>
            {replies.length>0 && <div style={{marginTop:16}}>
              <div className="dl" style={{marginBottom:8}}>Responses ({replies.length})</div>
              {replies.map(r=><div key={r.id} className={`ri ${r.is_internal_note?'internal':''}`}>
                <div style={{fontSize:12,color:'#8a7068',marginBottom:4}}>{r.responder_type==='admin'?adName(r.responder_id):r.responder_type} · {fmtDT(r.created_at)} {r.is_internal_note&&<span style={{color:'#6b8ec4'}}>(Internal Note)</span>}</div>
                <div style={{fontSize:14,color:'#2c1810'}}>{r.message}</div>
              </div>)}
            </div>}
            {sel.status!=='closed'&&<div style={{background:'#faf7f5',border:'1px solid #ede5df',borderRadius:10,padding:16,marginTop:16}}>
              <div className="fg"><label className="fl">Reply</label><textarea className="fta" value={form.reply||''} onChange={e=>uf('reply',e.target.value)} placeholder="Type your reply..."/></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#8a7068',cursor:'pointer'}}><input type="checkbox" checked={form.isInternal||false} onChange={e=>uf('isInternal',e.target.checked)}/> Internal note</label>
                <button className="btn btn-primary btn-sm" onClick={()=>{replyTicket(sel.id,form.reply,form.isInternal);uf('reply','');}}><Icons.Send /> Send</button>
              </div>
            </div>}
          </div>}

          {/* ADJUST POINTS */}
          {modal==='adjust-points'&&sel&&<div>
            <div style={{marginBottom:16,padding:16,background:'#faf7f5',borderRadius:10,textAlign:'center'}}>
              <div className="dl">Current Balance</div>
              <div style={{fontSize:32,fontWeight:700,color:'#c47d5a'}}>{sel.glow_points||0} pts</div>
            </div>
            <div className="fg"><label className="fl">Points (positive to add, negative to deduct)</label><input className="fi" type="number" value={form.points||''} onChange={e=>uf('points',e.target.value)} placeholder="e.g. 50 or -25"/></div>
            <div className="fg"><label className="fl">Reason</label><input className="fi" value={form.reason||''} onChange={e=>uf('reason',e.target.value)} placeholder="Reason for adjustment"/></div>
          </div>}

          {/* CREATE REFUND */}
          {modal==='create-refund'&&<div>
            <div className="fg"><label className="fl">Booking</label><select className="fs" value={form.booking_id||''} onChange={e=>uf('booking_id',e.target.value)}>
              <option value="">Select booking...</option>
              {D.bookings.filter(b=>b.status==='completed'||b.status==='cancelled').map(b=><option key={b.id} value={b.id}>{clName(b.client_id)} - {svName(b.service_id)} - {b.booking_date} ({FP(b.total_amount)})</option>)}
            </select></div>
            <div className="fr"><div className="fg"><label className="fl">Amount (K)</label><input className="fi" type="number" value={form.amount||''} onChange={e=>uf('amount',e.target.value)}/></div>
              <div className="fg"><label className="fl">Type</label><select className="fs" value={form.refund_type||'full'} onChange={e=>uf('refund_type',e.target.value)}><option value="full">Full</option><option value="partial">Partial</option><option value="deposit_only">Deposit Only</option><option value="points_compensation">Points</option></select></div></div>
            <div className="fg"><label className="fl">Reason</label><textarea className="fta" value={form.reason||''} onChange={e=>uf('reason',e.target.value)} placeholder="Reason for refund..."/></div>
          </div>}

          {/* CREATE ANNOUNCEMENT */}
          {modal==='create-announcement'&&<div>
            <div className="fg"><label className="fl">Title</label><input className="fi" value={form.title||''} onChange={e=>uf('title',e.target.value)} placeholder="Announcement title"/></div>
            <div className="fg"><label className="fl">Message</label><textarea className="fta" value={form.message||''} onChange={e=>uf('message',e.target.value)} placeholder="Announcement message..." style={{minHeight:120}}/></div>
            <div className="fr"><div className="fg"><label className="fl">Target</label><select className="fs" value={form.target||'all'} onChange={e=>uf('target',e.target.value)}><option value="all">Everyone</option><option value="branches">Branches</option><option value="clients">Clients</option><option value="staff">Staff</option></select></div>
              <div className="fg"><label className="fl">Priority</label><select className="fs" value={form.priority||'normal'} onChange={e=>uf('priority',e.target.value)}><option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option></select></div></div>
          </div>}

          {/* CREATE PROMOTION */}
          {modal==='create-promo'&&<div>
            <div className="fg"><label className="fl">Name *</label><input className="fi" value={form.name||''} onChange={e=>uf('name',e.target.value)} placeholder="e.g. Holiday Special"/></div>
            <div className="fg"><label className="fl">Description</label><input className="fi" value={form.description||''} onChange={e=>uf('description',e.target.value)}/></div>
            <div className="fr"><div className="fg"><label className="fl">Type *</label><select className="fs" value={form.type||''} onChange={e=>uf('type',e.target.value)}><option value="">Select...</option><option value="double_points">Double Points</option><option value="bonus_points">Bonus Points</option><option value="discount_percentage">Discount %</option><option value="discount_fixed">Discount Fixed</option><option value="free_addon">Free Add-on</option><option value="referral_bonus">Referral Bonus</option></select></div>
              <div className="fg"><label className="fl">Value *</label><input className="fi" type="number" value={form.value||''} onChange={e=>uf('value',e.target.value)}/></div></div>
            <div className="fr"><div className="fg"><label className="fl">Promo Code</label><input className="fi" value={form.code||''} onChange={e=>uf('code',e.target.value.toUpperCase())} placeholder="e.g. GLOW20"/></div>
              <div className="fg"><label className="fl">Max Uses</label><input className="fi" type="number" value={form.max_uses||''} onChange={e=>uf('max_uses',e.target.value)} placeholder="Unlimited"/></div></div>
            <div className="fr"><div className="fg"><label className="fl">Starts *</label><input className="fi" type="date" value={form.starts_at||''} onChange={e=>uf('starts_at',e.target.value)}/></div>
              <div className="fg"><label className="fl">Ends *</label><input className="fi" type="date" value={form.ends_at||''} onChange={e=>uf('ends_at',e.target.value)}/></div></div>
            <div className="fg"><label className="fl">Target</label><select className="fs" value={form.target||'all'} onChange={e=>uf('target',e.target.value)}><option value="all">All Clients</option><option value="new_clients">New Clients</option><option value="returning_clients">Returning</option></select></div>
          </div>}

          {/* CREATE ADMIN */}
          {modal==='create-admin'&&<div>
            <div className="fg"><label className="fl">Name *</label><input className="fi" value={form.name||''} onChange={e=>uf('name',e.target.value)}/></div>
            <div className="fg"><label className="fl">Email *</label><input className="fi" type="email" value={form.email||''} onChange={e=>uf('email',e.target.value)}/></div>
            <div className="fr"><div className="fg"><label className="fl">Role</label><select className="fs" value={form.role||'admin'} onChange={e=>uf('role',e.target.value)}><option value="admin">Admin</option><option value="moderator">Moderator</option><option value="support">Support</option></select></div>
              <div className="fg"><label className="fl">Phone</label><input className="fi" value={form.phone||''} onChange={e=>uf('phone',e.target.value)}/></div></div>
          </div>}

          {/* EDIT PAGE */}
          {modal==='edit-page'&&<div>
            <div className="fg"><label className="fl">Title</label><input className="fi" value={form.title||''} onChange={e=>uf('title',e.target.value)}/></div>
            <div className="fg"><label className="fl">Content</label><textarea className="fta" value={form.content||''} onChange={e=>uf('content',e.target.value)} style={{minHeight:200}}/></div>
            <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#8a7068',cursor:'pointer'}}><input type="checkbox" checked={form.is_published!==false} onChange={e=>uf('is_published',e.target.checked)}/> Published</label>
          </div>}

          {/* EDIT TEMPLATE */}
          {modal==='edit-template'&&<div>
            {form.subject!==undefined && <div className="fg"><label className="fl">Subject</label><input className="fi" value={form.subject||''} onChange={e=>uf('subject',e.target.value)}/></div>}
            <div className="fg"><label className="fl">Body</label><textarea className="fta" value={form.body||''} onChange={e=>uf('body',e.target.value)} style={{minHeight:160,fontFamily:'monospace',fontSize:13}}/></div>
            {sel?.variables?.length>0 && <div><div className="dl" style={{marginBottom:4}}>Click to insert variable:</div><div style={{display:'flex',flexWrap:'wrap',gap:6}}>{sel.variables.map(v=><span key={v} style={{background:'#f0ebe7',padding:'4px 8px',borderRadius:6,fontSize:12,color:'#c47d5a',cursor:'pointer'}} onClick={()=>uf('body',(form.body||'')+`{{${v}}}`)}>{`{{${v}}}`}</span>)}</div></div>}
            <label style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'#8a7068',cursor:'pointer',marginTop:12}}><input type="checkbox" checked={form.is_active!==false} onChange={e=>uf('is_active',e.target.checked)}/> Active</label>
          </div>}

        </div>

        {/* MODAL FOOTER */}
        <div className="mf">
          <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
          {modal==='dispute-detail'&&sel?.status!=='resolved'&&<button className="btn btn-primary" onClick={()=>{updateDispute(sel.id,'resolved',form.notes,form.resolution);closeModal();}}>Resolve Dispute</button>}
          {modal==='ticket-detail'&&sel?.status!=='closed'&&<>
            {sel?.status!=='resolved'&&<button className="btn btn-success" onClick={()=>{updateTicket(sel.id,'resolved');closeModal();}}>Mark Resolved</button>}
            <button className="btn btn-secondary" onClick={()=>{updateTicket(sel.id,'closed');closeModal();}}>Close Ticket</button>
          </>}
          {modal==='adjust-points'&&<button className="btn btn-primary" onClick={()=>{adjustPoints(sel.id,form.points,form.reason);closeModal();}}>Adjust Points</button>}
          {modal==='create-refund'&&<button className="btn btn-primary" onClick={createRefund}>Issue Refund</button>}
          {modal==='create-announcement'&&<button className="btn btn-primary" onClick={createAnnouncement}>Publish</button>}
          {modal==='create-promo'&&<button className="btn btn-primary" onClick={createPromo}>Create</button>}
          {modal==='create-admin'&&<button className="btn btn-primary" onClick={createAdmin}>Add Admin</button>}
          {modal==='edit-page'&&<button className="btn btn-primary" onClick={savePage}><Icons.Save /> Save</button>}
          {modal==='edit-template'&&<button className="btn btn-primary" onClick={saveTemplate}><Icons.Save /> Save</button>}
          {modal==='edit-branch'&&<button className="btn btn-primary" onClick={saveBranchDetails}><Icons.Save /> Save Branch</button>}
          {modal==='create-service'&&<button className="btn btn-primary" onClick={async()=>{
            const {error}=await supabase.from('services').insert({name:form.name,category:form.category,description:form.description,price:form.price,price_max:form.price_max,duration:form.duration,duration_max:form.duration_max,deposit:form.deposit,image:form.image||null,branch_id:form.branch_id||null,is_active:true,created_at:new Date().toISOString()});
            if(error){showToast(error.message,'error');return;} showToast('Service created');closeModal();fetchAll();
          }}><Icons.Plus /> Create Service</button>}
          {modal==='edit-service'&&sel&&<><button className="btn btn-primary" onClick={async()=>{
            const {error}=await supabase.from('services').update({name:form.name,category:form.category,description:form.description,price:form.price,price_max:form.price_max,duration:form.duration,duration_max:form.duration_max,deposit:form.deposit,image:form.image||null,branch_id:form.branch_id||null,is_active:form.is_active,updated_at:new Date().toISOString()}).eq('id',sel.id);
            if(error){showToast(error.message,'error');return;} showToast('Service updated');closeModal();fetchAll();
          }}><Icons.Save /> Save</button>
          <button className="btn btn-secondary" onClick={async()=>{await supabase.from('services').update({is_active:!sel.is_active}).eq('id',sel.id);showToast(sel.is_active?'Service deactivated':'Service activated');closeModal();fetchAll();}}>{sel.is_active?'Deactivate':'Activate'}</button></>}
        </div>
      </div></div>
    );
  };

  // ========== MAIN RENDER ==========
  // Auth gate
  if (!authChecked) return <><style>{css}</style><div className="admin"><div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',minHeight:'100vh',color:'#8a7068'}}>Loading...</div></div></>;

  if (!authUser) {
    const bp = window.innerWidth >= 640 ? 'wide' : 'narrow';
    const isWide = bp === 'wide';
    const is = {width:'100%',padding:'13px 16px',borderRadius:10,border:'1px solid #ede5df',fontSize:14,background:'#faf7f5',color:'#2c1810',fontFamily:'DM Sans',marginBottom:12,outline:'none',boxSizing:'border-box'};
    return (
      <><style>{css}</style>
      <div style={{minHeight:'100vh',background:'#faf7f5',display:'flex',flexDirection:isWide?'row':'column',fontFamily:"'DM Sans', sans-serif"}}>
        <div style={{background:'linear-gradient(135deg,#c47d5a,#a35e3c)',padding:isWide?'60px 48px':'52px 24px 36px',borderRadius:isWide?0:'0 0 32px 32px',textAlign:isWide?'left':'center',flex:isWide?'0 0 45%':'none',display:'flex',flexDirection:'column',justifyContent:'center',minHeight:isWide?'100vh':'auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:12,justifyContent:isWide?'flex-start':'center',marginBottom:16}}>
            <div style={{width:44,height:44,background:'rgba(255,255,255,0.2)',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:20}}>G</div>
          </div>
          <h1 style={{fontFamily:'Fraunces, serif',fontSize:isWide?40:32,fontWeight:700,color:'#fff',marginBottom:8}}>GlowBook Admin</h1>
          <p style={{color:'rgba(255,255,255,.85)',fontSize:isWide?18:15,maxWidth:360,lineHeight:1.5}}>Platform control center for managing branches, clients & operations</p>
        </div>
        <div style={{padding:isWide?'48px 56px':'24px',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',maxWidth:isWide?480:'100%'}}>
          {authError && <div style={{background:'#fce8e8',color:'#c94c4c',padding:'12px 16px',borderRadius:10,fontSize:13,fontWeight:500,marginBottom:16}}>{authError}</div>}
          {authMode === 'reset_sent' ? (
            <div style={{textAlign:'center'}}>
              <div style={{width:56,height:56,background:'#f0d9cc',borderRadius:16,display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:16,color:'#c47d5a'}}><Icons.Settings /></div>
              <h2 style={{fontFamily:'Fraunces, serif',fontSize:22,fontWeight:700,marginBottom:8,color:'#2c1810'}}>Check your email</h2>
              <p style={{color:'#8a7068',fontSize:14,lineHeight:1.6,marginBottom:24}}>A password reset link has been sent to your email.</p>
              <button onClick={()=>{setAuthMode('login');setAuthError('');}} style={{padding:'10px 24px',borderRadius:10,border:'none',background:'#c47d5a',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer',fontFamily:'DM Sans'}}>Back to Login</button>
            </div>
          ) : authMode === 'forgot' ? (
            <>
              <h2 style={{fontFamily:'Fraunces, serif',fontSize:22,fontWeight:700,marginBottom:8,color:'#2c1810'}}>Reset password</h2>
              <p style={{color:'#8a7068',fontSize:14,marginBottom:24}}>Enter your admin email to receive a reset link</p>
              <input placeholder="Admin email" type="email" style={is} id="admin-email" onFocus={()=>setAuthError('')} />
              <button onClick={async () => {
                const email = document.getElementById('admin-email').value;
                if (!email) { setAuthError('Enter your email'); return; }
                setAuthError('');
                const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin });
                if (error) { setAuthError(error.message); return; }
                setAuthMode('reset_sent');
              }} style={{width:'100%',padding:'13px',borderRadius:10,border:'none',background:'#c47d5a',color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'DM Sans',marginBottom:16}}>Send Reset Link</button>
              <button onClick={()=>{setAuthMode('login');setAuthError('');}} style={{width:'100%',background:'none',border:'none',color:'#8a7068',fontSize:13,cursor:'pointer',fontFamily:'DM Sans'}}>Back to login</button>
            </>
          ) : (
            <>
              <h2 style={{fontFamily:'Fraunces, serif',fontSize:24,fontWeight:700,marginBottom:4,color:'#2c1810'}}>Welcome back</h2>
              <p style={{color:'#8a7068',fontSize:14,marginBottom:24}}>Sign in to the admin dashboard</p>
              <input placeholder="Admin email" type="email" style={is} id="admin-email" onFocus={()=>setAuthError('')} />
              <input placeholder="Password" type="password" style={is} id="admin-pass"
                onKeyDown={e => { if (e.key === 'Enter') document.getElementById('admin-login-btn').click(); }} />
              <button id="admin-login-btn" onClick={async () => {
                const email = document.getElementById('admin-email').value;
                const pass = document.getElementById('admin-pass').value;
                if (!email||!pass) { setAuthError('Please fill in all fields'); return; }
                setAuthError('');
                const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
                if (error) { setAuthError(error.message === 'Email not confirmed' ? 'Please confirm your email first.' : error.message); return; }
                const { data: admins } = await supabase.from('admin_users').select('email').eq('email', email);
                if (!admins?.length) { await supabase.auth.signOut(); setAuthError('Access denied. This account is not an admin.'); return; }
                setAuthUser(data.user);
              }} style={{width:'100%',padding:'13px',borderRadius:10,border:'none',background:'#c47d5a',color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer',fontFamily:'DM Sans',marginBottom:12}}>Sign In</button>
              <button onClick={()=>{setAuthMode('forgot');setAuthError('');}} style={{width:'100%',background:'none',border:'none',color:'#8a7068',fontSize:13,cursor:'pointer',fontFamily:'DM Sans'}}>Forgot password?</button>
            </>
          )}
        </div>
      </div></>
    );
  }

  if (loading) return <><style>{css}</style><div className="admin"><div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',minHeight:'100vh',color:'#8a7068'}}>Loading GlowBook Admin...</div></div></>;

  return (
    <>
      <style>{css}</style>
      <div className="admin">
        <Sidebar />
        <div className="main">
          <div className="topbar">
            <div style={{display:'flex',alignItems:'center',gap:16}}>
              <div className="mobile-menu" onClick={()=>setSidebarOpen(!sidebarOpen)}><Icons.Menu /></div>
              <span className="topbar-title">{titles[page]}</span>
            </div>
            <div className="topbar-actions">
              <div className="topbar-search"><Icons.Search /><input placeholder="Search..." value={searchQ} onChange={e=>setSearchQ(e.target.value)}/></div>
              <button className="btn-icon" title="Refresh" onClick={fetchAll}><Icons.Refresh /></button>
            </div>
          </div>
          <div className="content">
            {page==='dashboard'&&<Dashboard />}
            {page==='activity'&&<ActivityLog />}
            {page==='branches'&&<Branches />}
            {page==='clients'&&<Clients />}
            {page==='bookings'&&<Bookings />}
            {page==='staff'&&<Staff />}
            {page==='services'&&<Services />}
            {page==='waitlist'&&<Waitlist />}
            {page==='referrals'&&<Referrals />}
            {page==='reviews'&&<Reviews />}
            {page==='disputes'&&<Disputes />}
            {page==='tickets'&&<Tickets />}
            {page==='reports'&&<Reports />}
            {page==='financials'&&<Financials />}
            {page==='withdrawals'&&<Withdrawals />}
            {page==='invoices'&&<Invoices />}
            {page==='subscriptions'&&<Subscriptions />}
            {page==='points'&&<Points />}
            {page==='promotions'&&<Promotions />}
            {page==='announcements'&&<Announcements />}
            {page==='notifications'&&<Templates />}
            {page==='sms'&&<SmsLogs />}
            {page==='settings'&&<Settings />}
          </div>
        </div>
        <Modal />
        {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
      </div>
    </>
  );
}

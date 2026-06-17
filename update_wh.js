const fs = require('fs');
const path = require('path');

let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// ===== 1. Replace CSS (lines 141-161) =====
const OLD_CSS = `/* 库房盘点样式 */
.wh-card{background:#fff;border:1px solid var(--slate-200);border-radius:8px;padding:14px 18px;margin-bottom:12px}
.wh-card .wh-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.wh-card .wh-name{font-size:14px;font-weight:600;color:var(--slate-800)}
.wh-card .wh-cat{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600}
.wh-card .wh-cat.bc{background:var(--blue-light);color:var(--blue)}
.wh-card .wh-cat.off{background:var(--indigo-light);color:var(--indigo)}
.wh-card .wh-cat.cl{background:var(--green-light);color:var(--green-dark)}
.wh-card .wh-cat.tl{background:var(--amber-light);color:var(--amber)}
.wh-card .wh-cat.ot{background:var(--slate-200);color:var(--slate-600)}
.wh-card .wh-info{font-size:12px;color:var(--slate-500);display:flex;gap:16px;flex-wrap:wrap}
.wh-card .wh-actions{margin-top:8px;display:flex;gap:6px}
.wh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.wh-stat{background:#fff;border:1px solid var(--slate-200);border-radius:8px;padding:14px 18px;display:flex;align-items:center;gap:12px}
.wh-stat .whs-icon{width:40px;height:40px;border-radius:8px;display:flex;align-items:center;justify-content:center}
.wh-stat .whs-value{font-size:20px;font-weight:700;color:var(--slate-800)}
.wh-stat .whs-label{font-size:11px;color:var(--slate-500)}
.wh-stat .whs-sub{font-size:10px;color:var(--slate-400);margin-top:2px}
.tag-in{background:var(--green-light);color:var(--green-dark);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
.tag-out{background:var(--red-light);color:var(--red);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
.tag-loss{background:var(--amber-light);color:var(--amber);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}`;

const NEW_CSS = `/* ===== 库房管理系统样式 ===== */
/* 库房子标签 */
.wh-subtabs{display:flex;gap:4px;margin-bottom:16px}
.wh-subtab{padding:6px 16px;border-radius:6px;font-size:13px;font-weight:500;color:var(--slate-600);background:var(--slate-100)}
.wh-subtab:hover{background:var(--slate-200)}
.wh-subtab.act{background:var(--navy);color:#fff}
/* 看板卡片 */
.dash-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin-bottom:20px}
.dash-card{background:#fff;border:1px solid var(--slate-200);border-radius:8px;padding:16px;display:flex;align-items:flex-start;gap:12px}
.dash-icon{width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.dash-icon svg{width:20px;height:20px}
.dash-val{font-size:24px;font-weight:700;color:var(--slate-800);line-height:1.2}
.dash-label{font-size:11px;color:var(--slate-500)}
.dash-sub{font-size:10px;color:var(--slate-400);margin-top:2px}
.dash-icon.di-blue{background:var(--blue-light);color:var(--blue)}
.dash-icon.di-green{background:var(--green-light);color:var(--green-dark)}
.dash-icon.di-amber{background:var(--amber-light);color:var(--amber)}
.dash-icon.di-red{background:var(--red-light);color:var(--red)}
.dash-icon.di-indigo{background:var(--indigo-light);color:var(--indigo)}
/* 物品卡片 */
.wh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px}
.wh-card{background:#fff;border:1px solid var(--slate-200);border-radius:8px;padding:14px 18px;transition:box-shadow var(--transition)}
.wh-card:hover{box-shadow:var(--shadow-lg)}
.wh-card .wh-row1{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.wh-card .wh-code{font-size:10px;color:var(--slate-400);font-family:monospace;background:var(--slate-100);padding:1px 6px;border-radius:3px}
.wh-card .wh-name{font-size:14px;font-weight:600;color:var(--slate-800)}
.wh-card .wh-cat{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;white-space:nowrap}
.wh-card .wh-cat.bc{background:var(--blue-light);color:var(--blue)}
.wh-card .wh-cat.off{background:var(--indigo-light);color:var(--indigo)}
.wh-card .wh-cat.cl{background:var(--green-light);color:var(--green-dark)}
.wh-card .wh-cat.mt{background:var(--amber-light);color:var(--amber)}
.wh-card .wh-cat.kf{background:var(--red-light);color:var(--red)}
.wh-card .wh-cat.fa{background:#f3e8ff;color:#7c3aed}
.wh-card .wh-cat.ot{background:var(--slate-200);color:var(--slate-600)}
.wh-card .wh-row2{display:flex;align-items:center;gap:12px;margin-bottom:6px}
.wh-card .wh-qty{font-size:20px;font-weight:700;color:var(--slate-800)}
.wh-card .wh-unit{font-size:11px;color:var(--slate-500)}
.wh-card .wh-stock{display:flex;align-items:center;gap:6px;margin-left:auto}
.wh-card .wh-bar{width:80px;height:5px;background:var(--slate-200);border-radius:3px;overflow:hidden}
.wh-card .wh-bar-fill{height:100%;border-radius:3px;background:var(--green);transition:width 300ms}
.wh-card .wh-bar-fill.low{background:var(--red)}
.wh-card .wh-bar-fill.warn{background:var(--amber)}
.wh-card .wh-row3{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--slate-500);margin-bottom:6px}
.wh-card .wh-loc{display:flex;align-items:center;gap:3px}
.wh-card .wh-row4{display:flex;gap:5px;padding-top:8px;border-top:1px solid var(--slate-100)}
.wh-card .wh-btn{padding:3px 10px;border-radius:4px;font-size:11px;font-weight:500;cursor:pointer;border:1px solid var(--slate-200);background:#fff;color:var(--slate-600)}
.wh-card .wh-btn:hover{background:var(--slate-100)}
/* 标签 */
.tag-in{background:var(--green-light);color:var(--green-dark);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
.tag-out{background:var(--red-light);color:var(--red);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
.tag-loss{background:var(--amber-light);color:var(--amber);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
.tag-transfer{background:var(--indigo-light);color:var(--indigo);padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
.tag-check{background:#f3e8ff;color:#7c3aed;padding:1px 6px;border-radius:3px;font-size:11px;font-weight:600}
/* 库存水平徽章 */
.level-ok{color:var(--green);font-weight:600}
.level-warn{color:var(--amber);font-weight:600}
.level-low{color:var(--red);font-weight:600}
/* 操作日志 */
.log-table{width:100%;border-collapse:collapse;font-size:12px}
.log-table th{padding:5px 8px;text-align:left;color:var(--slate-400);font-weight:500;border-bottom:2px solid var(--slate-200);font-size:11px;position:sticky;top:0;background:#fff}
.log-table td{padding:5px 8px;border-bottom:1px solid var(--slate-100);color:var(--slate-700)}
.log-table tr:hover td{background:var(--slate-50)}
.log-scroll{max-height:400px;overflow-y:auto;border:1px solid var(--slate-200);border-radius:8px}`;

// ===== 2. Replace Stats Bar =====
const OLD_STATS = `<!-- 库房页 Stats Bar -->
<div class="stats-bar" id="sb-wh" style="display:none">
  <div class="stat-item"><div class="stat-icon avl"><i data-lucide="package"></i></div><div><div class="stat-value" id="sWhTotal">0</div><div class="stat-label">物品总数</div></div></div>
  <div class="stat-item"><div class="stat-icon wh"><i data-lucide="layers"></i></div><div><div class="stat-value" id="sWhCat">0</div><div class="stat-label">品类</div></div></div>
  <div class="stat-item"><div class="stat-icon b11"><i data-lucide="archive"></i></div><div><div class="stat-value" id="sWhLoc">0</div><div class="stat-label">库房数</div></div></div>
  <div class="stat-item"><div class="stat-icon bkd"><i data-lucide="alert-triangle"></i></div><div><div class="stat-value" id="sWhLow">0</div><div class="stat-label">低库存</div></div></div>
</div>`;

const NEW_STATS = `<!-- 库房页 Stats Bar -->
<div class="stats-bar" id="sb-wh" style="display:none">
  <div class="stat-item"><div class="stat-icon avl"><i data-lucide="package"></i></div><div><div class="stat-value" id="sWhTotal">0</div><div class="stat-label">物品种类</div></div></div>
  <div class="stat-item"><div class="stat-icon b11"><i data-lucide="layers"></i></div><div><div class="stat-value" id="sWhStock">0</div><div class="stat-label">库存总量</div></div></div>
  <div class="stat-item"><div class="stat-icon wh"><i data-lucide="archive"></i></div><div><div class="stat-value" id="sWhLoc">0</div><div class="stat-label">库房</div></div></div>
  <div class="stat-item"><div class="stat-icon bkd"><i data-lucide="alert-triangle"></i></div><div><div class="stat-value" id="sWhLow">0</div><div class="stat-label">低库存预警</div></div></div>
  <div class="stat-item"><div class="stat-icon" style="background:#f3e8ff;color:#7c3aed;"><i data-lucide="rotate-cw"></i></div><div><div class="stat-value" id="sWhTurnover">-</div><div class="stat-label">月周转率</div></div></div>
</div>`;

// ===== 3. Replace 库房 Page HTML =====
const OLD_PAGE = `<!-- ===== 库房页 ===== -->
<div class="page" id="p3">
  <div class="toolbar">
    <div class="toolbar-group"><span class="toolbar-label">品类</span><select class="toolbar-select" id="whCat"><option value="all">全部</option><option value="布草">布草</option><option value="办公用品">办公用品</option><option value="清洁用品">清洁用品</option><option value="维修工具">维修工具</option><option value="其他">其他</option></select></div>
    <div class="toolbar-divider"></div>
    <div class="toolbar-group"><span class="toolbar-label">库房</span><select class="toolbar-select" id="whLoc"><option value="all">全部</option><option value="112">112 12号楼1F</option><option value="512">512 12号楼5F</option><option value="515">515 12号楼5F</option></select></div>
    <div style="margin-left:auto;display:flex;gap:8px">
      <button class="btn btn-sm btn-primary" onclick="whAddItem()"><i data-lucide="plus"></i> 新增物品</button>
      <button class="btn btn-sm btn-success" onclick="whRecordIn()"><i data-lucide="arrow-down-circle"></i> 盘入</button>
      <button class="btn btn-sm btn-danger" onclick="whRecordOut()"><i data-lucide="arrow-up-circle"></i> 盘出</button>
      <button class="btn btn-sm btn-secondary" onclick="printWH()"><i data-lucide="printer"></i> 打印报表</button>
    </div>
  </div>
  <div id="whc"><div class="emp"><i data-lucide="package"></i><p>暂无库存记录</p></div></div>
</div>`;

const NEW_PAGE = `<!-- ===== 库房管理系统 ===== -->
<div class="page" id="p3">
  <!-- 库房子标签 -->
  <div class="wh-subtabs">
    <button class="wh-subtab act" onclick="whSubTab('overview')">库存总览</button>
    <button class="wh-subtab" onclick="whSubTab('log')">出入库记录</button>
    <button class="wh-subtab" onclick="whSubTab('check')">盘点管理</button>
  </div>
  <!-- 看板 -->
  <div class="dash-grid" id="whDash"></div>
  <!-- 筛选栏 -->
  <div class="toolbar" style="margin-bottom:0;border-radius:8px 8px 0 0">
    <div class="toolbar-group"><span class="toolbar-label">一级分类</span><select class="toolbar-select" id="whCat1" onchange="onWhCat1Change()"><option value="all">全部</option></select></div>
    <div class="toolbar-group"><span class="toolbar-label">二级分类</span><select class="toolbar-select" id="whCat2"><option value="all">全部</option></select></div>
    <div class="toolbar-divider"></div>
    <div class="toolbar-group"><span class="toolbar-label">库房</span><select class="toolbar-select" id="whLoc" onchange="rWh()"><option value="all">全部</option><option value="112">112 12号楼1F</option><option value="512">512 12号楼5F</option><option value="515">515 12号楼5F</option></select></div>
    <div class="toolbar-group"><span class="toolbar-label">搜索</span><input class="fi" style="width:140px" id="whSearch" placeholder="物品名称/编码" oninput="rWh()"></div>
    <div style="margin-left:auto;display:flex;gap:8px">
      <button class="btn btn-sm btn-primary" onclick="whAddItem()"><i data-lucide="plus"></i> 新增物品</button>
      <button class="btn btn-sm btn-success" onclick="whRecordIn()"><i data-lucide="arrow-down-circle"></i> 入库</button>
      <button class="btn btn-sm btn-danger" onclick="whRecordOut()"><i data-lucide="arrow-up-circle"></i> 出库</button>
      <button class="btn btn-sm btn-secondary" onclick="printWH()"><i data-lucide="printer"></i> 打印</button>
    </div>
  </div>
  <!-- 内容区 -->
  <div id="whc"><div class="emp"><i data-lucide="package"></i><p>暂无库存记录</p></div></div>
</div>`;

// ===== 4. Replace Variable Declarations =====
const OLD_VARS = `var WH = []; // 库房物品
var WHL = []; // 库房盘点记录`;

const NEW_VARS = `var WH = []; // 库房物品
var WHL = []; // 库房盘点记录
var whSubTabState = 'overview'; // 库房子标签状态

// 一级分类及其二级分类
var WH_CATEGORIES = {
  '布草': ['床单', '被套', '枕套', '毛巾', '浴巾', '毛毯', '床垫保护垫', '枕芯', '被芯'],
  '客房用品': ['洗漱套装', '拖鞋', '衣架', '电水壶', '吹风机', '遥控器', '纸巾盒', '垃圾桶'],
  '清洁用品': ['清洁剂', '扫把', '拖把', '垃圾袋', '消毒液', '马桶刷', '橡胶手套', '抹布'],
  '维修物料': ['LED灯泡', '螺丝刀套装', '电工胶带', '水管接头', '门锁配件', '膨胀螺栓', '生料带'],
  '办公用品': ['A4打印纸', '签字笔', '文件夹', '笔记本', '订书机', '胶带', '计算器', '记号笔'],
  '固定资产': ['对讲机', '测温仪', '手推车', '吸尘器', '电风扇'],
  '其他': ['一次性拖鞋', '一次性洗漱杯', '备用钥匙', '欢迎卡']
};

var WH_CAT_COLORS = {
  '布草': 'bc', '客房用品': 'kf', '清洁用品': 'cl',
  '维修物料': 'mt', '办公用品': 'off', '固定资产': 'fa', '其他': 'ot'
};

var locNames = {'112':'12号楼 1F 112库房','512':'12号楼 5F 512库房','515':'12号楼 5F 515库房'};

function whFindItem(id){for(var i=0;i<WH.length;i++){if(WH[i].id===id)return WH[i];}return null;}
function whCatClass(cat){return WH_CAT_COLORS[cat]||'ot';}`;

// ===== 5. Replace Demo Data =====
const OLD_DEMO = `  // 库房 Demo 数据
  WH=[];
  var items=[
    {id:'w1',name:'床单',cat:'布草',unit:'条',qty:80,loc:'112'},
    {id:'w2',name:'被套',cat:'布草',unit:'条',qty:60,loc:'112'},
    {id:'w3',name:'枕套',cat:'布草',unit:'个',qty:100,loc:'112'},
    {id:'w4',name:'毛巾',cat:'布草',unit:'条',qty:120,loc:'112'},
    {id:'w5',name:'浴巾',cat:'布草',unit:'条',qty:80,loc:'112'},
    {id:'w6',name:'A4打印纸',cat:'办公用品',unit:'包',qty:25,loc:'515'},
    {id:'w7',name:'签字笔',cat:'办公用品',unit:'盒',qty:15,loc:'515'},
    {id:'w8',name:'文件夹',cat:'办公用品',unit:'个',qty:40,loc:'515'},
    {id:'w9',name:'笔记本',cat:'办公用品',unit:'本',qty:50,loc:'515'},
    {id:'w10',name:'扫把',cat:'清洁用品',unit:'把',qty:8,loc:'512'},
    {id:'w11',name:'拖把',cat:'清洁用品',unit:'把',qty:6,loc:'512'},
    {id:'w12',name:'垃圾袋',cat:'清洁用品',unit:'卷',qty:30,loc:'512'},
    {id:'w13',name:'清洁剂',cat:'清洁用品',unit:'瓶',qty:12,loc:'512'},
    {id:'w14',name:'LED灯泡',cat:'维修工具',unit:'个',qty:20,loc:'512'},
    {id:'w15',name:'螺丝刀套装',cat:'维修工具',unit:'套',qty:3,loc:'512'},
    {id:'w16',name:'电工胶带',cat:'维修工具',unit:'卷',qty:10,loc:'512'},
    {id:'w17',name:'一次性拖鞋',cat:'其他',unit:'双',qty:200,loc:'112'},
    {id:'w18',name:'洗漱套装',cat:'其他',unit:'套',qty:90,loc:'112'}
  ];
  for(var i=0;i<items.length;i++){WH.push(items[i]);}

  WHL=[];
  var rds=[];
  for(var i=0;i<items.length;i++){rds.push({id:'l'+i,itemId:items[i].id,type:'in',qty:items[i].qty,op:'系统初始化',dt:fm(t),note:'初始盘入'});}
  WHL=rds;
  sv();`;

const NEW_DEMO = `  // 库房 Demo 数据（按专业酒店WMS标准）
  WH=[];
  var items=[
    // 布草 - 112库房
    {id:'w1',code:'BC-2026-001',name:'床单',cat1:'布草',cat2:'床单',spec:'200×280cm 纯棉',unit:'条',qty:80,minStock:15,maxStock:120,loc:'112',shelf:'A',level:'1',supplier:'华纺布草公司'},
    {id:'w2',code:'BC-2026-002',name:'被套',cat1:'布草',cat2:'被套',spec:'240×250cm 纯棉',unit:'条',qty:60,minStock:10,maxStock:100,loc:'112',shelf:'A',level:'2',supplier:'华纺布草公司'},
    {id:'w3',code:'BC-2026-003',name:'枕套',cat1:'布草',cat2:'枕套',spec:'55×85cm 纯棉',unit:'个',qty:100,minStock:20,maxStock:150,loc:'112',shelf:'A',level:'3',supplier:'华纺布草公司'},
    {id:'w4',code:'BC-2026-004',name:'浴巾',cat1:'布草',cat2:'浴巾',spec:'70×140cm',unit:'条',qty:80,minStock:12,maxStock:120,loc:'112',shelf:'B',level:'1',supplier:'华纺布草公司'},
    {id:'w5',code:'BC-2026-005',name:'毛巾',cat1:'布草',cat2:'毛巾',spec:'34×75cm',unit:'条',qty:120,minStock:20,maxStock:180,loc:'112',shelf:'B',level:'2',supplier:'华纺布草公司'},
    {id:'w6',code:'BC-2026-006',name:'毛毯',cat1:'布草',cat2:'毛毯',spec:'200×230cm',unit:'条',qty:40,minStock:8,maxStock:60,loc:'112',shelf:'B',level:'3',supplier:'恒源祥家纺'},
    {id:'w7',code:'BC-2026-007',name:'床垫保护垫',cat1:'布草',cat2:'床垫保护垫',spec:'200×180cm',unit:'张',qty:50,minStock:10,maxStock:80,loc:'112',shelf:'C',level:'1',supplier:'华纺布草公司'},
    // 客房用品 - 112库房
    {id:'w8',code:'KF-2026-001',name:'洗漱套装',cat1:'客房用品',cat2:'洗漱套装',spec:'牙刷+牙膏+梳子+浴帽',unit:'套',qty:200,minStock:30,maxStock:300,loc:'112',shelf:'D',level:'1',supplier:'明辉酒店用品'},
    {id:'w9',code:'KF-2026-002',name:'一次性拖鞋',cat1:'客房用品',cat2:'拖鞋',spec:'白色棉质 均码',unit:'双',qty:300,minStock:50,maxStock:500,loc:'112',shelf:'D',level:'2',supplier:'明辉酒店用品'},
    {id:'w10',code:'KF-2026-003',name:'衣架',cat1:'客房用品',cat2:'衣架',spec:'木质 44cm',unit:'个',qty:60,minStock:10,maxStock:100,loc:'112',shelf:'C',level:'2',supplier:'酒店用品批发'},
    // 清洁用品 - 512库房
    {id:'w11',code:'CL-2026-001',name:'多功能清洁剂',cat1:'清洁用品',cat2:'清洁剂',spec:'5L/桶',unit:'桶',qty:12,minStock:3,maxStock:25,loc:'512',shelf:'A',level:'1',supplier:'绿伞清洁'},
    {id:'w12',code:'CL-2026-002',name:'84消毒液',cat1:'清洁用品',cat2:'消毒液',spec:'3.8L/桶',unit:'桶',qty:8,minStock:2,maxStock:20,loc:'512',shelf:'A',level:'2',supplier:'绿伞清洁'},
    {id:'w13',code:'CL-2026-003',name:'垃圾袋',cat1:'清洁用品',cat2:'垃圾袋',spec:'70×80cm 加厚50只/卷',unit:'卷',qty:30,minStock:5,maxStock:50,loc:'512',shelf:'B',level:'1',supplier:'得力办公'},
    {id:'w14',code:'CL-2026-004',name:'扫把簸箕套装',cat1:'清洁用品',cat2:'扫把',spec:'不锈钢杆',unit:'套',qty:5,minStock:2,maxStock:15,loc:'512',shelf:'B',level:'2',supplier:'日用百货'},
    {id:'w15',code:'CL-2026-005',name:'平板拖把',cat1:'清洁用品',cat2:'拖把',spec:'60cm 加厚',unit:'把',qty:6,minStock:2,maxStock:12,loc:'512',shelf:'B',level:'2',supplier:'日用百货'},
    // 维修物料 - 512库房
    {id:'w16',code:'MT-2026-001',name:'LED灯泡',cat1:'维修物料',cat2:'LED灯泡',spec:'9W E27暖光',unit:'个',qty:25,minStock:5,maxStock:60,loc:'512',shelf:'C',level:'1',supplier:'佛山照明'},
    {id:'w17',code:'MT-2026-002',name:'电工胶带',cat1:'维修物料',cat2:'电工胶带',spec:'黑色 18mm×10m',unit:'卷',qty:10,minStock:3,maxStock:30,loc:'512',shelf:'C',level:'2',supplier:'五金工具'},
    {id:'w18',code:'MT-2026-003',name:'门锁配件包',cat1:'维修物料',cat2:'门锁配件',spec:'含锁芯+把手+螺丝',unit:'套',qty:4,minStock:1,maxStock:10,loc:'512',shelf:'C',level:'2',supplier:'门锁厂家'},
    // 办公用品 - 515库房
    {id:'w19',code:'BG-2026-001',name:'A4打印纸',cat1:'办公用品',cat2:'A4打印纸',spec:'70g 500张/包',unit:'包',qty:25,minStock:5,maxStock:60,loc:'515',shelf:'A',level:'1',supplier:'得力办公'},
    {id:'w20',code:'BG-2026-002',name:'签字笔',cat1:'办公用品',cat2:'签字笔',spec:'0.5mm 黑色 12支/盒',unit:'盒',qty:15,minStock:3,maxStock:30,loc:'515',shelf:'A',level:'2',supplier:'得力办公'},
    {id:'w21',code:'BG-2026-003',name:'笔记本',cat1:'办公用品',cat2:'笔记本',spec:'A5 40页 牛皮封面',unit:'本',qty:50,minStock:10,maxStock:100,loc:'515',shelf:'A',level:'2',supplier:'得力办公'},
    // 固定资产 - 515库房
    {id:'w22',code:'FA-2026-001',name:'对讲机',cat1:'固定资产',cat2:'对讲机',spec:'摩托罗拉GP3688',unit:'台',qty:8,minStock:2,maxStock:15,loc:'515',shelf:'B',level:'1',supplier:'通讯设备'},
    {id:'w23',code:'FA-2026-002',name:'手推车',cat1:'固定资产',cat2:'手推车',spec:'不锈钢 承重200kg',unit:'台',qty:3,minStock:1,maxStock:5,loc:'515',shelf:'B',level:'1',supplier:'酒店设备'}
  ];
  for(var i=0;i<items.length;i++){WH.push(items[i]);}

  // 出入库记录
  WHL=[];
  var rds=[];
  // 初始盘入
  for(var i=0;i<items.length;i++){
    rds.push({id:'l'+i,itemId:items[i].id,type:'in',qty:items[i].qty,beforeQty:0,afterQty:items[i].qty,op:'系统初始化',dt:fm(t),orderNo:'IN-2026-0001',note:'初始库存盘入'});
  }
  // 模拟一些最近的出入库操作
  var opDate = new Date(t); opDate.setDate(opDate.getDate()-2);
  rds.push({id:'lr'+Date.now(),itemId:'w8',type:'out',qty:20,beforeQty:200,afterQty:180,op:'客房部-李华',dt:fm(opDate),orderNo:'OUT-2026-0012',note:'培训班客房补充'});
  opDate.setDate(opDate.getDate()-1);
  rds.push({id:'lr'+Date.now()+1,itemId:'w19',type:'out',qty:5,beforeQty:25,afterQty:20,op:'办公室-王芳',dt:fm(opDate),orderNo:'OUT-2026-0013',note:'培训资料打印'});
  opDate.setDate(opDate.getDate()-1);
  rds.push({id:'lr'+Date.now()+2,itemId:'w11',type:'in',qty:4,beforeQty:8,afterQty:12,op:'采购部-张强',dt:fm(opDate),orderNo:'IN-2026-0048',note:'清洁剂补货'});
  opDate.setDate(opDate.getDate()-3);
  rds.push({id:'lr'+Date.now()+3,itemId:'w1',type:'out',qty:15,beforeQty:80,afterQty:65,op:'客房部-刘芳',dt:fm(opDate),orderNo:'OUT-2026-0010',note:'客房换洗'});
  opDate.setDate(opDate.getDate()-3);
  rds.push({id:'lr'+Date.now()+4,itemId:'w9',type:'out',qty:50,beforeQty:300,afterQty:250,op:'客房部-陈静',dt:fm(opDate),orderNo:'OUT-2026-0011',note:'培训班接待用品'});
  WHL=rds;
  sv();`;

// ===== Apply replacements =====
if (html.indexOf(OLD_CSS) !== -1) {
  html = html.replace(OLD_CSS, NEW_CSS);
  console.log('✅ CSS replaced');
} else { console.log('❌ OLD_CSS not found'); }

if (html.indexOf(OLD_STATS) !== -1) {
  html = html.replace(OLD_STATS, NEW_STATS);
  console.log('✅ Stats bar replaced');
} else { console.log('❌ OLD_STATS not found'); }

if (html.indexOf(OLD_PAGE) !== -1) {
  html = html.replace(OLD_PAGE, NEW_PAGE);
  console.log('✅ Page HTML replaced');
} else { console.log('❌ OLD_PAGE not found'); }

if (html.indexOf(OLD_VARS) !== -1) {
  html = html.replace(OLD_VARS, NEW_VARS);
  console.log('✅ Variables replaced');
} else { console.log('❌ OLD_VARS not found'); }

if (html.indexOf(OLD_DEMO) !== -1) {
  html = html.replace(OLD_DEMO, NEW_DEMO);
  console.log('✅ Demo data replaced');
} else { console.log('❌ OLD_DEMO not found'); }

// ===== 6. Replace ALL JS from "库房盘点" marker to end of script =====
const JS_MARKER = '// ========== 库房盘点 ==========';
const JS_END = '// ===== 初始化';

const jsMarkerIdx = html.indexOf(JS_MARKER);
const jsEndIdx = html.indexOf(JS_END, jsMarkerIdx);

if (jsMarkerIdx !== -1 && jsEndIdx !== -1) {
  const before = html.substring(0, jsMarkerIdx);
  const after = html.substring(jsEndIdx);
  
  const NEW_JS = `// ========== 库房管理系统 ==========

function whSubTab(tab){
  whSubTabState = tab;
  document.querySelectorAll('.wh-subtab').forEach(function(x){x.classList.remove('act');});
  var tabs = document.querySelectorAll('.wh-subtab');
  var idx = tab==='overview'?0:tab==='log'?1:2;
  tabs[idx].classList.add('act');
  rWh();
}

function onWhCat1Change(){
  var cat1 = document.getElementById('whCat1').value;
  var sel2 = document.getElementById('whCat2');
  sel2.innerHTML = '<option value="all">全部</option>';
  if(cat1!=='all' && WH_CATEGORIES[cat1]){
    for(var i=0;i<WH_CATEGORIES[cat1].length;i++){
      sel2.innerHTML += '<option value="'+WH_CATEGORIES[cat1][i]+'">'+WH_CATEGORIES[cat1][i]+'</option>';
    }
  }
  rWh();
}

function rWh(){
  var cat1=document.getElementById('whCat1').value;
  var cat2=document.getElementById('whCat2').value;
  var loc=document.getElementById('whLoc').value;
  var kw=(document.getElementById('whSearch').value||'').trim().toLowerCase();

  // 更新看板
  updateWhDash();

  var c=document.getElementById('whc');

  if(whSubTabState==='log'){renderWhLog(c);return;}
  if(whSubTabState==='check'){renderWhCheck(c);return;}

  // 筛选物品
  var items=WH;
  if(cat1!=='all')items=items.filter(function(w){return w.cat1===cat1;});
  if(cat2!=='all')items=items.filter(function(w){return w.cat2===cat2;});
  if(loc!=='all')items=items.filter(function(w){return w.loc===loc;});
  if(kw)items=items.filter(function(w){return (w.code||'').toLowerCase().indexOf(kw)!==-1||w.name.toLowerCase().indexOf(kw)!==-1;});

  if(items.length===0){c.innerHTML='<div class="emp"><i data-lucide="package"></i><p>暂无匹配的库存记录</p></div>';lucide.createIcons();return;}

  // 按一级分类分组
  var grp={};for(var i=0;i<items.length;i++){var w=items[i];if(!grp[w.cat1])grp[w.cat1]=[];grp[w.cat1].push(w);}
  var catOrder=['布草','客房用品','清洁用品','维修物料','办公用品','固定资产','其他'];
  var h='';
  for(var ci=0;ci<catOrder.length;ci++){
    var cn=catOrder[ci];if(!grp[cn])continue;
    var ws=grp[cn];var totalQty=0;var lowCnt=0;
    for(var wi=0;wi<ws.length;wi++){totalQty+=ws[wi].qty;var minS=ws[wi].minStock||0;if(ws[wi].qty<=minS&&minS>0)lowCnt++;}
    h+='<div class="scard"><h3><i data-lucide="package" style="width:16px;height:16px;vertical-align:middle;"></i> '+cn+' <span style="font-weight:400;color:var(--slate-400);font-size:12px;">'+ws.length+'种 &middot; 合计 '+totalQty+(ws[0].unit||'件')+(lowCnt>0?' &middot; <span style="color:var(--red);">'+lowCnt+'项低库存</span>':'')+'</span></h3>';
    h+='<div class="wh-grid">';
    for(var wi=0;wi<ws.length;wi++){
      var w=ws[wi];var minS=w.minStock||5;var maxS=w.maxStock||w.qty*2;
      var ratio=Math.min(100,Math.round(w.qty/maxS*100));
      var barCls='';var levelCls='level-ok';var levelTxt='正常';
      if(w.qty<=minS){barCls=' low';levelCls='level-low';levelTxt='低库存';}
      else if(w.qty<=minS*2){barCls=' warn';levelCls='level-warn';levelTxt='偏低';}
      h+='<div class="wh-card">';
      h+='<div class="wh-row1"><span class="wh-code">'+w.code+'</span><span class="wh-cat '+whCatClass(w.cat1)+'">'+w.cat1+' / '+w.cat2+'</span></div>';
      h+='<div class="wh-name" style="margin-bottom:6px;">'+w.name+'</div>';
      h+='<div class="wh-row2"><span class="wh-qty">'+w.qty+'</span><span class="wh-unit">'+w.unit+'</span><div class="wh-stock"><div class="wh-bar"><div class="wh-bar-fill'+barCls+'" style="width:'+ratio+'%"></div></div><span class="'+levelCls+'" style="font-size:11px;">'+levelTxt+'</span></div></div>';
      h+='<div class="wh-row3"><span class="wh-loc"><i data-lucide="map-pin" style="width:10px;height:10px;"></i> '+(locNames[w.loc]||w.loc)+'</span>'+(w.shelf?'<span>货架 '+w.shelf+(w.level?'-'+w.level:'')+'</span>':'')+(w.supplier?'<span>'+w.supplier+'</span>':'')+'</div>';
      h+='<div class="wh-row4"><button class="wh-btn" onclick="whQuickIn(\\''+w.id+'\\')">入库</button><button class="wh-btn" onclick="whQuickOut(\\''+w.id+'\\')">出库</button><button class="wh-btn" onclick="whEditItem(\\''+w.id+'\\')">编辑</button><button class="wh-btn" style="margin-left:auto" onclick="whStartCheck(\\''+w.id+'\\')">盘点</button></div>';
      h+='</div>';
    }
    h+='</div></div>';
  }
  c.innerHTML=h;lucide.createIcons();
}

function updateWhDash(){
  var totalItems=WH.length;var totalStock=0;var lowCnt=0;
  var catSet={};var locSet={};
  for(var i=0;i<WH.length;i++){
    totalStock+=WH[i].qty;catSet[WH[i].cat1]=1;locSet[WH[i].loc]=1;
    var minS=WH[i].minStock||0;if(WH[i].qty<=minS&&minS>0)lowCnt++;
  }
  var catCount=0;for(var k in catSet)catCount++;
  var locCount=0;for(var k in locSet)locCount++;

  // 计算月周转率（简化：本月出入库总次数/物品总数）
  var now=new Date();var monthAgo=new Date();monthAgo.setMonth(monthAgo.getMonth()-1);
  var monthOps=0;for(var i=0;i<WHL.length;i++){if(WHL[i].dt>=monthAgo.toISOString().slice(0,10))monthOps++;}
  var turnover=totalItems>0?(monthOps/totalItems).toFixed(1):'0.0';

  document.getElementById('sWhTotal').textContent=totalItems;
  document.getElementById('sWhStock').textContent=totalStock;
  document.getElementById('sWhLoc').textContent=locCount;
  document.getElementById('sWhLow').textContent=lowCnt;
  document.getElementById('sWhTurnover').textContent=turnover;

  // 看板
  var dh=document.getElementById('whDash');
  dh.innerHTML='';
  dh.innerHTML+='<div class="dash-card"><div class="dash-icon di-blue"><i data-lucide="package"></i></div><div><div class="dash-val">'+totalItems+'</div><div class="dash-label">物品种类</div><div class="dash-sub">'+catCount+'个一级分类</div></div></div>';
  dh.innerHTML+='<div class="dash-card"><div class="dash-icon di-green"><i data-lucide="layers"></i></div><div><div class="dash-val">'+totalStock+'</div><div class="dash-label">库存总量</div><div class="dash-sub">分布在'+locCount+'个库房</div></div></div>';
  dh.innerHTML+='<div class="dash-card"><div class="dash-icon di-amber"><i data-lucide="rotate-cw"></i></div><div><div class="dash-val">'+turnover+'</div><div class="dash-label">月周转率</div><div class="dash-sub">近30天操作'+monthOps+'次</div></div></div>';
  dh.innerHTML+='<div class="dash-card"><div class="dash-icon '+(lowCnt>5?'di-red':'di-amber')+'"><i data-lucide="alert-triangle"></i></div><div><div class="dash-val" style="'+(lowCnt>5?'color:var(--red)':'')+'">'+lowCnt+'</div><div class="dash-label">低库存预警</div><div class="dash-sub">低于安全库存</div></div></div>';
  lucide.createIcons();
}

// ===== 出入库记录 =====
function renderWhLog(c){
  var logs=WHL.slice().reverse().slice(0,100);
  if(logs.length===0){c.innerHTML='<div class="emp"><i data-lucide="file-text"></i><p>暂无出入库记录</p></div>';return;}
  var h='<div class="scard"><h3><i data-lucide="clipboard-list" style="width:16px;height:16px;vertical-align:middle;"></i> 出入库记录（最近100条）</h3>';
  h+='<div class="log-scroll"><table class="log-table"><tr><th style="width:90px">时间</th><th>物品</th><th style="width:50px">类型</th><th style="width:55px">数量</th><th style="width:75px">库存变化</th><th style="width:80px">操作人</th><th>单号</th><th>备注</th></tr>';
  for(var i=0;i<logs.length;i++){
    var l=logs[i];var w=whFindItem(l.itemId);
    var typeTag='';if(l.type==='in')typeTag='<span class="tag-in">入库</span>';
    else if(l.type==='out')typeTag='<span class="tag-out">出库</span>';
    else if(l.type==='loss')typeTag='<span class="tag-loss">报损</span>';
    else if(l.type==='transfer')typeTag='<span class="tag-transfer">调拨</span>';
    else if(l.type==='check')typeTag='<span class="tag-check">盘点</span>';
    var qtyStr=l.type==='in'?'+'+l.qty:'-'+l.qty;
    var stockChange=(typeof l.beforeQty!=='undefined')?(l.beforeQty+' → '+l.afterQty):'';
    h+='<tr><td>'+l.dt+'</td><td>'+(w?w.name:l.itemId)+'</td><td>'+typeTag+'</td><td style="text-align:center;font-weight:700;'+(l.type==='in'?'color:var(--green-dark)':'color:var(--red)')+'">'+qtyStr+'</td><td style="text-align:center;font-size:11px;">'+stockChange+'</td><td>'+l.op+'</td><td style="font-size:11px;">'+(l.orderNo||'')+'</td><td style="font-size:11px;color:var(--slate-500)">'+(l.note||'')+'</td></tr>';
  }
  h+='</table></div></div>';
  c.innerHTML=h;
}

// ===== 盘点管理 =====
function renderWhCheck(c){
  var h='<div class="bp"><h3><i data-lucide="clipboard-check"></i> 盘点管理</h3>';
  h+='<p style="font-size:13px;color:var(--slate-500);margin-bottom:16px;">选择盘点方式开始库存盘点，系统将自动对比账面与实际库存。</p>';
  h+='<div style="display:flex;gap:12px;margin-bottom:16px;">';
  h+='<button class="btn btn-primary" onclick="whFullCheck()"><i data-lucide="list"></i> 全部盘点</button>';
  h+='<button class="btn btn-secondary" onclick="whCycleCheck()"><i data-lucide="refresh-cw"></i> 循环盘点（低库存项）</button>';
  h+='</div>';

  // 最近盘点记录
  var checkLogs=WHL.filter(function(l){return l.type==='check';}).slice(-20);
  if(checkLogs.length>0){
    h+='<h4 style="font-size:13px;font-weight:600;color:var(--slate-600);margin:16px 0 8px;">最近盘点记录</h4>';
    h+='<table class="st"><tr><th>时间</th><th>物品</th><th>账面库存</th><th>实盘数量</th><th>差异</th><th>操作人</th></tr>';
    for(var i=checkLogs.length-1;i>=0;i--){
      var l=checkLogs[i];var w=whFindItem(l.itemId);
      var diff=l.afterQty-l.beforeQty;var diffCls=diff===0?'color:var(--green)':diff>0?'color:var(--green-dark)':'color:var(--red)';
      h+='<tr><td>'+l.dt+'</td><td>'+(w?w.name:l.itemId)+'</td><td style="text-align:center;">'+(l.beforeQty||0)+'</td><td style="text-align:center;font-weight:600;">'+(l.afterQty||0)+'</td><td style="text-align:center;font-weight:700;'+diffCls+'">'+(diff>0?'+'+diff:diff)+'</td><td>'+l.op+'</td></tr>';
    }
    h+='</table>';
  }else{
    h+='<div class="emp" style="padding:30px"><i data-lucide="clipboard-check"></i><p>暂无盘点记录，点击上方按钮开始盘点</p></div>';
  }
  h+='</div>';
  c.innerHTML=h;lucide.createIcons();
}

function whFullCheck(){
  document.getElementById('mt').innerHTML='<i data-lucide="clipboard-check" style="width:18px;height:18px;"></i> 全部盘点';
  var mb=document.getElementById('mb');
  mb.innerHTML='<p style="font-size:13px;color:var(--slate-600);margin-bottom:12px;">正在对全部 '+WH.length+' 种物品进行盘点确认</p>';
  mb.innerHTML+='<div style="max-height:300px;overflow-y:auto;">';
  for(var i=0;i<WH.length;i++){
    var w=WH[i];
    mb.innerHTML+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--slate-100);"><span style="width:80px;font-size:12px;font-weight:500;">'+w.code+'</span><span style="width:90px;font-size:12px;">'+w.name+'</span><span style="font-size:12px;color:var(--slate-400);">账面：'+w.qty+w.unit+'</span><input class="ni" id="chkInp'+w.id+'" placeholder="实盘" style="width:60px;margin-left:auto;" value="'+w.qty+'"></div>';
  }
  mb.innerHTML+='</div><div class="fg" style="margin-top:12px;"><label class="fl">盘点人</label><input class="fi" id="chkOp" placeholder="姓名"></div>';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-primary" onclick="whDoFullCheck()">确认盘点</button>';
  document.getElementById('mo').classList.add('open');
}

function whDoFullCheck(){
  var op=document.getElementById('chkOp').value.trim()||'盘点员';
  var today=new Date().toISOString().slice(0,10);
  var diffCnt=0;
  for(var i=0;i<WH.length;i++){
    var w=WH[i];var inp=document.getElementById('chkInp'+w.id);
    if(!inp)continue;var actual=parseInt(inp.value);if(isNaN(actual))actual=w.qty;
    if(actual!==w.qty){
      WHL.push({id:'l'+Date.now()+i,itemId:w.id,type:'check',qty:Math.abs(actual-w.qty),beforeQty:w.qty,afterQty:actual,op:op,dt:today,orderNo:'CHK-'+today,note:'全盘差异调整'});
      w.qty=actual;diffCnt++;
    }
  }
  if(diffCnt===0){
    WHL.push({id:'l'+Date.now(),itemId:'all',type:'check',qty:0,beforeQty:0,afterQty:0,op:op,dt:today,orderNo:'CHK-'+today,note:'全盘 — 账实相符，无差异'});
  }
  sv();cm();whSubTab('check');t('盘点完成：'+diffCnt+'项差异已调整','s');
}

function whCycleCheck(){
  var lowItems=WH.filter(function(w){var ms=w.minStock||0;return ms>0&&w.qty<=ms;});
  if(lowItems.length===0){t('当前无低库存物品需要盘点','i');return;}
  document.getElementById('mt').innerHTML='<i data-lucide="refresh-cw" style="width:18px;height:18px;"></i> 循环盘点（'+lowItems.length+'项低库存）';
  var mb=document.getElementById('mb');
  mb.innerHTML='<div style="max-height:300px;overflow-y:auto;">';
  for(var i=0;i<lowItems.length;i++){
    var w=lowItems[i];
    mb.innerHTML+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--slate-100);"><span style="width:80px;font-size:12px;font-weight:500;color:var(--red);">⚠ '+w.code+'</span><span style="width:90px;font-size:12px;">'+w.name+'</span><span style="font-size:12px;color:var(--slate-400);">账面：'+w.qty+w.unit+'</span><input class="ni" id="chkInp'+w.id+'" placeholder="实盘" style="width:60px;margin-left:auto;" value="'+w.qty+'"></div>';
  }
  mb.innerHTML+='</div><div class="fg" style="margin-top:12px;"><label class="fl">盘点人</label><input class="fi" id="chkOp" placeholder="姓名"></div>';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-primary" onclick="whDoFullCheck()">确认盘点</button>';
  document.getElementById('mo').classList.add('open');
}

function whStartCheck(id){
  var w=whFindItem(id);if(!w)return;
  document.getElementById('mt').innerHTML='<i data-lucide="clipboard-check" style="width:18px;height:18px;"></i> 盘点 '+w.name;
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fg" style="margin-bottom:12px;"><label class="fl">物品编码</label><input class="fi" value="'+w.code+'" readonly style="background:#f5f5f5;"></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">账面库存</label><input class="fi" value="'+w.qty+' '+w.unit+'" readonly style="background:#f5f5f5;font-weight:600;"></div><div class="fg"><label class="fl">实盘数量 <span class="rq">*</span></label><input class="fi" type="number" id="chkQty" value="'+w.qty+'" min="0"></div></div>';
  mb.innerHTML+='<div class="fg" style="margin-top:10px;"><label class="fl">盘点人</label><input class="fi" id="chkOp" placeholder="姓名"></div><input type="hidden" id="chkItemId" value="'+w.id+'">';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-primary" onclick="whDoSingleCheck()">确认盘点</button>';
  document.getElementById('mo').classList.add('open');
}

function whDoSingleCheck(){
  var id=document.getElementById('chkItemId').value;var w=whFindItem(id);if(!w)return;
  var actual=parseInt(document.getElementById('chkQty').value)||0;
  var op=document.getElementById('chkOp').value.trim()||'盘点员';
  var today=new Date().toISOString().slice(0,10);
  var diff=actual-w.qty;
  WHL.push({id:'l'+Date.now(),itemId:id,type:'check',qty:Math.abs(diff),beforeQty:w.qty,afterQty:actual,op:op,dt:today,orderNo:'CHK-'+today,note:diff===0?'账实相符':(diff>0?'盘盈 +'+diff:'盘亏 -'+Math.abs(diff))});
  w.qty=actual;
  sv();cm();rWh();t(w.name+' 盘点完成'+(diff!==0?'，差异'+diff:'，账实相符'),diff===0?'s':'i');
}

// ===== 新增/编辑物品 =====
function whAddItem(){
  // 生成一级分类选项
  var cat1Opts='<option value="">请选择</option>';
  var cat1Keys=Object.keys(WH_CATEGORIES);
  for(var i=0;i<cat1Keys.length;i++){cat1Opts+='<option value="'+cat1Keys[i]+'">'+cat1Keys[i]+'</option>';}

  document.getElementById('mt').innerHTML='<i data-lucide="plus" style="width:18px;height:18px;"></i> 新增物品';
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fr"><div class="fg"><label class="fl">物品编码 <span class="rq">*</span></label><input class="fi" id="whmCode" placeholder="如：BC-2026-001"></div><div class="fg"><label class="fl">物品名称 <span class="rq">*</span></label><input class="fi" id="whmName" placeholder="如：床单"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">一级分类</label><select class="fi" id="whmCat1" onchange="whmCat1Change()">'+cat1Opts+'</select></div><div class="fg"><label class="fl">二级分类</label><input class="fi" id="whmCat2" placeholder="如：床单"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">规格</label><input class="fi" id="whmSpec" placeholder="如：200×280cm"></div><div class="fg"><label class="fl">单位</label><input class="fi" id="whmUnit" value="件" placeholder="如：条、个"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">初始数量</label><input class="fi" type="number" id="whmQty" value="0" min="0"></div><div class="fg"><label class="fl">安全库存</label><input class="fi" type="number" id="whmMin" value="5" min="1"></div><div class="fg"><label class="fl">最大库存</label><input class="fi" type="number" id="whmMax" value="100" min="1"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">存放库房</label><select class="fi" id="whmLoc"><option value="112">112 12号楼1F</option><option value="512">512 12号楼5F</option><option value="515">515 12号楼5F</option></select></div><div class="fg"><label class="fl">货架/层</label><input class="fi" id="whmShelf" placeholder="如：A-1"></div><div class="fg"><label class="fl">供应商</label><input class="fi" id="whmSupplier" placeholder="如：华纺布草公司"></div></div>';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-primary" onclick="whAddItemSave()">保存</button>';
  document.getElementById('mo').classList.add('open');
}

function whmCat1Change(){
  var cat1=document.getElementById('whmCat1').value;
  var inp=document.getElementById('whmCat2');
  if(WH_CATEGORIES[cat1]){inp.placeholder='如：'+WH_CATEGORIES[cat1].join('、');}
}

function whAddItemSave(){
  var code=document.getElementById('whmCode').value.trim();
  var name=document.getElementById('whmName').value.trim();
  if(!code){t('请填写物品编码','e');return;}if(!name){t('请填写物品名称','e');return;}
  var cat1=document.getElementById('whmCat1').value;
  var cat2=document.getElementById('whmCat2').value.trim();
  var spec=document.getElementById('whmSpec').value.trim();
  var unit=document.getElementById('whmUnit').value.trim()||'件';
  var qty=parseInt(document.getElementById('whmQty').value)||0;
  var minS=parseInt(document.getElementById('whmMin').value)||5;
  var maxS=parseInt(document.getElementById('whmMax').value)||100;
  var loc=document.getElementById('whmLoc').value;
  var shelf=document.getElementById('whmShelf').value.trim();
  var supplier=document.getElementById('whmSupplier').value.trim();
  var w={id:'w'+Date.now()+Math.random().toString(36).slice(2,4),code:code,name:name,cat1:cat1,cat2:cat2,spec:spec,unit:unit,qty:qty,minStock:minS,maxStock:maxS,loc:loc,shelf:shelf,supplier:supplier};
  WH.push(w);
  WHL.push({id:'l'+Date.now(),itemId:w.id,type:'in',qty:qty,beforeQty:0,afterQty:qty,op:'手动新增',dt:new Date().toISOString().slice(0,10),orderNo:'IN-'+new Date().toISOString().slice(0,10).replace(/-/g,''),note:'新增物品初始盘入'});
  sv();cm();rWh();t('已添加：'+name,'s');
}

function whEditItem(id){
  var w=whFindItem(id);if(!w)return;
  var cat1Opts='';var cat1Keys=Object.keys(WH_CATEGORIES);
  for(var i=0;i<cat1Keys.length;i++){cat1Opts+='<option value="'+cat1Keys[i]+'"'+(cat1Keys[i]===w.cat1?' selected':'')+'>'+cat1Keys[i]+'</option>';}

  document.getElementById('mt').innerHTML='<i data-lucide="edit" style="width:18px;height:18px;"></i> 编辑 '+w.name;
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fr"><div class="fg"><label class="fl">物品编码</label><input class="fi" id="whmCode" value="'+w.code+'"></div><div class="fg"><label class="fl">物品名称</label><input class="fi" id="whmName" value="'+w.name+'"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">一级分类</label><select class="fi" id="whmCat1">'+cat1Opts+'</select></div><div class="fg"><label class="fl">二级分类</label><input class="fi" id="whmCat2" value="'+(w.cat2||'')+'"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">规格</label><input class="fi" id="whmSpec" value="'+(w.spec||'')+'"></div><div class="fg"><label class="fl">单位</label><input class="fi" id="whmUnit" value="'+w.unit+'"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">安全库存</label><input class="fi" type="number" id="whmMin" value="'+(w.minStock||5)+'"></div><div class="fg"><label class="fl">最大库存</label><input class="fi" type="number" id="whmMax" value="'+(w.maxStock||100)+'"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">库房</label><select class="fi" id="whmLoc">'+['112','512','515'].map(function(l){return '<option value="'+l+'"'+(l===w.loc?' selected':'')+'>'+l+' '+(locNames[l]||'')+'</option>';}).join('')+'</select></div><div class="fg"><label class="fl">货架/层</label><input class="fi" id="whmShelf" value="'+(w.shelf||'')+'"></div><div class="fg"><label class="fl">供应商</label><input class="fi" id="whmSupplier" value="'+(w.supplier||'')+'"></div></div>';
  mb.innerHTML+='<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--slate-200);"><button class="btn btn-sm btn-danger" onclick="whDeleteItem(\\''+id+'\\')">删除此物品</button></div>';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-primary" onclick="whEditItemSave(\\''+id+'\\')">保存</button>';
  document.getElementById('mo').classList.add('open');
}

function whEditItemSave(id){
  var w=whFindItem(id);if(!w)return;
  w.code=document.getElementById('whmCode').value.trim()||w.code;
  w.name=document.getElementById('whmName').value.trim()||w.name;
  w.cat1=document.getElementById('whmCat1').value;
  w.cat2=document.getElementById('whmCat2').value.trim();
  w.spec=document.getElementById('whmSpec').value.trim();
  w.unit=document.getElementById('whmUnit').value.trim()||w.unit;
  w.minStock=parseInt(document.getElementById('whmMin').value)||5;
  w.maxStock=parseInt(document.getElementById('whmMax').value)||100;
  w.loc=document.getElementById('whmLoc').value;
  w.shelf=document.getElementById('whmShelf').value.trim();
  w.supplier=document.getElementById('whmSupplier').value.trim();
  sv();cm();rWh();t('已更新：'+w.name,'s');
}

function whDeleteItem(id){
  var w=whFindItem(id);if(!w)return;
  for(var i=0;i<WH.length;i++){if(WH[i].id===id){WH.splice(i,1);break;}}
  sv();cm();rWh();t('已删除：'+w.name,'i');
}

// ===== 入库/出库 =====
function whRecordIn(){
  var items='';for(var i=0;i<WH.length;i++){var w=WH[i];items+='<option value="'+w.id+'">'+w.code+' '+w.name+' - 当前：'+w.qty+w.unit+'</option>';}
  document.getElementById('mt').innerHTML='<i data-lucide="arrow-down-circle" style="width:18px;height:18px;"></i> 采购入库';
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fr"><div class="fg"><label class="fl">选择物品 <span class="rq">*</span></label><select class="fi" id="whmItem">'+items+'</select></div><div class="fg"><label class="fl">入库数量 <span class="rq">*</span></label><input class="fi" type="number" id="whmQty" value="1" min="1"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">入库类型</label><select class="fi" id="whmType"><option value="in">采购入库</option><option value="in">退货入库</option><option value="in">调拨入库</option></select></div><div class="fg"><label class="fl">单号</label><input class="fi" id="whmOrder" placeholder="如：IN-2026-0050"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">操作人</label><input class="fi" id="whmOp" placeholder="姓名"></div><div class="fg"><label class="fl">备注</label><input class="fi" id="whmNote" placeholder="如：采购入库"></div></div>';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-success" onclick="whDoIn()">确认入库</button>';
  document.getElementById('mo').classList.add('open');
}

function whDoIn(){
  var itemId=document.getElementById('whmItem').value;var qty=parseInt(document.getElementById('whmQty').value)||0;
  var op=document.getElementById('whmOp').value.trim()||'仓管员';
  var orderNo=document.getElementById('whmOrder').value.trim()||('IN-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,5).toUpperCase());
  var note=document.getElementById('whmNote').value.trim();
  if(qty<=0){t('请输入有效的入库数量','e');return;}
  var w=whFindItem(itemId);if(!w)return;
  var beforeQty=w.qty;w.qty+=qty;
  WHL.push({id:'l'+Date.now(),itemId:itemId,type:'in',qty:qty,beforeQty:beforeQty,afterQty:w.qty,op:op,dt:new Date().toISOString().slice(0,10),orderNo:orderNo,note:note});
  sv();cm();rWh();t('入库 '+w.name+' +'+qty+', 当前库存：'+w.qty,'s');
}

function whRecordOut(){
  var items='';for(var i=0;i<WH.length;i++){var w=WH[i];items+='<option value="'+w.id+'">'+w.code+' '+w.name+' - 当前：'+w.qty+w.unit+'</option>';}
  document.getElementById('mt').innerHTML='<i data-lucide="arrow-up-circle" style="width:18px;height:18px;"></i> 领用出库';
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fr"><div class="fg"><label class="fl">选择物品 <span class="rq">*</span></label><select class="fi" id="whmItem">'+items+'</select></div><div class="fg"><label class="fl">出库数量 <span class="rq">*</span></label><input class="fi" type="number" id="whmQty" value="1" min="1"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">出库类型</label><select class="fi" id="whmType"><option value="out">领用出库</option><option value="loss">报损</option><option value="transfer">调拨出库</option></select></div><div class="fg"><label class="fl">单号</label><input class="fi" id="whmOrder" placeholder="如：OUT-2026-0020"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">领用部门</label><input class="fi" id="whmDept" placeholder="如：客房部"></div><div class="fg"><label class="fl">领用人</label><input class="fi" id="whmOp" placeholder="姓名"></div></div>';
  mb.innerHTML+='<div class="fg" style="margin-top:8px;"><label class="fl">备注</label><input class="fi" id="whmNote" placeholder="如：培训班客房补充"></div>';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-danger" onclick="whDoOut()">确认出库</button>';
  document.getElementById('mo').classList.add('open');
}

function whDoOut(){
  var itemId=document.getElementById('whmItem').value;var qty=parseInt(document.getElementById('whmQty').value)||0;
  var tp=document.getElementById('whmType').value;
  var orderNo=document.getElementById('whmOrder').value.trim()||('OUT-'+new Date().toISOString().slice(0,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,5).toUpperCase());
  var dept=document.getElementById('whmDept').value.trim();
  var op=(dept||'')+(document.getElementById('whmOp').value.trim()?('-'+document.getElementById('whmOp').value.trim()):'');
  if(!op)op='仓管员';
  var note=document.getElementById('whmNote').value.trim();
  if(qty<=0){t('请输入有效的出库数量','e');return;}
  var w=whFindItem(itemId);if(!w)return;
  if(w.qty<qty){t('库存不足！当前库存：'+w.qty,'e');return;}
  var beforeQty=w.qty;w.qty-=qty;
  WHL.push({id:'l'+Date.now(),itemId:itemId,type:tp,qty:qty,beforeQty:beforeQty,afterQty:w.qty,op:op,dt:new Date().toISOString().slice(0,10),orderNo:orderNo,note:note});
  sv();cm();rWh();t(tp==='loss'?'报损 ':tp==='transfer'?'调拨 ':'出库 ')+w.name+' -'+qty+', 当前库存：'+w.qty,(w.qty<=(w.minStock||5)?'e':'s'));
}

// ===== 快速入库/出库 =====
function whQuickIn(id){
  var w=whFindItem(id);if(!w)return;
  document.getElementById('mt').innerHTML='<i data-lucide="arrow-down-circle" style="width:18px;height:18px;"></i> 入库 '+w.name;
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fg" style="margin-bottom:8px;"><label class="fl">物品编码</label><input class="fi" value="'+w.code+' ('+w.name+')" readonly style="background:#f5f5f5;"></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">当前库存</label><input class="fi" value="'+w.qty+' '+w.unit+'" readonly style="background:#f5f5f5;font-weight:600;"></div><div class="fg"><label class="fl">入库数量 <span class="rq">*</span></label><input class="fi" type="number" id="whmQty" value="1" min="1"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">操作人</label><input class="fi" id="whmOp" placeholder="姓名"></div><div class="fg"><label class="fl">备注</label><input class="fi" id="whmNote" placeholder="如：采购入库"></div></div>';
  mb.innerHTML+='<input type="hidden" id="whmItem" value="'+id+'"><input type="hidden" id="whmOrder" value="">';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-success" onclick="whDoIn()">确认入库</button>';
  document.getElementById('mo').classList.add('open');
}

function whQuickOut(id){
  var w=whFindItem(id);if(!w)return;
  document.getElementById('mt').innerHTML='<i data-lucide="arrow-up-circle" style="width:18px;height:18px;"></i> 出库 '+w.name;
  var mb=document.getElementById('mb');
  mb.innerHTML='<div class="fg" style="margin-bottom:8px;"><label class="fl">物品编码</label><input class="fi" value="'+w.code+' ('+w.name+')" readonly style="background:#f5f5f5;"></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">当前库存</label><input class="fi" value="'+w.qty+' '+w.unit+'" readonly style="background:#f5f5f5;font-weight:600;"></div><div class="fg"><label class="fl">出库数量 <span class="rq">*</span></label><input class="fi" type="number" id="whmQty" value="1" min="1" max="'+w.qty+'"></div></div>';
  mb.innerHTML+='<div class="fr"><div class="fg"><label class="fl">类型</label><select class="fi" id="whmType"><option value="out">领用出库</option><option value="loss">报损</option><option value="transfer">调拨出库</option></select></div><div class="fg"><label class="fl">领用人</label><input class="fi" id="whmOp" placeholder="姓名"></div></div>';
  mb.innerHTML+='<div class="fg" style="margin-top:8px;"><label class="fl">备注</label><input class="fi" id="whmNote" placeholder="如：培训班领取"></div>';
  mb.innerHTML+='<input type="hidden" id="whmItem" value="'+id+'"><input type="hidden" id="whmOrder" value="">';
  document.getElementById('mf').innerHTML='<button class="btn btn-secondary" onclick="cm()">取消</button><button class="btn btn-danger" onclick="whDoOut()">确认出库</button>';
  document.getElementById('mo').classList.add('open');
}

// ===== 打印库存报表 =====
function printWH(){
  var w=window.open('','_blank','width=950,height=750');
  var today=new Date().toISOString().slice(0,10);
  var totalQty=0;var lowItems=0;
  for(var i=0;i<WH.length;i++){totalQty+=WH[i].qty;var minS=WH[i].minStock||0;if(WH[i].qty<=minS&&minS>0)lowItems++;}

  var h='<html><head><meta charset="utf-8"><title>库房盘点报表</title>';
  h+='<style>';
  h+='body{font-family:"SimSun","宋体",serif;padding:20px 30px;color:#333;font-size:13px}';
  h+='h1{text-align:center;font-size:22px;margin:10px 0 5px;letter-spacing:5px}';
  h+='.sub{text-align:center;color:#666;font-size:12px;margin-bottom:16px}';
  h+='.sum{display:flex;gap:20px;margin-bottom:16px;font-size:12px;padding:10px;border:1px solid #ccc;background:#fafafa}';
  h+='table{border-collapse:collapse;width:100%;font-size:12px;margin-bottom:15px}';
  h+='th,td{border:1px solid #333;padding:5px 6px;text-align:center}';
  h+='th{background:#e8e8e8;font-weight:600;font-size:11px}';
  h+='.gth{background:#d5e0f0;font-weight:700;text-align:left;font-size:12px}';
  h+='.low{color:#c00;font-weight:700}';
  h+='@media print{body{padding:15px}button{display:none}}';
  h+='</style></head><body>';
  h+='<h1>库房盘点报表</h1>';
  h+='<div class="sub">报表日期：'+today+' &nbsp;|&nbsp; 中国消防救援学院服务保障中心</div>';
  h+='<div class="sum"><span>物品种类：<strong>'+WH.length+'</strong>种</span><span>库存总量：<strong>'+totalQty+'</strong></span><span>低库存预警：<strong>'+(lowItems>0?'<span class="low">'+lowItems+'项</span>':'无')+'</strong></span></div>';

  var catOrder=['布草','客房用品','清洁用品','维修物料','办公用品','固定资产','其他'];
  h+='<table><tr><th style="width:40px">序号</th><th style="width:80px">编码</th><th>物品名称</th><th>规格</th><th style="width:40px">单位</th><th style="width:50px">数量</th><th style="width:55px">安全库存</th><th>存放位置</th><th>供应商</th></tr>';
  var idx=0;
  for(var ci=0;ci<catOrder.length;ci++){
    var cn=catOrder[ci];var ws=[];
    for(var i=0;i<WH.length;i++){if(WH[i].cat1===cn)ws.push(WH[i]);}
    if(ws.length===0)continue;
    var catQty=0;for(var i=0;i<ws.length;i++)catQty+=ws[i].qty;
    h+='<tr><td class="gth" colspan="9">'+cn+'（'+ws.length+'种，合计 '+catQty+'件）</td></tr>';
    for(var wi=0;wi<ws.length;wi++){var w2=ws[wi];idx++;
      h+='<tr><td>'+idx+'</td><td style="font-family:monospace;font-size:10px;">'+w2.code+'</td><td style="text-align:left;">'+w2.name+'</td><td>'+(w2.spec||'-')+'</td><td>'+w2.unit+'</td><td'+(w2.qty<=(w2.minStock||5)?' class="low"':'')+'>'+w2.qty+'</td><td>'+(w2.minStock||'-')+'</td><td>'+(locNames[w2.loc]||w2.loc)+(w2.shelf?' '+w2.shelf:'')+'</td><td>'+(w2.supplier||'')+'</td></tr>';
    }
  }
  h+='</table>';

  // 最近30天出入库汇总
  var monthAgo=new Date();monthAgo.setDate(monthAgo.getDate()-30);
  var recentLogs=WHL.filter(function(l){return l.dt>=monthAgo.toISOString().slice(0,10);});
  if(recentLogs.length>0){
    h+='<h3 style="font-size:15px;margin:20px 0 10px;">近30天出入库记录</h3>';
    h+='<table><tr><th style="width:80px">时间</th><th>物品</th><th style="width:45px">类型</th><th style="width:55px">数量</th><th style="width:55px">库存变化</th><th>操作人</th><th>备注</th></tr>';
    for(var i=recentLogs.length-1;i>=0;i--){
      var l=recentLogs[i];var w2=whFindItem(l.itemId);
      var typeStr=l.type==='in'?'入库':l.type==='out'?'出库':l.type==='loss'?'报损':l.type==='transfer'?'调拨':l.type==='check'?'盘点':'其他';
      var qtyStr=l.type==='in'?'+'+l.qty:'-'+l.qty;
      var sc=l.type==='in'?'green':l.type==='out'?'#c00':'#333';
      var stockChg=(typeof l.beforeQty!=='undefined')?(l.beforeQty+'→'+l.afterQty):'';
      h+='<tr><td>'+l.dt+'</td><td>'+(w2?w2.code+' '+w2.name:l.itemId)+'</td><td style="color:'+sc+';font-weight:600">'+typeStr+'</td><td style="color:'+sc+';font-weight:600">'+qtyStr+'</td><td style="font-size:10px;">'+stockChg+'</td><td>'+l.op+'</td><td style="font-size:10px;">'+(l.note||'')+'</td></tr>';
    }
    h+='</table>';
  }
  h+='<div style="margin-top:30px;font-size:12px;display:flex;justify-content:space-between;">';
  h+='<span>盘点人：____________</span><span>复核人：____________</span><span>负责人：____________</span></div>';
  h+='<div style="text-align:center;margin-top:15px"><button onclick="window.print()" style="padding:8px 24px;font-size:14px;cursor:pointer">打 印</button> <button onclick="window.close()" style="padding:8px 24px;font-size:14px;cursor:pointer">关 闭</button></div>';
  h+='</body></html>';
  w.document.write(h);w.document.close();
}`;

  html = before + NEW_JS + after;
  console.log('✅ JS replaced');
} else {
  console.log('❌ JS marker not found');
}

// ===== 7. Update init to populate category dropdown =====
// We need to populate WH_CAT_CATS in the init function
const INIT_SETUP = "  document.getElementById('whCat').onchange=function(){rWh();};document.getElementById('whLoc').onchange=function(){rWh();};";
const NEW_INIT_SETUP = "  // 库房分类初始化\n  var whCat1Sel=document.getElementById('whCat1');\n  var cat1Keys=Object.keys(WH_CATEGORIES);\n  for(var i=0;i<cat1Keys.length;i++){whCat1Sel.innerHTML+='<option value=\"'+cat1Keys[i]+'\">'+cat1Keys[i]+'</option>';}\n  document.getElementById('whLoc').onchange=function(){rWh();};";

if (html.indexOf(INIT_SETUP) !== -1) {
  html = html.replace(INIT_SETUP, NEW_INIT_SETUP);
  console.log('✅ Init setup replaced');
} else {
  console.log('❌ INIT_SETUP not found, trying alternative...');
  // Try finding the document.getElementById for whCat/whLoc
  var altIdx = html.indexOf("document.getElementById('whCat')");
  if (altIdx !== -1) {
    var lineStart = html.lastIndexOf('\n', altIdx);
    var lineEnd = html.indexOf('\n', altIdx);
    var oldLine = html.substring(lineStart+1, lineEnd);
    console.log('Found line:', oldLine.substring(0, 80));
    var newLine = "  var whCat1Sel=document.getElementById('whCat1');var cat1Keys=Object.keys(WH_CATEGORIES);for(var i=0;i<cat1Keys.length;i++){whCat1Sel.innerHTML+='<option value=\"'+cat1Keys[i]+'\">'+cat1Keys[i]+'</option>';}document.getElementById('whLoc').onchange=function(){rWh();};";
    html = html.replace(oldLine, newLine);
    console.log('✅ Alt init replaced');
  }
}

// Write back
fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('🎉 All replacements done! File saved.');

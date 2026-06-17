#!/usr/bin/env python3
# Inject warehouse JS into 排房1.html
with open('/Users/zhangtao/Desktop/排房1.html','r') as f:
    t = f.read()

wh_js = '''
// ===== 库房系统 =====
var WH = [], WHL = [], whTabSt = 'dash';
var WH_LOCS = {'112':'12号1F·112库房','512':'12号5F·512库房','515':'12号5F·515库房'};
var WH_CATS = {
  '布草':{sub:['床单','被套','枕套','毛巾','浴巾','毛毯','床垫保护垫','枕芯','被芯'],color:'bc'},
  '客房用品':{sub:['洗漱套装','拖鞋','衣架','电水壶','吹风机','纸巾盒','垃圾桶'],color:'kf'},
  '清洁用品':{sub:['清洁剂','消毒液','扫把','拖把','垃圾袋','马桶刷','抹布','橡胶手套'],color:'cl'},
  '维修物料':{sub:['LED灯泡','螺丝刀套装','电工胶带','水管接头','门锁配件','膨胀螺栓'],color:'wx'},
  '办公用品':{sub:['A4打印纸','签字笔','文件夹','笔记本','订书机','记号笔','计算器'],color:'bg'},
  '固定资产':{sub:['对讲机','手推车','吸尘器','电风扇','测温仪','厨房设备'],color:'gd'},
  '其他':{sub:['一次性洗漱杯','备用钥匙','欢迎卡','应急包'],color:'qt'}
};

function whFind(id){for(var i=0;i<WH.length;i++)if(WH[i].id===id)return WH[i];return null;}
function whTab(t){whTabSt=t;renderWh();}

function renderWh(){
  var c=document.getElementById('whContent');if(!c)return;
  var totalQty=0,sku=WH.length,lowCnt=0,locSet={};
  for(var i=0;i<WH.length;i++){totalQty+=WH[i].qty;locSet[WH[i].loc]=1;if((WH[i].min||0)>0&&WH[i].qty<=WH[i].min)lowCnt++;}
  var locCnt=0;for(var k in locSet)locCnt++;
  // KPI
  var kpiEl=document.getElementById('whKpi');if(kpiEl)
    kpiEl.innerHTML='<div class="ov-kpi-c"><div class="ov-kpi-i ki-blue"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div><div><div class="ov-kpi-v">'+sku+'</div><div class="ov-kpi-l">SKU总数</div></div></div>'
    +'<div class="ov-kpi-c"><div class="ov-kpi-i ki-green"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><div><div class="ov-kpi-v">'+totalQty+'</div><div class="ov-kpi-l">库存总量</div></div></div>'
    +'<div class="ov-kpi-c"><div class="ov-kpi-i ki-purple"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div><div><div class="ov-kpi-v">'+locCnt+'</div><div class="ov-kpi-l">库房数</div></div></div>'
    +'<div class="ov-kpi-c"><div class="ov-kpi-i ki-amber"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div><div><div class="ov-kpi-v" style="color:'+(lowCnt>0?'var(--red)':'var(--navy)')+';">'+lowCnt+'</div><div class="ov-kpi-l">低库存预警</div></div></div>';
  
  if(whTabSt==='dash'){renderDash(c,lowCnt);return;}
  if(whTabSt==='log'){renderLog(c);return;}
  if(whTabSt==='check'){renderCheck(c);return;}
  renderList(c);
}

function renderDash(c,lowCnt){
  var monthAgo=new Date();monthAgo.setMonth(monthAgo.getMonth()-1);
  var monthOps=0;for(var i=0;i<WHL.length;i++)if(WHL[i].dt>=monthAgo.toISOString().slice(0,10))monthOps++;
  var alerts=WH.filter(function(w){return (w.min||0)>0&&w.qty<=w.min;}).sort(function(a,b){return a.qty/a.min-b.qty/b.min;});
  var h='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">';
  h+='<div style="background:#fff;border:1px solid var(--slate-200);border-radius:10px;padding:14px;"><h4 style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px;display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> 低库存预警</h4>';
  if(alerts.length===0)h+='<div style="font-size:12px;color:var(--slate-400);padding:6px 0;">所有物品库存正常 ✓</div>';
  else for(var i=0;i<Math.min(alerts.length,8);i++){var a=alerts[i];
    h+='<div class="alert-item"><span class="al-n">'+a.name+'</span><span class="al-q">库存 '+a.qty+a.unit+' / 安全 '+(a.min||5)+a.unit+'</span><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:3px 10px;border-radius:4px;font-size:10px;" onclick="whAct(\'in\',\''+a.id+'\')">补货</button></div>';}
  h+='</div>';
  // 最近动态
  h+='<div style="background:#fff;border:1px solid var(--slate-200);border-radius:10px;padding:14px;"><h4 style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px;display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> 近期动态</h4>';
  var recent=WHL.slice().reverse().slice(0,10);
  if(recent.length===0)h+='<div style="font-size:12px;color:var(--slate-400);padding:6px 0;">暂无操作记录</div>';
  else for(var i=0;i<recent.length;i++){var l=recent[i],w=whFind(l.itemId);
    var tt=l.type==='in'?'<span class="tag-in">入库</span>':l.type==='out'?'<span class="tag-out">出库</span>':l.type==='check'?'<span class="tag-chk">盘点</span>':'<span class="tag-out">报损</span>';
    h+='<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid var(--slate-50);font-size:11px;">'+tt+'<span style="color:var(--slate-700);">'+(w?w.name:l.itemId)+'</span><span style="color:var(--slate-400);margin-left:auto;">'+l.dt+'</span></div>';}
  h+='</div></div>';
  c.innerHTML=h;
}

function renderList(c){
  var cat1=(document.getElementById('whCat')?document.getElementById('whCat').value:'all');
  var kw=(document.getElementById('whSearch')?document.getElementById('whSearch').value.trim().toLowerCase():'');
  var items=WH;
  if(cat1!=='all')items=items.filter(function(w){return w.cat1===cat1;});
  if(kw)items=items.filter(function(w){return (w.code||'').toLowerCase().indexOf(kw)!==-1||w.name.toLowerCase().indexOf(kw)!==-1;});
  var catOpts='<option value="all">全部分类</option>';for(var k in WH_CATS)catOpts+='<option value="'+k+'">'+k+'</option>';
  var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;flex-wrap:wrap;"><select id="whCat" style="padding:5px 10px;border:1px solid var(--slate-200);border-radius:5px;font-size:12px;" onchange="renderWh()">'+catOpts+'</select><input id="whSearch" placeholder="搜索物品名称/编码" style="flex:1;min-width:150px;padding:5px 10px;border:1px solid var(--slate-200);border-radius:5px;font-size:12px;" oninput="renderWh()"><span style="font-size:11px;color:var(--slate-400);">共 '+items.length+' 项</span></div>';
  if(items.length===0){c.innerHTML=h+'<div class="emp" style="padding:30px;"><i data-lucide="package"></i><p>无匹配物品</p></div>';return;}
  h+='<div class="wh-grid">';
  for(var i=0;i<items.length;i++){var w=items[i],ms=w.min||5,mx=Math.max(w.qty*2,20),ratio=Math.min(100,Math.round(w.qty/mx*100)),barCls='',lvlCls='ok',lvlTxt='正常';
    if(w.qty<=ms){barCls=' low';lvlCls='low';lvlTxt='缺货';}else if(w.qty<=ms*2){barCls=' warn';lvlCls='warn';lvlTxt='偏低';}
    var catColor=(WH_CATS[w.cat1]?WH_CATS[w.cat1].color:'qt');
    h+='<div class="wh-card"><div class="w-top"><span class="w-code">'+(w.code||'')+'</span><span class="w-cat '+catColor+'">'+w.cat1+'/'+w.cat2+'</span></div>'
    +'<div class="w-name">'+w.name+'</div><div class="w-body"><span class="w-qty" style="'+(w.qty<=ms?'color:var(--red)':'')+'">'+w.qty+'</span><span class="w-unit">'+w.unit+'</span>'
    +'<div class="w-bar-wrap"><div class="w-bar"><div class="w-bar-f'+barCls+'" style="width:'+ratio+'%"></div></div><span class="w-lvl '+lvlCls+'">'+lvlTxt+'</span></div></div>'
    +'<div class="w-info"><span>📍 '+(WH_LOCS[w.loc]||w.loc)+'</span>'+(w.shelf?'<span>🗄 '+w.shelf+'</span>':'')+'<span>安全库存 '+ms+'</span></div>'
    +'<div class="w-acts"><button class="w-btn" onclick="whAct(\'in\',\''+w.id+'\')">入库</button><button class="w-btn" onclick="whAct(\'out\',\''+w.id+'\')">出库</button><button class="w-btn" onclick="whEdit(\''+w.id+'\')">编辑</button><button class="w-btn" style="margin-left:auto;" onclick="whChk(\''+w.id+'\')">盘点</button></div></div>';}
  h+='</div>';c.innerHTML=h;
}

function renderLog(c){
  var type=document.getElementById('whLogType')?document.getElementById('whLogType').value:'all';
  var logs=WHL.slice().reverse();
  if(type!=='all')logs=logs.filter(function(l){return l.type===type;});
  var h='<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;"><select id="whLogType" style="padding:5px 10px;border:1px solid var(--slate-200);border-radius:5px;font-size:12px;" onchange="renderWh()"><option value="all">全部类型</option><option value="in">入库</option><option value="out">出库</option><option value="check">盘点</option></select><span style="font-size:11px;color:var(--slate-400);">共 '+logs.length+' 条记录</span></div>';
  if(logs.length===0){c.innerHTML=h+'<div class="emp" style="padding:30px;"><i data-lucide="file-text"></i><p>暂无记录</p></div>';return;}
  h+='<div class="log-scroll"><table style="width:100%;border-collapse:collapse;font-size:12px;"><tr style="background:var(--slate-50);"><th style="padding:6px 8px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">时间</th><th style="padding:6px 8px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">物品</th><th style="padding:6px 8px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">类型</th><th style="padding:6px 8px;text-align:right;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">数量</th><th style="padding:6px 8px;text-align:center;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">库存</th><th style="padding:6px 8px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">操作人</th><th style="padding:6px 8px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">备注</th></tr>';
  for(var i=0;i<Math.min(logs.length,100);i++){var l=logs[i],w=whFind(l.itemId);
    var tt=l.type==='in'?'<span class="tag-in">入库</span>':l.type==='out'?'<span class="tag-out">出库</span>':l.type==='check'?'<span class="tag-chk">盘点</span>':'<span class="tag-out">报损</span>';
    var qs=l.type==='in'?'+'+l.qty:'-'+l.qty,sc=l.type==='in'?'color:var(--green-dark)':'color:var(--red)';
    var chg=(typeof l.bf!=='undefined')?(l.bf+'→'+l.af):'';
    h+='<tr><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);font-size:11px;color:var(--slate-500);">'+l.dt+'</td><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);font-weight:500;">'+(w?w.name:l.itemId)+'</td><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);">'+tt+'</td><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);text-align:right;font-weight:700;'+sc+'">'+qs+'</td><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);text-align:center;font-size:11px;color:var(--slate-500);">'+chg+'</td><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);font-size:11px;">'+l.op+'</td><td style="padding:5px 8px;border-bottom:1px solid var(--slate-50);font-size:11px;color:var(--slate-400);">'+(l.note||'')+'</td></tr>';}
  h+='</table></div>';c.innerHTML=h;
}

function renderCheck(c){
  var chkLogs=WHL.filter(function(l){return l.type==='check';}).slice(-20);
  var h='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">';
  h+='<div style="background:#fff;border:1px solid var(--slate-200);border-radius:10px;padding:14px;"><h4 style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px;">盘点操作</h4>'
  +'<p style="font-size:12px;color:var(--slate-500);margin-bottom:10px;">逐项核对实际库存与账面数量。</p>'
  +'<div style="display:flex;gap:6px;margin-bottom:12px;"><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:6px 14px;border-radius:5px;" onclick="whFullChk()">全部盘点</button>'
  +'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 13px;border-radius:5px;" onclick="whCycleChk()">低库存循环盘点</button></div>';
  if(chkLogs.length>0){h+='<table style="width:100%;border-collapse:collapse;font-size:11px;"><tr style="background:var(--slate-50);"><th style="padding:4px 6px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">时间</th><th style="padding:4px 6px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">物品</th><th style="padding:4px 6px;text-align:center;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">账面</th><th style="padding:4px 6px;text-align:center;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">实盘</th><th style="padding:4px 6px;text-align:center;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">差异</th><th style="padding:4px 6px;text-align:left;font-weight:600;color:var(--slate-600);border-bottom:1px solid var(--slate-200);">操作</th></tr>';
    for(var i=chkLogs.length-1;i>=0;i--){var l=chkLogs[i],w=whFind(l.itemId),df=l.af-l.bf,dc=df===0?'color:var(--green)':df>0?'color:var(--green-dark)':'color:var(--red)';
      h+='<tr><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);font-size:10px;color:var(--slate-500);">'+l.dt+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);font-weight:500;">'+(w?w.name:l.itemId)+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);text-align:center;">'+(l.bf||0)+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);text-align:center;font-weight:600;">'+(l.af||0)+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);text-align:center;font-weight:700;'+dc+'">'+(df>0?'+'+df:df)+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);font-size:10px;">'+l.op+'</td></tr>';}
    h+='</table>';}else h+='<div style="font-size:12px;color:var(--slate-400);padding:10px 0;">暂无盘点记录</div>';
  h+='</div>';
  // 库存健康度
  var ok=0,warn=0,low=0;for(var i=0;i<WH.length;i++){var w=WH[i],ms=w.min||0;if(ms===0)ok++;else if(w.qty<=ms)low++;else if(w.qty<=ms*2)warn++;else ok++;}
  h+='<div style="background:#fff;border:1px solid var(--slate-200);border-radius:10px;padding:14px;"><h4 style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:10px;">库存健康度</h4>'
  +'<div style="display:flex;gap:10px;padding:10px 0;"><div style="text-align:center;flex:1;padding:8px;background:var(--green-light);border-radius:6px;"><div style="font-size:24px;font-weight:700;color:var(--green-dark);">'+ok+'</div><div style="font-size:11px;color:var(--slate-500);">正常</div></div>'
  +'<div style="text-align:center;flex:1;padding:8px;background:var(--amber-light);border-radius:6px;"><div style="font-size:24px;font-weight:700;color:var(--amber);">'+warn+'</div><div style="font-size:11px;color:var(--slate-500);">偏低</div></div>'
  +'<div style="text-align:center;flex:1;padding:8px;background:var(--red-light);border-radius:6px;"><div style="font-size:24px;font-weight:700;color:var(--red);">'+low+'</div><div style="font-size:11px;color:var(--slate-500);">低库存</div></div></div>'
  +'</div></div>';c.innerHTML=h;
}

function whAddItem(){
  var co='';for(var k in WH_CATS)co+='<option value="'+k+'">'+k+'</option>';
  showModal('新增物品',''
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">编码</label><input id="wmC" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="自动生成"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">名称 <span style="color:var(--red)">*</span></label><input id="wmN" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="物品名称"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">分类</label><select id="wmC1" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;">'+co+'</select></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">二级分类</label><input id="wmC2" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">单位</label><input id="wmU" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="件"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">初始数量</label><input type="number" id="wmQ" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="0" min="0"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">安全库存</label><input type="number" id="wmM" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="5" min="1"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">库房</label><select id="wmL" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;"><option value="112">112·12号1F</option><option value="512">512·12号5F</option><option value="515">515·12号5F</option></select></div>'
    +'<div style="grid-column:span 2;"><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">货架</label><input id="wmS" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;"></div>'
    +'</div>'
    ,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whAddSave()">保存</button>');
}
function whAddSave(){
  var n=document.getElementById('wmN').value.trim();if(!n){t('请填写名称','e');return;}
  var c=document.getElementById('wmC').value.trim()||('WH-'+Date.now().toString(36).slice(-6).toUpperCase());
  var q=parseInt(document.getElementById('wmQ').value)||0;
  WH.push({id:'w'+Date.now()+Math.random().toString(36).slice(2,4),code:c,name:n,cat1:document.getElementById('wmC1').value,cat2:document.getElementById('wmC2').value.trim()||'其他',unit:document.getElementById('wmU').value.trim()||'件',qty:q,min:parseInt(document.getElementById('wmM').value)||5,max:Math.max(q*2,20),loc:document.getElementById('wmL').value,shelf:document.getElementById('wmS').value.trim()});
  if(q>0)WHL.push({id:'l'+Date.now(),itemId:WH[WH.length-1].id,type:'in',qty:q,bf:0,af:q,op:'系统录入',dt:new Date().toISOString().slice(0,10),note:'初始入库'});
  sv();cm();renderWh();t('已添加：'+n,'s');
}
function whEdit(id){
  var w=whFind(id);if(!w)return;
  var co='';for(var k in WH_CATS)co+='<option value="'+k+'"'+(k===w.cat1?' selected':'')+'>'+k+'</option>';
  var locOpts='<option value="112"'+(w.loc==='112'?' selected':'')+'>112·12号1F</option><option value="512"'+(w.loc==='512'?' selected':'')+'>512·12号5F</option><option value="515"'+(w.loc==='515'?' selected':'')+'>515·12号5F</option>';
  showModal('编辑 '+w.name,''
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">编码</label><input id="wmC" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+(w.code||'')+'"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">名称</label><input id="wmN" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+w.name+'"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">分类</label><select id="wmC1" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;">'+co+'</select></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">二级分类</label><input id="wmC2" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+(w.cat2||'')+'"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">单位</label><input id="wmU" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+w.unit+'"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">安全库存</label><input type="number" id="wmM" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+(w.min||5)+'"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">库房</label><select id="wmL" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;">'+locOpts+'</select></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">货架</label><input id="wmS" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+(w.shelf||'')+'"></div>'
    +'</div>'
    ,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whEditSave(\''+id+'\')">保存</button>');
}
function whEditSave(id){var w=whFind(id);if(!w)return;w.code=document.getElementById('wmC').value.trim()||w.code;w.name=document.getElementById('wmN').value.trim()||w.name;w.cat1=document.getElementById('wmC1').value;w.cat2=document.getElementById('wmC2').value.trim();w.unit=document.getElementById('wmU').value.trim()||w.unit;w.min=parseInt(document.getElementById('wmM').value)||5;w.loc=document.getElementById('wmL').value;w.shelf=document.getElementById('wmS').value.trim();sv();cm();renderWh();t('已更新：'+w.name,'s');}

function whAct(tp,id){
  var w=id?whFind(id):null;
  var items='';if(!id)for(var i=0;i<WH.length;i++){var ww=WH[i];items+='<option value="'+ww.id+'">'+(ww.code||'')+' '+ww.name+' (库存:'+ww.qty+')</option>';}
  var title=tp==='in'?'入库':'出库',bc=tp==='in'?'var(--blue)':'var(--red)';
  var extraFields='';
  if(tp==='out')extraFields='<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">部门</label><input id="whmDept" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="如：客房部"></div>';
  showModal(title,''
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">'
    +(w?'':'<div style="grid-column:span 2;"><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">物品 <span style="color:var(--red)">*</span></label><select id="whmItem" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;">'+items+'</select></div>'
    +(w?'<input type="hidden" id="whmItem" value="'+id+'">':''))
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">数量 <span style="color:var(--red)">*</span></label><input type="number" id="whmQty" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="1" min="1"></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">操作人</label><input id="whmOp" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="姓名"></div>'
    +extraFields
    +'<div style="grid-column:span 2;"><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">备注</label><input id="whmNote" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="'+(tp==='in'?'采购入库':'培训班领取')+'"></div>'
    +'</div><input type="hidden" id="whmTP" value="'+tp+'">'
    ,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:'+bc+';color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whActSave()">确认'+title+'</button>');
}
function whActSave(){
  var tp=document.getElementById('whmTP').value,itemId=document.getElementById('whmItem').value,qty=parseInt(document.getElementById('whmQty').value)||0,op=document.getElementById('whmOp').value.trim()||'仓管员',note=document.getElementById('whmNote').value.trim();
  if(qty<=0){t('请输入有效数量','e');return;}var w=whFind(itemId);if(!w)return;
  if(tp==='out'){if(w.qty<qty){t('库存不足！当前:'+w.qty,'e');return;}var dept=document.getElementById('whmDept')?document.getElementById('whmDept').value.trim():'';if(dept)op=dept+'-'+op;}
  var bf=w.qty;if(tp==='in')w.qty+=qty;else w.qty-=qty;
  WHL.push({id:'l'+Date.now(),itemId:itemId,type:tp==='in'?'in':'out',qty:qty,bf:bf,af:w.qty,op:op,dt:new Date().toISOString().slice(0,10),note:note});
  sv();cm();renderWh();t((tp==='in'?'入库 ':'出库 ')+w.name+' '+(tp==='in'?'+':'-')+qty+', 当前:'+w.qty,'s');
}

function whChk(id){var w=whFind(id);if(!w)return;
  showModal('盘点 '+w.name,''
    +'<div style="background:var(--slate-50);padding:8px 10px;border-radius:4px;margin-bottom:10px;font-size:12px;">当前账面库存：<strong>'+w.qty+'</strong> '+w.unit+'</div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">实盘数量 <span style="color:var(--red)">*</span></label><input type="number" id="whChkQty" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+w.qty+'" min="0"></div>'
    +'<div style="margin-top:8px;"><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">盘点人</label><input id="whChkOp" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="姓名"></div>'
    +'<input type="hidden" id="whChkId" value="'+w.id+'">'
    ,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whChkDo()">确认盘点</button>');
}
function whChkDo(){var id=document.getElementById('whChkId').value,w=whFind(id);if(!w)return;var actual=parseInt(document.getElementById('whChkQty').value)||0,op=document.getElementById('whChkOp').value.trim()||'盘点员',today=new Date().toISOString().slice(0,10),diff=actual-w.qty;WHL.push({id:'chk'+Date.now(),itemId:id,type:'check',qty:Math.abs(diff),bf:w.qty,af:actual,op:op,dt:today,note:diff===0?'账实相符':(diff>0?'盘盈+'+diff:'盘亏-'+Math.abs(diff))});w.qty=actual;sv();cm();renderWh();t(w.name+' 盘点完成'+(diff!==0?'，差异'+diff:'，账实相符'),diff===0?'s':'i');}

function whFullChk(){var h='<div style="max-height:350px;overflow-y:auto;">';for(var i=0;i<WH.length;i++){var w=WH[i];h+='<div style="display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid var(--slate-100);"><span style="width:70px;font-size:11px;font-weight:500;color:var(--slate-500);">'+(w.code||'')+'</span><span style="width:80px;font-size:12px;">'+w.name+'</span><span style="font-size:11px;color:var(--slate-400);">账面:'+w.qty+'</span><input id="whChk'+w.id+'" placeholder="实盘" style="width:55px;margin-left:auto;padding:4px 6px;border:1px solid var(--slate-200);border-radius:3px;font-size:11px;text-align:center;" value="'+w.qty+'"></div>';}
  h+='</div><div style="margin-top:8px;"><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">盘点人</label><input id="whChkOp" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="姓名"></div>';
  showModal('全部盘点',h,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whFullChkDo()">确认盘点</button>');}
function whFullChkDo(){var op=document.getElementById('whChkOp').value.trim()||'盘点员',today=new Date().toISOString().slice(0,10),diffCnt=0;for(var i=0;i<WH.length;i++){var w=WH[i],inp=document.getElementById('whChk'+w.id);if(!inp)continue;var actual=parseInt(inp.value);if(isNaN(actual))actual=w.qty;if(actual!==w.qty){WHL.push({id:'chk'+Date.now()+i,itemId:w.id,type:'check',qty:Math.abs(actual-w.qty),bf:w.qty,af:actual,op:op,dt:today,note:actual>w.qty?'盘盈':'盘亏'});w.qty=actual;diffCnt++;}}if(diffCnt===0)WHL.push({id:'chk'+Date.now(),itemId:'all',type:'check',qty:0,bf:0,af:0,op:op,dt:today,note:'全盘-账实相符'});sv();cm();renderWh();t('盘点完成: '+diffCnt+'项差异已调整','s');}
function whCycleChk(){var lis=WH.filter(function(w){var ms=w.min||0;return ms>0&&w.qty<=ms;});if(lis.length===0){t('无低库存物品','i');return;}var h='<div style="max-height:350px;overflow-y:auto;">';for(var i=0;i<lis.length;i++){var w=lis[i];h+='<div style="display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid var(--slate-100);"><span style="width:70px;font-size:11px;font-weight:500;color:var(--red);">⚠ '+(w.code||'')+'</span><span style="width:80px;font-size:12px;">'+w.name+'</span><span style="font-size:11px;color:var(--slate-400);">账面:'+w.qty+'</span><input id="whChk'+w.id+'" placeholder="实盘" style="width:55px;margin-left:auto;padding:4px 6px;border:1px solid var(--slate-200);border-radius:3px;font-size:11px;text-align:center;" value="'+w.qty+'"></div>';}h+='</div><div style="margin-top:8px;"><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">盘点人</label><input id="whChkOp" style="width:100%;padding:6px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" placeholder="姓名"></div>';showModal('循环盘点 ('+lis.length+'项)',h,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:var(--blue);color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whFullChkDo()">确认盘点</button>');}

// 导入验收单
var impData=null;
function whImport(){
  var h='<div class="imp-zone" id="impZone" onclick="document.getElementById(\'impFileInp\').click()"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg><div class="iz-t">点击上传或拖拽 Word 验收单</div><div class="iz-s">支持《货物采购验收表》格式 (.docx)</div></div><input type="file" id="impFileInp" accept=".docx" style="display:none"><div id="impResult"></div>';
  showModal('导入验收单',h,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">关闭</button>');
  setTimeout(function(){
    var zone=document.getElementById('impZone');if(!zone)return;
    zone.ondragover=function(e){e.preventDefault();e.stopPropagation();zone.classList.add('drag');};
    zone.ondragleave=function(e){e.preventDefault();zone.classList.remove('drag');};
    zone.ondrop=function(e){e.preventDefault();zone.classList.remove('drag');whImpHandle(e.dataTransfer.files[0]);};
    document.getElementById('impFileInp').onchange=function(){whImpHandle(this.files[0]);};
  },100);
}
function whImpHandle(file){
  if(!file||!file.name.endsWith('.docx')){t('请选择 .docx 文件','e');return;}
  var reader=new FileReader();
  reader.onload=function(e){
    if(typeof mammoth==='undefined'){t('mammoth.js 未加载','e');return;}
    mammoth.extractRawText({arrayBuffer:e.target.result}).then(function(r){whImpParse(r.value);}).catch(function(){t('文件解析失败','e');});
  };
  reader.readAsArrayBuffer(file);
}
function whImpParse(raw){
  var lines=raw.split(/\n/).map(function(l){return l.trim();}).filter(function(l){return l;});
  var info={project:'',supplier:'',amount:'',date:''};
  for(var i=0;i<Math.min(lines.length,30);i++){var ln=lines[i];
    if(/采购品目/.test(ln))info.project=ln.replace(/.*采购品目名称\s*/,'').trim();
    if(/供应商/.test(ln))info.supplier=ln.replace(/.*供应商名称\s*/,'').trim();
    if(/合同总金额/.test(ln)){var am=ln.match(/([\d.]+)/);if(am)info.amount=am[1];}
    if(/验收日期/.test(ln)){var dm=ln.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);if(dm)info.date=dm[1]+'-'+dm[2].padStart(2,'0')+'-'+dm[3].padStart(2,'0');}
  }
  var tblStart=-1;for(var i=0;i<lines.length;i++){if(/验收记录.*序号|设备名称.*型号.*合同数量/.test(lines[i])){tblStart=i;break;}}
  if(tblStart===-1){t('未找到验收记录表格','e');return;}
  var items=[];
  for(var i=tblStart+1;i<lines.length;i++){var ln=lines[i];if(/合同一致性|产品性能|验收结论|供应商代表|验收小组|备注/.test(ln))break;
    var parts=ln.split(/\s{2,}/);if(parts.length>=4&&/^\d+$/.test(parts[0])){var nums=[];for(var j=0;j<parts.length;j++)if(/^\d+$/.test(parts[j]))nums.push(parseInt(parts[j]));if(nums.length>=3){var name=parts[1]||'',model='';for(var j=2;j<parts.length;j++){if(!/^\d+$/.test(parts[j])){model=parts[j];break;}}var cq=nums[nums.length-2],aq=nums[nums.length-1];items.push({seq:nums[0],name:name,model:model,contractQty:cq,acceptQty:aq});}}
  }
  if(items.length===0){t('未解析到设备条目','e');return;}
  impData={info:info,items:items};whImpPreview();
}
function whImpPreview(){
  if(!impData)return;var info=impData.info,items=impData.items;
  var h='<div style="display:flex;gap:10px;flex-wrap:wrap;padding:10px;background:var(--slate-50);border-radius:6px;margin-bottom:10px;font-size:12px;">'
    +'<span><strong>项目</strong> '+(info.project||'未知')+'</span><span><strong>供应商</strong> '+(info.supplier||'未知')+'</span><span><strong>金额</strong> ¥'+(info.amount||'-')+'</span><span><strong>日期</strong> '+(info.date||'-')+'</span></div>'
    +'<div style="margin-bottom:10px;font-size:12px;color:var(--slate-500);">已识别 <strong>'+items.length+'</strong> 项设备</div>'
    +'<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">分类</label><select id="impCat" style="padding:5px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;"><option value="固定资产">固定资产</option><option value="客房用品">客房用品</option><option value="清洁用品">清洁用品</option><option value="维修物料">维修物料</option><option value="其他">其他</option></select></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">库房</label><select id="impLoc" style="padding:5px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;"><option value="112">112·12号1F</option><option value="512">512·12号5F</option><option value="515">515·12号5F</option></select></div>'
    +'<div><label style="font-size:11px;font-weight:600;color:var(--slate-700);display:block;margin-bottom:3px;">入库日期</label><input type="date" id="impDate" style="padding:5px 8px;border:1px solid var(--slate-200);border-radius:4px;font-size:12px;" value="'+new Date().toISOString().slice(0,10)+'"></div></div>'
    +'<div style="max-height:300px;overflow-y:auto;"><table style="width:100%;border-collapse:collapse;font-size:11px;"><tr style="background:var(--slate-50);"><th style="padding:4px 6px;border-bottom:1px solid var(--slate-200);text-align:left;font-weight:600;">#</th><th style="padding:4px 6px;border-bottom:1px solid var(--slate-200);text-align:left;font-weight:600;">名称</th><th style="padding:4px 6px;border-bottom:1px solid var(--slate-200);text-align:left;font-weight:600;">型号</th><th style="padding:4px 6px;border-bottom:1px solid var(--slate-200);text-align:center;font-weight:600;">合同数</th><th style="padding:4px 6px;border-bottom:1px solid var(--slate-200);text-align:center;font-weight:600;">验收数</th></tr>';
  for(var i=0;i<items.length;i++){var it=items[i];h+='<tr><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);">'+it.seq+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);font-weight:500;">'+it.name+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);color:var(--slate-500);">'+(it.model||'-')+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);text-align:center;">'+it.contractQty+'</td><td style="padding:4px 6px;border-bottom:1px solid var(--slate-50);text-align:center;font-weight:600;">'+it.acceptQty+'</td></tr>';}
  h+='</table></div>';
  showModal('导入验收单 - 预览',h,'<button class="btn-sm" style="background:var(--slate-100);color:var(--slate-700);border:1px solid var(--slate-200);padding:5px 14px;border-radius:5px;" onclick="cm()">取消</button><button class="btn-sm" style="background:linear-gradient(135deg,var(--champagne),var(--champagne-dark));color:#fff;border:none;padding:5px 14px;border-radius:5px;" onclick="whImpDo()">确认入库 '+items.length+' 项</button>');
}
function whImpDo(){
  if(!impData)return;var cat=document.getElementById('impCat').value,loc=document.getElementById('impLoc').value,date=document.getElementById('impDate').value,items=impData.items,info=impData.info,added=0;
  for(var i=0;i<items.length;i++){var it=items[i];var code=cat.substring(0,2).toUpperCase()+'-'+date.replace(/-/g,'').slice(2)+'-'+(i+1).toString().padStart(3,'0');var sub='其他';for(var k in WH_CATS)if(k===cat){sub=WH_CATS[k].sub[0]||k;break;}
    WH.push({id:'w'+Date.now()+Math.random().toString(36).slice(2,4),code:code,name:it.name,cat1:cat,cat2:sub,unit:'台',qty:it.acceptQty||it.contractQty,min:Math.max(1,Math.round(it.contractQty*0.1)),max:Math.max(it.contractQty*2,10),loc:loc,shelf:'验收-'+date,supplier:info.supplier||''});
    WHL.push({id:'l'+Date.now()+i,itemId:WH[WH.length-1].id,type:'in',qty:it.acceptQty||it.contractQty,bf:0,af:it.acceptQty||it.contractQty,op:'验收单导入',dt:date,note:'合同金额 ¥'+(info.amount||'-')+' | 供应商 '+info.supplier});added++;}
  sv();cm();renderWh();t('成功导入 '+added+' 项，分类:'+cat,'s');
}

function showModal(title,body,footer){
  var m=document.getElementById('mo');if(!m)return;
  document.getElementById('mt').innerHTML=title;
  document.getElementById('mb').innerHTML=body;
  document.getElementById('mf_modal').innerHTML=footer;
  m.classList.add('open');
}
// Override cm to work for both
var _orig_cm = cm;
cm = function(){document.getElementById('mo').classList.remove('open');};
'''

# Insert the WH JS before the last </script>
idx = t.rfind('</script>')
if idx >= 0:
    t = t[:idx] + wh_js + '\n' + t[idx:]
    print(f"WH JS inserted ({len(wh_js)} bytes)")
else:
    print("</script> not found!")

# Also update sv() to include WH data
old_sv = "function sv(){try{localStorage.setItem(sk,JSON.stringify({version:DATA_VERSION,bk:BK}));renderDateOverview();rZl();}catch(e){}}"
new_sv = "function sv(){try{localStorage.setItem(sk,JSON.stringify({version:DATA_VERSION,bk:BK,wh:WH,whl:WHL}));renderDateOverview();rZl();if(typeof renderWh==='function')renderWh();}catch(e){}}"
if old_sv in t:
    t = t.replace(old_sv, new_sv)
    print("sv() updated with WH data")
else:
    print("sv() not found")

# Update ld() to load WH data
old_ld = "function ld(){try{var r=localStorage.getItem(sk);if(r){var p=JSON.parse(r);if(p&&p.version===DATA_VERSION&&p.bk){BK=p.bk;return true;}}localStorage.removeItem(sk);}catch(e){}BK=[];return false;}"
new_ld = "function ld(){try{var r=localStorage.getItem(sk);if(r){var p=JSON.parse(r);if(p&&p.version===DATA_VERSION&&p.bk){BK=p.bk||[];WH=p.wh||[];WHL=p.whl||[];return true;}}localStorage.removeItem(sk);}catch(e){}BK=[];WH=[];WHL=[];return false;}"
if old_ld in t:
    t = t.replace(old_ld, new_ld)
    print("ld() updated with WH data")
else:
    print("ld() not found")

# Update sw() for p3
old_sw = "if(p===1){rPf();renderDateOverview();}if(p===2)rZl();"
new_sw = "if(p===1){rPf();renderDateOverview();}if(p===2)rZl();if(p===3)renderWh();"
if old_sw in t:
    t = t.replace(old_sw, new_sw)
    print("sw() updated with p3")
else:
    print("sw() not found")

with open('/Users/zhangtao/Desktop/排房1.html','w') as f:
    f.write(t)
print("All WH JS injected")

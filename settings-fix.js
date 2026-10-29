
(function(){
  'use strict';
  const KEY='eswarCafeBillingV1';
  const $=id=>document.getElementById(id);
  const readDB=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}};
  const writeDB=db=>localStorage.setItem(KEY,JSON.stringify(db));
  const notify=msg=>{
    const el=$('toast');
    if(el){el.textContent=msg;el.classList.remove('hidden');}
    else alert(msg);
  };
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const today=()=>new Date().toISOString().slice(0,10);
  function defaults(db){
    db.settings=db.settings||{};
    db.settings.tokenCounters=Array.isArray(db.settings.tokenCounters)?db.settings.tokenCounters:[
      {id:'snacks',name:'Snacks Counter',categories:['Snacks','Bakery','Other']},
      {id:'tea',name:'Tea Counter',categories:['Tea','Coffee','Cold drinks']}
    ];
    db.settings.itemCategories=Array.isArray(db.settings.itemCategories)?db.settings.itemCategories:['Tea','Coffee','Cold drinks','Snacks','Bakery','Other'];
    db.items=Array.isArray(db.items)?db.items:[];
    db.bills=Array.isArray(db.bills)?db.bills:[];
    db.expenses=Array.isArray(db.expenses)?db.expenses:[];
    return db;
  }
  function refreshCategoryUI(db){
    const cats=[...new Set(['Tea','Coffee','Cold drinks','Snacks','Bakery','Other',...(db.settings.itemCategories||[]),...(db.items||[]).map(x=>x.category)].filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    const chips=$('settingsCategoryManagerList');
    if(chips) chips.innerHTML=cats.map(c=>`<span class="chip">${esc(c)}${(db.items||[]).some(i=>i.category===c)?` <small>(${db.items.filter(i=>i.category===c).length})</small>`:''}</span>`).join('');
    const select=$('itemCategory');
    if(select){
      const current=select.value;
      select.innerHTML='<option value="">Select category</option>'+cats.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');
      if(cats.includes(current))select.value=current;
    }
    const filter=$('manageCategories');
    if(filter){
      const selected=window.manageCategory||'All';
      filter.innerHTML=['All',...cats].map(c=>`<button type="button" class="chip ${selected===c?'active':''}" data-managecat="${esc(c)}">${esc(c)}</button>`).join('');
    }
  }
  function refreshCounterUI(db){
    const wrap=$('tokenCounterRows'); if(!wrap)return;
    const counters=db.settings.tokenCounters||[];
    wrap.innerHTML=counters.map((c,i)=>`<div class="panel token-counter-row" data-counter-id="${esc(c.id||('counter-'+i))}" style="padding:12px;margin:10px 0;background:#fffdf8">
      <div class="formgrid">
        <div class="formgroup"><label>Counter name</label><input class="field" data-counter-name value="${esc(c.name||'')}" required></div>
        <div class="formgroup"><label>Menu categories routed here</label><input class="field" data-counter-categories value="${esc((c.categories||[]).join(', '))}" required></div>
      </div>
      <div class="actions" style="margin-top:8px"><button class="btn ghost small" type="button" data-remove-counter="${i}">Remove counter</button></div>
    </div>`).join('');
    wrap.querySelectorAll('[data-remove-counter]').forEach(btn=>btn.onclick=()=>{
      const d=defaults(readDB());const n=Number(btn.dataset.removeCounter);
      if(d.settings.tokenCounters.length<=1){notify('Keep at least one counter.');return;}
      d.settings.tokenCounters.splice(n,1);writeDB(d);refreshCounterUI(d);notify('Counter removed. Click Save token settings.');
    });
  }
  function saveCafe(){
    const d=defaults(readDB());
    d.settings.name=($('cafeName')?.value||'').trim()||'Eswar Cafe';
    d.settings.phone=($('cafePhone')?.value||'').trim();
    d.settings.address=($('cafeAddress')?.value||'').trim();
    d.settings.footer=($('receiptFooter')?.value||'').trim()||'Thank you! Visit again.';
    writeDB(d);notify('Cafe details saved.');
  }
  function addCounter(){
    const d=defaults(readDB());
    const rows=[...document.querySelectorAll('#tokenCounterRows .token-counter-row')].map((row,i)=>({
      id:row.dataset.counterId||'counter-'+i,
      name:row.querySelector('[data-counter-name]')?.value.trim()||'Counter '+(i+1),
      categories:(row.querySelector('[data-counter-categories]')?.value||'').split(',').map(x=>x.trim()).filter(Boolean)
    }));
    rows.push({id:'counter-'+Date.now(),name:'Chaat Counter',categories:['Chaat']});
    d.settings.tokenCounters=rows;writeDB(d);refreshCounterUI(d);notify('Counter added. Click Save token settings.');
  }
  function saveCounters(){
    const d=defaults(readDB());
    const rows=[...document.querySelectorAll('#tokenCounterRows .token-counter-row')].map((row,i)=>({
      id:row.dataset.counterId||'counter-'+i,
      name:row.querySelector('[data-counter-name]')?.value.trim()||'',
      categories:(row.querySelector('[data-counter-categories]')?.value||'').split(',').map(x=>x.trim()).filter(Boolean)
    }));
    if(!rows.length||rows.some(x=>!x.name||!x.categories.length)){notify('Each counter needs a name and at least one category.');return;}
    d.settings.tokenCounters=rows;writeDB(d);refreshCounterUI(d);notify('Token settings saved.');
  }
  function addCategory(){
    const input=$('newCategoryName');const name=(input?.value||'').trim();
    if(!name){notify('Enter a category name first.');input?.focus();return;}
    const d=defaults(readDB());
    const cats=[...new Set([...(d.settings.itemCategories||[]),...(d.items||[]).map(i=>i.category)].filter(Boolean))];
    if(['Tea','Coffee','Cold drinks','Snacks','Bakery','Other',...cats].some(c=>c.toLowerCase()===name.toLowerCase())){notify('That category already exists.');return;}
    d.settings.itemCategories.push(name);writeDB(d);if(input)input.value='';
    refreshCategoryUI(d);notify('Category added: '+name);
  }
  function backup(){
    const d=defaults(readDB());d.backupCreatedAt=new Date().toISOString();d.app='Eswar Cafe Billing';
    const blob=new Blob([JSON.stringify(d,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='eswar-cafe-backup-'+today()+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);notify('Backup download started.');
  }
  function csv(){
    const d=defaults(readDB());const rows=[['Bill Number','Date','Payment','Items','Total'],...(d.bills||[]).map(b=>[b.number,b.date||b.createdAt,b.payment,(b.items||[]).map(i=>`${i.name} x${i.qty}`).join('; '),b.total])];
    const content=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download='eswar-cafe-sales-'+today()+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);notify('Sales CSV download started.');
  }
  function bind(id,fn){const el=$(id);if(el)el.onclick=e=>{e.preventDefault();try{fn()}catch(err){console.error(err);alert('Action failed: '+err.message)}};}
  bind('saveCafeSettings',saveCafe);
  bind('addTokenCounter',addCounter);
  bind('saveTokenSettings',saveCounters);
  bind('addCategoryBtn',addCategory);
  bind('backupBtn',backup);
  bind('downloadCsv',csv);
  const catInput=$('newCategoryName');if(catInput)catInput.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();addCategory();}};
  const settingsForm=$('settingsForm');if(settingsForm)settingsForm.onsubmit=e=>{e.preventDefault();saveCafe();};
  const tokenForm=$('tokenSettingsForm');if(tokenForm)tokenForm.onsubmit=e=>{e.preventDefault();saveCounters();};
  // Ensure settings controls work even if the app's older inline handler failed.
  try{const d=defaults(readDB());writeDB(d);refreshCounterUI(d);refreshCategoryUI(d);}catch(e){console.error('Settings helper init failed',e);}
})();

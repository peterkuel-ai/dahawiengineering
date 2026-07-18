const qs = s=>document.querySelector(s);
const qsa = s=>document.querySelectorAll(s);

const msg = (t)=>{
  const el = qs('#message'); el.textContent = t; el.classList.remove('hidden');
  setTimeout(()=>el.classList.add('hidden'),3000);
}

async function api(path, data){
  const opts = {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data), credentials: 'same-origin'};
  const res = await fetch(path, opts);
  const text = await res.text();
  if(text.trim().startsWith('<?php')){
    throw new Error('PHP is not executing. Run the dashboard through a PHP server and open the PHP server URL, not VS Code Live Preview.');
  }
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (err) { console.error('Invalid JSON', text); }
  if(!res.ok){
    const error = json?.error || res.statusText || 'Server error';
    throw new Error(error);
  }
  return json;
}

async function refreshList(){
  const listEl = qs('#file-list'); listEl.textContent = 'Loading…';
  try{
    const res = await api('list.php', {});
    listEl.innerHTML = '';
    res.files.forEach(p=>{
      const div = document.createElement('div'); div.className='file-item'; div.textContent = p; div.dataset.path = p;
      div.addEventListener('click', ()=>openFile(p, div));
      listEl.appendChild(div);
    });
  }catch(e){
    listEl.textContent = 'Unable to load list';
    msg(e.message || 'Unable to load list');
    console.error(e);
  }
}

async function openFile(path, el){
  qsa('.file-item').forEach(x=>x.classList.remove('active'));
  if(el) el.classList.add('active');
  qs('#current-path').value = path;
  try{
    const res = await api('file.php',{path});
    qs('#editor-area').value = res.content;
  }catch(e){ msg(e.message || 'Failed to open file'); console.error(e)}
}

async function saveFile(){
  const path = qs('#current-path').value; const content = qs('#editor-area').value;
  if(!path){ msg('No file selected'); return }
  try{
    const res = await api('save.php',{path, content});
    if(res.success) msg('Saved'); else msg(res.error || 'Save failed');
  }catch(e){ msg(e.message || 'Save error'); console.error(e)}
}

// UI actions
qs('#btn-login').addEventListener('click', async ()=>{
  const p = qs('#password').value.trim(); if(!p) return msg('Enter password');
  try {
    const res = await api('login.php', {password: p});
    if (!res.success) throw new Error('Login failed');
    qs('#login').classList.add('hidden');
    qs('#app').classList.remove('hidden');
    await refreshList();
  } catch (err) {
    msg(err.message || 'Login failed');
  }
});
qs('#btn-refresh').addEventListener('click', refreshList);
qs('#btn-save').addEventListener('click', saveFile);
qs('#btn-logout').addEventListener('click', async ()=>{
  try {
    await api('logout.php', {});
  } catch (err) {
    console.error(err);
  }
  qs('#app').classList.add('hidden');
  qs('#login').classList.remove('hidden');
  qs('#password').value = '';
  qs('#file-list').innerHTML = 'Loading…';
  qs('#editor-area').value = '';
  qs('#current-path').value = '';
  msg('Logged out');
});

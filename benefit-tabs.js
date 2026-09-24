(() => {
 const root=document.querySelector('[data-node-id="98:3892"]');
 const start=root?.querySelector('[data-node-id="98:4095"]'), end=root?.querySelector('[data-node-id="98:4155"]');
 if(!start||!end)return;
 const capacity=document.createElement('div');capacity.className='benefit-panel';capacity.id='benefit-capacity';capacity.setAttribute('role','tabpanel');root.insertBefore(capacity,start);
 for(let n=start.nextSibling;n&&n!==end;){const next=n.nextSibling;capacity.append(n);n=next;}
 const download=document.createElement('div');download.className='benefit-panel';download.id='benefit-download';download.setAttribute('role','tabpanel');download.hidden=true;download.append(document.querySelector('#download-panel-template').content.cloneNode(true));root.insertBefore(download,end);
 root.insertBefore(start,capacity);
 download.querySelector('[data-node-id="112:5923"]').remove();
 const word=capacity.querySelector('img[src="assets/capacity-6tb.svg"]');
 const wrap=document.createElement('div');wrap.className='capacity-word';wrap.style.cssText=word.style.cssText;word.before(wrap);wrap.append(word);word.style.cssText='position:absolute;inset:0;width:100%;height:100%';const shine=document.createElement('span');shine.className='capacity-word-shine';wrap.append(shine);

 function placeScene(panel,id,oldX,oldY,oldWidth,newX,newY,newWidth){
  const scene=panel.querySelector('[data-node-id="'+id+'"]');
  const scale=newWidth/oldWidth;
  scene.style.cssText='position:absolute;display:block;left:0;top:0;width:375px;height:1223px;transform-origin:0 0;transform:translate('+(newX-oldX*scale)+'px,'+(newY-oldY*scale)+'px) scale('+scale+')';
 }
 placeScene(capacity,'98:4098',184.0125,655.7726,169.425,194,659,155.06739807128906);
 placeScene(download,'112:6144',187,646,170,202,650,158);
 const list=document.createElement('div');list.className='benefit-tabs';list.setAttribute('role','tablist');list.setAttribute('aria-label','会员权益');root.append(list);

 const plusBenefit=document.createElement('div');plusBenefit.className='benefit-panel';plusBenefit.id='benefit-plus';plusBenefit.hidden=true;plusBenefit.append(document.querySelector('#plus-benefit-template').content.cloneNode(true));root.insertBefore(plusBenefit,end);
 placeScene(plusBenefit,'104:4728',184.0125,656.0172,169.425,191,660,155.06973266601562);
 const panels=[capacity,download];let selected=0;
 function syncMembership(){const isPlus=root.dataset.membership==='plus';plusBenefit.hidden=!isPlus;panels.forEach((p,i)=>p.hidden=isPlus||i!==selected);list.hidden=isPlus;}
 new MutationObserver(syncMembership).observe(root,{attributes:true,attributeFilter:['data-membership']});syncMembership();

 const buttons=['6TB空间','极速下载'].map((label,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-label',label);b.setAttribute('aria-controls',panels[i].id);b.id='benefit-tab-'+i;panels[i].setAttribute('aria-labelledby',b.id);b.setAttribute('aria-selected',String(i===0));b.tabIndex=i===0?0:-1;b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?1:1-selected;select(next);buttons[next].focus();}});list.append(b);return b;});
 function select(i){if(i===selected)return;panels[selected].hidden=true;selected=i;panels[i].hidden=false;buttons.forEach((b,j)=>{b.setAttribute('aria-selected',String(i===j));b.tabIndex=i===j?0:-1;});if(!matchMedia('(prefers-reduced-motion:reduce)').matches)panels[i].animate([{opacity:0},{opacity:1}],{duration:260,easing:'ease-out'});}
})();

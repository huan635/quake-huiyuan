(() => {
 document.querySelectorAll('[data-name="套餐卡片横向列表"]').forEach(list=>{
  const parent=list.parentElement,top=parseFloat(list.style.top),left=parseFloat(list.style.left)||20;
  const cards=[...list.children];const gap=parseFloat(list.style.gap)||12;
  const width=cards.reduce((sum,c)=>sum+parseFloat(c.style.width),0)+gap*(cards.length-1);
  const viewport=document.createElement('div');viewport.className='package-scroll';viewport.style.top=(top-18)+'px';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label','套餐价格，左右滑动查看全部');
  const track=document.createElement('div');track.className='package-scroll-track';track.style.width=(left+width+20)+'px';viewport.append(track);
  const decorations=[...parent.children].filter(n=>{if(n===list)return false;const y=parseFloat(n.style.top),w=parseFloat(n.style.width);return n.style.position==='absolute'&&y>=top-18&&y<top+35&&(w<120||n.tagName==='P');});
  parent.insertBefore(viewport,list);track.append(list);list.style.top='18px';list.style.width=width+'px';list.style.overflow='visible';
  decorations.forEach(n=>{n.style.top=(parseFloat(n.style.top)-top+18)+'px';track.append(n);});
  let drag=null;
  viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;drag={x:e.clientX,scroll:viewport.scrollLeft};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');});
  viewport.addEventListener('pointermove',e=>{if(drag){viewport.scrollLeft=drag.scroll+drag.x-e.clientX;e.preventDefault();}});
  const end=()=>{drag=null;viewport.classList.remove('dragging');};viewport.addEventListener('pointerup',end);viewport.addEventListener('pointercancel',end);
  viewport.addEventListener('dragstart',e=>e.preventDefault());
  viewport.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;const d=e.deltaY;if((d>0&&viewport.scrollLeft<viewport.scrollWidth-viewport.clientWidth-1)||(d<0&&viewport.scrollLeft>0)){e.preventDefault();viewport.scrollLeft+=d;}},{passive:false});
  viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();viewport.scrollBy({left:e.key==='ArrowRight'?127:-127,behavior:'smooth'});}});
 });
})();

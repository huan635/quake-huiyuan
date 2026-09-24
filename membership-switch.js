(() => {
 const root=document.querySelector('[data-node-id="98:3892"]');
 const original=document.querySelector('[data-node-id="109:5882"]');
 if(!root||!original)return;
 const clip=document.createElement('div');clip.className='membership-card-slot';
 original.before(clip);
 const standard=document.createElement('div'),plus=document.createElement('div');
 standard.className=plus.className='membership-card-panel';
 standard.append(original);plus.append(document.querySelector('#plus-card-template').content.cloneNode(true));
 standard.style.transform='translateY(132px)';
 clip.append(standard,plus);plus.style.transform='translateY(132px)';plus.setAttribute('aria-hidden','true');
 const shadow=document.querySelector('[data-node-id="98:3895"]');
 const plusShadow=shadow.cloneNode(true);plusShadow.removeAttribute('data-node-id');
 plusShadow.classList.add('plus-card-diffusion');plusShadow.querySelector('img').src='assets/plus-account-diffusion.svg';
 plusShadow.style.opacity='0';shadow.after(plusShadow);
 const links=[document.querySelector('[data-node-id="98:3902"]'),document.querySelector('[data-node-id="98:3903"]')];
 const initialTabs=links.map(n=>n.innerHTML);
 const plusTabs=[...document.querySelector('#plus-tabs-template').content.children].map(n=>n.innerHTML);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let current=0,desired=0,busy=true;
 const panels=[standard,plus];
 async function change(){
  if(busy)return;busy=true;
  while(current!==desired){
   const next=desired,oldPanel=panels[current],newPanel=panels[next];
   links.forEach((link,i)=>{link.innerHTML=(next?plusTabs:initialTabs)[i];link.setAttribute('aria-current',i===next?'page':'false');});
   const hide=oldPanel.animate([{transform:'translateY(0)'},{transform:'translateY(132px)'}],{duration:reduced?0:380,easing:'cubic-bezier(.4,0,.75,.4)',fill:'forwards'});
   await hide.finished;oldPanel.style.transform='translateY(132px)';hide.cancel();oldPanel.setAttribute('aria-hidden','true');
   shadow.style.transition=plusShadow.style.transition=reduced?'none':'opacity 520ms ease';
   shadow.style.opacity=next?'0':'1';plusShadow.style.opacity=next?'1':'0';
   newPanel.removeAttribute('aria-hidden');
   const show=newPanel.animate([{transform:'translateY(132px)'},{transform:'translateY(0)'}],{duration:reduced?0:520,easing:'cubic-bezier(.2,.75,.25,1)',fill:'forwards'});
   await show.finished;newPanel.style.transform='translateY(0)';show.cancel();current=next;root.dataset.membership=next?'plus':'svip';
  }
  busy=false;
 }
 async function enter(){
  await document.fonts.ready;
  root.dataset.cardEntry='playing';
  const entry=standard.animate([{transform:'translateY(132px)'},{transform:'translateY(0)'}],{duration:reduced?0:700,easing:'cubic-bezier(.2,.75,.25,1)',fill:'forwards'});
  await entry.finished;
  standard.style.transform='translateY(0)';entry.cancel();
  root.dataset.cardEntry='complete';
  window.finishMembershipEntry?.();
  busy=false;if(desired!==current)change();
 }
 enter();
 links.forEach((link,i)=>link.addEventListener('click',e=>{e.preventDefault();desired=i;change();}));
})();

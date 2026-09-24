(() => {
 const root=document.querySelector('#plan-two [data-node-id="69:1486"]');if(!root)return;
 const standardIds=['69:1993','69:2610','69:2608'];
 const standard=standardIds.map(id=>root.querySelector('[data-node-id="'+id+'"]'));
 const standardDisplays=standard.map(n=>n.style.display);
 const plus=document.createElement('div');plus.className='p2-membership-scene';plus.hidden=true;
 plus.append(document.querySelector('#p2plus-template').content.cloneNode(true));root.append(plus);
 const bg=plus.querySelector('[data-plus-background]').style.backgroundImage;plus.querySelector('[data-plus-background]').remove();
 const standardBackground=root.style.backgroundImage;
 const text=plus.querySelector('[data-node-id="106:5233"]');const image=document.createElement('img');image.src='assets/plan-two-plus-capacity.svg';image.alt='10TB';image.style.cssText='position:absolute;left:154.5px;top:173px;width:67px;height:23px';text.replaceWith(image);
 const scene=plus.querySelector('[data-node-id="106:5207"]');const scale=198.0011749267578/204.825;
 scene.style.cssText='position:absolute;display:block;left:0;top:0;width:375px;height:812px;transform-origin:0 0;transform:translate('+(92.4140625-90*scale)+'px,'+(114.234375-111.0004*scale)+'px) scale('+scale+')';
 const title=plus.querySelector('[data-node-id="106:5115"]');title.style.top='249px';title.style.left='141px';title.style.color='rgb(130.7804,64.8407,0)';
 const subtitle=plus.querySelector('[data-node-id="106:5114"]');subtitle.textContent='海量照片、视频和文件安心存';subtitle.style.left='125px';subtitle.style.top='272px';subtitle.style.color='#bd8c58';

 const originals=['69:1487','69:1494'].map(id=>root.querySelector('[data-node-id="'+id+'"]'));
 const alternates=['106:5109','106:5110'].map(id=>plus.querySelector('[data-node-id="'+id+'"]'));
 // Keep both tab marks mounted; visibility follows the selected membership.
 const tabs=document.createElement('div');tabs.className='p2-membership-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','方案二会员类型');root.append(tabs);
 const buttons=['SVIP','SVIP+'].map((label,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.setAttribute('aria-label',label);b.setAttribute('aria-selected',String(i===0));b.addEventListener('click',()=>select(i));tabs.append(b);return b;});
 let selected=0;
 function select(i){if(i===selected)return;selected=i;const isPlus=i===1;standard.forEach((n,j)=>n.style.display=isPlus?'none':standardDisplays[j]);originals.forEach(n=>n.style.visibility=isPlus?'hidden':'');plus.hidden=!isPlus;root.style.backgroundImage=isPlus?bg:standardBackground;root.dataset.membership=isPlus?'plus':'svip';const gift=root.querySelector('[data-node-id="108:5776"]');if(gift)gift.hidden=isPlus;buttons.forEach((b,j)=>b.setAttribute('aria-selected',String(i===j)));}
})();

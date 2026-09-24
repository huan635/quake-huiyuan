(() => {
 const one=document.querySelector('main');one.id='plan-one';
 const two=document.createElement('main');two.id='plan-two';two.hidden=true;two.setAttribute('aria-label','场景型方案二');
 const scroll=document.createElement('div');scroll.className='page-scroll';scroll.tabIndex=0;scroll.setAttribute('aria-label','方案二会员内容，可上下滚动');
 scroll.append(document.querySelector('#plan-two-template').content.cloneNode(true));two.append(scroll);one.after(two);
 const root=two.querySelector('[data-node-id="69:1486"]');
 const footer=two.querySelector('[data-node-id="108:5790"]');two.append(footer);
 const cta=two.querySelector('[data-name="立即续费按钮"]');cta.classList.add('renewal-pulse');cta.prepend(one.querySelector('.renewal-glow').cloneNode(true));
 const frame=two.querySelector('[data-node-id="84:3734"]');frame.append(one.querySelector('.metal-shine').cloneNode(true));
 const letter=two.querySelector('[data-node-id="69:2019"]');const word=document.createElement('div');word.className='capacity-word plan-two-word';word.innerHTML='<img src="assets/plan-two-capacity.svg" alt="6TB"><span class="capacity-word-shine"></span>';letter.replaceWith(word);
 const toolbar=document.createElement('nav');toolbar.className='plan-switch';toolbar.setAttribute('aria-label','展示方案切换');
 const mains=[one,two];const buttons=['保守型方案一','场景型方案二'].map((label,i)=>{const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>{mains.forEach((m,j)=>m.hidden=i!==j);buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));});toolbar.append(button);return button;});document.body.prepend(toolbar);
})();

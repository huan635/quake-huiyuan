// Capacity preview: replay on page reload, leaving the completed state in place.
(async () => {
  const node = id => document.querySelector(`[data-node-id="${id}"]`);
  const bar = node('98:4061'), label = node('98:4059'), capacity = node('98:4058');
  if (!bar || !label || !capacity) return;
  await document.fonts.ready;
  await window.membershipEntryReady;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduced ? 0 : 1000;
  const ease = 'cubic-bezier(.22,.7,.25,1)';
  const replacement = label.cloneNode(true);
  replacement.removeAttribute('data-node-id');
  replacement.style.cssText = label.style.cssText;
  replacement.style.position = 'absolute'; replacement.style.left = '0'; replacement.style.top = '0';
  replacement.style.color = '#a46300'; replacement.style.transform = 'translateY(16px)';
  const labelWindow = document.createElement('div');
  labelWindow.className = 'capacity-label-window';
  labelWindow.style.top = label.style.top;
  label.before(labelWindow); labelWindow.append(label, replacement);
  label.style.left = '0'; label.style.top = '0';
  const gold = document.createElement('div'); gold.className = 'capacity-gold'; bar.append(gold);
  if (!reduced) await new Promise(resolve => setTimeout(resolve, 250));
  const opts = {duration, easing:ease, fill:'forwards'};
  bar.animate([{width:'294px'},{width:'19px'}],opts);
  gold.animate([{opacity:0},{opacity:1}],opts);
  label.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-16px)',opacity:0}],{...opts,duration:reduced?0:500});
  replacement.animate([{transform:'translateY(16px)',opacity:0},{transform:'translateY(0)',opacity:1}],{...opts,duration:reduced?0:500});
  // Capacity uses a fixed right edge; changing digits grow toward the left.
  const start = performance.now();
  function frame(now) {
    const t=duration ? Math.min((now-start)/duration,1) : 1;
    const eased=1-Math.pow(1-t,3);
    const gb=Math.round(125+(6000-125)*eased);
    capacity.replaceChildren(document.createTextNode('495.3GB/'));
    const total=document.createElement('span');total.style.fontWeight='600';total.textContent=t===1?'6TB':`${gb}GB`;capacity.append(total);
    if(t<1) requestAnimationFrame(frame);
    else { label.setAttribute('aria-hidden','true'); document.querySelector('main').dataset.capacityMotion='complete'; }
  }
  requestAnimationFrame(frame);
})();


(function () {
  const IMAGE_SRC = ''; 
  const SIZE_PX = 600; 
  const SMOOTH = 0.12; 

  const img = document.createElement('img');
  img.src = IMAGE_SRC;
  img.alt = 'cursor follower';
  img.id = 'cursor-follower';
  Object.assign(img.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: SIZE_PX + 'px',
    height: SIZE_PX + 'px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    zIndex: 9999,
    transition: 'opacity 120ms linear',
    opacity: '0',
    willChange: 'transform, left, top'
  });

  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(img));

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let posX = mouseX;
  let posY = mouseY;

  function onMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    img.style.opacity = '1';
  }

  function onLeave() {
    img.style.opacity = '0';
  }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseleave', onLeave);

 
  window.addEventListener('touchstart', () => {
    img.style.display = 'none';
  }, { passive: true });

  function tick() {
    posX += (mouseX - posX) * SMOOTH;
    posY += (mouseY - posY) * SMOOTH;
    img.style.left = posX + 'px';
    img.style.top = posY + 'px';
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  
  window.__cursorFollower = {
    setImage(src) { img.src = src; },
    setSize(px) { img.style.width = px + 'px'; img.style.height = px + 'px'; },
    setSmoothing(f) { /* not reactive to changes in this simple impl */ }
  };
})();

function makeDraggable(element) {
  let picked = false;
  let deltaX = 0;
  let deltaY = 0;
  element.addEventListener("mousedown", (e) => {
    picked = true;
    deltaX = element.offsetLeft - e.clientX;
    deltaY = element.offsetTop - e.clientY;
  });
  element.addEventListener("mouseup", (e) => {
    picked = false;
  });
  element.addEventListener("mousemove", (e) => {
    if (picked) {
      element.style.left = `${e.clientX + deltaX}px`;
      element.style.top = `${e.clientY + deltaY}px`;
    }
  });
}

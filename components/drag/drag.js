// function makeDraggable(dom) {
//   const element = dom;
//   let picked = false;
//   let deltaX = 0;
//   let deltaY = 0;
//   element.addEventListener("mousedown", (e) => {
//     picked = true;
//     deltaX = element.offsetLeft - e.clientX;
//     deltaY = element.offsetTop - e.clientY;
//   });
//   element.addEventListener("mouseup", (e) => {
//     picked = false;
//   });
//   element.addEventListener("mousemove", (e) => {
//     if (picked) {
//       element.style.left = `${e.clientX + deltaX}px`;
//       element.style.top = `${e.clientY + deltaY}px`;
//     }
//   });
// }

class Slider {
  constructor(dom) {
    this.element = dom;
    this.picked = false;
    this.deltaX = 0;
    this.deltaY = 0;
    this.element.addEventListener("mousedown", this.onmousedown.bind(this));
    this.element.addEventListener("mouseup", this.onmouseup.bind(this));
    this.element.addEventListener("mousemove", this.onmousemove.bind(this));
  }

  onmousedown(e) {
    this.picked = true;
    this.deltaX = this.element.offsetLeft - e.clientX;
    this.deltaY = this.element.offsetTop - e.clientY;
  }

  onmouseup(e) {
    this.picked = false;
  }

  onmousemove(e) {
    if (this.picked) {
      this.element.style.left = `${e.clientX + this.deltaX}px`;
      this.element.style.top = `${e.clientY + this.deltaY}px`;
    }
  }
}

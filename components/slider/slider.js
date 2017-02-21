function slider(element, { max = 100, change }) {

}

class Slider {
  constructor(dom) {
    this.element = dom;
    this.picked = false;
    this.deltaX = 0;
    this.deltaY = 0;
    this.element.addEventListener("mousedown", this.onmousedown);
    this.element.addEventListener("mouseup", this.onmouseup);
    this.element.addEventListener("mousemove", this.onmousemove);
  }

  onmousedown = (e) => {
    this.picked = true;
    this.deltaX = this.element.offsetLeft - e.clientX;
    this.deltaY = this.element.offsetTop - e.clientY;
  }

  onmouseup = (e) => {
    this.picked = false;
  }

  onmousemove = (e) => {
    if (this.picked) {
      this.element.style.left = `${e.clientX + this.deltaX}px`;
      this.element.style.top = `${e.clientY + this.deltaY}px`;
    }
  }
}

class Drag {
  constructor(dom) {
    this.picked = false;
    this.element = dom;
    this.offsetX = 0;
    this.offsetY = 0;
    this.onmouseup = this.onmouseup.bind(this);
    this.onmousemove = this.onmousemove.bind(this);
    this.onmousedown = this.onmousedown.bind(this);
    this.element.addEventListener("mousedown", this.onmousedown);
  }

  onmousedown(e) {
    this.picked = true;
    this.offsetX = this.element.offsetLeft - e.clientX;
    this.offsetY = this.element.offsetTop - e.clientY;
    document.addEventListener("mouseup", this.onmouseup);
    document.addEventListener("mousemove", this.onmousemove);
  }

  onmouseup(e) {
    this.picked = false;
    document.removeEventListener('mouseup', this.onmouseup);
    document.removeEventListener("mousemove", this.onmousemove);
  }

  onmousemove(e) {
    if (this.picked) {
      this.element.style.left = `${e.clientX + this.offsetX}px`;
      this.element.style.top = `${e.clientY + this.offsetY}px`;
    }
  }
}

const square = document.getElementsByClassName('square')[0];
const draggableSquare = new Drag(square);

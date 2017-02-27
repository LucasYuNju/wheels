class Slider {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.slideWidth = 440;
    this.length = 5;
    this.step = 1;

    this.frameTime = 20;
    this.displayTime = 2000;
    this.animDuration = 200;

    setInterval(this.next.bind(this), this.displayTime);
  }

  next() {
    this.switchTo((this.step + 1) % this.length);
  }

  switchTo(target) {
    console.log("switch to " + target);
    this.begin = parseInt(window.getComputedStyle(this.element).left);
    this.transition = -this.slideWidth * (target - this.step);
    this.animTime = 0;
    this.step = target;
    this.tick();
  }

  tick() {
    if (this.transition && this.animTime < this.animDuration) {
      const dest = Tween.Quad.easeOut(this.animTime, this.begin, this.transition, this.animDuration);
      this._moveTo(Math.round(dest));
      this.animTime += this.frameTime;
      this.timer = setTimeout(this.tick.bind(this), this.frameTime);
    }
    else {
      this._moveTo(this.begin + this.transition);
      if (this.step === this.length - 1) {
        this.step = 1;
        this._moveTo(1);
      }
      clearTimeout(this.timer);
      // TODO，这个完全可以用interval
    }
  }

  _moveTo(x) {
    this.element.style.left = x + "px";
  }
}

const Tween = {
  Quad: {
    /*
    t: current time（当前时间）；
    b: beginning value（初始值）；
    c: change in value（变化量）；
    d: duration（持续时间）。
    */
    easeOut: function(t,b,c,d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
    }
  }
}

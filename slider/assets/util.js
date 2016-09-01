const Tween = {
    Quad: {
        /*
        t: current time（当前时间）；
        b: beginning value（初始值）；
        c: change in value（变化量）；
        d: duration（持续时间）。
        */
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        }
    }
}

function styleOf(element) {
    return window.getComputedStyle(element);
}

function query(id) {
    return document.querySelector(id);
}

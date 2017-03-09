$(() => {
  let data = [];
  for(let k in window) data.push(k);

  const $input = $("#input");
  const $container = $("#suggestions");
  let selected = -1;

  function selectNext() {
    const length = $container.children().length;
    if (selected + 1 < length) {
      selected++;
      _updateSelection();
    }
  }

  function selectPrev() {
    if (selected - 1 >= 0) {
      selected--;
      _updateSelection();
    }
  }

  function _updateSelection() {
    $container.children().removeClass("selected");
    $container.children().eq(selected).addClass("selected");
    const text = $container.children().eq(selected).text();
    $input.val(text);
  }

  $input.on("input", (e) => {
    selected = -1;
    const input = $input.val();
    const suggestions = [];
    if(input) {
      data.forEach(datum => {
        if(datum.startsWith(input) && suggestions.length < 10) {
          const postfix = datum.slice(input.length);
          suggestions.push($(`<li><a href="javascript:void(0)">${input}<b>${postfix}</b></a></li>`));
        }
      });
    }
    $container.empty();
    suggestions.forEach(suggestion => $container.append(suggestion))
  });

  $input.on("keydown", e => {
    switch(e.keyCode) {
      case 13:
        // enter
      case 38:
        // up
        e.preventDefault();
        selectPrev();
        break;
      case 40:
        // down
        e.preventDefault();
        selectNext();
        break;
    }
  });
});

// http://www.cnblogs.com/rubylouvre/archive/2012/02/16/2353615.html

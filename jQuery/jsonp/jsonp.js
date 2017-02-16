function qs(data) {
  if (!data) return '';
  return Object.entries(data)
    .map(entry => encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1]))
    .join('&');
}

function jsonp(url, data, callback) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  const id = Math.round(Math.random() * 10000);
  const methodName = `_jsonp_callback${id}`;

  window[methodName] = function(...args) {
    // some clean up
    callback(...args);
    delete window[methodName];
    const script = document.getElementById(id);
    script.parentNode.removeChild(script);
  }

  script.src = `${url}?callback=${methodName}&${qs(data)}`;
  script.async = true;
  script.id = id;
  head.appendChild(script);
}

const echoUrl = 'http://jsfiddle.net/echo/jsonp/';
const data = { msg: 'hello' };
jsonp(echoUrl, data, (res) => {
  console.log(res);
});

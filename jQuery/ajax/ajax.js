const url = 'https://api.github.com/repos/LucasYuNju/leanote-desktop-lite/releases';
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (200 <= xhr.status && xhr.status < 300) {
      console.log('response', xhr.responseText);
    } else {
      console.error('response', xhr.status);
    }
  }
}
xhr.open('GET', url, true);
xhr.send(null);

const MAX_LI_NUM = 50;

const ul = document.getElementById('test');
for (let i = 0; i < MAX_LI_NUM; i++) {
  const li = document.createElement("li");
  li.innerHTML = i;
  ul.appendChild(li);
}

setTimeout(() => {
  const lis = document.querySelectorAll('#test li');
  let index = lis.length;
  while(index--) {
    ul.appendChild(lis[index]);
  }
}, 2000);

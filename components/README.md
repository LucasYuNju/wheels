## 一些常用的组件

### modal

```
modal({
  title: 'Minions are singing',
  message: 'Ba-ba-ba-ba-ba-nana, ba-ba-ba-ba-ba-nana',
  buttons: {
    confirm: {
      label: '确认',
    },
    cancel: {
      label: '取消',
    },
  },
  parent: '#container',
  callback: (msg) => {}
})
```

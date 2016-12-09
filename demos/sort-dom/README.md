##### 用JS为ul创建1000个内容随机的li节点，根据li的innerHTML进行排序

1. 取出所有li的DOM节点，在数组中排序，再依次插入ul中。使用jQuery很容易实现
2. 取出所有li的innerHTML，在数组中排序，再依次修改li的innerHTML
3. 采用插入排序算法，使用`insertBefore`方法处理DOM节点

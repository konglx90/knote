# 快站页面事件分发

为了便于三方开发者得知一些关键事件的发生

## 插件

- form
  - form:submit-success void 表单提交成功
  - form:submit-fail void 表单提交失败

## 依赖页面已经存在的[zepto](https://zeptojs.com/#$.Event)实现

实现
```js
$(function(win, doc, $) {
  var kzEvent = {
    events: [],
    registerEvents: function(events) {
      events.forEach((event) => {
        if (this.events.indexOf(event) > -1) {
          console.warn(`${event} is already register, please communicate with developer`)  
        } else {
          this.events.push(event)
          $.Event(event, { bubbles: false })
        }
      })
    },
    on: $(doc.body).on.bind($(doc.body)),
    trigger: $(doc.body).trigger.bind($(doc.body))
  }
  win.kzEvent = kzEvent
}(window, document, $));
```

触发事件(一般在官方插件里使用)
```js
// 在页面上注册事件
kzEvent.registerEvents([
  'form:submit-success',
  'form:submit-fail'
])

// 触发事件
kzEvent.trigger('form:submit-success', ['787mnkj89786'])
```

监听事件
```js
kzEvent.on('form:submit-success', function(e, formId) {
  console.log('formId: %s, %s', e.target, formId)
})
```

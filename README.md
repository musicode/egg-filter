# egg-filter

参数过滤器。

考虑一个场景，gender 参数通常会用数字类型表示，如 1 表示男，0 表示女。

但是 GET 请求的参数全是 string 类型，而 POST 请求则可以传递 JSON 数据，保证类型符合要求。

在服务器端，我们需要保证所有类型的请求都能被正确的处理，因此，参数过滤是非常必要的。

`egg-filter` 内置了 5 个过滤器：

1. string：确保参数是字符串类型
2. number: 确保参数是数字类型，如果传入字符串，会先经过 trim 再转型
3. trim：确保参数是字符串类型，并且经过 trim 处理
4. upper: 确保参数是字符串类型，并且全部大写
5. lower: 确保参数是字符串类型，并且全部小写

如果内置过滤器不满足要求，可按如下方式添加：

```js
app.filter.add('json', function (value) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    }
    catch (err) {

    }
  }
  // 失败返回空字符串
  return ''
})
```

使用方式如下：

```js
let data = ctx.filter(
  {
    username: 'hahaha',
    password: 'hahaha',
    custom: 'haha'
  },
  {
    username: 'trim',
    password: ['trim', 'lower'],
    custom: function (value) {
      return value
    }
  }
)
```

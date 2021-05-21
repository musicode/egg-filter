# egg-filter

参数过滤器。

## 参数符合预期

我们希望传入的参数是可预测的。

举个例子，修改用户资料时，只限定修改 `nickname` 和 `gender`，但请求方可能把用户所有字段都加上了，比如 `password`，这样是不是会产生一些潜在的漏洞，导致不可改的数据也被修改了。

`egg-filter` 通过一个`过滤规则`对象，把传入的参数筛选出来，确保只有你想要的参数。

## 参数类型符合预期

我们希望传入的参数是符合预期的。

举个例子，`gender` 参数通常会用数字类型表示，如 `1` 表示男，`0` 表示女。

但是 GET 请求的参数全是 string 类型，而 POST 请求则可以传递 JSON 数据，保证类型符合要求。

在服务器端，我们需要保证所有类型的请求都能被正确的处理，因此，参数过滤是非常必要的。

## 内置过滤器

`egg-filter` 内置了 7 个过滤器：

1. string：确保参数是字符串类型
2. number: 确保参数是数字类型
3. boolean: 确保参数是布尔类型
4. trim：确保参数是字符串类型，并且经过 trim 处理
5. upper: 确保参数是字符串类型，并且全部大写
6. lower: 确保参数是字符串类型，并且全部小写
7. array: 确保参数是数组类型

## 自定义过滤器

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

## 调用方式

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

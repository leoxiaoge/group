## API

### 方法

| 方法名       | 说明     | 参数                | 返回值      |
| :----------- | :------- | :------------------ | :---------- |
| Notify       | 展示提示 | `options | message` | notify 实例 |
| Notify.clear | 关闭提示 | `options`           | `void`      |

### Options

| 参数             | 说明                                                   | 类型       | 默认值       | 版本  |
| :--------------- | :----------------------------------------------------- | :--------- | :----------- | :---- |
| type             | 类型，可选值为 `primary` `success` `warning`           | *string*   | `danger`     | 1.0.0 |
| message          | 展示文案，支持通过`\n`换行                             | *string*   | 1.0.0        | -     |
| duration         | 展示时长(ms)，值为 0 时，notify 不会消失               | *number*   | `3000`       | -     |
| selector         | 自定义节点选择器                                       | *string*   | `van-notify` | -     |
| color            | 字体颜色                                               | *string*   | `#fff`       | -     |
| top              | 顶部距离                                               | *number*   | `0`          | -     |
| background       | 背景颜色                                               | *string*   | -            | -     |
| context          | 选择器的选择范围，可以传入自定义组件的 this 作为上下文 | *object*   | 当前页面     | -     |
| onClick          | 点击时的回调函数                                       | *Function* | -            | -     |
| onOpened         | 完全展示后的回调函数                                   | *Function* | -            | -     |
| onClose          | 关闭时的回调函数                                       | *Function* | -            | -     |
| safeAreaInsetTop | 是否留出顶部安全距离（状态栏高度）                     | *boolean*  | `false`      | -     |
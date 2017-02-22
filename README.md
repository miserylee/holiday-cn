## holiday-cn ![NPM version](https://img.shields.io/npm/v/holiday-cn.svg?style=flat)

中国法定节假日微服务

### Installation
```bash
$ yarn add holiday-cn
```

### Example
```js
const Holiday = require('holiday-cn');
```

### API
* `constructor({oss, prefix = ''})` 如果不需要自己存储数据查询结果，可不传参数
	- oss: 参考[xx-oss-service](https://github.com/miserylee/xx-oss-service)
	- prefix: 存储到oss的object的前缀
* `*all(year) => {}` 获取整年的节假日列表，1代表周末，2代表法定节假日
	- year: 年份，默认为当前年份
* `*count(year) => count:Number` 获取整年的节假日天数
	- year: 年份，默认为当前年份
* `*shouldWork(date) => shouldWork:Boolean` 判断某天是否是工作日
	- date: 日期，默认为今天
* `*fewWorkdaysLater(day, start) => date:Date` 计算若干个工作日后的日期
	- day: 天数
	- start: 开始日期, 默认为今天

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT license
Copyright (c) 2017 Misery Lee &lt;miserylee@foxmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor]()
built upon love by [docor](git+https://github.com/turingou/docor.git) v0.3.0

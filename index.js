require('tlan');
const axios = require('axios');
const Bucket = require('xx-oss-service');

const fetchYearDataFromEasyBots = function * (year) {
  const query = new Array(12).fill('').map((_, index) => `${year}${`0${index + 1}`.slice(-2)}`).join(',');
  return (yield axios.get(`http://www.easybots.cn/api/holiday.php?m=${query}`)).data;
};

const fetchYearDataFromXXService = function * (year) {
  try {
    return (yield axios.get(`https://s.8ddao.com/holiday-cn/${year}.json`)).data;
  } catch (error) {
    const data = yield fetchYearDataFromEasyBots(year);
    if(data.length === 0) throw new Error(`${year} no calender`);
    return data;
  }
};

const fetchYearCountFromXXService = function * (year) {
  return (yield axios.get(`https://s.8ddao.com/holiday-cn/${year}.count.json`)).data;
};

class Holiday {
  constructor ({ oss, prefix = '' } = {}) {
    this._bucket = oss ? new Bucket(oss) : null;
    this._prefix = prefix;
    this._all = {};
    this._count = {};
  }

  * all (year = new Date().getFullYear()) {
    if (this._all[year]) return this._all[year];
    const object = `${this._prefix}/holiday-cn/${year}.json`;
    try {
      const data = yield this._bucket.getObjectContent(object);
      this._all[year] = JSON.parse(data.toString());
    } catch (error) {
      this._all[year] = yield fetchYearDataFromXXService(year);
      if (this._all[year] && this._bucket) {
        yield this._bucket.putObjectWithRawData(object, JSON.stringify(this._all[year]));
      }
    }
    if(!this._all[year]) throw new Error('no calender');
    return this._all[year];
  }

  * count (year = new Date().getFullYear()) {
    if (this._count[year]) return this._count[year];
    const object = `${this._prefix}/holiday-cn/${year}.count.json`;
    try {
      const data = yield this._bucket.getObjectContent(object);
      this._count[year] = JSON.parse(data.toString());
    } catch (error) {
      try {
        this._count[year] = yield fetchYearCountFromXXService(year);
      } catch (error) {
        const all = yield this.all(year);
        this._count[year] = Object.keys(all).reduce((memo, month, index) => {
          memo.months[index] = Object.keys(all[month]).length;
          memo.total += memo.months[index];
          return memo;
        }, { total: 0, months: [] });
      }
      if (this._count[year] && this._bucket) {
        yield this._bucket.putObjectWithRawData(object, JSON.stringify(this._count[year]));
      }
    }
    if(!this._count[year]) throw new Error('no calender');
    return this._count[year];
  }

  * shouldWork (date = new Date()) {
    date = new Date(date);
    const year = date.getFullYear();
    const yearMonth = date.format('yyyyMM');
    const day = date.format('dd');
    const all = yield this.all(year);
    return !all[yearMonth][day];
  }

  * fewWorkdaysLater (day, start = new Date()) {
    start = start.beginning;
    if (day <= 0) throw new Error('day amount should be more than 1');
    for (; day > 0; start = '1 day'.after(start)) {
      if (yield this.shouldWork(start)) day -= 1;
    }
    return start;
  }
}
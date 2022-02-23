'use strict';

const fetch = require('node-fetch');

const API_KEY = require('./key.json');


function getWeather(geoid) {
  function setCondition(condition) {
    switch (condition) {
      case 'clear':
      case 'partly-cloud':
      case 'partly-cloudy': // error in the task
        return 'sunny';
      case 'cloudy':
      case 'overcast':
        return 'cloudy';
      default:
        return 'other';
    }
  }

  return fetch('https://api.weather.yandex.ru/v2/forecast?geoid=' + geoid + '&hours=false&limit=7', {
    headers: {'X-Yandex-API-Key': API_KEY.key}
  })
      .then(response => response.json())
      .catch(e => {
        throw new Error('Error in API answer' + e);
      })
      .then(ans =>
          ans['forecasts'].map(forecast => forecast['parts']['day_short']['condition'])
              .map(condition => setCondition(condition))
      )
      .catch(e => {
        throw new Error('Unknown exception ' + e);
      });
}

/**
 * @typedef {object} TripItem Город, который является частью маршрута.
 * @property {number} geoid Идентификатор города
 * @property {number} day Порядковое число дня маршрута
 */

class TripBuilder {
  constructor(geoids) {
    this.geoids = geoids;
    this.conditions = [];
    this.maxDaysInOneCity = 1e3;
  }

  /**
   * Метод, добавляющий условие наличия в маршруте
   * указанного количества солнечных дней
   * Согласно API Яндекс.Погоды, к солнечным дням
   * можно приравнять следующие значения `condition`:
   * * `clear`;
   * * `partly-cloudy`.
   * @param {number} daysCount количество дней
   * @returns {object} Объект планировщика маршрута
   */
  sunny(daysCount) {
    for (let i = 0; i < daysCount; i++) {
      this.conditions.push('sunny');
    }
    return this;
  }

  /**
   * Метод, добавляющий условие наличия в маршруте
   * указанного количества пасмурных дней
   * Согласно API Яндекс.Погоды, к солнечным дням
   * можно приравнять следующие значения `condition`:
   * * `cloudy`;
   * * `overcast`.
   * @param {number} daysCount количество дней
   * @returns {object} Объект планировщика маршрута
   */
  cloudy(daysCount) {
    for (let i = 0; i < daysCount; i++) {
      this.conditions.push('cloudy');
    }
    return this;
  }

  /**
   * Метод, добавляющий условие максимального количества дней.
   * @param {number} daysCount количество дней
   * @returns {object} Объект планировщика маршрута
   */
  max(daysCount) {
    this.maxDaysInOneCity = daysCount;
    return this;
  }

  dfs(cur, visited = [], ind = 0, count = 0) {
    if (ind === this.conditions.length) {
      let vis = visited.slice()
      vis.push(cur)
      return vis;
    }

    repeat:for (let i = 0; i < cur.next.length; i++) {
      let next = cur.next[i]
      if (next.id === cur.id) {
        if (count < this.maxDaysInOneCity) {
          let vis = visited.slice()
          vis.push(cur)
          let taskFormat = this.dfs(next, vis, ind + 1, count + 1)
          if (taskFormat !== []) {
            return taskFormat
          }
        }
      } else {
        for (let j = 0; j < visited.length; j++) {
          if (visited[j].id === next.id) {
            continue repeat
          }
        }
        let vis = visited.slice()
        vis.push(cur)
        let taskFormat = this.dfs(next, vis, ind + 1, 1)
        if (taskFormat !== []) {
          return taskFormat
        }
      }
    }
    return [];
  }


  buildTree(cities) {
    let cityDay = new Map()
    let cityLen = cities.length

    for (let i = 0; i < cityLen; i++) {
      for (let j = 0; j < cities[i].length; j++) {
        let temp = 0
        if (cities[i][j] === this.conditions[j]) temp = 1
        cities[i][j] = temp
        cityDay[i * 1000 + j] = new Cell(this.geoids[i], [])
      }
    }

    let taskFormat = []
    for (let i = 0; i < cityLen; i++) {
      if (cities[i][0] === 1) {
        taskFormat.push(cityDay[i * 1000])
      }
      for (let j = 0; j < cities[i].length; j++) {
        if (j === cities[i].length - 1) break;
        for (let k = 0; k < cityLen; k++) {
          if (cities[i][j] === 1 && cities[k][j + 1] === 1) {
            cityDay[i * 1000 + j].next
                .push(cityDay[k * 1000 + j + 1])
          }
        }
      }
    }

    return new Cell(-1, taskFormat)
  }

  /**
   * Метод, возвращающий Promise с планируемым маршрутом.
   * @returns {Promise<TripItem[]>} Список городов маршрута
   */
  build() {
    return Promise.all(this.geoids.map(id => getWeather(id))).then(cities => {
      const ans = this.dfs(this.buildTree(cities))
      const ansLen = ans.length
      if (ansLen === 0) {
        throw new Error('Не могу построить маршрут!')
      }

      const taskFormat = []
      for (let i = 1; i < ansLen; i++) {
        taskFormat.push({geoid: ans[i].id, day: i})
      }
      return taskFormat
    });
  }
}

class Cell {
  constructor(id, next) {
    this.id = id;
    this.next = next;
  }
}

/**
 * Фабрика для получения планировщика маршрута.
 * Принимает на вход список идентификаторов городов, а
 * возвращает планировщик маршрута по данным городам.
 *
 * @param {number[]} geoids Список идентификаторов городов
 * @returns {TripBuilder} Объект планировщика маршрута
 * @see https://yandex.ru/dev/xml/doc/dg/reference/regions-docpage/
 */
function planTrip(geoids) {
  return new TripBuilder(geoids);
}

module.exports = {
  planTrip
};


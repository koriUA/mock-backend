const dateFns = require("date-fns");

module.exports = {
  getActualDateArray(visualization, last24Hours) {
    switch (visualization) {
      case "BAR": {
        const arr = new Array(24).fill(1);
        const yesterday = new Date(Date.now() - 3600 * 24 * 1000);
        const mapped = arr.map((_, index) => {
          const updated = dateFns.addHours(yesterday, index);
          return {
            time: updated.valueOf(),
            value: Math.ceil(Math.random() * 100)
          };
        });

        return last24Hours
          ? mapped
          : mapped.filter(({time}) => !this.isYesterday(time));
      }
      case "LINE": {
        const arr = new Array(24 * 12).fill(1);
        const yesterday = new Date(Date.now() - 3600 * 24 * 1000);
        const mapped = arr.map((_, index) => {
          const updated = dateFns.addMinutes(yesterday, index * 5);
          return {
            time: updated.valueOf(),
            value: Math.ceil(Math.random() * 100)
          };
        });

        return last24Hours
          ? mapped
          : mapped.filter(({time}) => !this.isYesterday(time));
      }
    }
  },

  isYesterday(milliseconds) {
    const now = new Date();
    const beginOfTheDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    return beginOfTheDay.valueOf() > milliseconds;
  },

  getProjectedDateArray(visualization) {
    switch (visualization) {
      case "BAR": {
        const arr = new Array(24).fill(1);
        const today = new Date(Date.now());
        return arr.map((_, index) => {
          const updated = dateFns.addHours(today, index);
          return {
            time: updated.valueOf(),
            value: Math.ceil(Math.random() * 100)
          };
        });
      }
      case "LINE": {
        const arr = new Array(24 * 12).fill(1);
        const today = new Date(Date.now());
        return arr.map((_, index) => {
          const updated = dateFns.addMinutes(today, index * 5);
          return {
            time: updated.valueOf(),
            value: Math.ceil(Math.random() * 100)
          };
        });
      }
    }
  },

  getPercents(a, b) {
    return ((a / b) * 100).toFixed(2);
  }
}

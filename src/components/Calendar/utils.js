
import moment from "moment";

import {
  dateFormat,
} from "constants";

export const getCurrentWeek = (date) => {
  const dayStart = moment(date.format(dateFormat));
  const weekStart = dayStart.clone().startOf('isoWeek');
  let days = [];
  for (var i = 0; i <= 6; i++) {
    const beforeFormated = moment(weekStart).add(i, 'days').format("Do,dddd")
    const x = beforeFormated.split(',');
    const y = x[0].split('-');
    days.push({
      fullDay: moment(weekStart).add(i, 'days'),
      formatedDay: `${x[1]}, ${y[0]}`
    });
  }

  return days;
};

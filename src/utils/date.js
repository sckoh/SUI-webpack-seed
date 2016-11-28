export function formatDate(date) {
  if (!date) {
    return '-- --';
  }
  let temp = new Date(date)
  if (temp.getFullYear() < 1960) {
    return '－';
  }
  let month = temp.getMonth() + 1;
  let day = temp.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + 1;
  }
  return `${temp.getFullYear()}-${month}-${day}`;
}

export function getLastDay(year, month) {
  var new_year = year; //取当前的年份
  var new_month = month++; //取下一个月的第一天，方便计算（最后一天不固定）
  if (month > 12) //如果当前大于12月，则年份转到下一年
  {
    new_month -= 12; //月份减
    new_year++; //年份增
  }
  var new_date = new Date(new_year, new_month, 1); //取当年当月中的第一天
  return (new Date(new_date.getTime() - 1000 * 60 * 60 * 48)).getDate(); //获取当月最后一天日期
}

export function formatDateWithoutYear(date) {
  if (!date) {
    return '-- --';
  }
  let temp = new Date(date)
  if (temp.getFullYear() < 1960) {
    return '－';
  }
  return `${temp.getMonth()+1}月${temp.getDate()}日`;
}

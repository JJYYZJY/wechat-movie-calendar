const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('');// + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getDay = date => {
  const day = date.getDay();
  var week = 'null';
  switch(day){
    case 0:
      week = '星期日';
      break;
    case 1:
      week = '星期一';
      break;
    case 2:
      week = '星期二';
      break;
    case 3:
      week = '星期三';
      break;
    case 4:
      week = '星期四';
      break;
    case 5:
      week = '星期五';
      break;
    case 6:
      week = '星期六';
      break;
  }
  return week;
}

const formatYear = year => {
  var res = '';
  year = year.toString();
  for (var i = 0 ; i < year.length ; i++){
    res += number2uppper(year[i]);
  }
  return res;
}

const number2uppper = n => {
  switch(n){
    case '0':
      return '〇';
    case '1':
      return '一';
    case '2':
      return '二';
    case '3':
      return '三';
    case '4':
      return '四';
    case '5':
      return '五';
    case '6':
      return '六';
    case '7':
      return '七';
    case '8':
      return '八';
    case '9':
      return '九';
  }
}

const formatMonth = month => {
  switch(month){
    case 1:
      return 'Jan.';
    case 2:
      return 'Feb.';
    case 3:
      return 'Mar.';
    case 4:
      return 'Apr.';
    case 5:
      return 'May.';
    case 6:
      return 'June.';
    case 7:
      return 'July.';
    case 8:
      return 'Aug.';
    case 9:
      return 'Sept.';
    case 10:
      return 'Oct.';
    case 11:
      return 'Nov.';
    case 12:
      return 'Dec.';
  }
  return month+'月';
}

const formatWeek = day => {
  switch (day) {
    case 0:
      return 'Sun.';
    case 1:
      return 'Mon.';
    case 2:
      return 'Tues.';
    case 3:
      return 'Wed.';
    case 4:
      return 'Thur.';
    case 5:
      return 'Fri.';
    case 6:
      return 'Sat.';
  }
  return day;
}

const innerDate = (task,_date) => {
  task._year = formatYear(_date.getFullYear());
  task._month = formatMonth(_date.getMonth()+1);
  task._week = formatWeek(_date.getDay());
  task._day = _date.getDate();
}

module.exports = {
  formatTime: formatTime,
  innerDate: innerDate
}

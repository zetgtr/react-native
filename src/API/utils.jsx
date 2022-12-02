export function date(dateStamp, endDate = false) {
  let month = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  let dateSecond = convertDate(dateStamp);
  if (endDate) {
    if (new Date() > dateSecond) {
      return true;
    } else {
      return false;
    }
  } else if (new Date().getDate() == dateSecond.getDate()) {
    return (
      "Сегодня, " +
      ("0" + dateSecond.getHours()).slice(-2) +
      ":" +
      ("0" + dateSecond.getMinutes()).slice(-2)
    );
  } else if (new Date().getDate() + 1 == dateSecond.getDate()) {
    return (
      "Завтра, " +
      ("0" + dateSecond.getHours()).slice(-2) +
      ":" +
      ("0" + dateSecond.getMinutes()).slice(-2)
    );
  } else {
    return (
      dateSecond.getDate() +
      " " +
      month[dateSecond.getMonth()] +
      " " +
      dateSecond.getFullYear() +
      " г., " +
      ("0" + dateSecond.getHours()).slice(-2) +
      ":" +
      ("0" + dateSecond.getMinutes()).slice(-2)
    );
  }
}

function convertDate(dateStamp) {
  let date = Number(dateStamp + "000");
  return new Date(new Date(date).setHours(new Date(date).getHours()));
}

export const dateTime = (dateStamp) => {
  let dateSecond = convertDate(dateStamp);
  return (
    ("0" + dateSecond.getHours()).slice(-2) +
    ":" +
    ("0" + dateSecond.getMinutes()).slice(-2)
  );
};

export const removeTags = (html) => {
  return html
    ?.replace(/<(?!br\s*\/?)[^>]+>/g, "")
    .split("<br />")
    .join("\n");
};

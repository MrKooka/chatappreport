export function hm (arg){
  const timestamp = arg-28800;
  // Создаем объект даты из временной метки
  const date = new Date(timestamp * 1000);
  // Получаем смещение часового пояса в минутах и конвертируем его в миллисекунды
  const timezoneOffset = date.getTimezoneOffset() * 60000;
  // Создаем новую дату, скорректированную на часовой пояс GMT-8
  const dateInGMT8 = new Date(date.getTime() + timezoneOffset - (8 * 3600000));
  // Форматируем часы и минуты
  const hours = dateInGMT8.getUTCHours().toString().padStart(2, '0');
  const minutes = dateInGMT8.getUTCMinutes().toString().padStart(2, '0');
  // Собираем форматированное время
  const timeStr = `${hours}:${minutes}`;
  return timeStr

}

export function getDelta(start_date, end_event_time) {
  if (end_event_time) {
    // Вычислить разницу во времени в секундах
    const deltaSeconds = end_event_time - start_date;

    // Если разница меньше минуты, возвращаем секунды
    if (deltaSeconds < 60) {
      return `${deltaSeconds} seconds`;
    }

    // Преобразовать секунды в часы, минуты и секунды
    const deltaHours = Math.floor(deltaSeconds / 3600);
    const deltaMinutes = Math.floor((deltaSeconds % 3600) / 60);
    const remainingSeconds = deltaSeconds % 60;

    // Формируем строку, отображающую разницу во времени
    const formattedDelta = [
      deltaHours.toString().padStart(2, '0'),
      deltaMinutes.toString().padStart(2, '0'),
      remainingSeconds.toString().padStart(2, '0'),
    ].join(':');

    return formattedDelta;
  } else {
    return '...'; // Или другое значение по умолчанию, если конечное время не указано
  }
}


export function formatDate(timestamp) {
  const date = new Date(timestamp * 1000); // Создаем объект даты из временной метки в миллисекундах
  const day = date.getDate().toString().padStart(2, '0'); // Получаем день и добавляем ведущий ноль, если нужно
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Получаем месяц, прибавляем 1, т.к. месяцы начинаются с 0
  const year = date.getFullYear(); // Получаем год
  return `${day}.${month}.${year}`; // Возвращаем строку в формате день.месяц.год
}


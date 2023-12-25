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

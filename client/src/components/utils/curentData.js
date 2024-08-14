import { format } from 'date-fns';

export function currentDate() {
  // Получаем текущую дату
  const currentDate = new Date();

  // Форматируем дату с использованием date-fns
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  // Выводим результат
  return formattedDate
}


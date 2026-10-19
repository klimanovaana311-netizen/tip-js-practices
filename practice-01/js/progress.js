"use strict";

const totalTasks = -1;
const completedTasks = 0;

const isTotalValid =
  Number.isInteger(totalTasks) && totalTasks >= 0 && totalTasks <= 1000;

const isCompletedValid =
  Number.isInteger(completedTasks) &&
  completedTasks >= 0 &&
  completedTasks <= 1000;

if (!isTotalValid || !isCompletedValid) {
  console.log("Ошибка: количество задач должно быть целым числом от 0 до 1000.");
} else if (completedTasks > totalTasks) {
  console.log("Ошибка: выполненных задач больше, чем всего.");
} else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remainingTasks = totalTasks - completedTasks;
  const percentage = (completedTasks / totalTasks) * 100;

  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remainingTasks}`);
  console.log(`Прогресс: ${percentage.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
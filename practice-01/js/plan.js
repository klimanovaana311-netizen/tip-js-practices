"use strict";

const totalTasks = 12;
const completedTasks = 5;
const dailyLimit = 3;

const isTotalValid =
  Number.isInteger(totalTasks) && totalTasks >= 0 && totalTasks <= 1000;

const isCompletedValid =
  Number.isInteger(completedTasks) &&
  completedTasks >= 0 &&
  completedTasks <= 1000;

const isLimitValid =
  Number.isInteger(dailyLimit) && dailyLimit >= 1 && dailyLimit <= 1000;

if (!isTotalValid || !isCompletedValid) {
  console.log("Ошибка: количество задач должно быть целым числом от 0 до 1000.");
} else if (completedTasks > totalTasks) {
  console.log("Ошибка: выполненных задач больше, чем всего.");
} else if (!isLimitValid) {
  console.log("Ошибка: дневная норма должна быть целым числом от 1 до 1000.");
} else {
  let remaining = totalTasks - completedTasks;
  console.log(`Осталось задач: ${remaining}`);

  if (remaining === 0) {
    console.log("Все задачи уже выполнены.");
    console.log("Потребуется дней: 0");
  } else {
    let day = 0;

    while (remaining > 0) {
      day += 1;
      const doneToday = Math.min(dailyLimit, remaining);
      remaining -= doneToday;
      console.log(`День ${day}: выполнено ${doneToday}, осталось ${remaining}`);
    }

    console.log(`Потребуется дней: ${day}`);
  }
}
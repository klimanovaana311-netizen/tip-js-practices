import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  findTaskById, 
  getPendingTasks, 
  getTaskTitles, 
  getTaskStats,
  addTask, 
  setTaskCompleted, 
  renameTask, 
  removeTask,
} from "./task-service.js";

function printStats(tasks) {
  const stats = getTaskStats(tasks);
  console.log(`Всего: ${stats.total}; выполнено: ${stats.completed}; осталось: ${stats.pending}`);
  if (stats.total === 0) console.log("Задач пока нет");
  else console.log(`Прогресс: ${stats.progress.toFixed(1)}%`);
}

console.log("=== ОБЩИЙ СЦЕНАРИЙ ===");
let currentTasks = demoTasks;
printStats(currentTasks);

let res = addTask(currentTasks, 20, "Добавить проверку", "high");
if (res.ok) currentTasks = res.tasks;
console.log("\nДобавление id=20:"); printStats(currentTasks);

res = setTaskCompleted(currentTasks, 4, true);
if (res.ok) currentTasks = res.tasks;
console.log("\nВыполнение id=4:"); printStats(currentTasks);

res = renameTask(currentTasks, 10, "Подготовить инструкцию запуска");
if (res.ok) currentTasks = res.tasks;
console.log("\nПереименование id=10:"); printStats(currentTasks);

res = removeTask(currentTasks, 7);
if (res.ok) currentTasks = res.tasks;
console.log("\nУдаление id=7:"); printStats(currentTasks);
console.log("Итоговые ID:", currentTasks.map(t => t.id));

console.log("\nПопытка добавить дубль id=20:");
const errRes = addTask(currentTasks, 20, "Дубль");
console.log(errRes.ok ? "Успех" : `Ошибка: ${errRes.error}`);

console.log("\nПроверка неизменности demoTasks (должно быть 4):", demoTasks.length);


console.log("\n\n=== ИНДИВИДУАЛЬНЫЙ ВАРИАНТ (№ " + variantNumber + ") ===");
let vTasks = variantTasks;
printStats(vTasks);

res = addTask(vTasks, 80, "Новая задача варианта", "high");
if (res.ok) vTasks = res.tasks;
console.log("\nДобавление id=80:"); printStats(vTasks);

res = setTaskCompleted(vTasks, 11, true);
if (res.ok) vTasks = res.tasks;
console.log("\nВыполнение id=11:"); printStats(vTasks);

res = renameTask(vTasks, 23, "Обновленный план");
if (res.ok) vTasks = res.tasks;
console.log("\nПереименование id=23:"); printStats(vTasks);

res = removeTask(vTasks, 37);
if (res.ok) vTasks = res.tasks;
console.log("\nУдаление id=37:"); printStats(vTasks);

const vErr = addTask(vTasks, 80, "Дубль варианта");
console.log("\nПопытка повторно добавить id=80:");
console.log(vErr.ok ? "Успех" : `Ошибка: ${vErr.error}`);
console.log("Проверка неизменности variantTasks (должно быть 6):", variantTasks.length);
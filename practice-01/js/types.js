"use strict";

console.log('--- 1. "8" + 2 ---');
const r1 = "8" + 2;
console.log("Значение:", r1, "| Тип:", typeof r1);

console.log('--- 2. "8" - 2 ---');
const r2 = "8" - 2;
console.log("Значение:", r2, "| Тип:", typeof r2);

console.log('--- 3. Number("8") + 2 ---');
const r3 = Number("8") + 2;
console.log("Значение:", r3, "| Тип:", typeof r3);

console.log('--- 4. "12" > "3" ---');
const r4 = "12" > "3";
console.log("Значение:", r4, "| Тип:", typeof r4);

console.log('--- 5. 12 === "12" ---');
const r5 = 12 === "12";
console.log("Значение:", r5, "| Тип:", typeof r5);

console.log('--- 6. Number("") ---');
const r6 = Number("");
console.log("Значение:", r6, "| Тип:", typeof r6);

console.log('--- 7. Number("text") ---');
const r7 = Number("text");
console.log("Значение:", r7, "| Тип:", typeof r7);

console.log('--- 8. Boolean("false") ---');
const r8 = Boolean("false");
console.log("Значение:", r8, "| Тип:", typeof r8);

console.log('--- 9. typeof null ---');
const r9 = typeof null;
console.log("Значение:", r9, "| Тип результата:", typeof r9);

console.log('--- 10. typeof NaN ---');
const r10 = typeof NaN;
console.log("Значение:", r10, "| Тип результата:", typeof r10);
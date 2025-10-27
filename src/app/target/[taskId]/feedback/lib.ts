export function convertAnswersToGrade(answers: Array<number>) {
  if (!Array.isArray(answers)) {
    throw new Error('Input must be an array');
  }

  const count = answers.length;
  if (count === 0) return null;

  // Валидация ответов
  for (const ans of answers) {
    const num = Number(ans);
    if (isNaN(num) || num < 0 || num > 10 || !Number.isInteger(num)) {
      throw new Error(`Invalid answer: ${ans}. Must be integer 0–10.`);
    }
  }

  const total = answers.reduce((a, b) => a + b, 0);
  const max = count * 10;

  // Специальные случаи: 2 и 3 вопроса — по вашим таблицам
  if (count === 2) {
    if (total <= 7) return 1;
    if (total <= 12) return 2;
    if (total <= 20) return 3;
  } else if (count === 3) {
    if (total <= 10) return 1;
    if (total <= 20) return 2;
    if (total <= 30) return 3;
  } else {
    // Общий случай: используем доли с округлением вниз для порогов
    const threshold1 = Math.floor(max / 3);       // ≤ this → 1
    const threshold2 = Math.floor((2 * max) / 3); // ≤ this → 2

    if (total <= threshold1) return 1;
    if (total <= threshold2) return 2;
    return 3;
  }

  // Если сумма вышла за пределы (например, 25 при 2 вопросах)
  // TODO добавить проверку ?
  return 0;
}


function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

// получим сумму только числовых значений
export function defineScore(data: Record<string, string | number>) {
  const answers: number[] = Object.values(data).filter(isFiniteNumber)
  return convertAnswersToGrade(answers)
  // let sum = 0
  // let count = 0
  //   for ( let i of Object.values(data)){
  //     if ( Number.isFinite(i) ){
  //       // @ts-ignore
  //       sum += i
  //       count += 1
  //     }
  //   }
  // const res = Math.round(sum / count)
  // return res
}

import { decode } from 'html-entities';
export function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const decodeData = (data) => {
  //const entities = new Html5Entities();
  const correct_answer = decode(data.correct_answer);
  const incorrect_answers = Array.isArray(data.incorrect_answers) ?
    data.incorrect_answers.map((item) => decode(item)) : decode(data.incorrect_answers);
  const question = decode(data.question);
  const category = decode(data.category)

  return { ...data, correct_answer, incorrect_answers, question, category }
}

export const isEmpty = (val) => {

  return val === '' || val === undefined || val === null;
}
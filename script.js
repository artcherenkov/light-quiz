const questions = document.querySelector('.questions');
const questionTemplate = document.querySelector('#question').content;
const answerTemplate = document.querySelector('#question__answer').content.querySelector('.question__answer');

const QUESTIONS = [
  {
    id: 1,
    title: `Самый крупный остров РФ – Сахалин – долгое время считался полуостровом. То, что объект отделен от материка проливом, было доказано экспедицией адмирала Геннадия Невельского только в:`,
    answers: [`1749 году`, `1849 году`, `1949 году`],
    correctAnswer: `1849 году`,
  },
  {
    id: 2,
    title: `Дракулу убили осиновым колом в сердце`,
    answers: [`Правда`, `Вымысел`],
    correctAnswer: `Вымысел`,
  },
  {
    id: 3,
    title: `Одним из наиболее вероятных прототипов Карениной считается:`,
    answers: [`Мария Гартунг – старшая дочь Александра Пушкина`, `Варвара Тургенева – мать Ивана Тургенева`, `Софья Толстая – супруга Льва Толстого`],
    correctAnswer: `Мария Гартунг – старшая дочь Александра Пушкина`,
  },
  {
    id: 4,
    title: `Из перечисленных событий первой началась:`,
    answers: [`Блокада Ленинграда`, `Битва за Москву`, `Оборона Севастополя`],
    correctAnswer: `Блокада Ленинграда`,
  },
  {
    id: 5,
    title: `В управлении МЧС по Кабардино-Балкарии выставлена уникальная коллекция:`,
    answers: [`вещей, оставленных туристами на вершине Эльбруса`, `моделек пожарных машин`, `устаревшего противолавинного оборудования`, `гербарии всех климатических зон республики`],
    correctAnswer: `моделек пожарных машин`,
  },
  {
    id: 6,
    title: `В этой номинации женщина-лауреат была только один раз.`,
    answers: [`Физика`, `Медицина`, `Экономика`],
    correctAnswer: `Экономика`,
  },
]

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  const questionElement = evt.target.closest('.question');
  questionElement.classList.remove(`question_success`, `question_fail`);

  const questionId = evt.target.dataset.questionId;
  const question = QUESTIONS.find((question) => String(question.id) === String(questionId));

  const formData = new FormData(evt.target);
  const answer = formData.get('answer');

  if (answer === question.correctAnswer) {
    evt.target.closest('.question').classList.add(`question_success`);
  } else {
    evt.target.closest('.question').classList.add(`question_fail`);
  }
}

const renderQuestions = () => {
  const questionsFragment = document.createDocumentFragment();
  QUESTIONS.map((question, questionIndex) => {
    const questionElement = questionTemplate.querySelector('.question').cloneNode(true);

    questionElement.querySelector('.question__form').name = `q${questionIndex}`;
    questionElement.querySelector('.question__form').dataset.questionId = question.id;

    questionElement.querySelector('.question__title').textContent = question.title;

    const answersElement = questionElement.querySelector('.question__answers');

    question.answers.map((answer, answerIndex) => {
      const answerElement = answerTemplate.cloneNode(true);
      const id = `q${questionIndex}a${answerIndex}`;
      answerElement.querySelector('.question__input').id = id;
      answerElement.querySelector('.question__input').value = answer;
      answerElement.querySelector('.question__label').setAttribute(`for`, id);
      answerElement.querySelector('.question__label').textContent = answer;

      answersElement.append(answerElement);
    })

    questionElement.querySelector('.question__form').addEventListener(`submit`, handleFormSubmit);

    questionsFragment.append(questionElement);
  });
  questions.append(questionsFragment);
}

renderQuestions();

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();

const options = [...document.querySelectorAll('#quizOptions button')];
const feedback = document.getElementById('quizFeedback');
const reset = document.getElementById('resetQuiz');
options.forEach(button => button.addEventListener('click', () => {
  options.forEach(item => item.disabled = true);
  if (button.dataset.answer === '10') {
    button.classList.add('correct');
    feedback.textContent = 'Hebat! 🎉 Benar, Dasa Dharma Pramuka terdiri dari 10 butir. Salam Pramuka!';
  } else {
    button.classList.add('wrong');
    options.find(item => item.dataset.answer === '10').classList.add('correct');
    feedback.textContent = 'Hampir! 😊 Jawaban yang benar adalah 10 butir. Yuk, hafalkan dan amalkan!';
  }
  reset.hidden = false;
}));
reset.addEventListener('click', () => {
  options.forEach(item => { item.disabled = false; item.classList.remove('correct', 'wrong'); });
  feedback.textContent = 'Pilih satu jawaban. Jangan lupa, Pramuka selalu siap!';
  reset.hidden = true;
});
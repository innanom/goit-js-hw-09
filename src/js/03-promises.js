import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')

formEl.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
  event.preventDefault();
  let delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);
  const amount = Number(formEl.elements.amount.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay) 
    .then(result => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(error => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`))
    delay +=step
  }
  formEl.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
    
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

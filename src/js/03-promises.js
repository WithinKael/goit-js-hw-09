const formEl = document.querySelector('.form');

const onFormSubmit = event => {
  event.preventDefault();
  const amount = +event.target.elements.amount.value;
  const step = +event.target.elements.step.value;
  let delay = +event.target.elements.delay.value;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay + (step * (i - 1)))
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
};



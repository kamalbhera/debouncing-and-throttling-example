const input = document.querySelector('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

// For every input type

var updateDebounceText = debounce((text) => {
  debounceText.textContent = text;
}, 1000);

var updateThrottleText = throttle((text) => {
  throttleText.textContent = text;
}, 1000);

input.addEventListener('input', (e) => {
  defaultText.textContent = e.target.value;
  updateDebounceText(e.target.value);
  updateThrottleText(e.target.value);
});

function debounce(cb, delay = 1000) {
  let timer;
  return (...args) => {
    if (timer) clearInterval(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  let timerFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null
    setTimeout( timerFunc,delay);
    }
  }
  return (...args) => {
    if (shouldWait) {
      waitingArgs = args; // when the function is waiting which is of delay time, we are setting the args of the last call
      return;
    }
    cb(...args);
    shouldWait = true;
    setTimeout( timerFunc,delay);
  };
}

// For every mouse movement

const updateDebounceText = debounce(() => {
  incrementCount(debounceText)
})
const updateThrottleText = throttle(() => {
  incrementCount(throttleText)
}, 100)

document.addEventListener("mousemove", e => {
  incrementCount(defaultText)
  updateDebounceText()
  updateThrottleText()
})

function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1
}


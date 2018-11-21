
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
export const debounced = function (fn, delay) {
  let timerId;
  return function (...args) {
    //Simple hack to avoid loosing the event, if it is an event handler.
    if(args[0].persist)
      args[0].persist();
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}

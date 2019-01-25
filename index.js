var useState = require("react").useState;

function updateState(data, target) {
  if (typeof data !== "object") target[1](data);
  // if the data is like {user: 1, something: 2} then we have to go deep of course
  else
    Object.keys(data).forEach(key =>
      // we store the actual useState / nested objects in __val__ like property
      updateState(data[key], target[`__${key}__`])
    );
}

function createState(data, key, final = {}) {
  const modKey = `__${key}__`,
    isObject = typeof data === "object",
    val = data[key];

  Object.defineProperties(final, {
    [modKey]: {
      value: isObject ? val : useState(val),
      writable: true
    },
    [key]: {
      get() {
        return isObject ? this[modKey] : this[modKey][0];
      },
      set(e) {
        isObject ? updateState(e, this[modKey]) : this[modKey][1](e);
      }
    }
  });

  // go for the nested objects
  if (isObject)
    for (const i in data[key]) createState(data[key], i, final[modKey]);
}

module.exports = function mutableState(init, final = {}) {
  Object.keys(init).forEach(key => {
    // add getters and setters to all the properties
    createState(init, key, final);
  });

  return final;
};

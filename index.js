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
  /**
   * add underscore to the original key that was passed -> __originalKeyThatWasPassed__
   */
  const newKey = `__${key}__`,
    /**
     * is the property we have an object or just a plain old value
     * so the structure of data variable could be -> ```data = {shoe: {size:0}}```
     * and `key` here could be the `shoe`
     */
    isObject = typeof data[key] === "object",
    val = data[key];

  Object.defineProperties(final, {
    /**
     * we store the orginal value from`{key:value}` as a state
     */
    [newKey]: {
      value: isObject ? val : useState(val),
      writable: true
    },

    /**
     * but we keep the original key here
     * so that we can get and set the value using the same key they passed in
     * this way it'll feel like we are getting and setting the same key:value we passed in
     * like this ->
     * ```js
     * const state = mutableState({
     *  shoe: {
     *   size: 0
     *  }
     * })
     *
     * // update the shoe size
     * state.shoe.size = 1;
     * state.shoe.size += 1;
     * state.shoe = { size: 1 };
     *
     * ```
     */
    [key]: {
      get() {
        return isObject ? this[newKey] : this[newKey][0];
      },
      set(e) {
        isObject ? updateState(e, this[newKey]) : this[newKey][1](e);
      }
    }
  });

  // go for the nested objects
  if (isObject)
    for (const i in data[key]) createState(data[key], i, final[newKey]);
}

module.exports = function mutableState(init, final = {}) {
  Object.keys(init).forEach(key => {
    // add getters and setters to all the properties
    createState(init, key, final);
  });

  return final;
}

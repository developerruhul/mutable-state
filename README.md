# [Mutable State](https://github.com/iamruhul/mutable-state)

[![npm (scoped)](https://img.shields.io/bundlephobia/min/mutable-state.svg)](https://www.npmjs.com/package/mutable-state)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/minzip/mutable-state.svg)](https://www.npmjs.com/package/mutable-state)
[![npm version](https://img.shields.io/npm/v/mutable-state.svg)](https://www.npmjs.com/package/mutable-state)

Update reactjs state just like you update a literal object.. literally mutable-state

## Requirements

You need react hooks to use this library which is not available in the current stable build 16.7.0. You may need to install the alpha version of reactjs and reactDOM

## Installation

```
$ npm install mutable-state

OR Yarn

$ yarn add mutable-state
```

## Usage

```jsx
import React from "react";
import useMutableState from "mutable-state";

export default function() {
  // just pass in the state
  let state = useMutableState({
    shoe: {
      count: 0,
      alsoArray: [["name", "ruhul"], ["multiDimensional", true]],
      deep: {
        veryDeep: true
      }
    },
    penCount: 1
  });

  // WAYS TO UPDATE THE STATE
  const way1 = () => (state.shoe.count += 1);
  const way2 = () => (state = { shoe: { count: state.shoe.count - 1 } }); // it's cool right? (:

  const way3 = () => (state.penCount += 1);

  return (
    <div>
      <h1>shoe size: {state.shoe.count}</h1>
      <button onClick={() => (state.shoe.count += 1)}>Increment</button>
    </div>
  );
}
```

### **NOTCE :** Using ES6+ destructuring you can only `get` the value, you can't `set` it, as this is the standard behaviour.

```js
const { size } = useMutableState({ size: 0 });
// YOU CAN DO THIS
size; //=> 0

// BUT NOT THIS ->
size = 2; // NOPE .... THE STATE ISN'T UPDATED BCZ DESTRUCTURING ONLY COPIES THE `VALUE` NOT THE `SETTER`

// BUT YOU CAN DO THIS
const { shoe } = useMutableState({
  shoe: {
    size: 0
  }
});

shoe.size = 12; // YUP

// SAD BUT THAT'S HOW IT'S IMPLEMENTED IN ALL THE BROWSERS
```

#### Please ⭐ the project and share it so people can benefit from this
https://github.com/iamruhul/mutable-state
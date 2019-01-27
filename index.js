var useState = require("react").useState;
var observe = require("observable-slim");

module.exports = function(init) {
  const __state__ = useState(init);

  const draft = __state__[0];

  var state = observe.create(draft, false, function() {
    __state__[1](draft);
  });

  return state;
};

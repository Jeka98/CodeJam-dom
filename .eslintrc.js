module.exports = {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  },
  "rules": {
    "no-restricted-globals": [
      "error",
      {
        "name": "event",
        "message": "Use local parameter instead."
      }
    ]
  }
};

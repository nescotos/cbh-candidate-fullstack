
// This works around the fact we use ES named exports for styles, e.g.:
// import * as styles from './styles.scss'.
// https://github.com/keyanzhang/identity-obj-proxy/issues/8
module.exports = new Proxy(
  {},
  {
    get: function getter(target, key) {
      if (key === '__esModule') {
        // True instead of false to pretend we're an ES module.
        return true;
      }
      return key;
    },
  },
);

// Reference: https://github.com/keyz/identity-obj-proxy/issues/8#issuecomment-430241345
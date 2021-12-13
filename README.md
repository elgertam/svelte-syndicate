# Svelte-Syndicate

A [Svelte](https://svelte.dev) preprocessor for the JavaScript and TypeScript flavors of the [Syndicate language](https://syndicate-lang.org)

## Usage

Add into your Svelte project's configuration.

E.g.:

```javascript
// svelte.config.js
import preprocess from 'svelte-syndicate';

const config = {
  preprocess: preprocess({
    // ...svelte-syndicate compiler options
  }),
  // ...other svelte options
};

export default config;
```

Note, if you're using typescript (and we think you should!), you'll need to configure typescript compilation separately, probably through [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess).

## TODO

- [ ] Beef up the tests
- [ ] Add a module for treating Syndicate as a Svelte store (if technically feasible & semantically valid)

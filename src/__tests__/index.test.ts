import { preprocess } from '../index';
import * as svelte from 'svelte/compiler';

/**
 * FIXME: This is a work in progress!
 *
 * TODO: Test examples from Syndicate project as tests
 * TODO: Test integration w/ `tsc` compilation
 * TODO: Factor out svelte boilerplate code as called from e.g. rollup
 * TODO: Test expected failures for the various Syndicate compiler errors
 * TODO: Test sourcemaps incl. integrated w/ `tsc` & other preprocessors
 * TODO: Test various oddities in markup, style & script tag
 * TODO: Test integration w/ svelte-kit, rollup & webpack
 * TODO: Test a real Syndicate example & svelte-kit end-to-end
 * TODO: Check for compatibility errors between Svelte's required interface
 *       (i.e. PreprocessorGroup) and Syndicate's provided one
 *       (i.e. compile(), CompileOptions, ModuleType, SourceMap and ErrorSink)
 * TODO: Test for warnings when typescript options contradict
 **/

describe("Syndicate compiles properly", () => {
  it('should compile Syndicate/TS code within a Svelte script', () => {
    const template = `
<script lang="syndicate/ts">
let a: () => number = () => 1;
</script>

<h1>Hello, world!</h1>

<p>Today is brought to you by the number {a()}</p>
`;
    // expect(true).toBeTruthy();
    const preprocessor = preprocess();
    svelte.preprocess(template, preprocessor, {
      filename: 'src/Foo.svelte'
    }).catch((err) => {
      console.log(err);
    }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

  it('should compile Syndicate/JS code within a Svelte script', () => {
    const template = `
<script lang="syndicate/js">
let a = () => 1;
</script>

<h1>Hello, world!</h1>

<p>Today is brought to you by the number {a()}</p>
`;
    // expect(true).toBeTruthy();
    const preprocessor = preprocess({});
    svelte.preprocess(template, preprocessor, {
      filename: 'src/Foo.svelte'
    }).catch((err) => {
      console.log(err);
    }).then((res) => {
      expect(res).toBeTruthy();
    });
  });

});

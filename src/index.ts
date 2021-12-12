import type { CompileOptions } from '@syndicate-lang/compiler';
import type { ErrorSink } from '@syndicate-lang/compiler/lib/compiler/codegen';

import * as svelte from 'svelte/compiler';
import { compile as syndicateCompile } from '@syndicate-lang/compiler';

export default async function preprocess(source: string) {
  const { code } = await svelte.preprocess(source, {
    script: ({content, attributes}) => {
      const errSink: ErrorSink = (message, start, end) => {
        console.log(message, start, end);
      };

      let typescript: boolean;

      if (attributes.lang === 'syndicate/js') {
        typescript = false;
      } else if (attributes.lang === 'syndicate/ts') {
        typescript = true;
      } else {
        // nothing to do here
        return;
      }

      const opts: CompileOptions = {
        source: content,
        typescript,
        emitError: errSink,
      };

      const build = syndicateCompile(opts);

      return {
        code: build.text,
        map: build.map.mappings,
      }
    }
  });
  return code;
}

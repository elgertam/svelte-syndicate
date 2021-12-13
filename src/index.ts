import type { CompileOptions } from '@syndicate-lang/compiler';
import type { ErrorSink, ModuleType } from '@syndicate-lang/compiler/lib/compiler/codegen';
import type { PreprocessorGroup } from 'svelte/types/compiler/preprocess';

import { compile as syndicateCompile } from '@syndicate-lang/compiler';

export interface SyndicatePreprocessOptions {
  runtime?: string,
  module?: ModuleType,
  global?: string,
  typescript?: boolean,
  emitError?: ErrorSink,
};

export function preprocess(options?: SyndicatePreprocessOptions): PreprocessorGroup {
  return {
    script: ({content, attributes, filename}) => {
      if (typeof attributes.lang === 'boolean') {
        //nothing to do here
        return;
      }

      const lang = (attributes.lang ?? '').toLowerCase();
      if (!lang.includes('syndicate')) {
        //nothing to do here
        return;
      }

      let typescript: boolean = false;
      if (lang.includes('ts')) {
        typescript = true;
      }

      const defaultOptions: CompileOptions = {
        source: content,
        name: filename,
        typescript,
        emitError(message, start, end) {
          console.log(message, start, end);
        },
      };

      const fullOpts: CompileOptions = { ...defaultOptions, ...(options ?? {})};

      const { text, map } = syndicateCompile(fullOpts);

      const code = '\n' + text;

      return { code, map };
    }
  }
};

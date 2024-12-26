import { SnapshotSerializer } from 'vitest';

const serializer: SnapshotSerializer = {
  serialize(val, config, indentation, depth, refs, printer) {
    for (const className of [...val.classList]) {
      if (className.startsWith('css-')) {
        const hashEnd = className.indexOf('-', 4);
        if (hashEnd >= 0) {
          val.classList.replace(className, 'makeStyles' + className.substring(hashEnd));
        } else {
          val.classList.remove(className);
        }
      }
    }
    if (!val.classList.length) {
      val.removeAttribute('class');
    }
    return printer(val, config, indentation, depth, refs);
  },
  test(val) {
    return val instanceof Element && [...val.classList].some((name) => name.startsWith('css-'));
  },
};

/**
 * An object snapshot serializer that removes dynamic CSS classes (generated by makeStyle) from DOM elements.
 *
 * `css-hash-suffix` is transformed into `makeStyles-suffix`
 * `css-hash` is removed
 */
export default serializer;
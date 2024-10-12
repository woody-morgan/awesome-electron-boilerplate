import { A, D, O, S, pipe } from '@mobily/ts-belt';
import { Injectable } from '@nestjs/common';
import { P, match } from 'ts-pattern';

@Injectable()
export class StringService {
  constructor() {}

  async replaceSpecificStringFromObject(
    objectFile: object,
    target: string,
    replace: string,
  ): Promise<object> {
    const replaceString = (obj: unknown, target: string, replace: string): unknown => {
      return match(obj)
        .with(P.array(P.any), (arr) => A.map(arr, (item) => replaceString(item, target, replace)))
        .with(
          P.when((val): val is Record<string, unknown> => val !== null && typeof val === 'object'),
          (obj) => D.map(obj, (value) => replaceString(value, target, replace)),
        )
        .with(P.string, (str) => str.replace(new RegExp(target, 'g'), replace))
        .otherwise((value) => value);
    };

    const result = replaceString(objectFile, target, replace);
    if (typeof result === 'object' && result !== null) {
      return result;
    }
    throw new Error('Result is not an object');
  }

  public parseFileNameFromPath(path: string, showExtension?: boolean): O.Option<string> {
    return pipe(
      path,
      S.split('/'),
      A.last,
      O.fromNullable,
      O.flatMap((fileName) =>
        match(showExtension)
          .with(true, () => fileName)
          .with(false, P.nullish, () => pipe(fileName, S.split('.'), A.head))
          .exhaustive(),
      ),
    );
  }
}

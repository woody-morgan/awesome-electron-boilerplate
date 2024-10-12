import { G, O, pipe } from '@mobily/ts-belt';
import { VariantProps, cva } from 'class-variance-authority';
import qs from 'qs';
import { Ref, forwardRef, useMemo } from 'react';
import { Link, Path, useSearchParams } from 'react-router-dom';
import { P, match } from 'ts-pattern';

import { cn } from '@/lib/utils';
import { InferRefFromExoticRefComponent, PropsFromWithoutRef } from '@/types/react-typescript';
import { AccessibleRoute } from '@/types/route';

const linkVariants = cva([], {
  variants: {
    block: {
      true: 'block',
      false: '',
    },
    underline: {
      true: 'underline hover:decoration-2',
      false: '',
    },
  },
  defaultVariants: {
    block: false,
  },
});

export type TypedTo =
  | AccessibleRoute
  | Partial<
      Omit<Path, 'pathname'> & {
        pathname: AccessibleRoute;
      }
    >;

type LinkElement = InferRefFromExoticRefComponent<typeof Link>;
type LinkProps = Omit<PropsFromWithoutRef<typeof Link>, 'to'> & {
  href: TypedTo;
  preserveQuery?: boolean;
} & VariantProps<typeof linkVariants>;

const Component = (props: LinkProps, forwardedRef: Ref<LinkElement>) => {
  const [prevSearch] = useSearchParams();
  const { href, preserveQuery, block, underline, className, ...rest } = props;

  const nextTo = useMemo(
    () =>
      match([href, preserveQuery])
        .with([P.any, P.nullish], [P.any, false], ([to]) => to)
        .with([P.when(G.isString), true], ([to]) => ({
          pathname: to,
          search: prevSearch.toString(),
        }))
        .with([P.when(G.isObject), true], ([to]) => {
          const { pathname, search: injectedParams } = to;
          const nextSearch = pipe(
            injectedParams,
            O.fromNullable,
            O.match(
              (value) =>
                qs.stringify({
                  ...prevSearch,
                  value,
                }),
              () => prevSearch.toString(),
            ),
          );
          return {
            pathname,
            search: nextSearch,
          };
        })
        .exhaustive(),
    [href, preserveQuery, prevSearch],
  );

  return (
    <Link
      {...rest}
      to={nextTo}
      ref={forwardedRef}
      className={cn(linkVariants({ block, underline }), className)}
    />
  );
};

const ForwardedTypedLink = forwardRef(Component);

export const TypedLink = ForwardedTypedLink;

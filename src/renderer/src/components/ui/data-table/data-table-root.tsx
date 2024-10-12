import { ComponentPropsWithoutRef, FC } from 'react';

import { Table } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type DataTableRootProps = ComponentPropsWithoutRef<typeof Table>;

export const DataTableRoot: FC<DataTableRootProps> = ({ className, ...props }) => {
  return <Table className={cn(className)} {...props} />;
};

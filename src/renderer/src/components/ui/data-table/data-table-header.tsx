import { Table, flexRender } from '@tanstack/react-table';
import { ComponentPropsWithoutRef } from 'react';

import { TableHead, TableHeader, TableRow } from '../table';

export type DataTableHeaderProps<TData> = {
  table: Table<TData>;
} & ComponentPropsWithoutRef<typeof TableHeader>;

export const DataTableHeader = <TData,>({ table, ...props }: DataTableHeaderProps<TData>) => {
  return (
    <TableHeader {...props}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

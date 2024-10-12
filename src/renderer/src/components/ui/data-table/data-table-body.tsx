import { ColumnDef, Row, Table, flexRender } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export interface DataTableBodyProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];

  table: Table<TData>;
  errorFallback?: React.ReactNode;
  onRowClick?: (row: Row<TData>) => void;
}

export const DataTableBody = <TData, TValue>({
  columns,
  table,
  errorFallback = 'No results.',
  onRowClick,
}: DataTableBodyProps<TData, TValue>) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className={cn(onRowClick ? 'cursor-pointer' : '')}
            onClick={() => {
              if (!onRowClick) return;
              onRowClick(row);
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        // @TODO: make it as a compounded component
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {errorFallback}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

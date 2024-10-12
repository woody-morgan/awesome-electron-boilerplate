import { DataTableBody } from './data-table-body';
import { DataTableCheckbox } from './data-table-checkbox';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableHeader } from './data-table-header';
import { DataTablePagination } from './data-table-pagination';
import { DataTableProvider } from './data-table-provider';
import { DataTableRoot } from './data-table-root';

export const DataTable = {
  Provider: DataTableProvider,
  Root: DataTableRoot,
  Header: DataTableHeader,
  Body: DataTableBody,
  Pagination: DataTablePagination,
  Checkbox: DataTableCheckbox,
  ColumnHeader: DataTableColumnHeader,
};

export interface ColumnDef<TRow> {
  key: string;
  header: React.ReactNode;
  renderCell: (row: TRow) => React.ReactNode;
}

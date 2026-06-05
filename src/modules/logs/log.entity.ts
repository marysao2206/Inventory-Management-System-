export type LogAction = 'create' | 'update' | 'delete' | 'stock_in' | 'stock_out';

export interface LogEntry {
  id: number;
  inventoryItemId: number;
  action: LogAction;
  quantity: number;
  note?: string;
  createdAt: string;
}

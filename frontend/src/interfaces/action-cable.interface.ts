export interface IActionCableDataReceive {
  type: 'notify';
  message: string;
  data: any;
}
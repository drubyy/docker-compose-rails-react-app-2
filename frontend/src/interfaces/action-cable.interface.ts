export interface IActionCableDataReceive {
  type: 'notify';
  message: string;
  sender: string;
  data: any;
}
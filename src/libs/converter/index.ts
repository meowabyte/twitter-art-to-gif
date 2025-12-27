import MessageHandler from "../msgs";

export type MsgEventMap = {
  init: object;
  ready: object;
  error: { context: string; error: string };
  convert: { name: string; data: ArrayBuffer };
  convertResult: { name: string } & (
    | { success: false; error: string }
    | { success: true; data: string }
  );
};

export default class ConverterManager extends MessageHandler<MsgEventMap> {}

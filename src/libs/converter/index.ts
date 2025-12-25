import MessageHandler from "../msgs";

export type MsgEventMap = {
  error: { context: string; error: string };
  status:
    | { ready: true; message: null }
    | { ready: false; message: string | null };
  convert: { name: string; data: ArrayBuffer };
  convertResult: { name: string } & (
    | { success: false; error: string }
    | { success: true; data: string }
  );
};

export default class ConverterManager extends MessageHandler<MsgEventMap> {}

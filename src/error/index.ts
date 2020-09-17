import { types, ErrorType } from './types';

interface ErrorInterface extends Error {}
export type errorTypes = 'Server.internal' | 'Authentication.rejected' | 'Validation.rejected' | 'Default'

export default class ErrorGenerator extends Error {
  message: string

  type?: errorTypes

  stack?: string

  constructor(type: errorTypes, error?: ErrorInterface) {
    super()
    this.message = error?.message || type
    this.type = type;
    this.stack = error?.stack;
  }

  private logError() {
    if (this.stack) {
      console.log(JSON.stringify({ message: this.message, stack: this.stack, type: this.type }));
    }
  }

  getErrorInfo(): ErrorType {
    this.logError();
    return types.find((err) => err.type === this.type) || types.find((err) => err.type === 'Default')!;
  }
}

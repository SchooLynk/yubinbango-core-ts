module YubinBango {
  export class Core {
    public inputValue: string;
    constructor(inputVal: string = '') {
      this.inputValue = inputVal;
    }
    public getInputValue(): string {
       return this.inputValue
    }
  }
}

export const YubinBangoCore = YubinBango.Core;

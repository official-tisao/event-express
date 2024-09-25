
export class CustomException extends Error {
    public status: number;
    public message: string;

    constructor(message : string = "Category not found", status: number=404) {
      super(message);
      this.status = 404;
      this.message = message;
    }
  }

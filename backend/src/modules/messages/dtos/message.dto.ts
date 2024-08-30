import { Api } from 'telegram';

export class MessageDto {
  id: number;
  date: number;
  message: string;

  constructor(messageObj: Api.Message) {
    this.id = messageObj.id;
    this.date = messageObj.date;
    this.message = messageObj.message;
  }
}

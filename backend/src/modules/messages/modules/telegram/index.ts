import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

const session = new StringSession('');

export let client: null | TelegramClient = null;

const initTelegramClient = async (apiId: string, apiHash: string) => {
  client = new TelegramClient(session, Number(apiId), apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text('Введите номер телефона: '),
    password: async () =>
      await input.text('Введите двухфакторный пароль (если есть): '),
    phoneCode: async () =>
      await input.text('Введите код, полученный в Telegram: '),
    onError: (err) => console.log(err),
  });
};

export default initTelegramClient;

import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelephonyService {
  private axios: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.init();
  }

  private init() {
    this.axios = axios.create({
      baseURL: `https://${this.configService.get('ATC_DOMAIN')}/crmapi/v1`,
      headers: {
        'X-API-KEY': this.configService.get<string>('ATC_KEY'),
      },
    });
  }

  async makeCall() {
    await this.axios
      .post('/makecall', {
        phone: '79515076827',
        user: 'admin',
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PbxService {
  axios: null | AxiosInstance;
  key: null | string;
  key_id: null | string;

  constructor(private configService: ConfigService) {
    this.axios = axios.create({
      baseURL: `https://api2.onlinepbx.ru/${this.configService.get(
        'onlinePBX_domain',
      )}`,
    });

    this.axios.interceptors.request.use((config) => {
      config.headers['x-pbx-authentication'] = `${this.key_id}:${this.key}`;
      return config;
    });

    this.axios.interceptors.response.use(async (response: AxiosResponse) => {
      if (response.status === 200 && response.data?.isNotAuth === true) {
        await this.auth(true);
        return this.axios.request(response.config);
      }
      // Иначе возвращаем ответ как есть
      return response;
    });
  }

  async auth(refresh?: boolean) {
    await this.axios
      .post('/auth.json', {
        auth_key: this.configService.get('onlinePBX_auth_key'),
        new: refresh ? refresh : false,
      })
      .then((response) => {
        this.key = response.data.data.key;
        this.key_id = response.data.data.key_id;
      });
  }

  async call(from, to) {
    return await this.axios.post('/call/now.json', {
      from,
      to,
    });
  }
}

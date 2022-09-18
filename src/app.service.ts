import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class AppService {
  async getTodayRate(): Promise<object> {
    const res = {
      dolar: null,
      euro: null,
      yuan: null,
      lira: null,
      rublo: null,
    };

    try {
      const response = await axios.get('http://www.bcv.org.ve/');
      const $ = cheerio.load(response.data);

      const dolarAttr = $('#dolar');
      const dolarRate = dolarAttr.find('strong').html();
      if (dolarRate) {
        res.dolar = Number(dolarRate.replace(',', '.'));
      }

      const euroAttr = $('#euro');
      const euroRate = euroAttr.find('strong').html();
      if (euroRate) {
        res.euro = Number(euroRate.replace(',', '.'));
      }

      const yuanAttr = $('#yuan');
      const yuanRate = yuanAttr.find('strong').html();
      if (yuanRate) {
        res.yuan = Number(yuanRate.replace(',', '.'));
      }

      const liraAttr = $('#lira');
      const liraRate = liraAttr.find('strong').html();
      if (liraRate) {
        res.lira = Number(liraRate.replace(',', '.'));
      }

      const rubloAttr = $('#rublo');
      const rubloRate = rubloAttr.find('strong').html();
      if (rubloRate) {
        res.rublo = Number(rubloRate.replace(',', '.'));
      }

      return res;
    } catch (error) {
      throw new HttpException('Error de conexión con el BCV', 504);
    }
  }
}

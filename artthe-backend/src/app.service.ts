import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getDevice(headers: { 'user-agent': string }): string {
    const userAgent = headers['user-agent'];
    return `Hello World! | Device : ${this.getDeviceType(userAgent)}`;
  }
  getDeviceType(ua: string): string {
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return 'mobile';
    }
    return 'desktop';
  }
}

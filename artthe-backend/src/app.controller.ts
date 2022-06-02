import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDevice(@Res() res, @Req() req): void {
    return this.redirect(res, req);
  }
  redirect(@Res() res, @Req() req): void {
    const device = this.appService.getDevice(req.headers);
    if (device.includes('desktop')) {
      console.log(`Redirecting to ${device} client`);
      return res.redirect('/pc-client/init');
    }
    console.log(`Redirecting to ${device} client`);
    return res.redirect('/phone-client');
  }
}

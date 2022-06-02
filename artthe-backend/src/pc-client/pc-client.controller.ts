import { Controller, Get, Render, Param } from '@nestjs/common';

@Controller('pc-client')
export class PcClientController {
  @Get('/init')
  @Render('qrPage.hbs')
  root() {
    console.log('loaded');
  }
  @Get('/run')
  @Render('index.hbs')
  run() {
    console.log('loaded');
  }
}

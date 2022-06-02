import { Controller, Get, Param, Req, Res, Render } from '@nestjs/common';
// let pcID: string;
@Controller('phone-client')
export class PhoneClientController {
  @Get()
  @Render('needinit.hbs')
  root() {
    console.log('loaded');
  }
  @Get('/:id')
  @Render('tel.hbs')
  phoneStart(@Param('id') id: string, @Res() res) {
    res.cookie('PC-ID', id);
  }
}

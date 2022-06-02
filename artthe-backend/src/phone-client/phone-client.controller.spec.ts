import { Test, TestingModule } from '@nestjs/testing';
import { PhoneClientController } from './phone-client.controller';

describe('PhoneClientController', () => {
  let controller: PhoneClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneClientController],
    }).compile();

    controller = module.get<PhoneClientController>(PhoneClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

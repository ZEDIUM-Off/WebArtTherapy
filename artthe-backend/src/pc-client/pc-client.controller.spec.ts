import { Test, TestingModule } from '@nestjs/testing';
import { PcClientController } from './pc-client.controller';

describe('PcClientController', () => {
  let controller: PcClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PcClientController],
    }).compile();

    controller = module.get<PcClientController>(PcClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

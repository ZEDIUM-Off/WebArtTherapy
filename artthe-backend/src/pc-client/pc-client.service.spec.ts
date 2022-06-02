import { Test, TestingModule } from '@nestjs/testing';
import { PcClientService } from './pc-client.service';

describe('PcClientService', () => {
  let service: PcClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PcClientService],
    }).compile();

    service = module.get<PcClientService>(PcClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

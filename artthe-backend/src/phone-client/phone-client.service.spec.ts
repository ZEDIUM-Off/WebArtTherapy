import { Test, TestingModule } from '@nestjs/testing';
import { PhoneClientService } from './phone-client.service';

describe('PhoneClientService', () => {
  let service: PhoneClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneClientService],
    }).compile();

    service = module.get<PhoneClientService>(PhoneClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

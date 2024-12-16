import { Test, TestingModule } from '@nestjs/testing';
import { DlxService } from './dlx.service';

describe('DlxService', () => {
  let service: DlxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DlxService],
    }).compile();

    service = module.get<DlxService>(DlxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

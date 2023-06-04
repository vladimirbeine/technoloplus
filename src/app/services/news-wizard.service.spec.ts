import { TestBed } from '@angular/core/testing';

import { NewsWizardService } from './news-wizard.service';

describe('NewsWizardService', () => {
  let service: NewsWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

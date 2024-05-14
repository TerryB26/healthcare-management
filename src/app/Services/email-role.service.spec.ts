import { TestBed } from '@angular/core/testing';

import { EmailRoleService } from './email-role.service';

describe('EmailRoleService', () => {
  let service: EmailRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

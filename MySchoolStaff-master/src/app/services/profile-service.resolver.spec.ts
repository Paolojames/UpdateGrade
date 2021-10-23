import { TestBed } from '@angular/core/testing';

import { ProfileServiceResolver } from './profile-service.resolver';

describe('ProfileServiceResolver', () => {
  let resolver: ProfileServiceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfileServiceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

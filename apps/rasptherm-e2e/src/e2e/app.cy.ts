import { getSensor } from '../support/app.po';

describe('rasptherm-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display temperature', () => {
    getSensor().contains(/21.0/);
  });
});

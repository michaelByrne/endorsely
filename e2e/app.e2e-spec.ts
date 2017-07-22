import { ContactsPage } from './app.po';

describe('contacts App', () => {
  let page: ContactsPage;

  beforeEach(() => {
    page = new ContactsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

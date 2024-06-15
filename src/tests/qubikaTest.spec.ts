import { test, expect, request, APIRequestContext, Page } from '@playwright/test';
import { ApiPage } from '../pages/apiPage';
import { LoginPage } from '../pages/loginPage';
import { CategoryPage } from '../pages/categoryPage';
import { FileManager } from '../utils/fileManager';
import { dashboardSelectors } from '../selectors/dashboardSelectors';

test.describe('Qubika Sports Club Management System', () => {
  let apiContext: APIRequestContext;
  let page: Page;
  let apiPage: ApiPage;
  let loginPage: LoginPage;
  let categoryPage: CategoryPage;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: process.env.BASE_URL
    });
    apiPage = new ApiPage(apiContext);

    const userResponse = await apiPage.registerUserWithRandomEmail('12345678');
    expect(userResponse).toBeTruthy();
  });

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    categoryPage = new CategoryPage(page);
  });

  test('should log in and manage categories', async () => {
    const user = FileManager.readUser();

    await loginPage.navigate();
    await loginPage.validateLoginPage();
    await loginPage.login(user.email, '12345678');
    await page.waitForSelector(dashboardSelectors.qubikaLogo);
    await categoryPage.navigate();
    await categoryPage.createCategory('Test Category');
    await categoryPage.createSubCategory('Test Category', 'Test SubCategory');
    await categoryPage.validateCategoryAndSubExists();
  });
});

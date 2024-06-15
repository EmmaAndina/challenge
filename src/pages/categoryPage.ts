import { Page, expect } from '@playwright/test';
import { dashboardSelectors } from '../selectors/dashboardSelectors';
import { categorySelectors } from '../selectors/categorySelectors';

export class CategoryPage {
  readonly page: Page;
  private tableRowsSelector: string;

  constructor(page: Page) {
    this.page = page;
    this.tableRowsSelector = '.table tbody tr';
    console.log('CategoryPage initialized');
  }

  // Method to navigate to the categories page
  async navigate() {
    console.log('Navigating to categories page');
    await this.page.click(dashboardSelectors.categories);
  }

  // Method to create a new category
  async createCategory(name: string) {
    console.log(`Creating category with name: ${name}`);
    await this.page.click(categorySelectors.newCategory);
    await this.page.fill(categorySelectors.inputCategory, name);
    await this.page.click(categorySelectors.submitButton);
    await this.page.waitForSelector(categorySelectors.successToast);
    console.log('Category created successfully');
  }

  // Method to validate that a category and its subcategory exist
  async validateCategoryAndSubExists() {
    console.log('Validating that category and subcategory exist');
    await this.selectLastPaginationItem();
    await this.validateNewCategoryAdded('Test Category', 'Test SubCategory');
  }

  // Method to create a new subcategory
  async createSubCategory(categoryName: string, subCategoryName: string) {
    console.log(`Creating subcategory with name: ${subCategoryName} under category: ${categoryName}`);
    await this.page.click(categorySelectors.newCategory);
    await this.page.click(categorySelectors.subcategoryCheckbox);
    await this.page.fill(categorySelectors.inputCategory, subCategoryName);
    await this.page.fill(categorySelectors.inputSubcategory, categoryName);
    await this.page.press(categorySelectors.inputSubcategory, "Enter");
    await this.page.click(categorySelectors.submitButton);
    await this.page.waitForSelector(categorySelectors.successToast);
    console.log('Subcategory created successfully');
  }


  // Method to validate that a new category and its subcategory have been added
  async validateNewCategoryAdded(expectedParentCategory: string, expectedSubCategory: string): Promise<void> {
    console.log(`Validating that new category: ${expectedParentCategory} and subcategory: ${expectedSubCategory} have been added`);

    const rows = await this.page.$$eval(this.tableRowsSelector, rows => {
      return rows.map(row => {
        const cells = row.querySelectorAll('td');
        return {
          name: cells[0].innerText,
          parentCategory: cells[1].innerText
        };
      });
    });

    const newElement = rows.find(row => row.name === expectedSubCategory && row.parentCategory === expectedParentCategory);
    expect(newElement).not.toBeUndefined();
    console.log('Validation successful: Category and subcategory exist');
  }

  // Method to select the last pagination item
  async selectLastPaginationItem(): Promise<void> {
    console.log('Selecting the last pagination item');
    const lastPageNumber = await this.page.$eval('.pagination', (pagination) => {
        const pageItems = pagination.querySelectorAll('.page-item .page-link');
        let maxNumber = 0;
        pageItems.forEach(item => {
            const number = parseInt(item.textContent?.trim() || '0');
            if (!isNaN(number) && number > maxNumber) {
                maxNumber = number;
            }
        });
        return maxNumber;
    });

    console.log(`Pagination last number is: ${lastPageNumber}`);
    
    await this.page.click(categorySelectors.categoryLastPage(lastPageNumber));
    await this.page.waitForSelector(categorySelectors.categoryRowByName('Test Category'));
    console.log('Last pagination item selected and category row found');
  }

}

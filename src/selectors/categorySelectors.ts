export const categorySelectors = {
    newCategory: 'button:has-text("Adicionar")',
    inputCategory: 'input[placeholder="Nombre de categoría"]',
    subcategoryCheckbox: 'label[for="customCheckMain"]',
    inputSubcategory: 'input[aria-autocomplete="list"]',
    submitButton: 'button:has-text("Aceptar")',
    cancelButton: 'button:has-text("Cancelar")',
    categoryLastPage:(lastPageNumber: number) =>  `.pagination .page-item .page-link:text-is("${lastPageNumber}")`,
    categoryRowByName: (name: string) => `table tr td:has-text("${name}")`,
    successToast: 'div.toast-success',
};
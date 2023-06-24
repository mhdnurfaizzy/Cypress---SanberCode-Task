describe('KasirAja E2E Testing', () => {

        beforeEach(() => {
          cy.fixture('loginFixture').then((loginData) => {
            cy.visit('https://kasirdemo.belajarqa.com/');
            cy.get('#email').type(loginData.username);
            cy.get('#password').type(loginData.password);
            cy.get("button[type='submit']")
            .should('contain', 'login')
            .click()
          });
        })

    it('Positive case - As a user i can Add data Produk', () => {
      cy.xpath("//div[contains(text(),'produk')]", {timeout : 5000})
      .should('be.visible')
      .should('contain', 'produk')
      .click()
      cy.xpath("//a[@class='chakra-button css-1piskbq']")
      .should('be.visible')
      .click()

      //Input Form
      cy.fixture('formProduk').then((produkData) => {
        cy.xpath("//input[@id='nama']").type(produkData.name);
        cy.xpath("//input[@id='deskripsi']").type(produkData.deskripsi);
        cy.xpath("//input[@id='harga beli']").type(produkData.harga_beli);
        cy.xpath("//input[@id='harga jual']").type(produkData.harga_jual);
        cy.xpath("//input[@id='stok']").type(produkData.stok);
        cy.xpath("//input[@id='kategori']").click()
        cy.xpath("//td[normalize-space()='Umum']").click()
        cy.xpath("//button[normalize-space()='simpan']")
        .should('contain', 'simpan')
        .click()
        cy.url().should('include', '/product');
      });
    })

    it('Positive case - As a user i can find product by Code', () => {
      cy.xpath("//div[contains(text(),'produk')]", {timeout : 5000})
      .should('be.visible')
      .should('contain', 'produk')
      .click()

      //Find product
      cy.xpath("//input[@placeholder='cari']")
      .should('be.visible')
      .type('BR021640')
      .type('{enter}')

      //verify data
      cy.get("table[role='table'] > tbody > tr")
      .should('contain', 'BR021640')

    })
  })
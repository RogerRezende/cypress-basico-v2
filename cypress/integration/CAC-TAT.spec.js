/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(() => cy.visit('../../src/index.html'))

    it('Verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos referentes ao nome do usuário', function() {
        cy.get('#firstName')
            .type('Bruce')
            .should('have.value', 'Bruce')
        cy.get('#lastName')
            .type('Wayne')
            .should('have.value', 'Wayne')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('#firstName')
            .type('Bruce', {delay: 0})
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.get('.button')
            .click()
        cy.get('.success > strong')
            .should('be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário usando cy.clock e cy.tick', function() {
        cy.clock()
        cy.get('#firstName')
            .type('Bruce')
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.get('.button')
            .click()
        cy.get('.success > strong')
            .should('be.visible')
        cy.tick(3000)
        cy.get('.success > strong')
            .should('not.be.visible')
    })

    it('preenche os campos obrigatórios e envia o formulário usando contains', function() {
        cy.get('#firstName')
            .type('Bruce', {delay: 0})
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.contains('Enviar')
            .click()
        cy.get('.success > strong')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName')
            .type('Bruce')
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman')
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.get('.button')
            .click()
        cy.get('.error > strong')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida usando contains', function() {
        cy.get('#firstName')
            .type('Bruce')
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman')
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.contains('Enviar')
            .click()
        cy.get('.error > strong')
            .should('be.visible')
    })

    it('verificar que campo telefone não aceita valores não numéricos', function() {
        cy.get('#firstName')
            .type('Bruce')
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.get('#phone')
            .type('bola oito')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName')
            .type('Bruce')
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
        cy.get('#phone-checkbox')
            .check()
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.get('.button')
            .click()
        cy.get('.error > strong')
            .should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário usando contains', function() {
        cy.get('#firstName')
            .type('Bruce')
        cy.get('#lastName')
            .type('Wayne')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
        cy.get('#phone-checkbox')
            .click()
        cy.get('#open-text-area')
            .type('Testando o funcionamento')
        cy.contains('Enviar')
            .click()
        cy.get('.error > strong')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Bruce')
            .should('have.value', 'Bruce')
        cy.get('#firstName')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Wayne')
            .should('have.value', 'Wayne')
        cy.get('#lastName')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('bruce.wayne@batman.com')
            .should('have.value', 'bruce.wayne@batman.com')
        cy.get('#email')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12963251478')
            .should('have.value', '12963251478')
        cy.get('#phone')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('.button')
            .click()
        cy.get('.error > strong')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios usando contains', function() {
        cy.contains('Enviar')
            .click()
        cy.get('.error > strong')
            .should('be.visible')
    })

    it('envia formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success > strong')
            .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento Feedback', function() {
        cy.get('#support-type > :nth-child(4) > input')
            .check()
            .should('be.checked')
            .should('have.value', 'feedback')
        cy.get('#support-type > :nth-child(2) > input')
            .should('not.be.checked')
        cy.get('#support-type > :nth-child(3) > input')
            .should('not.be.checked')
    })

    it('marca cada tipo de atendimento sem each ou wrap', function() {
        cy.get('#support-type > :nth-child(4) > input')
            .check()
            .should('be.checked')
            .should('have.value', 'feedback')
        cy.get('#support-type > :nth-child(2) > input')
            .check()
            .should('be.checked')
            .should('have.value', 'ajuda')
        cy.get('#support-type > :nth-child(3) > input')
            .check()
            .should('be.checked')
            .should('have.value', 'elogio')
    })

    it('marca cada tipo de atendimento com each e wrap', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio)
                    .check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .each(function($check) {
                cy.wrap($check)
                    .check()
                cy.wrap($check)
                    .should('be.checked')
            })
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json', { encoding: null })
            .as('fixture')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@fixture')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verificar que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('a')
            .should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click()
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando .invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })

    it('faz um requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function($response) {
                const { status, statusText, body } = $response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })

    it.only('encontre o gato', function() {
        cy.get('#cat')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
    })
})
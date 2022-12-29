describe('Thrello scenarios', () => {
    let BOARDS = "boards/"
    let LISTS = 'lists'
    let CARDS = 'cards'

    let current_todo_list_id
    let current_done_list_id
    let current_board_id
    let current_card_id
    let board_name = 'new board test'
    let card_name ='card name cypress'

    it('Create a board', () => {
        cy.api({
            method: 'POST',
            url: Cypress.env('TRELLO_BASE_URL')+BOARDS,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
                'name': board_name,
                'defaultLists' :false

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body.name).eq(board_name)
                current_board_id = response.body.id
              })
      })
  
    it('Get a single board ', () => {
        cy.api({
            method: 'GET',
            url: Cypress.env('TRELLO_BASE_URL')+BOARDS +current_board_id,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body.name).eq(board_name)
        })
       
      })
    it('Get all boards', () => {
        cy.api({
            method: 'GET',
            url: Cypress.env('TRELLO_BASE_URL_USER')+BOARDS,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length.greaterThan(0)
              })
    })

    it('Update a board ', () => {
        cy.api({
            method: 'PUT',
            url: Cypress.env('TRELLO_BASE_URL')+BOARDS+current_board_id,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
                'name': 'NEW name',
                'desc' :'NEW description'

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body.name).not.eq(board_name)
                expect(response.body.name).eq('NEW name')
                expect(response.body.desc).eq('NEW description')
        })
       
      })
    it('Create TODO & DONE list', () => {
         cy.api({
            method: 'POST',
            url: Cypress.env('TRELLO_BASE_URL')+LISTS,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
                'name': 'TODO',
                'idBoard' :current_board_id

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body.closed).is.false
                expect(response.body.name).eq('TODO')
                current_todo_list_id = response.body.id
              })
        cy.api({
                method: 'POST',
                url: Cypress.env('TRELLO_BASE_URL')+LISTS,
                qs:{
                    'key': Cypress.env('TRELLO_KEY'),
                    'token':Cypress.env('TRELLO_TOKEN'),
                    'name': 'DONE',
                    'idBoard' :current_board_id
    
                },
            }).then((response)=> {
                    expect(response.status).to.eq(200)
                    expect(response.body.closed).is.false
                    expect(response.body.name).eq('DONE')
                    current_done_list_id = response.body.id
                  })
      })
    it('Create a card on TODO list', () => {
        cy.api({
            method: 'POST',
            url: Cypress.env('TRELLO_BASE_URL')+CARDS,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
                'name': card_name,
                'idList':current_todo_list_id

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body.name).eq(card_name)
                expect(response.body.idList).eq(current_todo_list_id)
                current_card_id = response.body.id
              })
      })
    it('MOVE  card from  TODO list to DONE list', () => {
       cy.api({
            method: 'PUT',
            url: Cypress.env('TRELLO_BASE_URL')+CARDS + '/' + current_card_id,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
                'idList':current_done_list_id

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body.idList).eq(current_done_list_id)
              })
      })
    it('Get cards from current board', () => {
        cy.api({
            method: 'GET',
            url: Cypress.env('TRELLO_BASE_URL')+BOARDS + current_board_id + '/' +CARDS,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),
            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body).have.length.greaterThan(0)
                expect(response.body[0].id).eq(current_card_id)
            
            })
      })
    
    it('Delete a board', () => {
        cy.api({
            method: 'DELETE',
            url: Cypress.env('TRELLO_BASE_URL')+BOARDS+current_board_id,
            qs:{
                'key': Cypress.env('TRELLO_KEY'),
                'token':Cypress.env('TRELLO_TOKEN'),

            },
        }).then((response)=> {
                expect(response.status).to.eq(200)
                expect(response.body._value).is.null
              })
    })


  })
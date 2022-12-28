describe('Api test Scenarios', () => {
  let MATCHES= "/matches"
  let AREAS ="/areas"
  let TEAMS = "/teams/57"

  it('get MATCHES', () => {
    cy.api({
           method: 'GET',
           url: MATCHES,
           headers: {
                 'Content-Type': 'application/json',
                 'X-Auth-Token': '1803426acb98487b9cc632f53dba5552',
                 'X-Response-Control': 'minified'
               },
       }).then((response)=> {
               expect(response.status).to.eq(200)
               expect(response.body.resultSet.count).eq(9)
             })
  })
  it('get AREA 2004', () => {
      cy.api({
             method: 'GET',
             url: AREAS,
             headers: {
                   'Content-Type': 'application/json',
                   'X-Auth-Token': '1803426acb98487b9cc632f53dba5552',
                   'X-Response-Control': 'minified'
                   },
             qs:{
             'areas': 2004
             },

         }).then((response)=> {
                 expect(response.status).to.eq(200)
                 expect(response.body.count).eq(1)
                 expect(response.body.areas[0].name).eq('Algeria')
               })
    })
    it('get TEAM 57', () => {
        cy.api({
               method: 'GET',
               url: TEAMS,
               headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': '1803426acb98487b9cc632f53dba5552',
                'X-Response-Control': 'minified'
                              },
           }).then((response)=> {
                   expect(response.status).to.eq(200)
                   expect(response.body.id).eq(57)
                   expect(response.body.founded).eq(1886)
                   expect(response.body.name).eq('Arsenal FC')
                 })
      })



})
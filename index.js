import { default as prmpt } from 'prompt-sync'
import UserSet from './UserSet.js'
import CompanySet from './CompanySet.js'
import UserCompanyAssociation from './UserCompanyAssociation.js'
import UI from './UI.js'

function app() {

  const userSet = new UserSet()
  const companySet = new CompanySet()
  const association = new UserCompanyAssociation(userSet, companySet)
  const prompt = prmpt({ sigint: true })
  const ui = new UI(userSet, companySet, prompt)
  let running = true

  while (running) {
    console.log("What would you like to do?")
    console.log("   Press 1 to add a user")
    console.log("   Press 2 to add a company")
    console.log("   Press 3 to exit")
    console.log("   Press 4 to attach a user to a company")
    console.log("   Press 5 to list users and companies")
    console.log("   Press 6 to list all associations of user-company")
    let choice = prompt()

    switch (choice) {
      case '1':
        try {
          userSet.addUserByName(ui.getUsername())
        } catch (err) {
          console.log(err.message)
        }
        break
      case '2':
        companySet.addCompanyByName(ui.getCompanyName())
        break
      case '3':
        running = false
        break
      case '4':
        try {
          association.validateUserAndCompany()
        } catch (err) {
          console.log(err.message)
          break
        }

        association.printUsersAndCompanies()
        const existingUsername = ui.getExistingUsername()
        const existingCompanyName = ui.getExistingCompanyName()

        try {
          association.attachUserToCompany(existingUsername, existingCompanyName)
        } catch (err) {
          console.log(err.message)
        }

        association.printAllAssociations()
        break
      case '5':
        association.printUsersAndCompanies()
        break
      case '6':
        association.printAllAssociations()
        break
      default:
        console.log('--- Please, enter a number between 1 and 6')
    }
  }
}

app()

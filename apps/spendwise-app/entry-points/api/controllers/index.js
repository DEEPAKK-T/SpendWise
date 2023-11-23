class Controller {
    userService 
    expenseService
    constructor(userService, expenseService) {
        this.userService = userService
        this.expenseService = expenseService
    }
}
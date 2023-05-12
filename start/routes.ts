import Route from '@ioc:Adonis/Core/Route'

Route.get('login', 'AuthController.login').as('login')
Route.post('store-login', 'AuthController.storeLogin').as('postLogin')

Route.group(() => {
	Route.post('logout', 'AuthController.logout').as('logout')
	Route.get('dashboard', 'DashboardController.index').as('dashboard')

	Route.resource('users', 'UsersController')
}).as('auth').middleware(['auth'])

Route.get('/', async ({ response }) => {
  return response.redirect().toRoute('auth.dashboard')
})

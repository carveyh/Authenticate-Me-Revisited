Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # TEST ROUTE FOR SETUP
  post 'api/test', to: 'application#test'

  # Effects of nesting routes within `namespace :api`:
    # Each route path becomes prefixed with api/
    # Each controller must be located within app/controllers/api
    # Each controller class name must be begin with Api::
    # Generating in command line becomes `rails g controller api/table(plural)`
  # Refreshing on RESTful routes:
  # `resources :photos` will define routes to index, show, new, create, edit, update, destroy controller actions.
    # GET /photos           photos#index
    # GET /photos/:id       photos#show
    # GET /photos/new       photos#new
    # POST /photos          photos#create
    # GET /photos/:id/edit  photos#edit
    # PATCH /photos/:id     photos#update
    # DELETE /photos/:id    photos#destroy
  # `resources :profile` will define routes to show, new, create, edit, update, destroy controller actions - NOT index.
  # Also, 'member' routes to actions like #show will NOT have :id wildcard.
    # GET /profile           profile#show
    # GET /profile/new       profile#new
    # POST /profile          profile#create
    # GET /profile/edit      profile#edit
    # PATCH /profile         profile#update
    # DELETE /profile        profile#destroy
  # Nested routes - see AAW6D4 resource. Adding `shallow: true` opt on nested resource will nest only collection routes, and create top-level routes for member routes

  # For below namespace resources, terminal commands to generate the controllers:
    # rails g controller api/users create --skip-routes
    # rails g controller api/sessions show create destroy --skip-routes #NOTE: even for singular resource, CONTROLLER ALWAYS PLURAL
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create # add user
    resource :session, only: [:show, :create, :destroy] # get current_user, login, logout
  end
end

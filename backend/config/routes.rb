
Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  resources :chatrooms, only: [:index, :create, :destroy, :update, :show] 
  resources :posts, only: [:index, :create]
  get '/current_rooms', to: 'chatrooms#current_rooms'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
 

end

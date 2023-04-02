Rails.application.routes.draw do
  devise_for :users, path: '',
  path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get "/dashboards" => "dashboards#index"
  resources :resources, only: %i[create]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

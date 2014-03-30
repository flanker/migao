Migao::Application.routes.draw do

  devise_for :users, path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    sign_up: 'register'
  }

  get '/login', to: 'sessions#new'
  get '/logout', to: 'sessions#destroy'
  get '/signup', to: 'sessions#signup'
  get '/auth/failure', to: 'sessions#failure'

  namespace :admin do
    get '/', to: 'home#index'

    scope module: :consultings do
      resource :consultings, only: [:show, :update] do
        resources :chats, only: [:update] do
          resources :messages, only: [:create]
        end
      end

      resources :callscripts, only: [:index]
    end
  end

  get '/', to: 'application#index'

  scope module: :consultings do
    resources :consultings, only: [:index, :show] do
      resources :chats, only: [:new, :create, :show, :update] do
        resources :messages, only: [:create]
      end
    end
  end

end

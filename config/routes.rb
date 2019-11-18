Rails.application.routes.draw do
  devise_for :users
  resources :articles
  root to: "messages#index"
  resources :users, only: [:edit, :update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  root "list#index"
  resources :list, only: [:index, :new, :create, :destroy]
end

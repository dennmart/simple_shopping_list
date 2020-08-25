Rails.application.routes.draw do
  resources :list, only: [:index, :new, :create, :destroy]
end

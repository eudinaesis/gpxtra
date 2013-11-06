GPXtra::Application.routes.draw do
  devise_for :users 
  resources :workouts, :only => [:index, :show, :create, :destroy, :new]
  root :to => 'users#show'
  match 'static' => 'static_pages#index'
end

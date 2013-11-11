GPXtra::Application.routes.draw do
  devise_for :users 
  resources :workouts, :only => [:index, :show, :create, :update, :destroy, :new]
  root :to => 'root#root'
end

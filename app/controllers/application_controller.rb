class ApplicationController < ActionController::Base
  before_filter :authenticate_user!
  protect_from_forgery
  serialization_scope :current_user
end

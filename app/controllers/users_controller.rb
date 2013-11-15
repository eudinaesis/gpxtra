class UsersController < ApplicationController
  def index
    @users = User.includes(:followers).where("id != ?", current_user.id)
    render :json => @users, :root => false
  end
end

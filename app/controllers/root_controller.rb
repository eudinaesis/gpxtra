class RootController < ApplicationController
  def root
    @user = current_user
  end
end

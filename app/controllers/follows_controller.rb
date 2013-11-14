class FollowsController < ApplicationController
  def destroy
    @follow = Follow.
      find_by_follower_id_and_followed_user_id(
        current_user.id, params[:id])
    if @follow
      @follow.destroy
      head :ok
    else
      head :bad_request
    end
  end

  def create
    @follow = Follow.new()
    @follow.follower_id = current_user.id
    @follow.followed_user_id = params[:followed_user_id]
    if @follow.save
      render :json => @follow
    else
      render :json => @follow.errors.full_messages
    end
  end
end
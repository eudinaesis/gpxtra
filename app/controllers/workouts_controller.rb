class WorkoutsController < ApplicationController
  def index
    # @workouts = Workout.includes(:user).where(:user_id => current_user.id).order(:datetime).reverse_order
    # render :json => @workouts, root: false
    @feed = current_user.feed
    render :json => @feed, root: false
  end
  
  def show
    @workout = Workout.find(params[:id])
    render :json => @workout
  end
  
  def update
    @workout = Workout.find(params[:id])
    if @workout.user_id == current_user.id 
      @workout.update_attributes(params[:workout])
    end
    render :json => @workout, root: false
  end
  
  def destroy
    @workout = Workout.find(params[:id])
    if @workout.user_id == current_user.id 
      @workout.destroy
      head :ok
    else
      head :bad_request
    end
  end

  def create
    @workout = Workout.new(params[:workout])
    @workout.user_id = current_user.id
    if @workout.save
      render :json => @workout
    else
      render :json => @workout.errors.full_messages
    end
  end
end

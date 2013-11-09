class WorkoutsController < ApplicationController
  def index
    @workouts = Workout.includes(:user).where(:user_id => current_user.id).order(:datetime).reverse_order
    render :json => @workouts, root: false
  end
  
  def show
    @workout = Workout.find(params[:id])
    render :json => @workout
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

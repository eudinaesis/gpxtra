class RootController < ApplicationController
  def root
    @user = current_user
    @workouts = Workout.includes(:user).where(:user_id => current_user.id).order(:datetime).reverse_order
    
    @json_wks = ActiveModel::ArraySerializer.new(@workouts.map do |w|
        Workout.active_model_serializer.new(w)
      end
    )
  end
end

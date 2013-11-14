class Fistbump < ActiveRecord::Base
  attr_accessible :workout_id, :bumper_id
  belongs_to :workout
  belongs_to :bumper, class_name: "User"
  validates :bumper, presence: true
end

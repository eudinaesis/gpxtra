class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name

  include Gravtastic
  gravtastic

  has_many :workouts, :inverse_of => :user
  
  def stats(time="all")
    where_string = case time
      when "week" then "AND datetime BETWEEN
        '#{DateTime.now - 1.week}' AND '#{DateTime.now}'"
      when "4weeks" then "AND datetime BETWEEN
        '#{DateTime.now - 4.weeks}' AND '#{DateTime.now}'"
      when "12weeks" then "AND datetime BETWEEN
        '#{DateTime.now - 12.weeks}' AND '#{DateTime.now}'"
      when "6months" then "AND datetime BETWEEN
        '#{DateTime.now - 6.months}' AND '#{DateTime.now}'"
      else ""
    end
    
    result = Workout.find_by_sql(<<-SQL)[0]
      SELECT sum(distance) AS total_distance, 
        sum (moving_time) AS total_time,
        sum (elevation) AS total_elev,
        count(*) AS num_workouts
      FROM workouts
      WHERE user_id = 1
        #{where_string}
SQL
    stats_hash = {
      "num_workouts" => result.num_workouts,
      "total_distance" => result.total_distance,
      "total_time" => result.total_time,
      "total_elev" => result.total_elev
    }
    return stats_hash
  end
end

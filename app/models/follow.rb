class Follow < ActiveRecord::Base
  attr_accessible :follower_id, :followed_user_id
  belongs_to :follower, :class_name => "User"
  belongs_to :followed_user, :class_name => "User"
  validates :followed_user, :presence => true
  validates :follower, :presence => true
  validates_uniqueness_of(:follower_id, :scope => :followed_user_id)
  validates_uniqueness_of(:followed_user_id, :scope => :follower_id)
end

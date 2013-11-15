class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :gravatar_url, :following
  def following
    object.followers.include?(scope) ? true : false
  end
  self.root = false
end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :gravatar_url
  self.root = false
end

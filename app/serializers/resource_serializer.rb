class ResourceSerializer < ApplicationSerializer
  attributes :id, :resource_id

  belongs_to :user, serializer: UserSerializer
end

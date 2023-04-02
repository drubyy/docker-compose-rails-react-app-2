class Resource < ApplicationRecord
  ALLOW_PARAMS = %i[resource_id]

  belongs_to :user
end

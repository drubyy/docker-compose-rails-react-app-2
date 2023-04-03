class Resource < ApplicationRecord
  ALLOW_PARAMS = %i[resource_id]

  belongs_to :user

  validates :resource_id, presence: true, length: {maximum: Settings.validate.resource.resource_id_max_length}
end

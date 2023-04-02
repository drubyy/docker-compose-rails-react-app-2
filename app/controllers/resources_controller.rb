class ResourcesController < ApplicationController
  before_action :authenticate_user!

  def create
    resource = current_user.resources.new resource_params
    if resource.save
      render_json({status: 200})
    else
      render_json({status: 422, errors: resource.errors}, :unprocessable_entity)
    end
  end

  private

  def resource_params
    params.require(:resource).permit(Resource::ALLOW_PARAMS)
  end
end

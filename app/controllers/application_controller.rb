class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json

  def render_json data = {}, status = :ok
    render json: data, status: status
  end
end

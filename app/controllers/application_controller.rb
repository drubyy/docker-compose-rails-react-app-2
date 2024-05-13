class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  respond_to :json

  rescue_from Exception do |e|
    render_json({error: "Something went wrong: #{e.message}"}, :bad_request)
  end

  def render_json data = {}, status = :ok
    render json: data, status: status
  end
end

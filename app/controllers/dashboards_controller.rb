class DashboardsController < ApplicationController
  def index
    resources = Resource.order(created_at: :desc)
    total_records = resources.count
    resources = resources.page(params[:page] || 1).per(Settings.paginate.per_page)
    data = {
      status: {code: 200},
      data: ResourceSerializer.new(resources, {include: ['user', 'user.email']}).serializable_hash,
      total_records: total_records
    }
    render_json data
  end
end

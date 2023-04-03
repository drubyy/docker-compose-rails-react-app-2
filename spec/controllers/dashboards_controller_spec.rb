require "rails_helper"

RSpec.describe DashboardsController, type: :controller do
  let!(:user){FactoryBot.create :user, email: "remitest@remi.com"}

  describe "GET /dashboards" do
    before do
      Resource.destroy_all
      FactoryBot.create_list(:resource, 11, user: user)
    end

    context "normal case" do  
      it "should return list resources have been paginated with order by created_at DESC" do
        post :index
  
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to have_key("total_records")
        expect(JSON.parse(response.body)["data"].to_json).to eq(
          ResourceSerializer.new(
            Resource.all.order(created_at: :desc).limit(Settings.paginate.per_page), {include: ['user', 'user.email']}
          ).serializable_hash.to_json
        )
      end
    end

    context "when send with params[:page] and params[:per_page]" do
      let(:dashboard_index_params) {{page: 2}}

      it "should return list resources have been paginated with order by created_at DESC" do
        post :index, params: dashboard_index_params
  
        expect(JSON.parse(response.body)["data"].to_json).to eq(
          ResourceSerializer.new([Resource.first], {include: ['user', 'user.email']}).serializable_hash.to_json
        )
      end
    end
  end
end

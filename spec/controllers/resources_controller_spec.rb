require "rails_helper"

RSpec.describe ResourcesController, type: :controller do
  let(:user){FactoryBot.create :user}

  describe "POST /resources" do
    context "unauthorized" do
      it "return status code 401" do
        post :create
        expect(response.status).to eq 401
      end
    end

    context "authorized" do
      before do
        sign_in user
      end

      context "when resource invalid" do
        let(:create_resource_params) {{ resource: {resource_id: "06-XXOTP3Gc"}}}

        it "should create resource successfully" do
          post :create, params: create_resource_params

          expect(Resource.count).to eq(1)
          expect(response).to have_http_status(:ok)
          expect(response.body).to eq({status: 200}.to_json)
        end
      end

      context "when resource invalid" do
        let(:create_resource_params) {{ resource: {resource_id: "id" * 101} }}

        it "should create resource fail and return errors" do
          post :create, params: create_resource_params

          expect(Resource.count).to eq(0)
          expect(response).to have_http_status(:unprocessable_entity)
          expect(JSON.parse(response.body)).to have_key("errors")
        end
      end

      context "when another errors" do
        let(:create_resource_params) {{}}

        it "should create resource fail and return common error" do
          post :create, params: create_resource_params

          expect(Resource.count).to eq(0)
          expect(response).to have_http_status(:bad_request)
          expect(JSON.parse(response.body)).to have_key("error")
        end
      end
    end
  end
end

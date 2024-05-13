require 'rails_helper'

RSpec.describe Resource, type: :model do
  describe "associations" do
    it{should belong_to(:user)}
  end

  describe "validations" do
    context "when valid all" do
      let(:resource){FactoryBot.build :resource}

      it "should return true" do
        expect(resource.valid?).to be_truthy
      end
    end

    context "when instance invalid" do
      context "validate resource_id" do
        context "when blank resource_id" do
          let(:resource){FactoryBot.build :resource, resource_id: nil}
  
          it "should return false" do
            expect(resource.valid?).to be_falsy
            expect(resource.errors.details[:resource_id].first.has_value?(:blank)).to be_truthy
          end
        end

        context "when exceed max length resource_id" do
          let(:resource){FactoryBot.build :resource, resource_id: "a" * (Settings.validate.resource.resource_id_max_length + 1)}
    
          it "should return false" do
            expect(resource.valid?).to be_falsy
            expect(resource.errors.details[:resource_id].first.has_value?(:too_long)).to be_truthy
          end
        end
      end

      context "validate user_id" do
        context "when blank user_id" do
          let(:resource){FactoryBot.build :resource, user: nil}
  
          it "should return false" do
            expect(resource.valid?).to be_falsy
            expect(resource.errors.details[:user].first.has_value?(:blank)).to be_truthy
          end
        end

        context "when user not exist" do
          let(:resource){FactoryBot.build :resource, user_id: -1}
  
          it "should return false" do
            expect(resource.valid?).to be_falsy
            expect(resource.errors.details[:user].first.has_value?(:blank)).to be_truthy
          end
        end
      end
    end
  end
end

require 'rails_helper'

RSpec.describe Resource, type: :model do
  let(:resource){FactoryBot.build :resource}

  describe "associations" do
    it{should belong_to(:user)}
  end

  describe "validations" do
    context "when valid resource_id" do
      it "should return true" do
        expect(resource.valid?).to be true
      end
    end

    context "when instance invalid" do
      context "when blank resource_id" do
        before do
          resource.resource_id = nil
        end

        it "should return false" do
          expect(resource.valid?).to be false
        end
      end
  
      context "when exceed max length resource_id" do
        before do
          resource.resource_id = "a" * 101
        end
  
        it "should return false" do
          expect(resource.valid?).to be false
        end
      end
    end
  end
end

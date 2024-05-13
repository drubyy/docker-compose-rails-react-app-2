require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it{should have_many(:resources)}
  end

  describe "validations" do
    context "when valid all" do
      let(:user){FactoryBot.build :user}

      it "should return true" do
        expect(user.valid?).to be_truthy
      end
    end

    context "when instance invalid" do
      context "validate email" do
        context "when email nil" do
          let(:user){FactoryBot.build :user, email: nil}
  
          it "should return false" do
            expect(user.valid?).to be_falsy
            expect(user.errors.details[:email].first.has_value?(:blank)).to be_truthy
          end
        end
  
        context "when email blank" do
          let(:user){FactoryBot.build :user, email: ''}
  
          it "should return false" do
            expect(user.valid?).to be_falsy
            expect(user.errors.details[:email].first.has_value?(:blank)).to be_truthy
          end
        end

        context "when email too long" do
          let(:user){FactoryBot.build :user, email: ("a" * Settings.validate.user.email_max_length) + "@sample.com"}
  
          it "should return false" do
            expect(user.valid?).to be_falsy
            expect(user.errors.details[:email].first.has_value?(:too_long)).to be_truthy
          end
        end

        context "when email invalid format" do
          let(:user){FactoryBot.build :user, email: "sample"}
  
          it "should return false" do
            expect(user.valid?).to be_falsy
            expect(user.errors.details[:email].first.has_value?(:invalid)).to be_truthy
          end
        end
      end
    end
  end
end

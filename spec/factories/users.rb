FactoryBot.define do
  factory :user do
    sequence(:email){|n| "test+#{n}@test.com"}
    password{"Aa@123456"}
  end
end

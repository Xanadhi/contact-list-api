FactoryGirl.define do
  factory :phone_number do
    label       { Faker::Lorem.word }
    number      { Faker::PhoneNumber.phone_number }
  end
end
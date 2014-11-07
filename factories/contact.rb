FactoryGirl.define do 
  factory :contact do
    first_name       { Faker::Name.first_name }
    last_name        { Faker::Name.last_name }
    relationship     { Faker::Lorem.word }
    email            { Faker::Internet.email }
    street           { Faker::Address.street_address }
    city             { Faker::Address.city }
    province         { Faker::Address.state_abbr }
    postalcode       { Faker::Address.postcode }
    profile_image    { Faker::Avatar.image }
  end
end
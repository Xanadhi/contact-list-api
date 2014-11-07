require_relative '../configuration'

10.times do |y|
  FactoryGirl.create(:contact)
end

Contact.all.each do |contact|
  2.times do 
    number = FactoryGirl.build :phone_number
    number.contact_id = contact.id
    number.save
  end
end
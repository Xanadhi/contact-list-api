class Contact < ActiveRecord::Base
  has_many :phone_numbers, dependent: :destroy

end
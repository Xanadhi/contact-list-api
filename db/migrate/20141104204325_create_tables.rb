class CreateTables < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string  :first_name
      t.string  :last_name
      t.string  :relationship
      t.string  :email
      t.string  :street
      t.string  :city
      t.string  :province
      t.string  :postalcode
      t.string  :profile_image
      t.timestamps
    end

    create_table :phone_numbers do |t|
      t.string  :label
      t.string  :number
      t.belongs_to  :contact
    end

  end
end

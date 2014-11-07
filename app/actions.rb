# Homepage (Root path)
get '/' do
  erb :index
end

# List all contacts
get '/contacts' do
  @contacts = Contact.all
  json @contacts
end

# Add a new contacts
get '/contacts/new' do
end

post '/contacts' do
  contact = Contact.new(
    first_name:   params[:first_name],
    last_name:    params[:last_name],
    relationship: params[:relationship],
    email:        params[:email],
    street:       params[:street],
    city:         params[:city],
    province:     params[:province],
    postalcode:   params[:postalcode],
    profile_image: params[:profile_image]
    )
  contact.save
end

# Show a contact
get '/contacts/:id' do
  @contact = Contact.find(params[:id])
  json @contact
end

# Delete a contact
delete '/contacts/:id' do
  @contact = Contact.find(params[:id])
  @contact.destroy
end

# Search for a contact
get '/contacts/find/:query' do
  @contact = Contact.where(
    'first_name LIKE :search OR 
    last_name LIKE :search OR
    email LIKE :search', 
    :search => "%#{params[:query]}%")
  json @contact
end

# Edit a contact
patch '/contacts/:id' do
  @contact = Contact.update(params[:id],
    first_name:   params[:first_name],
    last_name:    params[:last_name],
    relationship: params[:relationship],
    email:        params[:email],
    street:       params[:street],
    city:         params[:city],
    province:     params[:province],
    postalcode:   params[:postalcode],
    profile_image: params[:profile_image]
    )
  @contact.save
end

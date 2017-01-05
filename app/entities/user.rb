# User
#
# The PhotoGIS user. Account subscription happens when name and email
# are given. On account creation, an access token is automatically generated,
# and the front-end application uses that token in subsequent requests
# as a means of identification.
class User
  include Hanami::Entity

  attributes :name, :email, :access_token, :created_at, :updated_at
end

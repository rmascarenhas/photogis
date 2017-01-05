collection :users do
  entity     User
  repository UserRepository

  attribute :id,           Integer
  attribute :name,         String
  attribute :email,        String
  attribute :access_token, String
  attribute :created_at,   Time
  attribute :updated_at,   Time
end

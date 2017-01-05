# POST /users/login
#
# Authenticates a user, which provides an email address.
#
# Success
# User with the email given exists. Returns its associated access token
#
#     { "name" => "John Doe", "accessToken" => "12345" }
#
# Failure
# Email is invalid, does not exist, etc. Returns an error code for the failure
#
#     { "errors" => { "email" => "email_invalid" } }
post "/users/login" do
  authentication = Transactions::LogIn.new(request_body).run

  if authentication.success?
    [200, authentication.to_h.to_json]
  else
    [422, { errors: authentication.errors }.to_json]
  end
end

# POST /users/signup
#
# Creates a new user account.
#
# Success
# User name and email are valid.
#
#     { "name" => "John Doe", "accessToken" => "12345" }
#
# Failure
# Name or email are invalid (not given, wrong format, already exists, etc.)
#
#     { "errors" => { "email" => "email_invalid", "name" => "name_not_given" } }
post "/users/signup" do
  account = Transactions::SignUp.new(request_body).run

  if account.created?
    [200, account.to_h.to_json]
  else
    [422, { errors: account.errors }.to_json]
  end
end

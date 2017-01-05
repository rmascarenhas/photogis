# POST /users/login
#
# Authenticates a user, which provides an email address.
#
# Success
# User with the email given exists. Returns its associated access token
#
#     { "access_token" => "12345" }
#
# Failure
# Email is invalid, does not exist, etc. Returns an error code for the failure
#
#     { "errors" => { "email" => "email_invalid" } }
post "/users/login" do
  authentication = Transactions::LogIn.new(request_body).run

  if authentication.success?
    [200, { access_token: authentication.to_h }.to_json]
  else
    [422, { errors: authentication.errors }.to_json]
  end
end

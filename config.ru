#\ --quiet

require_relative "app"

# set up CORS, so that the React app can successfully invoke the API.
# The `rack-cors` gem correctly fills in access control headers on responses
# and deals with preflight requests from the browser.
require "rack/cors"
use Rack::Cors do
  allow do
    # NOTE
    #
    # Ideally, this kind of setting should be more strict, allowing only the domain
    # where the front-end application is intended to be deployed. Also, this kind of
    # configuration could even be maintained outside this application, on nginx, if
    # no application logic is to be applied.
    #
    # To keep things simple for this task, it will accept CORS requests from any origin.
    origins  '*'
    resource '*', methods: [:get, :post, :delete, :put, :patch, :options], headers: :any
  end
end

run Sinatra::Application

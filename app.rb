require "bundler/setup"
require "sinatra"

Bundler.require

configure do
  # load every Ruby file under app/ and lib/
  Dir["#{__dir__}/{app,lib}/**/*.rb"].each { |f| require_relative f }

  # APIs use explicit HTTP methods
  disable :method_override

  # no static files are served through the API
  disable :static

  configure :test, :staging, :production do
    # in production-like environments, errors should not propagate outside
    # the app
    disable :raise_errors
    disable :show_exceptions
  end
end

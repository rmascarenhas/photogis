require "bundler/setup"
require "sinatra"

Bundler.require

# load both the +.env.{environment}+ file and the general +.env+ file, in that
# order, so that definitions on the environment specific file will take precendence
# over those in the general one.
Dotenv.load([".env.", ENV.fetch("RACK_ENV", "development")].join, ".env")

configure do
  # load every Ruby file under app/ and lib/
  Dir["#{__dir__}/{app,lib}/**/*.rb"].sort.each { |f| require_relative f }

  # load application initializers located under `config/initializers` after
  # application files have been loaded
  Dir["#{__dir__}/config/initializers/*.rb"].sort.each { |f| require_relative f }

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

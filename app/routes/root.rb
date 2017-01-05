before do
  # every request uses JSON as the response format
  content_type :json
end

helpers Helpers::HTTP

# GET /
# Request Body: none
#
# Returns dynamic information of the running system, including its version.
# Can be used as a health check endpoint when configured under a load balancer.
get "/" do
  {
    status:  "ok",
    time:    Time.now,
    version: PhotoGIS::VERSION
  }.to_json
end

module PhotoGIS

  VERSION = "1.0".freeze

  # always returns the root of the project, no matter the location of the  file
  # it is called from. Returns a +Pathname+ instance allowing easy joining of
  # paths. The absolute path can be obtained by calling +to_s+ on the returning
  # +Pathname+ instance.
  def self.root
    Pathname.new(File.expand_path(File.join(__dir__, "..")))
  end

end

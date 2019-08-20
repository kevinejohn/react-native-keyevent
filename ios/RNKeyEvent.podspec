
Pod::Spec.new do |s|
  s.name         = "RNKeyEvent"
  s.version      = "0.2.1"
  s.summary      = "Listen to keyboard events"
  s.description  = <<-DESC
                  RNKeyEvent
                   DESC
  s.homepage     = "https://github.com/kevinejohn/react-native-keyevent"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNKeyEvent.git", :tag => "master" }
  s.source_files  = "RNKeyEvent/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  

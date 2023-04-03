begin
  require 'selenium/webdriver'
  require 'capybara/rspec'

  Capybara.register_driver :selenium do |app|
    options = Selenium::WebDriver::Chrome::Options.new(
      args: %w[headless disable-gpu no-sandbox]
    )
    Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
  end

  Capybara.javascript_driver = :selenium
rescue LoadError
end
require 'rails_helper'

RSpec.feature "Dashboard", type: :feature, js: true do
  scenario "User has logged in want share a movie with invalid url" do
    visit("/login")

    # perform login
    fill_in "user_email", with: "test@test.com"
    fill_in "user_password", with: "123456"
    click_button "Login"

    #perform share a movie after login
    click_button "Share a movive"
    fill_in "resource_url", with: "something"
    click_button "Share"

    expect(page).to have_selector("div.ant-form-item-explain-error", :text => "We cannot found your video you wanna share")
  end

  scenario "User has logged in want share a movie with valid url" do
    visit("/login")

    # perform login
    fill_in "user_email", with: "test@test.com"
    fill_in "user_password", with: "123456"
    click_button "Login"

    #perform share a movie after login
    click_button "Share a movive"
    fill_in "resource_url", with: "https://www.youtube.com/watch?v=2DUdg4dnse8"
    click_button "Share"

    expect(page).to have_selector("iframe[src='https://www.youtube.com/embed/5bgOoznPQPE']")
  end
end
require 'rails_helper'

RSpec.feature "Authentication", type: :feature, js: true do
  scenario "Visitor signs up for a new account" do
    visit("/register")

    fill_in "user_email", with: "duongtt+7@test.com"
    fill_in "user_password", with: "password"
    click_button "Registration"

    expect(page).to have_selector(".wrapper-user-infor")
  end

  scenario "Visitor perform login to existed account" do
    visit("/login")

    fill_in "user_email", with: "test@test.com"
    fill_in "user_password", with: "123456"
    click_button "Login"

    expect(page).to have_css("div.wrapper-user-infor")
  end

  scenario "Logged in user perform sign out" do
    visit("/login")

    fill_in "user_email", with: "test@test.com"
    fill_in "user_password", with: "123456"
    click_button "Login"

    click_button "Logout"
    expect(page).to have_link("Sign in")
  end
end
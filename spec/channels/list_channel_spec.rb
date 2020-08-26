require 'rails_helper'

RSpec.describe ListChannel, type: :channel do
  it "doesn't subscribe to the channel if the ID isn't present" do
    subscribe
    expect(subscription).to_not be_confirmed
  end

  it "successfully subscribes to the channel with the specified ID" do
    subscribe id: "12345"
    expect(subscription).to be_confirmed
    expect(subscription).to have_stream_from("list:12345")
  end
end

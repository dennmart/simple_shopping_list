require 'rails_helper'

RSpec.describe "Lists", type: :request do
  describe "POST /list" do
    context "unsuccessful request" do
      it "doesn't broadcast to the List channel" do
        expect {
          post "/list", params: { id: "12345", item: "" }
        }.to_not have_broadcasted_to("list:12345")
      end

      it "returns a 422 unprocessable entity status if the item param is not present" do
        post "/list", params: { id: "12345", item: "" }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    context "successful request" do
      it "broadcasts the item to the List channel using the specified ID" do
        expect {
          post "/list", params: { id: "12345", item: "Bananas" }
        }.to have_broadcasted_to("list:12345").with("Bananas")
      end

      it "returns a 201 created status when successful" do
        post "/list", params: { id: "12345", item: "Bananas" }
        expect(response).to have_http_status(:created)
      end
    end
  end
end

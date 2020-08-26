class ListChannel < ApplicationCable::Channel
  def subscribed
    reject unless params[:id].present?
    stream_from "list:#{params[:id]}"
  end
end

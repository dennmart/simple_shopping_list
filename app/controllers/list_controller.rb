class ListController < ApplicationController
  def create
    if params[:item].present?
      ListChannel.broadcast_to(params[:id], params[:item])
      head :created
    else
      head :unprocessable_entity
    end
  end
end

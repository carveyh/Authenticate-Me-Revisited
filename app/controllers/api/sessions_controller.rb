class Api::SessionsController < ApplicationController
  def show
    # banana #this will cause an error, used to test out application_controller#unhandled_error
    if current_user
      @user = current_user # Need to create an i-var to be accessible to Jbuilder views.
      # render json: { user: @user } #BEFORE JBUILDER 'VIEWS' WERE DEFINED
      render 'api/users/show'
    else
      render json: { user: nil }
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential, password)
    if @user
      login!(@user)
      # render json: { user: @user } #BEFORE JBUILDER 'VIEWS' WERE DEFINED
      render 'api/users/show'
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: { message: 'success' }
    end
  end
end

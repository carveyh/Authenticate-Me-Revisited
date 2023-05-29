class Api::UsersController < ApplicationController
  # Ensures when Rails auto wraps request params that match attribute names of the route's controller's 
  # corresponding model, and wraps them with top level key of the model name,
  # also include additional specified request params that don't exactly match any model attributes
  wrap_parameters include: User.attribute_names + ['password'] 

  def create
    # render json: user_params # Testing - instead of creating any users, this just returns a response with user_params in json format to check that user_params works
    @user = User.new(user_params)
    if(@user.save)
      login!(@user)
      # render json: { user: @user } #BEFORE JBUILDER 'VIEWS' WERE DEFINED
      render :show #Can use this to render a show page with same folder nesting as namespace/controllername
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    # Note: frontend doesn't have to nest model attributes under top level key of model name.
    # Rails will check controller name the request is routed to, searches model with matching name.
    # Rails will then check request body for top-level keys matching model attributes.
    # Then will nest those keys under top-level key of model name.
      # However if request body has necessary keys that aren't a model attribute, like :password (rather than :password_digest),
      # will need to override with `wrap_parameters` at top of controller.
    params.require(:user).permit(:email, :username, :password)
  end
end

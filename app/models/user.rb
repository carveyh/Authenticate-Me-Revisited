# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  # Provided in command line shortcut `rails g model User password:digest`:
  # NOTE!!! in console, failed password_digest validation will display as :password=>["can't be blank"]
    # Don't worry, `:password allow_nil: true` is still in play; Rails is simply associating an actual password_digest validation
    # with the word "password".
  has_secure_password 

  ################################################
  ### FIGVAPEBR and
  ### SPIRE 
  ### Convenience provided by has_secure_password marked with *
  ################################################

  # self.find_by_credentials(credential, password)
    #   F self.find_by_credentials(credential, password)
  # password=(password)
    # * A attr_reader :password
    # * P password=(password)
  # is_password?(password)
    #   V validates 
    # * I is_password?(password) # becomes -> user.authenticate(password)
  # reset_session_token!
    #   R reset_session_token!
    #   G generate_unique_session_token
  # ensure_session_token
    #   B before_validation
    #   E ensure_session_token
  # OTHER
    #   * user.valid? # already provided by Rails, just a reminder
    # * * user.password_digest # getter method.

  validates :username, uniqueness: true, length: { in: 3..30 }, format: { without: URI::MailTo::EMAIL_REGEXP, message: "%{attribute} can't be an email" }
  # NOTE: in validations, can interpolate "%{model}" "%{attribute}" "%{value}"
  validates :email, uniqueness: true, length: { in: 3..255 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  # Can use rails c (rails console) to check validations without actually creating real users:
  # User.new(username: 'abc@mail.com').tap(&:valid?).errors.messages
  # User.new(username: 'abc@mail.com').tap(&:valid?).errors.full_messages
  # 
  # obj.tap(#method).(#method)
    # Kernel#tap method allows you to pass receive to provided block, then return receiver,
    # allowing to chain multiple method calls on same object without saving it intermediate variable.
    # NOT GOOD PRACTICE but good for testing.

  def self.find_by_credentials(credential, password) #credential can be username or email
    type = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by("#{type}": credential) #THIS SYNTAX for interpolating var into string as symbol works. Reminder, #{} only interpolates within double quotes.
    # user = User.find_by(type => credential) #THIS SYNTAX can also be used to have var as a hash key.

    # TEST: User.create(username: 'bob', email: 'bob@mail.io', password: 'password')
    # TEST: User.find_by_credentials('bob@mail.io', 'password')
    # TEST: User.find_by_credentials('bob', 'password')
    return user if(user && user.authenticate(password))
    nil
  end

  def reset_session_token!
    # self.session_token = generate_unique_session_token
    # self.save
    self.update!(session_token: generate_unique_session_token) # This combines the reassignment with the save to DB.
    self.session_token
  end

  private

  # Interestingly, project instructions make this a class method - which makes sense. Will keep instance for now for familiarity...noted for future refactors...
  def generate_unique_session_token
    while true
      session_token = SecureRandom.urlsafe_base64 # Or, SecureRandom.base64. urlsafe version can be included in URLs without additional encoding.
      return session_token unless User.find_by(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

end

# Ruby Safe Operator (TO READ) https://thoughtbot.com/blog/ruby-safe-navigation
#  https://fullstackheroes.com/tutorials/ruby/safe-navigation-operator/
  # Syntax: some_obj&.some_method
# JavaScript optional chaining operator (TO READ) https://javascript.info/optional-chaining 
  # Syntax: object?.property
  # Syntax: object?.method()

# BOOKMARK: W12D2 AUTHME BACKEND PHASE 1: Authentication Methods
  # user = User.find_by(type: credential) #THIS SYNTAX I thought of - is this right...?? TEST!!!! 
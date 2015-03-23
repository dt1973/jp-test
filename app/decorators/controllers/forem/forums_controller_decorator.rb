Forem::ForumsController.class_eval do
  after_filter :set_timestamp, only: :show

  # Set etag and last_modified

  # https://robots.thoughtbot.com/introduction-to-conditional-http-caching-with-rails

  def set_timestamp
    fresh_when last_modified: @topics.first.updated_at, etag: @topics
  end
end

Forem::Category.create!(:name => 'General')

user = User.create(
  :email => "admin@example.com",
  :password => "admin1234"
)
user.forem_admin = true
user.save!
user.update_attribute(:forem_state, 'approved')

unless user.nil?
  forum = Forem::Forum.create(:category_id => Forem::Category.first.id, :name => "Default", :description => "Default forem created by install")

  topic1 = forum.topics.build({ :subject => "Apples", :posts_attributes => [:text => "Eat apples"] })
  topic1.user = user
  topic1.save!

  topic2 = forum.topics.build({ :subject => "Bananas", :posts_attributes => [:text => "Eat bananas"] })
  topic2.user = user
  topic2.save!

  topic3 = forum.topics.build({ :subject => "Oranges", :posts_attributes => [:text => "Eat oranges"] })
  topic3.user = user
  topic3.save!

  topic4 = forum.topics.build({ :subject => "Mangos", :posts_attributes => [:text => "Eat mangos"] })
  topic4.user = user
  topic4.save!
end

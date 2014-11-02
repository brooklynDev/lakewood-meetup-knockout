class Foo
	@@data = []
	def self.add(asin)
		@@data.push(asin)
	end

	def self.exists(asin)
		@@data.include?(asin)
	end
end
require 'nokogiri'
require 'open-uri'

class AmazonApi
	def self.search(term)
		parse_search Nokogiri::HTML(open("http://www.amazon.com/s/?field-keywords=#{term}"))
	end

	private 
	def self.parse_search(doc)
		doc.css('[id^="result_"]').map do |li|
			result = {}
			result[:asin] = li.attribute('data-asin').value
			result[:title] = li.css("h2").text.strip
			result[:image] = li.css("img").attribute("src").value
			result[:link] = li.css("a").first.attribute('href').value
			result[:price] = li.css(".price.bld").first.text unless li.css(".price.bld").count == 0
			result[:price] = li.css("bld.lrg.red").text if result[:price].nil?
			result[:price] = li.css(".a-size-small.a-color-price.a-text-bold").text if result[:price].nil?
			result[:is_prime] = li.css(".srSprite.sprPrime").count > 0 || li.css('.a-icon-prime').count > 0
			result
		end
	end

end
require 'nokogiri'
require 'open-uri'

class AmazonApi
  class << self
    def search(term)
      parse_search Nokogiri::HTML(open("http://www.amazon.com/s/?field-keywords=#{URI::encode(term)}"))
    end

    def get_details(asin)
      parse_details Nokogiri::HTML(open("http://www.amazon.com/dp/#{asin}")), asin
      # parse_details Nokogiri::HTML(IO.read('output.html')), asin
    end

    private 
    def parse_search(doc)
      doc.css('[id^="result_"]').map do |li|
        result = {}
        result[:asin] = ignore_error {li.attribute('data-asin').value}
        result[:title] = ignore_error {li.css("h2").text.strip}
        result[:image] = ignore_error {li.css("img").attribute("src").value}
        result[:link] = ignore_error {li.css("a").first.attribute('href').value}
        result[:is_prime] = ignore_error {li.css(".srSprite.sprPrime").count > 0 || li.css('.a-icon-prime').count > 0}
        result
      end
    end

    def parse_details(doc, asin)
      result = {asin: asin}
      result[:rating] = ignore_error do
        /a-star-(\d)/.match(doc.css("#averageCustomerReviews .a-icon-star").attribute('class').value)[1]
      end
      result[:reviews] = ignore_error {doc.css('#acrCustomerReviewText').text}
      result[:sold_by] = ignore_error {doc.css("#merchant-info a").first.text} || "Amazon"
      result[:price] = ignore_error {doc.css('#priceblock_ourprice').text}
      result[:description] = ignore_error{doc.css('.productDescriptionWrapper').text}
      result
    end

    def ignore_error
      begin
        yield
      rescue
      end
    end
  end

end
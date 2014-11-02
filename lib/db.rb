class FavoritesDB
  @@asins = []

  class << self
    def add(asin)
      @@asins.push(asin) unless exists?(asin)
    end

    def delete(asin)
      @@asins.delete(asin)
    end

    def exists?(asin)
      @@asins.include?(asin)
    end
  end
end
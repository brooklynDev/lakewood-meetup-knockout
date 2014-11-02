class FavoritesDB
  @@asins = []

  class << self
    def add(asin)
      @@asins.push(asin) unless exists?(asin)
    end

    def remove(asin)
      @@data.delete("asin")
    end

    def exists?(asin)
      @@data.include?(asin)
    end
  end
end
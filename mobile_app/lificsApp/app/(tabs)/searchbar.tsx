import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, TextInput, FlatList, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';


type MenuItem = {
  item: string;
  price: number;
};

type Hotel = {
  hotel_name: string;
  menu: MenuItem[];
};

type Area = {
  area_name: string;
  hotels: Hotel[];
};

type Suggestion = {
  hotel: string;
  item: string;
  price: number;
  area: string;
};

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get<{ areas: Area[] }>('https://mocki.io/v1/d2bb5a74-cd9a-461e-8801-8eee22756992');
      const allAreas = response.data.areas;

      const filteredSuggestions: Suggestion[] = allAreas.flatMap((area: Area) => {
        return area.hotels.flatMap((hotel: Hotel) => {
          return hotel.menu
            .filter((item: MenuItem) =>
              item.item.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item: MenuItem) => ({
              hotel: hotel.hotel_name,
              item: item.item,
              price: item.price,
              area: area.area_name,
            }));
        });
      });

      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
       <IconSymbol name="search" size={18} color="gray" />


        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowSuggestions(text.length >= 2);
          }}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => setShowSuggestions(query.length >= 2)}
        />
      </View>

      {isLoading && <ActivityIndicator size="small" color="gray" style={styles.loader} />}

      {showSuggestions && !isLoading && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => `${item.hotel}-${item.item}-${index}`}
          style={styles.suggestionList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionItem}>
              <Text style={styles.suggestionText}>
                <Text style={{ fontWeight: 'bold' }}>{item.item}</Text> - ₹{item.price}
              </Text>
              <Text style={styles.suggestionSubText}>
                {item.hotel}, {item.area}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
  loader: {
    marginTop: 10,
  },
  suggestionList: {
    marginTop: 10,
    maxHeight: 250,
  },
  suggestionItem: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  suggestionText: {
    fontSize: 14,
  },
  suggestionSubText: {
    fontSize: 12,
    color: 'gray',
  },
});

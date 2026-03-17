import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { aiAPI } from '../services/api';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await aiAPI.search(query);
      if (response.data.success) {
        onSearch(response.data.data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
    >
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          
          <div className="relative bg-dark/90 backdrop-blur-xl rounded-2xl border border-primary/30 shadow-2xl overflow-hidden">
            <div className="flex items-center px-6 py-4">
              <Sparkles className="w-5 h-5 text-secondary mr-3 animate-pulse" />
              
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask AI: 'best hospital nearby' or 'least traffic route'..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
              />
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
                className="ml-3 p-2 bg-gradient-to-r from-primary to-secondary rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                <Search className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;

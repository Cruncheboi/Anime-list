import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, Reorder } from "framer-motion";
import { Trash2, GripVertical } from "lucide-react";

interface Anime {
  id: string;
  name: string;
  comment: string;
}

export default function App() {
  // State for managing anime list and form inputs
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  // Handle form submission for adding new anime
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name.trim()) {
      setError("Anime name is required");
      return;
    }

    // Create new anime entry with unique ID
    const newAnime: Anime = {
      id: crypto.randomUUID(),
      name: name.trim(),
      comment: comment.trim(),
    };

    // Add to list and reset form
    setAnimeList([...animeList, newAnime]);
    setName("");
    setComment("");
    setError("");
  };

  // Handle deleting an anime entry
  const handleDelete = (id: string) => {
    setAnimeList(animeList.filter((anime) => anime.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        My Favorite Anime List
      </h1>

      {/* Add Anime Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <Input
            placeholder="Anime name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
            aria-label="Anime name"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
        <Textarea
          placeholder="Why you love this anime"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full"
          rows={3}
          aria-label="Comment about anime"
        />
        <Button type="submit" className="w-full">
          Add Anime
        </Button>
      </form>

      {/* Drag-and-drop hint */}
      {animeList.length > 1 && (
        <div className="text-gray-400 mb-2">
          Drag and drop to reorder your list!
        </div>
      )}

      {/* Anime List */}
      {animeList.length === 0 ? (
        <div className="text-center text-gray-500">
          Your anime list is empty. Add some favorites!
        </div>
      ) : (
        <Reorder.Group
          axis="y"
          values={animeList}
          onReorder={setAnimeList}
          className="space-y-3"
        >
          {animeList.map((anime, index) => (
            <Reorder.Item key={anime.id} value={anime}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-row md:flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border active:cursor-grabbing cursor-grab"
              >
                {/* Rank Number */}
                <span className="text-lg font-semibold text-gray-500 w-8">
                  {index + 1}
                </span>

                {/* Drag Handle */}
                <GripVertical
                  className="hidden md:block text-gray-400"
                  size={20}
                />

                {/* Anime Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{anime.name}</h3>
                  <p className="text-sm text-gray-600 break-words">
                    {anime.comment || "No comment"}
                  </p>
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(anime.id)}
                  aria-label={`Delete ${anime.name}`}
                >
                  <Trash2 className="text-red-500" size={20} />
                </Button>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}

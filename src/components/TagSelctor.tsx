"use client";

import { useState } from "react";
import { useAppContext } from "../context";

interface Tag {
  title: string;
}

interface TagSelectorProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const { state } = useAppContext();

  console.log({state});
  

  // Update suggestions based on input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filtered = state.tags.filter(
        (tag: Tag) =>
          tag.title.toLowerCase().includes(value.toLowerCase()) &&
          !tags.some((t) => t.title.toLowerCase() === tag.title.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };
  console.log({ tags });

  // Add tag on Enter key
 const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key !== "Enter" || !input.trim()) return;

  const trimmedInput = input.trim();
  const existingTag = state.tags.find(
    (tag: Tag) => tag.title.toLowerCase() === trimmedInput.toLowerCase()
  );

  // Add tag by title comparison
  if (existingTag && !tags.some((t) => t.title.toLowerCase() === existingTag.title.toLowerCase())) {
    setTags([...tags, existingTag]);
  } else if (!tags.some((t) => t.title.toLowerCase() === trimmedInput.toLowerCase())) {
    setTags([...tags, { title: trimmedInput }]);
  }

  setInput("");
  setSuggestions([]);
};


  // Remove a tag from the list
  const removeTag = (tag: Tag) => {
    setTags(tags.filter((t) => t.title !== tag.title));
  };

  // Add tag from suggestion click
  const addTagFromSuggestion = (tag: Tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInput("");
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <label className="block text-gray-800 text-sm mb-1">Tags</label>
      <div className="flex flex-wrap items-center border border-gray-300 rounded-md p-2 w-full gap-1">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            onClick={() => removeTag(tag)}
            className="bg-gray-200 rounded px-2 py-0.5 text-xs cursor-pointer whitespace-nowrap"
          >
            {tag.title}
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={tags.length ? "" : "Start typing and press enter to add"}
          className="flex-1 border-none text-sm focus:outline-none"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md text-gray-800 p-2 z-10">
          <ul className="list-none">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => addTagFromSuggestion(suggestion)}
                className="cursor-pointer text-sm mb-1 last:mb-0 hover:underline"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagSelector;

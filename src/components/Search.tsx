import { useState } from "react";

interface SearchProps {
  setCurrLocation: (location: string) => void;
}

const Search = ({ setCurrLocation }: SearchProps) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="search">
      <input dir="rtl" type="text" placeholder="הכנס שם עיר " onChange={(e) =>  {setSearchValue(e.target.value)}} onKeyDown={(e) => {e.key == "Enter" && setCurrLocation(searchValue)}}/>
      <button onClick={() => setCurrLocation(searchValue)}>🔍</button>
    </div>
  );
};

export default Search;

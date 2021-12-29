import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TeacherSearchType } from '@/services/teacher.service';

export interface SearchState {
  type: TeacherSearchType;
  searchValue: string;
}

interface SearchBarProps {
  showOnlyInput: boolean;
  initialState?: SearchState;
  onChange?: (value: SearchState) => void | Promise<void>;
}
export function SearchBar({ initialState, onChange, showOnlyInput }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(initialState?.searchValue ?? '');
  const [searchType, setSearchType] = useState<TeacherSearchType>(initialState?.type ?? 'name');

  useEffect(() => {
    if (onChange) {
      onChange({ type: searchType, searchValue });
    }
  }, [searchValue, searchType]);

  const history = useHistory();
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search/${searchType}?term=${encodeURIComponent(searchValue)}`);
  };
  return (
    <form
      className="flex flex-col md:flex-row justify-center items-center py-6"
      onSubmit={onFormSubmit}
    >
      <div className="flex">
        {showOnlyInput && (
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as TeacherSearchType)}
            className="hidden md:block rounded w-40 mr-4 bg-gray-100 font-medium border-2 border-black"
          >
            <option value="name">Professor</option>
            <option value="class">Class</option>
            <option value="department">Department</option>
          </select>
        )}

        <div className="bg-gray-400 w-16 flex justify-center rounded-l-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          className="w-60 sm:w-80 rounded-r-lg h-8 pl-2"
          type="text"
          placeholder={`Enter a ${searchType}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {showOnlyInput && (
        <button
          className="bg-cal-poly-green text-white rounded-md px-5 ml-5 h-8 mt-3 lg:mt-0"
          type="submit"
        >
          Submit
        </button>
      )}
    </form>
  );
}

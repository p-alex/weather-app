import { useEffect, useRef, useState } from "react";
import useGetLocations from "../../hooks/useGetLocations";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TextInput from "../TextInput/TextInput";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import DropdownMenuLoadingMessage from "../DropdownMenu/DropdownMenuLoadingMessage";
import DropdownMenuButton from "../DropdownMenu/DropdownMenuButton";
import type { ILocation } from "../../api/domain/entities/ILocation";

interface Props {
  onLocationSelect: (location: ILocation | null) => void;
}

function SearchLocationForm({ onLocationSelect }: Props) {
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState("");

  const locations = useGetLocations(query);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = (data.get("query") as string).trim();
    if (!query) return;
    setQuery(query);
  };

  const selectLocation = (location: ILocation) => {
    setQuery("");
    setSearchValue("");
    formRef.current?.reset();
    onLocationSelect(location);
  };

  useEffect(() => {
    if (locations.data && locations.data.length === 0 && !locations.isLoading) {
      onLocationSelect(null);
    }
  }, [locations]);

  const isTyping = searchValue.trim() !== query;

  const shouldShowResults =
    locations.data && locations.data.length > 0 && !locations.isLoading && !isTyping;

  const shouldShowNoSearchResultsMessage =
    locations.data && locations.data.length === 0 && !locations.isLoading;

  return (
    <div className="w-full flex flex-col gap-12">
      <form
        className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 items-start"
        onSubmit={handleSearch}
        ref={formRef}
      >
        <div className="relative flex-1 w-full sm:max-w-131.5">
          <TextInput
            placeholder="Search for a place..."
            name="query"
            autoComplete="off"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            icon={<img src="/images/icon-search.svg" width={21} height={21} alt="" />}
          />

          {locations.isLoading && (
            <DropdownMenu className="absolute top-[calc(var(--text-field-height)+9px)] left-0 w-full z-(--z-dropdown)">
              <DropdownMenuLoadingMessage message="Search in progress" />
            </DropdownMenu>
          )}

          {shouldShowResults && (
            <DropdownMenu className="absolute top-[calc(var(--text-field-height)+9px)] left-0 w-full z-(--z-dropdown)">
              {locations.data.map((location) => {
                return (
                  <DropdownMenuButton key={location.id} onClick={() => selectLocation(location)}>
                    {`${location.name}, ${location.country}`}
                  </DropdownMenuButton>
                );
              })}
            </DropdownMenu>
          )}
        </div>
        <PrimaryButton type="submit" className="w-full sm:w-max">
          Search
        </PrimaryButton>
      </form>

      {locations.error && (
        <div className="flex flex-col gap-6 items-center w-full max-w-138.5 mx-auto">
          <img src="/images/icon-error.svg" width={50} height={50} alt="" />
          <p className="text-center font-medium text-xl text-text-muted">
            {locations.error.message}
          </p>
        </div>
      )}

      {shouldShowNoSearchResultsMessage && (
        <p className="text-center font-bold text-[28px] text-text">No search result found!</p>
      )}
    </div>
  );
}

export default SearchLocationForm;

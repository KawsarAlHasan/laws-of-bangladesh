import React from 'react'

function SearchItems({searchText}) {
  if (searchText.length === 0) {
    return (
      <h2 className="text-center my-4 text-xl">You have not searched for anything</h2>
    );
  }
  return (
    <div>{searchText}</div>
  )
}

export default SearchItems
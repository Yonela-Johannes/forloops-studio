import React from 'react';

const ChartsHeader = ({ category, title }) => (
  <div className="">
    <div>
      <p className="text-lg text-gray-400">{category}</p>
    </div>
    <p className="text-gray-500 text-mb mb-2 mt-3">{title}</p>
  </div>
);

export default ChartsHeader;

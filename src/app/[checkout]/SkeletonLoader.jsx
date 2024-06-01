import React from 'react'

function SkeletonLoader() {
  return (
    <div className="w-full max-w-lg mt-5 pb-5">
    {/* <h1 className="text-center font-semibold text-md mb-3 text-gray-500 skeleton skeleton-text"></h1> */}
    <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full px-3 relative">
        {/* <div className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 skeleton skeleton-text"></div> */}
        <div className="skeleton skeleton-input"></div>
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full px-3">
        {/* <div className="block uppercase tracking-wide text-gray-500 text-xs font-semibold mb-2 skeleton skeleton-text"></div> */}
        <div className="skeleton skeleton-input"></div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 mb-2">
      <div className="mb-4 md:mb-0">
        {/* <div className="block uppercase tracking-wide text-gray-500 text-xs md: font-medium mb-2 skeleton skeleton-text"></div> */}
        <div className="skeleton skeleton-input"></div>
      </div>
      <div className="mb-4">
        {/* <div className="block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 skeleton skeleton-text"></div> */}
        <div className="skeleton skeleton-input"></div>
      </div>
      <div>
        {/* <div className="block uppercase tracking-wide text-gray-500 text-xs font-medium mb-2 skeleton skeleton-text"></div> */}
        <div className="skeleton skeleton-input"></div>
      </div>
    </div>
    <div className="skeleton skeleton-button"></div>
  </div>
  )
}

export default SkeletonLoader
import React from 'react'

function Result() {
  return (
    <div className='mt-20 px-5 pt-10 pb-5 border border-gray-100 shadow-lg'>

        <h2 className="text-2xl text-center text-semibold mb-3">Result From Samantha</h2>

        <div className="result border border-gray-400 rounded-md">

            <div className='border-b border-gray-400 py-3 px-3'>
                <p className='sm:text-xl'>The Content is <span className='font-bold'>Either written by Human/AI</span></p>
            </div>
            <div className='border-b border-gray-400 flex gap-3 py-3 px-3'>
                <p className='sm:text-xl'>Plagiarized:</p>
                <p className="font-bold">0.00%</p>
            </div>
            <div className='border-b border-gray-400 flex gap-3 py-3 px-3'>
                <p className='sm:text-xl'>Creative:</p>
                <p className="font-bold sm:text-xl">0.00%</p>
            </div>

        </div>

        <div className="flex gap-3 mt-10 justify-center items-center">
            <p className='text-lg font-normal'>Do you want to mail this?</p>
            <button className='p-3 text-white bg-green-500 rounded-lg'>Yes</button>
        </div>

    </div>
  )
}

export default Result
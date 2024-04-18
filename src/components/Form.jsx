import React from 'react'


function Form() {
  return (
    <div>
      
        <form className='flex flex-col gap-10'>
            <input type="text" placeholder='Topic Name' className='border border-gray-300 block w-full rounded-lg py-2 lg:py-3 px-1' />
            <textarea rows="16" placeholder='Content' className='border border-gray-300 block w-full rounded-lg px-1'></textarea>
            <input type="text" placeholder='Enter your email address' className='border border-gray-300 block  w-full rounded-lg py-2 lg:py-3 px-1' />

      <div className="buttons flex justify-center items-center gap-3">
      <button className='bg-[#FF0000] text-white py-2 px-4 rounded-md flex items-center justify-center font-semibold'>Close</button>
            <button className='bg-[#D6BB41] text-white py-2  px-4 sm:px-10 rounded-md flex items-center justify-center font-semibold'>Reset</button>
            <button className='bg-[#005734] text-white py-2  px-4 sm:px-10 rounded-md flex gap-3 items-center font-semibold'>
            <i class="fa-solid fa-paper-plane w-3 h-3"></i>
              <span className='text-md'>Experience</span>
            </button>
      </div>
           
        </form>
    </div>
  )
}

export default Form
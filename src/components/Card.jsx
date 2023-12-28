import React from 'react'
import { FaNoteSticky } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { motion } from "framer-motion"
export default function Card({note,index, reference,setData}) {

    function deleteHandler(index){
        const newData = localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : null;
        const indexToDelete = index;

        // If the index is found, remove the element using splice
        if (indexToDelete !== -1) {
          newData.splice(indexToDelete, 1);
          localStorage.setItem("data", JSON.stringify(newData));
        }
        setData(newData);
        return ;
    }
  return (
    <motion.div drag whileDrag={{scale:1.2}}  velocity={6543000} dragConstraints={reference }  className=' w-[225px] bgc flex flex-col  cursor-pointer  overflow-hidden min-h-[300px]  rounded-[20px] relative text-white'>
       <div className='px-3 py-8 pb-2'> <FaNoteSticky /></div>
        <p className='px-3 py-3  text-sm leading-6 capitalize text-zinc-100 opacity-70  text-left'>{note.text}</p>
        
        <div className=' absolute bottom-0 w-[100%]'>
        <p className='flex items-center justify-between px-4 text-lg py-3 mb-1'>
            <span className='font-bold'>{note.heading}</span>
            <span id={index} className='opacity-50 hover:scale-[2.2]' onClick={(event)=>{
                deleteHandler(index);
            }} ><RiDeleteBin6Line  color='red'/></span>
        </p>
        <p className={`footer capitalize flex items-center justify-center   h-[38px] text-center ${note.priority=="high"?'bg-green-600':note.priority=="med"?'blb':'byl'}`}>
            {note.priority} Priority
        </p>
        </div>
     
    </motion.div>
  )
}

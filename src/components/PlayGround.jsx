import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
export default function PlayGround() {
  const [data, setData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null
  );
  const [inputModal, setInputModal] = useState(false);
  const [noteData, setNoteData] = useState({
    heading: "",
    text: "",
    priority: "high",
  });
  function changeHandler(event) {
    const { name, value } = event.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  }
  function cancelHandler() {
    setNoteData({
      heading: "",
      text: "",
      priority: "",
    });
    setInputModal(false);
  }
  function submitHandler() {


    if(noteData.heading.length <=0|| noteData.priority.length <= 0 || noteData.text.length<= 0)
    {
        toast.error("Cant Save Empty Notes");
        cancelHandler();
        return ;
    }
    const newData = localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null;
    let updatedData = null;
    if (newData == null) {
      updatedData = [noteData];
      localStorage.setItem("data", JSON.stringify(updatedData));
    
    } else {
      updatedData = [...newData, noteData];
      localStorage.setItem("data", JSON.stringify(updatedData));
     
    }
    
    cancelHandler(); 
    setData(updatedData)
    toast.success("saved...")
    return ;

  }
  useEffect(() => {
    // localStorage.setItem(
    //   "data",
    //   JSON.stringify([
    //     {
    //       heading: "asdf",
    //       priority: "med",
    //       text: "lofsndebfneofbfne",
    //     },
    //   ])
    // );
  });
  const myRef = useRef(null);
  return (
    <div
      className="w-full flex items-center justify-center  z-10 h-screen absolute  bg-transperent"
      ref={myRef}
    >
      {!inputModal && (
        <div className="flex items-center gap-8 flex-wrap">
          {data?.length > 0 &&
            data.map((note, index, length) => {
              return <Card note={note} index={index}  setData={setData} reference={myRef}></Card>;
            })}
        </div>
      )}
      {!inputModal && (
        <motion.div
          drag
          whileDrag={{ scale: 1.4 }}
          dragConstraints={myRef}
          velocity={6543000}
          className="addbtn left-[86%] top-[78%] absolute bgl rounded-[50%] p-5"
          onClick={() => {
            setInputModal(true);
          }}
        >
          <MdAdd />
        </motion.div>
      )}

      {inputModal && (
        <div className="bgc flex flex-col  w-[40vw] min-h-[60vh] rounded-sm text-zinc-400 ">
          <div className="text-center font-semibold text-[19px] text-zinc-400 mt-4">
            Type New Note ...
          </div>
          <label
            htmlFor="heading"
            className="flex flex-col gap-2 w-[90%] mx-auto mt-12"
          >
            <span className="text-sm">Enter Heading For Note</span>
            <input
              type="text"
              placeholder="Heading"
              name="heading"
              id="heading"
              className="w-[70%] bgd text-white focus:outline-none px-4 py-2 rounded-md"
              value={noteData.heading}
              onChange={changeHandler}
            />
          </label>
          <label
            htmlFor="text"
            className="flex flex-col gap-2 w-[90%] mx-auto mt-4"
          >
            <span className="text-sm">Enter your Note</span>
            <textarea
              type="text"
              placeholder="Enter the Note here"
              name="text"
              id="text"
              rows={4}
              className="w-[70%] bgd text-white focus:outline-none px-4 py-2 rounded-md"
              value={noteData.text}
              onChange={changeHandler}
            />
          </label>

          <label
            htmlFor="priority"
            className="flex flex-col gap-2 w-[90%] mx-auto mt-4"
          >
            <span className="text-sm capitalize">
              Choose priority of note/task
            </span>
            <select
              name="priority"
              id="priority"
              className="w-[70%] bgd text-white focus:outline-none px-4 py-2 rounded-md"
              value={noteData.priority}
              onChange={changeHandler}
            >
              <option value="high">High Priority</option>
              <option value="med">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </label>
          <div className="flex items-center justify-start w-[90%] mx-auto mt-12 gap-4 mb-4">
            <button
              className="submit bgl text-sm px-4 py-2 !text-black  rounded-md font-bold"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button className="submit bgl !text-black  px-4 py-2 text-sm rounded-md font-bold" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

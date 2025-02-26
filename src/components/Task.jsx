import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import TaskCard from "./TaskCard";


const Task = () => {
  const axiosPublic = useAxiosPublic();
  const { data: inProgress = [] } = useQuery({
    queryKey: ['inProgress'],
    queryFn: async () => {
      const res = await axiosPublic.get('/taskCategory/in-progress')
      return res.data
    }
  })
  const { data: toDo = [] } = useQuery({
    queryKey: ['to-do'],
    queryFn: async () => {
      const res = await axiosPublic.get('/taskCategory/to-do')
      return res.data
    }
  })
  const { data: done = [] } = useQuery({
    queryKey: ['done'],
    queryFn: async () => {
      const res = await axiosPublic.get('/taskCategory/done')
      return res.data
    }
  })

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div className="border-12 border-green-400 rounded-lg">
        <h2 className="text-xl bg-green-400 text-center font-bold pb-2 text-gray-600">To-Do</h2>
        <div className="grid grid-cols-1 gap-4 p-3">
          {
            toDo?.map((item, index) => <TaskCard key={index} item={item}></TaskCard>)
          }
        </div>
      </div>
      <div className="border-12 border-green-400 rounded-lg">
        <h2 className="text-xl bg-green-400 text-center font-bold pb-2 text-gray-600">In-Progress</h2>
        <div className="grid grid-cols-1 gap-4 p-3">
          {
            inProgress?.map((item, index) => <TaskCard key={index} item={item}></TaskCard>)
          }
        </div>
      </div>
      <div className="border-12 border-green-400 rounded-lg">
        <h2 className="text-xl bg-green-400 text-center font-bold pb-2 text-gray-600">Completed</h2>
        <div className="grid grid-cols-1 gap-4 p-3">
          {
            done?.map((item, index) => <TaskCard key={index} item={item}></TaskCard>)
          }
        </div>
      </div>
    </div>
  );
};

export default Task;
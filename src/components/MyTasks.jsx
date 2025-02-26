
import { useContext, useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import AuthContext from "./AuthContext";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { TbListDetails } from "react-icons/tb";


const MyTasks = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [status, setStatus] = useState("to-do")

    const { data: userDatas = [], refetch } = useQuery({
        queryKey: ['userDatas', user],
        queryFn: async () => {
            const res = await axiosPublic.get(`/taskEmail/${user?.email}`)
            return res.data
        }
    })


    const handleDelete = (userData) => {

        Swal.fire({
            title: "Are you sure?",
            text: `You want to delete ${userData?.title}!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/tasks/${userData?._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${userData?.title} has been deleted.`,
                                icon: "success"
                            });

                         
                        }
                    })
            }
        });
    }




    const [selectedTask, setSelectedTask] = useState(null);
    const modalRef = useRef(null);

    const openModal4 = (task) => {
        setSelectedTask(task); // Store the selected task
        setStatus(task.category);
        if (modalRef.current && !modalRef.current.open) {
            modalRef.current.showModal();
        }
    };

    const closeModal4 = () => {
        if (modalRef.current && modalRef.current.open) {
            modalRef.current.close();
        }
        setSelectedTask(null);
    };


    const handleUpdate = (e, data) => {
        e.preventDefault();
        const formData = e.target;
        const title = formData.title.value
        const description = formData.description.value
        const time = Date()
        const taskData = { title, description, category: status, updated: time, email: user?.email }

       
        axiosPublic.put(`/allTasks/${data._id}`, taskData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Task Updated Successfully",
                        showClass: {
                            popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                        },
                        hideClass: {
                            popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                        }
                    });
                    refetch();
                    closeModal4();


                }
            })

    }


    return (
        <div className="w-10/12 mx-auto ">
            <h2 className="text-2xl text-center font-semibold bg-green-400 py-5 ">All My Tasks</h2>
            {(userDatas.length > 0) ?
                <div className="overflow-auto max-h-[calc(100vh-150px)] bg-green-200 border-2 border-green-400">
                    <table className="table table-auto">
                        {/* head */}
                        <thead className="bg-green-300 text-gray-600">
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-200 text-gray-600">
                            {userDatas?.map((data, idx) =>
                                <tr className="bg-base-200" key={data._id}>
                                    <th>{idx + 1}</th>
                                    <td>{data.title}</td>
                                    <td>{data.category}</td>
                                    <td>{data.description}</td>
                                    <td>
                                        <div className="flex gap-2 justify-start items-center">

                                        <div className="tooltip tooltip-bottom lg:tooltip-left" data-tip={"Delete?"}>
                                        <button onClick={() => handleDelete(data)} className='btn btn-xs'><MdDeleteForever className="text-xl text-red-400" /></button>
                            </div>

                            <div className="tooltip tooltip-bottom " data-tip={"Update?"}>
                            <button onClick={() => openModal4(data)} className='btn btn-xs'>
                                                <TbListDetails className="text-xl text-green-400" />
                                            </button>
                            </div>

                                            
                                           


                                            {/* modal 4 */}
                                            <dialog ref={modalRef} className="modal">
                                                <div className="modal-box">
                                                    <form method="dialog">
                                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal4}>✕</button>
                                                    </form>
                                                    {selectedTask && (
                                                        <form onSubmit={(e) => handleUpdate(e, selectedTask)}>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Title</span>
                                                                </label><br />
                                                                <input type="text" name="title" defaultValue={selectedTask.title} placeholder="Task" className="input input-bordered w-full" required />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Description</span>
                                                                </label><br />
                                                                <input type="text" defaultValue={selectedTask.description} name="description" placeholder="Description" className="input input-bordered w-full" required />
                                                            </div>
                                                            <div className="form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Category</span>
                                                                </label><br />
                                                                <select
                                                                    value={status}
                                                                    onChange={e => setStatus(e.target.value)}
                                                                    className="select select-bordered w-full">
                                                                    <option value="" disabled>Task Status</option>
                                                                    <option value="to-do">To-Do</option>
                                                                    <option value="in-progress">In-Progress</option>
                                                                    <option value="done">Completed</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-control mt-6 text-end">
                                                                <button className="btn btn-primary">Update Task</button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </div>
                                            </dialog>

                                        </div>
                                    </td>
                                </tr>
                            )}


                        </tbody>






                    </table>
                </div>
                :
                <div className="bg-green-200 ">
                    <h2 className=" py-16 max-w-xl mx-auto text-center">No task posted from your end yet!</h2></div>}
        </div>
    );
};

export default MyTasks;

import { useContext, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import AuthContext from "./AuthContext";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const MyTasks = () => {
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [status, setStatus] = useState("to-do")

    const { data: userDatas = [], refetch } = useQuery({
        queryKey: ['userDatas',user],
        queryFn: async () => {
            const res = await axiosPublic.get(`/taskEmail/${user?.email}`)
            return res.data
        }
    })
    // console.log(userDatas)

    const handleDelete = (userData) => {
        console.log(userData)
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
                        // console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${userData?.title} has been deleted.`,
                                icon: "success"
                            });

                            // Refresh the page
                            window.location.reload();
                        }
                    })
            }
        });
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate=useNavigate()

    const openModal4 = () => {
        setIsModalOpen(true);
        setTimeout(() => {
            document.getElementById("my_modal_4").showModal();
        }, 100); // Delay to ensure modal is mounted first
    };

    const closeModal4 = () => {
        document.getElementById("my_modal_4").close();
        setIsModalOpen(false);
    };

    const handleUpdate = (e,data) => {
        console.log(data, "updated")
         e.preventDefault();
                const formData = e.target;
                const title = formData.title.value
                const description = formData.description.value
                const time = Date()
                const taskData = { title, description, category: status, time:data.time, updated:time,email:user?.email }
               
        
                axiosPublic.put(`/allTasks/${data._id}`, taskData)
                    .then(res => {
                        console.log(res.data, "after mongoDB Update");
                        if (res.data.modifiedCount>0) {
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
                            closeModal4();
                           
                        }
                    })
        
                console.log("form submitted", taskData)


    }


    return (
        <div>
            <h2 className="text-2xl text-center font-semibold">All My Tasks</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDatas?.map((data, idx) =>
                            <tr className="bg-base-200" key={data._id}>
                                <th>{idx + 1}</th>
                                <td>{data.title}</td>
                                <td>{data.category}</td>
                                <td>{data.description}</td>
                                <td>
                                    <div className="flex gap-2 justify-start items-center">
                                        <button onClick={() => handleDelete(data)} className='btn btn-xs'><MdDeleteForever className="text-xl text-red-400" /></button>
                                        <button onClick={openModal4} className='btn btn-xs'><TbListDetails className="text-xl text-green-400" /></button>

                                        {/* modal 4 */}
                                        <dialog id="my_modal_4" className="modal" open={isModalOpen}>
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal4}>✕</button>
                                                </form>
                                                <form onSubmit={(e) => handleUpdate(e, data)}>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Title</span>
                                                        </label><br />
                                                        <input type="text" name="title" defaultValue={data.title} placeholder="Task" className="input input-bordered w-full" required />
                                                    </div>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Description</span>
                                                        </label><br />
                                                        <input type="text" defaultValue={data.description} name="description" placeholder="Description" className="input input-bordered w-full" required />
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
                                            </div>
                                        </dialog>
                                    </div>
                                </td>
                            </tr>
                        )}


                    </tbody>






                </table>
            </div>
        </div>
    );
};

export default MyTasks;
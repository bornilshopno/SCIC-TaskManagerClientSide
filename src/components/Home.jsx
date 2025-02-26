import { useContext, useState } from "react";
import AuthContext from "./AuthContext";
import Task from "./Task";
import useAxiosPublic from "./useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const { loading, setLoading, user, setUser, logOut, googleSignIn, auth, } = useContext(AuthContext);
    const [status, setStatus] = useState("to-do")
    const axiosPublic = useAxiosPublic()
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()

    const openModal = () => {
        setIsModalOpen(true);
        setTimeout(() => {
            document.getElementById("my_modal_3").showModal();
        }, 100); // Delay to ensure modal is mounted first
    };

    const closeModal = () => {
        document.getElementById("my_modal_3").close();
        setIsModalOpen(false);
    };

    const LoginHandler = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setUser(user);
                setLoading(false);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    userId: result.user?.uid,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                     setStatus("to-do")
                        if(res.data.insertedId){
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Registered Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }

    const addTaskHandler = (e) => {
        e.preventDefault();
        const formData = e.target;
        const title = formData.title.value
        const description = formData.description.value
        const time = Date()
        const taskData = { title, description, category: status, time, email: user?.email }


        axiosPublic.post("/addTask", taskData)
            .then(res => {
          
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Task Saved Successfully",
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
                    closeModal();
                    // Refresh the page
                    window.location.reload();
                }
            })

    
    }
    return (
        <div className="min-h-[80vh] bg-gray-100 flex flex-col justify-center items-center w-10/12 mx-auto">
            {/* {!user && } */}
            <div className="w-full ">
                {user ?
                    <div>
                        <div className="mx-auto">{/* You can open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn w-full border-none bg-blue-500 text-base-200 font-bold text-2xl mb-2" onClick={openModal}>Add Task</button>
                            <dialog id="my_modal_3" className="modal" open={isModalOpen}>
                                <div className="modal-box">
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                                    </form>
                                    <form onSubmit={addTaskHandler}>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Title</span>
                                            </label><br />
                                            <input type="text" name="title" placeholder="Task" className="input input-bordered w-full" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Description</span>
                                            </label><br />
                                            <input type="text" name="description" placeholder="Description" className="input input-bordered w-full" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Category</span>
                                            </label><br />
                                            <select
                                                value={status}
                                                onChange={e => setStatus(e.target.value)}
                                                className="select select-bordered w-full">
                                                <option value="to-do" disabled>Task Status</option>
                                                <option value="to-do">To-Do</option>
                                                <option value="in-progress">In-Progress</option>
                                                <option value="done">Completed</option>
                                            </select>
                                        </div>
                                        <div className="form-control mt-6 text-end">
                                            <button className="btn btn-primary">Add Task</button>
                                        </div>
                                    </form>
                                </div>
                            </dialog>
                        </div>

                        <Task />
                    </div> :
                    <>
                        <div className="bg-green-200 min-h-[80vh] flex flex-col justify-center">
                            <h2 className="text-3xl text-center max-w-lg mx-auto py-10">Welcome to Task Manager! Pls login to continue</h2>
                            <div className=" my-20 text-center"><button className="btn text-center mx-auto border border-green-400" onClick={LoginHandler}>Login with Google</button></div>
                        </div>
                    </>}
            </div>






        </div>
    );
};

export default Home;
'use client'
import { useRouter } from "next/navigation";
import { Trash2 } from 'lucide-react'
import toast from "react-hot-toast";
const DeleteSingleCart = ({ id }: { id: number }) => {
    const { refresh } = useRouter();

    const handleDelete = async () => {
        console.log(id)
        const res = await fetch(`/api/cart/${id}`, {
            method: "DELETE",
        }
        )
        toast.success('Product Deleted from the Cart');
        refresh();
    }
    return (
        <div>
            <button
                title="bttn"
                onClick={handleDelete}>
                <div
                    className='hover:bg-[#E7E4F8]  rounded-full w-fit p-2.5'>
                    <Trash2 className='cursor-pointer  ' />
                </div>

            </button>
        </div>
    )
}

export default DeleteSingleCart

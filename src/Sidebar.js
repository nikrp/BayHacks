import { useNavigate } from "react-router-dom"

export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className={`w-1/6 min-h-screen shadow-2xl px-5 py-5`}>
            <p className={`text-3xl font-semibold mb-10`}> StudySphere</p>
            <button onClick={() => navigate('/profile', { replace: true })} className={`bg-gray-300 rounded-md px-3 py-2 w-full text-left bg-opacity-50 hover:bg-opacity-90 mb-1`}>Profile</button>
            <button onClick={() => navigate('/buddysearch', { replace: true })} className={`bg-gray-300 rounded-md px-3 py-2 w-full text-left bg-opacity-50 hover:bg-opacity-90 mb-1`}>Buddy Search</button>
        </div>
    )
}
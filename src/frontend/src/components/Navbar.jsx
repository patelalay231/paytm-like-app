import { useNavigate } from 'react-router-dom';

const Navbar = ({ username, appTitle,balance }) => {
    const navigate = useNavigate();
    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-2xl font-bold">{appTitle}</h1>
                <div className="text-white text-xs sm:text-sm">
                    <span className="font-medium">Welcome, {username}</span>
                    <div className='font-medium'> Your Balance : <span className="text-green-500"> Rs. {balance}</span></div>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-lg active:bg-red-700" onClick={()=>{
                        localStorage.removeItem('token');
                        navigate('/signin');
                    }}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from '../context';
import { actions } from '../constants/actions';
import Logo from './logo';
import { localStorageKeys } from '../constants/local-storage';


const Header = () => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem(localStorageKeys.AUTH_TOKEN);
        dispatch({
            type: actions.UPDATE_USER,
            payload: { details: null, token: null },
        });
        navigate("/login");
        toast.success("You are now logged out");
    };

    return (
        <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center max-w-6xl mx-auto w-full">
                <Logo />
                <button
                    onClick={handleLogout}
                    className="
            ml-auto 
            text-gray-700 
            font-semibold 
            hover:text-primary 
            transition-colors
          "
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../auth/AuthContext"

export const handleLogoutUser = async() => {
    const navigate = useNavigate();
    const { userLogout } = useAuth();
    const confirm_logout = await Swal.fire({
        title: 'Do you really want to logout?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm Logout'
    });
    if (!confirm_logout.isConfirmed) return;

    userLogout();
    navigate("/admin_login")
}
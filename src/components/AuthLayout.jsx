import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Protected = ({children, authentication = true}) => {

    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if(authentication && !authStatus){
            navigate("/login")
        } else if(!authentication && authStatus){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return (
        loader ? null : <>{children}</>
    )
}

export default Protected

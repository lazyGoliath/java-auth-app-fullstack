import useAuth from "@/auth/store"
import { Spinner } from "@/components/ui/spinner"
import { getRefreshToken } from "@/services/AuthService"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

function OAuth2Success() {

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const changeLocalLoginData = useAuth((state)=>state.changeLocalLoginData)
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh tokens and update local login data
    async function getAccessToken() {

      if(!isRefreshing){
        setIsRefreshing(true)
        try {
          // login
          const loginResponseData = await getRefreshToken()
          changeLocalLoginData(
            loginResponseData.accessToken,
            loginResponseData.user,
            true
          )

          toast.success("OAuth 2.0 authentication successful!")
          navigate("/dashboard")
        }
        finally {
          setIsRefreshing(false)
        }
      }
    }

    getAccessToken()
  }, []);
  return (
    <div className="p=10 flex flex-col gap-3 justify-center items-center">
      <Spinner />
      <h1 className="text-2xl font-semibold">Please wait...</h1>
    </div>
  )
}

export default OAuth2Success
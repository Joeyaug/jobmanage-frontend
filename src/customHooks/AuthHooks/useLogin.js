import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { error_message, success_message, user_state } from "../../global-state";
// import { handle_login, save_mb_paymail } from "../../services/user";


const  useLogin = () => {

  const set_user = useSetRecoilState(user_state)
  const set_error = useSetRecoilState(error_message)
  const set_success = useSetRecoilState(success_message)

  return  useMutation((payload)=>console.log(payload), {
      onSuccess: data => {
        set_user(data)
        set_success('Successfully logged in!')
        window.localStorage.setItem('token',data.token)
        localStorage.setItem('auth-token', data.money_button.auth_token)
        setTimeout(() => {
          set_success('')
        }, 4000);
        window.location.reload()

      },
      onError: () => {
        set_error('Invalid credentials!')
        setTimeout(() => {
          set_error('')
        }, 4000);
      }
  })
}

export default useLogin;